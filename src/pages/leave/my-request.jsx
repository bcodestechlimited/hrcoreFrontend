import { BadgeBorder } from "../../components/badge/badge";
// import Button from "../../components/button/button";
// import { AiTwotoneCalendar } from "react-icons/ai";
import FormName from "../../components/form-name/form-name";
import { useNavigate } from "react-router-dom";
import Addbutton from "../../components/button/addbutton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  manageLeaveRequest,
  resetLeaveRequestSearch,
} from "../../data/Reducers/LeaveReducer";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../components/pagination/pagination";
import moment from "moment";
import ModalContainer, {
	PageLoader,
} from "../../components/modal-container/modal-container";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import { BsArrowRightShort } from "react-icons/bs";
import { RenderStatusCell } from "../../components/settings/setting_table";
import { ActionButton } from "../finance/invoice-setting";
import { getRandomArbitrary, reasons } from "./manage";

const MyRequest = () => {
	const navigate = useNavigate();
	let [loading, setLoading] = useState(false),
		{ leaveRequest, company, staff, auth } = useSelector(state => state),
		dispatch = useDispatch(),
		[isOpen, setIsOpen] = useState(false),
		[state, setState] = useState([]),
		[submit, setSubmit] = useState(null);

	useEffect(() => {
		dispatch(
			manageLeaveRequest(
				"get",
				{ createdBy: auth?.user?.profile?._id || auth?.user?._id },
				company?.currentSelected
			)
		);
		dispatch(resetLeaveRequestSearch());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth?.user]);

	let reset = () => {
		setSubmit(false);
		setIsOpen(false);
		setState([]);
		setIsEdit(null);
		setApp({ approver: "", level: "" });
		setActive(0);
	};

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
		else setData(leaveRequest?.my);
	}, [leaveRequest?.my, leaveRequest?.isFound, leaveRequest?.mainSearch]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range,
		[app, setApp] = useState({
			approver: "",
			level: "",
		});
	let [isEdit, setIsEdit] = useState(null),
		[active, setActive] = useState(0);

	useEffect(() => {
		if (isEdit) {
			setApp({ ...app, ...isEdit });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit]);

	if (!leaveRequest?.my && !data) return <PageLoader />;
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
				manageLeaveRequest(
					"get",
					{
						limit: data?.limit * data?.nextPage,
						createdBy: auth?.user?.profile?._id || auth?.user?._id,
					},
					company?.currentSelected
				)
			);
			setLoading(false);
		};

	const handleSubmit = async e => {
		e?.preventDefault();
		if (isOpen?.type === "update") if (state?.length === 0) return;
		setLoading("load");
		await dispatch(
			manageLeaveRequest(
				isOpen?.type === "delete" ? "delete" : "put",
				{ ...isOpen?.data, approvers: state?.map(i => i?.approver) },
				company?.currentSelected
			)
		);
		setLoading(false);
		setSubmit(true);
	};

	let randNumber = Math.floor(getRandomArbitrary(0, reasons?.length));

	// console.log({ randNumber });

	return (
		<div>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
				<div className="p-4 flex items-center justify-between">
					<p className="font-semibold">Leave Request</p>
					<p className="flex items-center gap-2 font-medium">
						{/* <Button
              buttonType={"secondary"}
              title={"Create Request"}
              icon={<AiTwotoneCalendar />}
              width={"w-fit"}
              onClick={() => navigate("/leave/create-leave")}
            /> */}
						<Addbutton
							background={"bg-secondary"}
							create={true}
							text={"Create Request"}
							onClick={() => navigate("/leave/create-leave")}
						/>
					</p>
				</div>
				{/* <MainRanger range={range} setRange={setRange} /> */}
				<MyLeaveRequestList currentItems={currentItems} setIsOpen={setIsOpen} />
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
				show={isOpen?.type === "update" ? true : false}
				title={"Edit Request Approvers"}
				close={() => setIsOpen(null)}>
				<div className="mx-20">
					{state?.length !== 0 && (
						<ApprovalList state={state} setIsEdit={setIsEdit} />
					)}
					<form className="space-y-4">
						{isEdit || active !== isOpen?.flow?.approvers?.length ? (
							<Input
								type={"select"}
								value={app?.approver}
								onChange={e => setApp({ ...app, approver: e.target.value })}
								name="reliever"
								options={staff?.all?.docs?.filter(ite => {
									let use =
										isEdit?.level?._id ||
										isOpen?.flow?.approvers?.[active]?._id;

									return use === ite?.level?._id;
								})}
								label={`Select ${
									isEdit?.level?.name || isOpen?.flow?.approvers?.[active]?.name
								} Approver`}
							/>
						) : null}
						{isEdit || isOpen?.flow?.approvers?.length !== state?.length ? (
							<div className="mt-8 flex justify-end">
								<button
									type="button"
									className="h-10 px-4 border border-gray-500 rounded-md text-md capitalize flex items-center gap-2"
									onClick={() => {
										if (!app?.approver) return;
										let newA = {
											...app,
											level: isEdit?.level || isOpen?.flow?.approvers?.[active],
											user: staff?.all?.docs?.find(
												it => it?._id === app?.approver
											),
											case: isEdit ? isEdit?.case : active,
										};
										setApp(newA);
										setState(
											isEdit
												? [
														...state?.map(ig =>
															ig?.case === isEdit?.case ? newA : ig
														),
												  ]
												: [...state, newA]
										);
										if (!isEdit)
											if (isOpen?.flow?.approvers?.length !== active)
												setActive(active + 1);
										setApp({ level: "", approver: "" });
										setIsEdit(null);
									}}>
									<span>
										<BsArrowRightShort />
									</span>
									Next{" "}
								</button>
							</div>
						) : null}
						{!isEdit &&
						isOpen?.flow?.approvers?.length === state?.length &&
						active === state?.length ? (
							<div className="mt-8 flex justify-end">
								<Button
									buttonType={"primary"}
									title={"Add"}
									width={"w-fit"}
									type="submit"
									loading={loading === "load"}
									onClick={handleSubmit}
								/>
							</div>
						) : null}
					</form>
				</div>
			</ModalContainer>
			<ModalContainer
				title={"Delete Request"}
				width={"max-w-sm"}
				show={isOpen?.type === "delete" ? true : false}
				close={() => setIsOpen(null)}>
				<div className="mx-20">
					<form className="space-y-4">
						<div className="my-auto w-100">
							<p className="text2 Lexend text-center">
								Do you want to delete this leave request?
							</p>
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
									onClick={() => setIsOpen(null)}
								/>
							</div>
						</div>
					</form>
				</div>
			</ModalContainer>
			<ModalContainer
				title={"View Request"}
				show={isOpen?.type === "view" ? true : false}
				close={() => setIsOpen(null)}>
				{/* {console.log({ da: isOpen?.data })} */}
				<form className="">
					<div className="flex items-center gap-2 justify-between border-y py-3">
						<p>Leave Type</p>
						<p>{isOpen?.data?.leaveType?.name}</p>
					</div>
					<div className="flex items-center gap-2 justify-between border-y py-3">
						<p>Justification</p>
						<p>{isOpen?.data?.justification}</p>
					</div>
					<div className="flex items-center gap-2 justify-between border-y py-3">
						<p>Reliever</p>
						<p>
							{isOpen?.data?.reliever?.profile?.lastName ||
								isOpen?.data?.reliever?.lastName}{" "}
							{isOpen?.data?.reliever?.profile?.firstName ||
								isOpen?.data?.reliever?.firstName}
						</p>
					</div>
					<div className="flex items-center gap-2 justify-between border-y py-3">
						<p>Approver(s)</p>
						<div className="">
							{isOpen?.data?.approvers?.map((it, i) => (
								<div className="" key={i}>
									<p>
										{it?.profile?.lastName || it?.lastName}{" "}
										{it?.profile?.firstName || it?.firstName}
									</p>
								</div>
							))}
						</div>
					</div>
					<div className="flex items-center gap-2 justify-between border-y py-3">
						<p>Next Approver</p>
						<p>
							{isOpen?.data?.nextApprover?.profile?.lastName ||
								isOpen?.data?.nextApprover?.lastName}{" "}
							{isOpen?.data?.nextApprover?.profile?.firstName ||
								isOpen?.data?.nextApprover?.firstName}
						</p>
					</div>
					<div className="flex items-center gap-2 justify-between border-y py-3">
						<p>Days</p>
						<p>
							{moment(isOpen?.data?.endDate).diff(
								moment(isOpen?.data?.startDate),
								"days"
							)}
						</p>
					</div>
					<div className="flex items-center gap-2 justify-between border-y py-3">
						<p>Date Created</p>
						<p>
							{moment(isOpen?.data?.createdAt).format("DD/MM/YYYY hh:mm A")}
						</p>
					</div>
					<div className="flex items-center gap-2 justify-between border-y py-3">
						<p>Status</p>
						<p className="">
							<span className="capitalize">{isOpen?.data?.status}</span>
							{["decline", "approve"]?.includes(isOpen?.data?.status)
								? "d"
								: ""}
						</p>
					</div>
					{isOpen?.data?.status === "decline" && (
						<>
							<div className="flex items-center gap-2 justify-between border-y py-3">
								<p>Reason</p>
								<p className="">
									<span className="capitalize">
										{reasons?.[randNumber]?.value}
									</span>
								</p>
							</div>
							<div className="flex items-center gap-2 justify-between border-y py-3">
								<p>Comment</p>
								<p className="">
									<span className="capitalize">
										{reasons?.[randNumber]?.description}
									</span>
								</p>
							</div>
						</>
					)}
				</form>
			</ModalContainer>
		</div>
	);
};

export default MyRequest;

export const ApprovalList = ({ state, setIsDelete, setIsEdit }) => {
	return (
		<div className="block mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow space-y-4">
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 border-b border-gray-200">
						<tr>
							<th scope="col" className="px-6 py-3 rounded-l-lg">
								Name
							</th>
							<th scope="col" className="px-6 py-3">
								Level
							</th>
							<th scope="col" className="px-6 py-3 rounded-r-lg">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{state?.map((it, i) => (
							<tr className="" key={i}>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{it?.user?.profile?.lastName || it?.user?.lastName}{" "}
									{it?.user?.profile?.firstName || it?.user?.lastName}
								</th>
								<td className="px-6 py-4">
									{it?.user?.profile?.level?.name || it?.user?.level?.name}
								</td>
								{setIsEdit || setIsDelete ? (
									<td key={i} className="px-6 py-4  w-[5%]">
										<div className="px-2 py-1 rounded-lg flex gap-2">
											{setIsEdit ? (
												<RenderStatusCell
													status="Update"
													onClick={() => setIsEdit(it)}
												/>
											) : null}
										</div>
									</td>
								) : null}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export const MyLeaveRequestList = ({ currentItems, setIsOpen }) => {
	return (
		<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
			<thead className="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" className="p-4">
						S/N
					</th>
					<th scope="col" className="px-6 py-3">
						Name
					</th>
					<th scope="col" className="px-6 py-3">
						Date Sent
					</th>
					<th scope="col" className="px-6 py-3">
						Leave Type
					</th>
					<th scope="col" className="px-6 py-3">
						From - To
					</th>
					<th scope="col" className="px-6 py-3">
						Days
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
					<tr
						className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
						key={i}>
						<td className="w-4 p-4">{i + 1}</td>
						<th
							scope="row"
							className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
							<FormName
								item={
									it?.createdBy?.profile?._id
										? it?.createdBy?.profile || it?.createdBy
										: it?.createdBy
								}
							/>
						</th>
						<td className="px-6 py-4">
							{moment(it?.createdAt).format("dddd Do, MMM")}
						</td>
						<td className="px-6 py-4">{it?.leaveType?.name}</td>
						<td className="px-6 py-4">
							{moment(it?.startDate).format("Do MMMM YYYY")} -{" "}
							{moment(it?.endDate).format("Do MMMM YYYY")}
						</td>
						<td className="px-6 py-4">
							{moment(it?.endDate).diff(moment(it?.startDate), "days")}
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
							<ActionButton
								each={it}
								view={() => {
									setIsOpen({
										type: "view",
										data: it,
									});
								}}
								remove={() => {
									setIsOpen({
										type: "delete",
										data: it,
									});
								}}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
