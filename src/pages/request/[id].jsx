import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../components/pagination/pagination";
import ModalContainer, {
	PageLoader,
} from "../../components/modal-container/modal-container";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import Addbutton from "../../components/button/addbutton";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { returnErrors } from "../../data/Reducers/ErrorReducer";
import { DeleteData, EditData } from "../../data/Reducers/UserReducer";
import { ApprovalRequest } from "../leave/create-leave";
import FormName from "../../components/form-name/form-name";
import moment from "moment";
import { RenderStatusCell } from "../../components/settings/setting_table";
import { GlobalState } from "../../data/Context";

const RequestDetails = () => {
	const location = useLocation();

	const item = location?.state;

	let [data, setData] = useState(null),
		[data2, setData2] = useState(null),
		dispatch = useDispatch(),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[isEdit, setIsEdit] = useState(null),
		[isOpen, setIsOpen] = useState(false),
		{ auth } = useSelector(state => state);

	const manageRequestList = async (type, datum) => {
		try {
			let res;

			if (type === "get") {
				let res = await axios.get(
					`/api/v1/requestForm?request=${location?.state?._id}&createdBy=${
						auth?.user?._id
					}&_populate=createdBy&_populate=createdBy.profile${
						datum?.limit ? `&_limit=${datum?.limit}` : ""
					}`
				);
				setData(res?.data?.data || res?.data);
				let res2 = await axios.get(
					`/api/v1/requestForm?request=${
						location?.state?._id
					}&_populate=createdBy&_populate=createdBy.profile${
						datum?.limit ? `&_limit=${datum?.limit}` : ""
					}`
				);
				setData2(res2?.data?.data || res2?.data);
			}
			if (type === "post") {
				res = await axios.post(`/api/v1/requestForm`, {
					...datum,
					request: location?.state?._id,
				});
				setSubmit(true);
				setData({
					...data,
					docs: [...data?.docs, res?.data?.data || res?.data],
				});
				manageRequestList("get", datum);
			}
			if (type === "put") {
				res = await axios.put(
					`/api/v1/requestForm/${datum?._id}?request=${location?.state?._id}`,
					{
						...datum,
					}
				);
				setSubmit(true);
				setData({
					...data,
					docs: EditData(data?.docs, res?.data?.data || res?.data),
				});
				manageRequestList("get", datum);
			}
			if (type === "delete") {
				res = await axios.delete(
					`/api/v1/requestForm/${datum?._id}?request=${location?.state?._id}`
				);
				setData({
					...data,
					docs: DeleteData(data?.docs, datum),
				});
			}
			if (type !== "get") {
				toast.success(res?.data?.message);
			}
		} catch (err) {
			if (err) console.log({ error: err.response?.data, err });
			if (err?.response?.status === 429) toast.error(err?.response?.data);
			if (type && type !== "get") {
				let error = err.response?.data?.error;
				if (error) {
					dispatch(returnErrors({ error, status: err?.response?.status }));
				} else {
					toast.error(err?.response?.data?.message);
				}
			}
		}
	};

	useEffect(() => {
		if (location?.state) {
			let getData = async () => {
				setLoading("getting");
				await manageRequestList("get", null);
				setLoading(null);
			};
			getData();
		} else setData(null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.state]);

	let [range] = useState(10),
		[page, setPage] = useState(1),
		{ canApprove, canAdmin } = useContext(GlobalState),
		[state, setState] = useState(null);

	let [admin, setAdmin] = useState(
		auth?.user?.isAdmin || canAdmin || canApprove
	);

	useEffect(() => {
		if (admin) setState(data2);
		else setState(data);
	}, [admin, data, data2]);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!state) return;

	const currentItems = state?.docs?.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(state?.docs?.length / range);

	const handlePageClick = event => {
			const newOffset = (event.selected * range) % state?.docs?.length;
			setItemOffset(newOffset);
			setPage(1 + event?.selected);
		},
		handleLoadMore = async () => {
			setLoading("loadmore");
			await dispatch(
				manageRequestList("get", { limit: state?.limit * state?.nextPage })
			);
			setLoading(false);
		};

	if (loading === "getting") return <PageLoader />;

	return (
		<div className="xl:mx-10  ">
			<div className="flex justify-between mt-5">
				{/* 
        <>
        {admin ?        <Button
          buttonType={"primary"}
          title={"My Requests"}
          width={"w-fit"}
          // icon={<MdAdd />}
          //   onClick={() => setCreateRequestState(true)}
        /> : 
        
        <Button
        buttonType={"primary"}
        title={"My Requests"}
        width={"w-fit"}
        // icon={<MdAdd />}
        //   onClick={() => setCreateRequestState(true)}
      />
        }
        </> */}

				{auth?.user?.isAdmin || canAdmin || canApprove ? (
					<Button
						buttonType={"primary"}
						title={
							!admin
								? `My ${location?.state?.name}`
								: `All Staff ${location?.state?.name}`
						}
						width={"w-fit"}
						// icon={<MdAdd />}
						onClick={() => setAdmin(!admin)}
					/>
				) : null}
				<p className="text-2xl text-[#1b1b1b] font-semibold">{item?.title}</p>
				{/* <Button
          buttonType={"primary"}
          title={item?.title}
          width={"w-fit"}
          // icon={<MdAdd />}
          //   onClick={() => setCreateRequestState(true)}
        /> */}
			</div>

			<div className="mt-5">
				<div className="flex justify-end">
					<Addbutton
						background={"bg-secondary"}
						text={"Create Request"}
						create={true}
						onClick={() => setIsOpen(true)}
					/>
				</div>
			</div>

			<div className=" shadow-md sm:rounded-lg mt-10">
				<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
					{/* <MainRanger range={range} setRange={setRange} /> */}
					<RequestTable
						currentItems={currentItems}
						admin={admin}
						setIsEdit={setIsEdit}
					/>
				</div>
			</div>
			<div className="mt-4 flex justify-center">
				<LoadMore
					next={page === pageCount && state?.hasNextPage}
					loading={loading === "loadmore"}
					handleLoadMore={handleLoadMore}
				/>
			</div>
			<div className="mt-4 flex justify-center">
				{/* <Pagination /> */}
				<MainPaginate pageCount={pageCount} handlePageClick={handlePageClick} />
			</div>

			<RequestModalComp
				isOpen={isOpen}
				toggle={() => setIsOpen(false)}
				title={`Create ${location?.state?.name}`}
				submit={submit}
				setSubmit={setSubmit}
				manageRequestList={manageRequestList}
			/>
			<ModalContainer
				title={`${isEdit?.type} request`}
				width={"max-w-sm"}
				show={isEdit ? true : false}
				close={() => setIsEdit(null)}>
				<div className="mx-20">
					<form className="space-y-4">
						<div className="my-auto w-100">
							<p className="text2 Lexend text-center">
								Do you want to {isEdit?.type} {isEdit?.data?.createdBy?.email}{" "}
								request?
							</p>
							<div className="pt-4 flex">
								<Button
									buttonType={"primary"}
									title={"Yes"}
									type="button"
									width={"w-fit me-2"}
									loading={loading === "load"}
									onClick={async e => {
										e?.preventDefault();
										setLoading("load");
										await manageRequestList("put", {
											...isEdit?.data,
											status: isEdit?.type + "d",
										});

										setLoading(false);
										setSubmit(true);
									}}
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

export default RequestDetails;

export const RequestModalComp = ({
	isOpen,
	toggle,
	title,
	submit,
	setSubmit,
	manageRequestList,
}) => {
	let [state2, setState2] = useState([]),
		[app, setApp] = useState({
			approver: "",
			level: "",
		});
	let [isEdit, setIsEdit] = useState(null),
		[active, setActive] = useState(0),
		[subActive, setSubActive] = useState(0),
		[loading, setLoading] = useState(false),
		[isOpen2, setIsOpen2] = useState(null),
		init = {
			title: "",
			description: "",
			amount: "",
		},
		[state, setState] = useState(init),
		textChange = e => {
			let { name, value } = e.target;
			setState({ ...state, [name]: value });
		},
		{ auth, leaveFlow } = useSelector(state => state);

	useEffect(() => {
		if (isEdit) {
			setApp({ ...app, ...isEdit });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit]);

	const handleSubmit = async e => {
		e?.preventDefault();
		if (!state?.title || !state?.description) return;
		let newS = state;
		delete newS?.days;
		if (state2?.length === 0) return toast.info("Please provider approver(s)");
		setLoading("load");
		await manageRequestList("post", {
			...newS,
			approvers: state2?.map(i => i?.approver),
		});
		setLoading(false);
	};

	let reset = () => {
		setSubmit(false);
		setState(init);
		setState2([]);
		setIsEdit(null);
		setApp({ approver: "", level: "" });
		setActive(0);
		setSubActive(0);
		toggle();
	};

	useEffect(() => {
		if (submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit]);

	return (
		<>
			<ModalContainer title={title} show={isOpen} close={toggle}>
				<div className="mx-20">
					<form className="space-y-4">
						{subActive !== 0 ? (
							<>
								<ApprovalRequest
									state2={state2}
									setIsEdit={setIsEdit}
									isEdit={isEdit}
									active={active}
									isOpen={isOpen2}
									app={app}
									setApp={setApp}
									setState2={setState2}
									setActive={setActive}
								/>
							</>
						) : (
							<>
								<Input
									label={"Request Name"}
									placeholder={"Enter Request Name"}
									value={state?.title}
									onChange={textChange}
									name="title"
								/>
								<Input
									label={"Request Description"}
									placeholder={"Request Description"}
									type={"textarea"}
									value={state?.description}
									onChange={textChange}
									name="description"
								/>
								<Input
									label={"Request Amount(optional)"}
									placeholder={"Enter Request Amount"}
									value={state?.amount}
									onChange={textChange}
									name="amount"
									min={0}
									type="number"
								/>
							</>
						)}

						<div className="mt-8 flex  justify-center">
							<Button
								buttonType={"primary"}
								title={subActive === 0 ? "Next" : "Submit"}
								width={"w-fit"}
								type={subActive === 0 ? "button" : "submit"}
								loading={loading === "load"}
								onClick={
									subActive === 0
										? e => {
												e?.preventDefault();
												if (!state?.title || !state?.description) return;
												if (!auth?.user?.profile?.level && !auth?.user?.level) {
													toast.info(
														"Please update your profile level to proceed"
													);
													return;
												}
												let findFlow = leaveFlow?.all?.docs?.find(
													da =>
														da?.level?._id ===
															auth?.user?.profile?.level?._id ||
														da?.level?._id === auth?.user?.level?._id
												);
												if (!findFlow) {
													toast.info(
														"Level Leave flow could not be determined, please try again later"
													);
													return;
												}
												setIsOpen2({
													type: "update",
													flow: findFlow,
												});
												setSubActive(1);
										  }
										: handleSubmit
								}
							/>
						</div>
					</form>
				</div>
			</ModalContainer>
		</>
	);
};

export const RequestTable = ({ currentItems, setIsEdit, admin }) => {
	return (
		<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
			<thead className="text-xs text-gray-700 captalize bg-gray-50">
				<tr>
					<th scope="col" className="px-6 py-3">
						Name
					</th>
					<th scope="col" className="px-6 py-3">
						Title
					</th>
					<th scope="col" className="px-6 py-3">
						Description
					</th>
					<th scope="col" className="px-6 py-3">
						Date
					</th>
					<th scope="col" className="px-6 py-3">
						{admin ? "Action" : "Status"}
					</th>
				</tr>
			</thead>
			<tbody>
				{currentItems?.map((it, i) => (
					<tr className="bg-white border-b text-xs" key={i}>
						<th
							scope="row"
							className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
							<FormName item={it?.createdBy?.profile} />
						</th>
						<td className="px-6 py-4">{it?.title}</td>
						<td className="px-6 py-4">
							{it?.description} {it?.reliever?.firstName}
						</td>
						<td className="px-6 py-4">
							{moment(it?.createdAt).format("Do MMMM YYYY")}
						</td>
						<td className="px-6 py-4">
							{admin ? (
								<div className="px-2 py-1 rounded-lg flex gap-2">
									<RenderStatusCell
										status={"Approve"}
										onClick={
											!setIsEdit
												? null
												: () => setIsEdit({ data: it, type: "Approve" })
										}
									/>
									<RenderStatusCell
										status={"Decline"}
										onClick={
											!setIsEdit
												? null
												: () => setIsEdit({ data: it, type: "Decline" })
										}
									/>
								</div>
							) : (
								<RenderStatusCell status={it?.status} />
							)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};