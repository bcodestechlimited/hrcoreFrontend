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
import { manageLevel } from "../../../data/Reducers/LevelReducer";
import Addbutton from "../../../components/button/addbutton";
import { GlobalState } from "../../../data/Context";

const Levels = () => {
	// const navigate = useNavigate();
	// const [gradename, setGradename] = useState("");
	// const [LevelData, setLevelData] = useState([]);

	const header = [
		{
			id: 1,
			name: "S/N",
			case: "number_count",
		},
		{
			id: 2,
			name: "Level name",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: "name",
		},
		{
			id: 3,
			name: "Level Entitled to",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: "entitled",
		},

		{
			id: 3,
			name: "    Salary Structure",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: "salary",
			number: true,
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
	const toggleCreateLevel = () => {
			setCreatelevel(!createlevel);
			if (isEdit) {
				setIsEdit(null);
				setState(init);
			}
		},
		init = {
			name: "",
			salary: "",
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
		{ level, company, auth } = useSelector(state => state),
		{ canAdmin, canApprove } = useContext(GlobalState),
		dispatch = useDispatch();
	const handleSubmit = async e => {
		e?.preventDefault();
		if (!isDelete) if (!state?.name) return;
		setLoading(true);
		await dispatch(
			manageLevel(
				isDelete ? "delete" : isEdit ? "put" : "post",
				isDelete || state,
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
		dispatch(manageLevel("get", null, company?.currentSelected));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (level?.isAdded && submit) {
			reset();
		}
		if (level?.isUpdated && submit) {
			reset();
		}
		if (level?.isDeleted && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [level?.isAdded, submit, level?.isUpdated, level?.isDeleted]);

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
		setData(level?.data);
	}, [level?.data]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!level?.data && !data) return <PageLoader />;
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
				manageLevel(
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
				<ManageSettingsTab name="Manage Levels" />
				<div className="p-4 ">
					{auth?.user?.isAdmin || canAdmin || canApprove ? (
						<Addbutton
							background={"bg-secondary"}
							text={"Add Levels"}
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
						remove={setIsDelete}
						viewFilter={"level"}
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
				title={isEdit ? `Edit ${isEdit?.name || ""}` : "Add Level"}
				show={createlevel}
				close={toggleCreateLevel}>
				<div className="px-6 py-4 overflow-y-auto ">
					{/* Add your content here */}
					<div className="popmodal__cover">
						<div className="popmodal__content ">
							<form>
								<div>
									<Input
										label={"Level Name"}
										placeholder={"Level Name"}
										value={state?.name}
										onChange={textChange}
										name="name"
									/>
								</div>
								<div>
									<Input
										label={"Level Salary"}
										placeholder={"Level Salary"}
										value={state?.salary}
										onChange={textChange}
										name="salary"
										type={"number"}
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
				title={"Delete Level"}
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

export default Levels;
