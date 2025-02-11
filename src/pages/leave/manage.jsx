import {
  LoadMore,
  MainPaginate,
  // MainRanger,
} from "../../components/pagination/pagination";
import FormName from "../../components/form-name/form-name";
import Search from "../../components/search/search";
// import DropDown from "../../components/dropdown/dropdown";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  manageLeaveRequest,
  resetLeaveRequestSearch,
} from "../../data/Reducers/LeaveReducer";
import Button from "../../components/button/button";
import ModalContainer, {
	PageLoader,
} from "../../components/modal-container/modal-container";
// import { RenderStatusCell } from "../../components/settings/setting_table";
import moment from "moment";
import { LiaTimesSolid } from "react-icons/lia";
import { IconContext } from "react-icons";
import Option from "../../components/oprion/option";
import { GiCheckMark } from "react-icons/gi";
import { BadgeBorder } from "../../components/badge/badge";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/input";

export const reasons = [
	{
		value: "Operational Impact",
		description: `The employee’s absence would significantly disrupt critical business operations or ongoing projects.`,
	},
	{
		value: "Workforce Shortage",
		description: `Insufficient coverage due to other team members being on leave at the same time.`,
	},
	{
		value: "Peak Business Period",
		description: `The leave request falls during a high-demand or peak business period when all hands are needed.`,
	},
	{
		value: `Short Notice`,
		description: `The leave was requested with insufficient notice, leaving no time to arrange alternative coverage.`,
	},
	{
		value: `Policy Violation`,
		description: `The request exceeds the allowable leave days or violates the company’s leave policy.`,
	},
	{
		value: `Pending Responsibilities`,
		description: `The employee has unresolved tasks or deadlines that must be addressed before taking leave.`,
	},
	{
		value: `Misaligned with Prior Commitments`,
		description: `The leave conflicts with pre-scheduled commitments, such as training sessions or client meetings.`,
	},
	{
		value: `Frequent Absences`,
		description: `The employee has a history of excessive or frequent absences within a short timeframe.`,
	},
	{
		value: `Critical Skills Required`,
		description: `The employee possesses specialized skills or knowledge needed for an ongoing project that no other team member can substitute.`,
	},
];

export function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

const ManageLeave = () => {
	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[isEdit, setIsEdit] = useState(null),
		[search, setSearch] = useState(""),
		{ leaveRequest, company, auth } = useSelector(state => state),
		[state, setState] = useState({}),
		textChange = e => {
			let { name, value } = e.target;
			setState({ ...state, [name]: value });
		},
		dispatch = useDispatch();
	const handleSubmit = async e => {
		e?.preventDefault();
		setLoading("load");
		await dispatch(
			manageLeaveRequest(
				"patch",
				{ ...isEdit?.data, status: isEdit?.type },
				company?.currentSelected
			)
		);
		setLoading(false);
		setSubmit(true);
	};
	let reset = () => {
		setSubmit(false);
		setIsEdit(false);
	};

	useEffect(() => {
		dispatch(manageLeaveRequest("get", null, company?.currentSelected));
		dispatch(
			manageLeaveRequest(
				"get",
				{ nextApprover: auth?.user?.profile?._id || auth?.user?._id },
				company?.currentSelected
			)
		);
		dispatch(resetLeaveRequestSearch());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (leaveRequest?.isAdded && submit) {
			reset();
		}
		if (leaveRequest?.isUpdated && submit) {
			reset();
		}
		if (leaveRequest?.isDeleted && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		leaveRequest?.isAdded,
		submit,
		leaveRequest?.isUpdated,
		leaveRequest?.isDeleted,
	]);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);
	useEffect(() => {
		if (leaveRequest?.isFound) setData(leaveRequest?.mainSearch);
		else
			setData(auth?.user?.isAdmin ? leaveRequest?.data : leaveRequest?.manage);
	}, [
		leaveRequest?.data,
		leaveRequest?.isFound,
		leaveRequest?.mainSearch,
		auth?.user,
		leaveRequest?.manage,
	]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (auth?.user?.isAdmin)
		if (!leaveRequest?.data && !data) return <PageLoader />;
	if (!auth?.user?.isAdmin)
		if (!leaveRequest?.manage && !data) return <PageLoader />;
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
			let datum = { limit: data?.limit * data?.nextPage, search };
			if (!auth?.user?.isAdmin)
				datum.nextApprover = auth?.user?.profile?._id || auth?.user?._id;
			await dispatch(
				manageLeaveRequest("get", datum, company?.currentSelected)
			);
			setLoading(false);
		},
		handleSearch = async e => {
			e?.preventDefault();
			setLoading("search");
			let datum = { search };
			if (!auth?.user?.isAdmin)
				datum.nextApprover = auth?.user?.profile?._id || auth?.user?._id;
			await dispatch(
				manageLeaveRequest("get", datum, company?.currentSelected)
			);
			setLoading(false);
		};

	return (
		<div>
			<div className=" shadow-md sm:rounded-lg mt-10">
				<div className="p-4 flex items-center justify-between">
					<select
						id="countries"
						className="bg-gray-50 w-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
						<option selected>Bulk Commands</option>
						<option value="reset">Reset Password</option>
						<option value="disable">Disable</option>
						<option value="audit">Audit</option>
					</select>
					<div className="flex items-center gap-4 w-2/3">
						{/* <DropDown>
							<form>
								<div className="mb-2.5">
									<label className="font-semibold mb-2">Status</label>
									<select
										id="countries"
										className="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-2 h-8">
										<option selected>All</option>
										<option value="reset">Reset Password</option>
										<option value="disable">Disable</option>
										<option value="audit">Audit</option>
									</select>
								</div>
								<div className="mb-2.5">
									<label className="font-semibold mb-2">Leave Type</label>
									<select
										id="countries"
										className="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-2 h-8">
										<option selected>All</option>
										<option value="reset">Reset Password</option>
										<option value="disable">Disable</option>
										<option value="audit">Audit</option>
									</select>
								</div>
								<div className="mt-4">
									<button className="text-sm p-1 px-8">Cancel</button>
									<button className="text-sm bg-[#2A72A8] text-white p-1 px-8 rounded-lg">
										Filter
									</button>
								</div>
							</form>
						</DropDown> */}
						<Search
							value={search}
							onChange={setSearch}
							handleSubmit={handleSearch}
							loading={loading === "search"}
						/>
					</div>
				</div>
				<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
					{/* <MainRanger range={range} setRange={setRange} /> */}
					<LeaveRequestTable
						currentItems={currentItems}
						setIsEdit={setIsEdit}
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
				title={`${isEdit?.type} request`}
				width={isEdit?.type === "decline" ? "max-w-lg" : "max-w-sm"}
				show={isEdit ? true : false}
				close={() => setIsEdit(null)}>
				<div className="mx-20">
					<form className="space-y-4">
						<div className="my-auto w-100">
							<p className="text2 Lexend text-center">
								Do you want to {isEdit?.type} {isEdit?.data?.createdBy?.email}{" "}
								request?
							</p>
							{isEdit?.type === "decline" && (
								<div className="pt-2">
									<Input
										label={"Reason for rejection"}
										type={"select"}
										name="reason"
										onChange={textChange}
										value={state?.reason}
										options={reasons}
									/>
									<Input
										label={"Comment"}
										type={"textarea"}
										name="comment"
										onChange={textChange}
										value={state?.comment}
									/>
								</div>
							)}
							<div className="pt-4 flex">
								<Button
									buttonType={"primary"}
									title={"Yes"}
									type="button"
									width={"w-fit me-2"}
									loading={loading === "load"}
									onClick={handleSubmit}
								/>
								<Button
									buttonType={"secondary"}
									title={"No"}
									type="button"
									width={"w-fit ms-2"}
									onClick={() => setIsEdit(null)}
								/>
							</div>
						</div>
					</form>
				</div>
			</ModalContainer>
		</div>
	);
};

export default ManageLeave;

export const LeaveRequestTable = ({ currentItems, setIsEdit }) => {
	let navigate = useNavigate();
	return (
		<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
			<thead className="text-xs text-gray-700 captalize bg-gray-50">
				<tr>
					<th scope="col" className="p-4">
						<div className="flex items-center">
							<input
								type="checkbox"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
							/>
							<label for="checkbox-all-search" className="sr-only">
								checkbox
							</label>
						</div>
					</th>
					<th scope="col" className="px-6 py-3">
						Name
					</th>
					<th scope="col" className="px-6 py-3">
						Leave Type
					</th>
					<th scope="col" className="px-6 py-3">
						From - To
					</th>
					<th scope="col" className="px-6 py-3">
						Reliever
					</th>
					<th scope="col" className="px-6 py-3">
						Days left
					</th>
					<th scope="col" className="px-6 py-3">
						Status
					</th>
					<th scope="col" className="px-6 py-3">
						Action
					</th>
				</tr>
			</thead>
			<tbody>
				{currentItems?.map((it, i) => (
					<tr className="bg-white border-b text-xs" key={i}>
						<td className="w-4 p-4">
							<div className="flex items-center">
								<input
									type="checkbox"
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
								/>
								<label for="checkbox-all-search" className="sr-only">
									checkbox
								</label>
							</div>
						</td>
						<th
							onClick={() =>
								navigate("/employee/profile", {
									state: it?.createdBy?.profile?._id
										? it?.createdBy?.profile?._id || it?.createdBy?._id
										: it?.createdBy?._id,
								})
							}
							scope="row"
							className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer">
							<FormName
								item={
									it?.createdBy?.profile?._id
										? it?.createdBy?.profile || it?.createdBy
										: it?.createdBy
								}
							/>
						</th>
						<td className="px-6 py-4">{it?.leaveType?.name}</td>
						<td className="px-6 py-4">
							{moment(it?.startDate).format("Do MMMM YYYY")} -{" "}
							{moment(it?.endDate).format("Do MMMM YYYY")}
						</td>
						<td className="px-6 py-4">
							{it?.reliever?.lastName} {it?.reliever?.firstName}
						</td>
						<td className="px-6 py-4">
							{moment(it?.endDate).diff(moment(), "days") < 0
								? 0
								: moment(it?.endDate).diff(moment(), "days")}
						</td>
						<td className="px-6 py-4">
							<div className="cursor-pointer">
								<BadgeBorder
									type={
										["approved", "approve"]?.includes(it?.status?.toLowerCase())
											? 1
											: it?.status?.toLowerCase() === "pending"
											? 3
											: 2
									}
									text={`${it?.status}${
										["decline", "approve"]?.includes(it?.status) ? "d" : ""
									}`}
								/>
							</div>
						</td>
						<td className="px-6 py-4">
							<Option type={"horizontal"}>
								<div className="flex gap-4 cursor-pointer">
									<IconContext.Provider value={{ color: "#2A72A8" }}>
										<GiCheckMark
											onClick={
												!setIsEdit
													? null
													: () => setIsEdit({ data: it, type: "approve" })
											}
											size={20}
										/>
									</IconContext.Provider>
									<IconContext.Provider value={{ color: "red" }}>
										<LiaTimesSolid
											onClick={
												!setIsEdit
													? null
													: () => setIsEdit({ data: it, type: "decline" })
											}
											size={20}
										/>
									</IconContext.Provider>
								</div>
							</Option>
							{/* <div className="px-2 py-1 rounded-lg flex gap-2">
											<RenderStatusCell
												status="Approve"
												onClick={() => setIsEdit({ data: it, type: "approve" })}
											/>
											<RenderStatusCell
												status="Decline"
												onClick={() => setIsEdit({ data: it, type: "decline" })}
											/>
										</div> */}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};