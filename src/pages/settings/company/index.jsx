import { useContext, useEffect, useState } from "react";

// import { useNavigate, Link } from "react-router-dom";

// import { SlOptionsVertical } from "react-icons/sl";
// import { BiFilterAlt } from "react-icons/bi";
// import { BsArrowDown, BsFillPlusSquareFill } from "react-icons/bs";

// import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import ManageSettingsTab from "../../../components/settings/manage_settings/manage_settings_tab";
// import Search from "../../../components/search/search";
// import Option from "../../../components/oprion/option";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../../components/pagination/pagination";
import ModalContainer, {
	PageLoader,
} from "../../../components/modal-container/modal-container";
import Input from "../../../components/input/input";
import Button from "../../../components/button/button";
// import DropDown from "../../../components/dropdown/dropdown";
// import { IconContext } from "react-icons";
// import ApprovalFlowTab from "../../../components/settings/approval_flow_component/approval-flow-tab";
import SettingTable from "../../../components/settings/setting_table";
import { useDispatch, useSelector } from "react-redux";
import { manageCompany } from "../../../data/Reducers/CompanyReducer";
import Addbutton from "../../../components/button/addbutton";
import { GlobalState } from "../../../data/Context";

const Companies = () => {
	// const navigate = useNavigate();
	// const [gradename, setGradename] = useState("");
	// const [CompanyData, setCompanyData] = useState([]);

	const header = [
		{
			id: 1,
			name: "S/N",
			case: "number_count",
		},
		{
			id: 2,
			name: "Company Name",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: "name",
		},
		{
			id: 5,
			name: "ACTION",
			case: "BUTTON",

			// name: "EditResetPasswordEnableDisable",
		},
	];

	const dataTable = [
		{ id: 1, name: "Alice", age: 30, city: "New York" },
		{ id: 2, name: "Bob", age: 25, city: "Los Angeles" },
		{ id: 3, name: "Charlie", age: 28, city: "Chicago" },
		{ id: 4, name: "David", age: 35, city: "Houston" },
		{ id: 5, name: "Eve", age: 22, city: "Miami" },
	];
	const [createlevel, setCreatelevel] = useState(false);
	const toggleCreateCompany = () => {
			setCreatelevel(!createlevel);
			if (isEdit) {
				setIsEdit(null);
				setState(init);
			}
		},
		init = {
			name: "",
		},
		[state, setState] = useState(init),
		textChange = e => {
			let { name, value } = e.target;
			setState({ ...state, [name]: value });
		},
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[isEdit, setIsEdit] = useState(null),
		[isDelete, setIsDelete] = useState(null),
		{ company, auth } = useSelector(state => state),
		{ canAdmin, canApprove } = useContext(GlobalState),
		dispatch = useDispatch();
	const handleSubmit = async e => {
		e?.preventDefault();
		if (!isDelete) if (!state?.name) return;
		setLoading(true);
		let newState = {};
		if (state?.name) newState = { ...newState, name: state?.name };
		if (state?.website) newState = { ...newState, website: state?.website };
		if (state?._id) newState = { ...newState, _id: state?._id };
		await dispatch(
			manageCompany(
				isDelete ? "delete" : isEdit ? "put" : "post",
				isDelete || newState,
				company?.currentSelected
			)
		);
		setLoading(false);
		setSubmit(true);
	};

	let reset = () => {
		setSubmit(false);
		setCreatelevel(false);
		setIsDelete(false);
		setIsEdit(false);
		setState(init);
	};

	useEffect(() => {
		dispatch(manageCompany("get", null, company?.currentSelected));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (company?.isAdded && submit) {
			reset();
		}
		if (company?.isUpdated && submit) {
			reset();
		}
		if (company?.isDeleted && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [company?.isAdded, submit, company?.isUpdated, company?.isDeleted]);

	useEffect(() => {
		if (isEdit) {
			setCreatelevel(true);
			setState({ ...state, ...isEdit });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit]);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);
	useEffect(() => {
		setData(company?.data);
	}, [company?.data]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!company?.data && !data) return <PageLoader />;
	if (!data) return;

	const currentItems = data?.docs?.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data?.docs?.length / range);

	const handlePageClick = event => {
			const newOffset = (event.selected * range) % data?.docs?.length;
			setItemOffset(newOffset);
			setPage(1 + event?.selected);
		},
		handleLoadMore = async () => {
			setLoading("loadmore");
			await dispatch(
				manageCompany(
					"get",
					{ limit: data?.limit * data?.nextPage },
					company?.currentSelected
				)
			);
			setLoading(false);
		};

	return (
		<div>
			<div className="flex items-center justify-between w-full">
				<ManageSettingsTab name="Manage Companies" />
				<div className="p-4 ">
					{auth?.user?.isAdmin || canAdmin || canApprove ? (
						<Addbutton
							background={"bg-secondary"}
							text={"Add Companies"}
							add={true}
							onClick={() => setCreatelevel(true)}
						/>
					) : null}
				</div>
			</div>

			<div className=" shadow-md sm:rounded-lg mt-10">
				<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
					{/* <MainRanger range={range} setRange={setRange} /> */}
					<SettingTable
						data={currentItems || dataTable}
						header={header}
						update={setIsEdit}
						// remove={setIsDelete}
						// viewFilter={"level"}
					/>
				</div>
			</div>
			<div className="mt-4 flex justify-center">
				<LoadMore
					next={page === pageCount && data?.hasNextPage}
					loading={loading === "loadmore"}
					handleLoadMore={handleLoadMore}
				/>
			</div>
			<div className="mt-4 flex justify-center">
				{/* <Pagination /> */}
				<MainPaginate pageCount={pageCount} handlePageClick={handlePageClick} />
			</div>

			<ModalContainer
				title={isEdit ? `Edit ${isEdit?.name || ""}` : "Add Company"}
				show={createlevel}
				close={toggleCreateCompany}>
				<div className="px-6 py-4 overflow-y-auto ">
					{/* Add your content here */}
					<div className="popmodal__cover">
						<div className="popmodal__content ">
							<form>
								<div>
									<Input
										label={"Company Name"}
										placeholder={"Company Name"}
										value={state?.name}
										onChange={textChange}
										name="name"
									/>
									<Input
										label={"Company Website"}
										placeholder={"Company Website"}
										value={state?.website}
										onChange={textChange}
										name="website"
										type="url"
									/>
								</div>
								<div className="mt-8 flex  justify-center">
									<Button
										buttonType={"primary"}
										title={isEdit ? "Update" : "Create"}
										type="submit"
										width={"w-fit"}
										loading={loading}
										onClick={handleSubmit}
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</ModalContainer>
			<ModalContainer
				title={"Delete Company"}
				width={"max-w-sm"}
				show={isDelete ? true : false}
				close={() => setIsDelete(null)}>
				<div className="mx-20">
					<form className="space-y-4">
						<div className="my-auto w-100">
							<p className="text2 Lexend text-center">
								Do you want to delete {isDelete?.name}?
							</p>
							<div className="pt-4 flex">
								<Button
									buttonType={"primary"}
									title={"Yes"}
									type="button"
									width={"w-fit me-2"}
									loading={loading}
									onClick={handleSubmit}
								/>
								<Button
									buttonType={"secondary"}
									title={"No"}
									type="button"
									width={"w-fit ms-2"}
									onClick={() => setIsDelete(null)}
								/>
							</div>
						</div>
					</form>
				</div>
			</ModalContainer>
		</div>
	);
};

export default Companies;
