import { useEffect, useState, useContext } from "react";

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
import {
	managePosition,
	resetPositionSearch,
} from "../../../data/Reducers/PositionReducer";
import Addbutton from "../../../components/button/addbutton";
import { GlobalState } from "../../../data/Context";

const Positions = () => {
	// const navigate = useNavigate();
	// const [gradename, setGradename] = useState("");
	// const [leaveData, setLeaveData] = useState([]);

	const header = [
		{
			id: 1,
			name: "S/N",
			case: "number_count",
		},
		{
			id: 2,
			name: "Position Name",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: "name",
		},
		{
			id: 3,
			name: "Department",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: "department",
			subKeyName: "name",
		},
		{
			id: 4,
			name: "Position Description",
			case: "CashApprovalFlows_CASH_CATEGORY",
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
	const [createposition, setCreateposition] = useState(false);
	const toggleCreateLeave = () => {
			setCreateposition(!createposition);
			if (isEdit) {
				setIsEdit(null);
				setState(init);
			}
		},
		init = {
			name: "",
			description: "",
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
		[thisDepartment, setDepartment] = useState(null),
		{ position, company, auth, department } = useSelector(state => state),
		{ canAdmin, canApprove } = useContext(GlobalState),
		dispatch = useDispatch();
	const handleSubmit = async e => {
		e?.preventDefault();
		if (!isDelete) if (!state?.name) return;
		setLoading(true);
		await dispatch(
			managePosition(
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
		setCreateposition(false);
		setIsDelete(false);
		setIsEdit(false);
		setState(init);
	};

	useEffect(() => {
		dispatch(managePosition("get", null, company?.currentSelected));
		dispatch(resetPositionSearch());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (position?.isAdded && submit) {
			reset();
		}
		if (position?.isUpdated && submit) {
			reset();
		}
		if (position?.isDeleted && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [position?.isAdded, submit, position?.isUpdated, position?.isDeleted]);

	useEffect(() => {
		if (isEdit) {
			setCreateposition(true);
			setState({ ...state, ...isEdit });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit]);

	useEffect(() => {
		if (thisDepartment) {
			dispatch(
				managePosition(
					"get",
					{ department: thisDepartment },
					company?.currentSelected
				)
			);
		} else {
			dispatch(resetPositionSearch());
		}
	}, [dispatch, thisDepartment, company?.currentSelected]);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);
	useEffect(() => {
		if (position?.isFound) setData(position?.mainSearch);
		else setData(position?.data);
	}, [position?.data, position?.mainSearch, position?.isFound]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!position?.data && !data) return <PageLoader />;
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
				managePosition(
					"get",
					{ limit: data?.limit * data?.nextPage, department: thisDepartment },
					company?.currentSelected
				)
			);
			setLoading(false);
		};

	return (
		<div>
			<div className="flex justify-between items-center w-full">
				<ManageSettingsTab name="Manage Positions" />
				<div className="flex flex-col justify-end gap-3 items-end">
					{auth?.user?.isAdmin || canAdmin || canApprove ? (
						<Addbutton
							background={"bg-secondary"}
							text={"Add Position"}
							add={true}
							onClick={() => setCreateposition(true)}
						/>
					) : null}
					{department?.all && (
						<Input
							onChange={e => setDepartment(e?.target?.value)}
							name="department"
							value={thisDepartment}
							label={"Filter Position by Department"}
							type={"select"}
							options={department?.all?.docs?.filter(item => item?.name)}
						/>
					)}
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
						viewFilter={"position"}
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
				title={isEdit ? `Edit ${isEdit?.name || ""}` : "Add Position"}
				show={createposition}
				close={toggleCreateLeave}>
				<div className="mx-20">
					<form className="space-y-4">
						<Input
							onChange={textChange}
							name="department"
							value={state?.department?._id || state?.department}
							label={"Department Position"}
							type={"select"}
							options={department?.all?.docs?.filter(item => item?.name)}
						/>

						<Input
							label={"Position Name"}
							placeholder={"Enter Position Name"}
							value={state?.name}
							name="name"
							onChange={textChange}
						/>
						<Input
							label={"Position Description"}
							placeholder={"Enter Position Description"}
							type={"textarea"}
							value={state?.description}
							name="description"
							onChange={textChange}
						/>

						<div className="mt-8 flex  justify-center">
							<Button
								buttonType={"primary"}
								title={isEdit ? "Update" : "Create"}
								width={"w-fit"}
								type="submit"
								loading={loading}
								onClick={handleSubmit}
							/>
						</div>
					</form>
				</div>
			</ModalContainer>
			<ModalContainer
				title={"Delete Position"}
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

export default Positions;
