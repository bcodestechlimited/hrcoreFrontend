import { useEffect, useState } from "react";
import { BiFilterAlt, BiSolidCheckboxMinus } from "react-icons/bi";
import { BsArrowDown, BsFillPlusSquareFill } from "react-icons/bs";

import Search from "../../../components/search/search";
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
import DropDown from "../../../components/dropdown/dropdown";
import { IconContext } from "react-icons";
import ApprovalFlowTab from "../../../components/settings/approval_flow_component/approval-flow-tab";
import SettingTable from "../../../components/settings/setting_table";
import Addbutton from "../../../components/button/addbutton";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { manageleaveFlow } from "../../../data/Reducers/LeaveFlowReducer";

const LeaveApprovalFlows = () => {
	const [createApproval, setCreateApproval] = useState(false);

	const toggleCreateLeave = () => {
			setCreateApproval(!createApproval);
			if (isEdit) {
				setIsEdit(null);
				setState(init);
			}
		},
		init = {
			level: "",
			approvers: [],
		},
		[approval, setApproval] = useState([]),
		[da, setDa] = useState({
			level: "",
		}),
		[state, setState] = useState(init),
		textChange = e => {
			let { name, value } = e.target;
			setState({ ...state, [name]: value });
		},
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[isEdit, setIsEdit] = useState(null),
		[isDelete, setIsDelete] = useState(null),
		[search, setSearch] = useState(""),
		[data, setData] = useState(null),
		dispatch = useDispatch(),
		{ company, level, leaveFlow } = useSelector(state => state),
		handleDelete = e => {
			let newFil = approval?.filter(it => it?.id !== e?.id);
			console.log({ newFil, e, approval });
			setApproval(newFil);
		},
		handleAdd = () => {
			console.log({ da });
			if (!da?.level) return;
			setApproval([
				...approval,
				{
					...da,
					id: v4(),
					levelId: level?.all?.docs?.find(i => i?._id === da?.level),
				},
			]);
			setDa(init);
		};

	const handleSubmit = async e => {
			e?.preventDefault();
			let newState = state;
			if (!isDelete)
				if (!state?.level) return;
				else {
					newState = {
						...state,
						approvers: approval?.map(item => item?.level),
					};
				}
			console.log({ newState, state });
			setLoading(true);
			await dispatch(
				manageleaveFlow(
					isDelete ? "delete" : isEdit ? "put" : "post",
					isDelete || newState,
					company?.currentSelected
				)
			);
			setLoading(false);
		},
		handleSearch = async e => {
			e?.preventDefault();
			setLoading("search");
			await dispatch(
				manageleaveFlow("get", { search }, company?.currentSelected)
			);

			setLoading(false);
		};

	let reset = () => {
		setSubmit(false);
		setCreateApproval(false);
		setIsDelete(false);
		setIsEdit(false);
		setState(init);
		setApproval([]);
	};

	useEffect(() => {
		setData(leaveFlow?.data);
	}, [leaveFlow?.data]);

	useEffect(() => {
		if (submit && leaveFlow?.isAdded) {
			reset();
		}
		if (submit && leaveFlow?.isUpdated) {
			reset();
		}
		if (submit && leaveFlow?.isDeleted) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, leaveFlow?.isAdded, leaveFlow?.isUpdated, leaveFlow?.isDeleted]);

	useEffect(() => {
		if (isEdit) {
			setCreateApproval(true);
			setState({ ...state, ...isEdit });
			setApproval(
				isEdit?.approvers?.map(it => {
					return {
						id: v4(),
						level: it?._id,
						levelId: it,
					};
				})
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit]);

	useEffect(() => {
		dispatch(manageleaveFlow("get", null, company?.currentSelected));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const header = [
		{
			id: 1,
			name: "S/N",
			case: "number_count",
		},
		{
			id: 2,
			name: "Level",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: "level",
			subKeyName: "name",
		},
		{
			id: 3,
			name: "Approvers",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: "approvers",
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

	let [range] = useState(10),
		[page, setPage] = useState(1);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;
	if (loading === "getting") return <PageLoader />;
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
				manageleaveFlow(
					"get",
					{ limit: data?.limit * data?.nextPage, search },
					company?.currentSelected
				)
			);
			setLoading(false);
		},
		colorArr = ["#FFF3FF", "#E8FEEE", "#E8F2FE"];

	return (
		<div>
			<div className="flex justify-between items-center">
				<ApprovalFlowTab name={"Leave Flow"} />
				<Addbutton
					background={"bg-secondary"}
					text={"Create Leave Approval Flow"}
					add={true}
					onClick={() => setCreateApproval(!createApproval)}
				/>
			</div>

			<div className=" shadow-md sm:rounded-lg mt-10">
				<div className="p-4 flex items-center justify-between ">
					<div className="flex items-center gap-4  w-full">
						<div className="w-full flex items-center gap-5">
							<div className=" flex items-center cursor-pointer justify-between w-full">
								<div className="flex items-center gap-4">
									<BiFilterAlt />
									<DropDown />
								</div>
								<div className="w-1/2">
									<Search
										value={search}
										onChange={setSearch}
										handleSubmit={handleSearch}
										loading={loading === "search"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
					{/* <MainRanger range={range} setRange={setRange} /> */}
					<SettingTable
						data={currentItems || dataTable}
						header={header}
						update={setIsEdit}
						remove={setIsDelete}
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
				<MainPaginate pageCount={pageCount} handlePageClick={handlePageClick} />
			</div>

			<ModalContainer
				title={`${isEdit ? "Edit" : ""} Approval Flows`}
				show={createApproval}
				close={toggleCreateLeave}>
				{/* {console.log({ state })} */}
				<div className="mx-20">
					<form className="space-y-4">
						<Input
							onChange={textChange}
							name="level"
							value={state?.level?._id || state?.level}
							label={"Level"}
							type={"select"}
							options={level?.all?.docs?.filter(item => item?.name)}
						/>
						<Input
							label={`Select Approver (${approval?.length + 1})`}
							type={"select"}
							value={da?.level}
							onChange={e => setDa({ ...da, level: e.target.value })}
							options={level?.all?.docs?.filter(item => item?.name)}
						/>
						{approval?.map((it, i) => (
							<div className="flex justify-center items-center" key={i}>
								<div className=" ">
									<p className="text-center flex items-center">
										<span
											className="p-2 rounded-sm"
											style={{
												background: colorArr?.[i % colorArr?.length],
											}}>
											Leave Approver {i + 1}: {it?.levelId?.name}
										</span>
										<div className="flex justify-end">
											<IconContext.Provider
												value={{
													className:
														"global-class-name text-[#F97AB4] cursor-pointer",
												}}>
												<div
													title="Remove Approval"
													onClick={() => handleDelete(it)}>
													<BiSolidCheckboxMinus size={24} />
												</div>
											</IconContext.Provider>
										</div>
									</p>

									{i !== approval?.length - 1 && (
										<div className="m-auto flex justify-center w-full">
											<IconContext.Provider
												value={{
													className: "global-class-name text-[#2A72A8CC]",
												}}>
												<div>
													<BsArrowDown />
												</div>
											</IconContext.Provider>
										</div>
									)}
								</div>
							</div>
						))}

						<div className="flex justify-end">
							<IconContext.Provider
								value={{
									className: "global-class-name text-[#F97AB4] cursor-pointer",
								}}>
								<div title="Add New Approval" onClick={handleAdd}>
									<BsFillPlusSquareFill />
								</div>
							</IconContext.Provider>
						</div>
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
				title={`Delete Leave Flow`}
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

export default LeaveApprovalFlows;
