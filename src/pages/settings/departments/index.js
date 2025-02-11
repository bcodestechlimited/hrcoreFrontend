import { useContext, useEffect, useState } from "react";

// import { useNavigate, } from "react-router-dom";

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
import { manageDepartment } from "../../../data/Reducers/DepartmentReducer";
import Addbutton from "../../../components/button/addbutton";
import { GlobalState } from "../../../data/Context";
// import { toast } from "react-toastify";

const Departments = () => {
	// const navigate = useNavigate();

	const header = [
		{
			id: 1,
			name: "S/N",
			case: "number_count",
		},
		{
			id: 2,
			name: "Department Name",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: "name",
		},
		{
			id: 3,
			name: "Department Details",
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
	const [createdepartment, setCreatedepartment] = useState(false);
	const toggleCreateLeave = () => {
			setCreatedepartment(!createdepartment);
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
		{ department, company, auth } = useSelector(state => state),
		{ canAdmin, canApprove } = useContext(GlobalState),
		dispatch = useDispatch();
	const handleSubmit = async e => {
		e?.preventDefault();
		if (!isDelete) if (!state?.name) return;
		setLoading(true);
		await dispatch(
			manageDepartment(
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
		setCreatedepartment(false);
		setIsDelete(false);
		setIsEdit(false);
		setState(init);
	};

	useEffect(() => {
		if (department?.isAdded && submit) {
			reset();
		}
		if (department?.isUpdated && submit) {
			reset();
		}
		if (department?.isDeleted && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		department?.isAdded,
		submit,
		department?.isUpdated,
		department?.isDeleted,
	]);

	useEffect(() => {
		dispatch(manageDepartment("get", null, company?.currentSelected));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isEdit) {
			setCreatedepartment(true);
			setState({ ...state, ...isEdit });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit]);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);
	useEffect(() => {
		setData(department?.data);
	}, [department?.data]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!department?.data && !data) return <PageLoader />;
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
				manageDepartment(
					"get",
					{ limit: data?.limit * data?.nextPage },
					company?.currentSelected
				)
			);
			setLoading(false);
		};

	return (
		<div>
			<ManageSettingsTab name="Manage Department" />

			<div className=" shadow-md sm:rounded-lg mt-10">
				<div className="p-4 flex justify-between items-center">
					<p className=" font-bold  text-base">Departments</p>
					{auth?.user?.isAdmin || canAdmin || canApprove ? (
						<Addbutton
							background={"bg-secondary"}
							text={"Add Departments"}
							add={true}
							onClick={() => setCreatedepartment(true)}
						/>
					) : null}
					{/* <button
						className="bg-[#2A72A8]  p-2 px-8 rounded-md text-white whitespace-nowrap text-sm"
						onClick={() => setCreatedepartment(true)}>
						Add Departments
					</button> */}
				</div>

				<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
					{/* <MainRanger range={range} setRange={setRange} /> */}
					<SettingTable
						data={currentItems || dataTable}
						header={header}
						update={setIsEdit}
						remove={setIsDelete}
						viewFilter={"department"}
						// copy={collect => {
						// 	return (
						// 		<Addbutton
						// 			text="Copy Register Link"
						// 			background="bg-[#F72585]"
						// 			onClick={() =>
						// 				navigator.clipboard
						// 					.writeText(
						// 						`${window.origin}/register?company=${company?.currentSelected}&department=${collect}`
						// 					)
						// 					.then(
						// 						() => {
						// 							toast.info("Copied", { autoClose: 2000 });
						// 						},
						// 						err => {
						// 							toast.warn(`Could not copy: ${err}`, {
						// 								autoClose: 2000,
						// 							});
						// 						}
						// 					)
						// 			}
						// 			add={true}
						// 			copy
						// 			space
						// 		/>
						// 	);
						// }}
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
				title={isEdit ? `Edit ${isEdit?.name || ""}` : "Create Department"}
				show={createdepartment}
				close={toggleCreateLeave}>
				<div className="mx-20">
					<form className="space-y-4">
						<Input
							label={"Department Name"}
							placeholder={"Department Name"}
							value={state?.name}
							onChange={textChange}
							name="name"
						/>
						<Input
							label={"Department Details"}
							placeholder={"Department Details"}
							value={state?.description}
							onChange={textChange}
							name="description"
						/>

						<div className="mt-8 flex  justify-end">
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
			</ModalContainer>

			<ModalContainer
				title={"Delete Department"}
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

export default Departments;
