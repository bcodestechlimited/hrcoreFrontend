/* eslint-disable react/style-prop-object */
import React, { useState, useContext, useEffect, useRef } from "react";
// import FormName from "../../../components/form-name/form-name";

import ModalContainer, {
	PageLoader,
} from "../../../components/modal-container/modal-container";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import Addbutton from "../../../components/button/addbutton";

import { BadgeBorder } from "../../../components/badge/badge";
// import { toast } from "react-toastify";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../../components/pagination/pagination";
import Button from "../../../components/button/button";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/input/input";
import { manageVoucher } from "../../../data/Reducers/VoucherReducer";
import { GlobalState } from "../../../data/Context";
import { toWords } from "../../../App";
import Logo from "../../../assets/ICS Logo FA.png";
import Logo2 from "../../../assets/Cephas.png";
import { manageVoucherAccount } from "../../../data/Reducers/VoucherAccountReducer";

// import {
//   manageVoucher,
//   resetvoucherSearch,
// } from "../../../data/Reducers/VoucherReducer";

function Voucher() {
	const navigate = useNavigate();

	// const [downdata, setDowndata] = useState("second")

	const [seevoucher, setSeevoucher] = useState(false);

	const [isopen, setIsopen] = useState(false);
	const [isUpdate, setisUpdate] = useState(false);

	const [isDelete, setIsDelete] = useState(false);

	let [loading, setLoading] = useState(false),
		{ voucher, voucherCompanies, voucherAccount, auth } = useSelector(
			state => state
		),
		dispatch = useDispatch(),
		[submit, setSubmit] = useState(false),
		init = { receipient: "", currency: "NGN" },
		[state, setState] = useState(init),
		textChange = e => {
			let { name, value } = e?.target;
			setState({ ...state, [name]: value });
		},
		{ numberWithCommas, canApprove, canAdmin, canExecute } =
			useContext(GlobalState),
		mainVoucher = voucher?.all || voucher?.data,
		[selection, setSelection] = useState("total");

	const Arr = [
		{
			title: "total voucher",
			value:
				mainVoucher?.docs
					?.filter(ic => ic?.currency === "NGN")
					?.reduce?.((ac, i) => (ac += Number(i?.amount || 0)), 0) || 0,
			valueDollar:
				mainVoucher?.docs
					?.filter(ic => ic?.currency === "$")
					?.reduce?.((ac, i) => (ac += Number(i?.amount || 0)), 0) || 0,
			bg: "rgba(164, 41, 2, 0.10)",
			border: "0.5px solid #A42902",
			onClick: () => setSelection("total"),
		},
		{
			title: "Endorsed voucher",
			value:
				mainVoucher?.docs
					?.filter(el => el?.endorsed)
					?.filter(ic => ic?.currency === "NGN")
					?.reduce?.((ac, i) => (ac += Number(i?.amount || 0)), 0) || 0,
			valueDollar:
				mainVoucher?.docs
					?.filter(el => el?.endorsed)
					?.filter(ic => ic?.currency === "$")
					?.reduce?.((ac, i) => (ac += Number(i?.amount || 0)), 0) || 0,
			bg: "rgba(44, 120, 198, 0.10)",
			border: "0.5px solid #0080C4",
			onClick: () => setSelection("endorsed"),
		},
		{
			title: "Approved voucher",
			value:
				mainVoucher?.docs
					?.filter(el => el?.approved)
					?.filter(ic => ic?.currency === "NGN")
					?.reduce?.((ac, i) => (ac += Number(i?.amount || 0)), 0) || 0,
			valueDollar:
				mainVoucher?.docs
					?.filter(el => el?.approved)
					?.filter(ic => ic?.currency === "$")
					?.reduce?.((ac, i) => (ac += Number(i?.amount || 0)), 0) || 0,
			bg: "rgba(27, 136, 0, 0.10)",
			border: " 0.5px solid #1B8800",
			onClick: () => setSelection("approved"),
		},
	];

	useEffect(() => {
		dispatch(manageVoucher("get", null));
		dispatch(manageVoucher("get", { approved: "true" }));
		dispatch(manageVoucher("get", { endorsed: "true" }));
		dispatch(manageVoucherAccount("get", null));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1),
		[updater, setUpdater] = useState(null),
		[privi, setPrivi] = useState(null);

	useEffect(() => {
		setPrivi(canAdmin || canApprove || auth?.user?.isAdmin);
	}, [canAdmin, canApprove, auth?.user]);

	useEffect(() => {
		if (selection === "approved") {
			setData(voucher?.approved);
		} else if (selection === "endorsed") {
			setData(voucher?.endorsed);
		} else setData(voucher?.data);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [voucher?.data, selection, voucher?.approved, voucher?.endorsed]);

	let reset = () => {
		setisUpdate(null);
		setIsDelete(null);
		setSubmit(false);
		setIsopen(false);
		setSeevoucher(null);
	};

	useEffect(() => {
		if (state?.amount) {
			setState({
				...state,
				wordAmount: toWords?.convert(state?.amount, {
					currency: true,
					ignoreDecimal: false,
					ignoreZeroCurrency: false,
					doNotAddOnly: false,
					currencyOptions: {
						// can be used to override defaults for the selected locale
						name:
							state?.currency === "$"
								? "Dollar"
								: state?.currency === "NGN"
								? "Naira"
								: "",
						plural:
							state?.currency === "$"
								? "Dollar"
								: state?.currency === "NGN"
								? "Naira"
								: "",
						symbol:
							state?.currency === "$"
								? "$"
								: state?.currency === "NGN"
								? "₦"
								: "",
						fractionalUnit: {
							name:
								state?.currency === "$"
									? "cent"
									: state?.currency === "NGN"
									? "kobo"
									: "",
							plural:
								state?.currency === "$"
									? "cent"
									: state?.currency === "NGN"
									? "kobo"
									: "",
							symbol:
								state?.currency === "$"
									? ""
									: state?.currency === "NGN"
									? "k"
									: "",
						},
					},
				}),
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.amount, state?.currency]);

	const handleSubmit = async e => {
		e?.preventDefault();
		console.log({ state });
		// if (!isDelete)
		// if (
		// 	!state?.receipient ||
		// 	!state?.payingBank ||
		// 	!state?.amount ||
		// 	!state?.wordAmount ||
		// 	!state?.currency
		// )
		// 	return toast.info(
		// 		"Please include currency/amount/Paying Bank/Recipient"
		// 	);

		let newState = {
			...isUpdate,
			...state,
			_id: isUpdate?._id || state?._id,
			id: isUpdate?._id || state?._id,
		};
		delete newState.endorsed;
		delete newState.approved;
		setLoading(true);
		await dispatch(
			manageVoucher(
				isDelete ? "delete" : isUpdate ? "put" : "post",
				isDelete ? isDelete : newState,
				isDelete?._id || isUpdate?._id || state?._id
			)
		);
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (isUpdate) {
			setState({
				...isUpdate,
				payingBank: isUpdate?.payingBank?._id,
				receipient: isUpdate?.receipient?._id,
			});
			setIsopen(true);
		}
	}, [isUpdate]);

	useEffect(() => {
		if (voucher?.isAdded && submit) {
			reset();
		}
		if (voucher?.isUpdated && submit) {
			reset();
		}
		if (voucher?.isDeleted && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [voucher?.isAdded, submit, voucher?.isAdded, voucher?.isAdded]);

	let ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		documentTitle: `HRCORE-${seevoucher?.number || ""}-${moment(
			seevoucher?.createdAt
		).format("dddd, L")}`,
		bodyClass: "p-2",
	});

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	let voucherCompany = voucherCompanies?.all || voucherCompanies?.data,
		voucherAcc = voucherAccount?.all || voucherAccount?.data;

	if (!voucherAcc && !voucherCompany) return <PageLoader />;
	if (!voucher?.data && !data) return <PageLoader />;
	if (!data) return;

	const currentItems = process.env.REACT_APP_NAME
		? data?.docs?.slice(itemOffset, endOffset)
		: data?.docs;
	const pageCount = Math.ceil(data?.docs?.length / range);

	const handlePageClick = event => {
			const newOffset = (event.selected * range) % data?.docs?.length;
			setItemOffset(newOffset);
			setPage(1 + event?.selected);
		},
		handleLoadMore = async () => {
			setLoading("loadmore");
			let dd = { limit: data?.limit * data?.nextPage };
			if (selection === "approved") dd.approved = "true";
			if (selection === "endorsed") dd.endorsed = "true";
			await dispatch(manageVoucher("get", dd));
			setLoading(false);
		},
		updateSubmit = async e => {
			e?.preventDefault();
			if (!updater) return;
			setLoading(updater?.type);
			if (updater?.type?.includes("/all")) {
				await dispatch(manageVoucher(updater?.type));
			} else {
				for (let v = 0; v < updater?.vouchers.length; v++) {
					let element = updater?.vouchers[v];
					await dispatch(manageVoucher(updater?.type, element));
				}
			}
			setLoading(null);
			setUpdater(null);
		};

	// const InvoiceGeneratorHeader = ({ title, datavalue }) => {
	// 	return (
	// 		<div className="bg bg-white    w-full  2xl:w-[270px] rounded-xl py-5 h-[150px] shadow-xl p-4 cursor-pointer mb-5">
	// 			<div className="bg-white  text-base 2xl:text-[2rem] w-full  text-center lg:py-7 lg:px-6  py-5 px-3  2xl:py-16 2xl:px-10">
	// 				<p className=" font-semibold   2xl:mb-2 text-base "> {title}</p>
	// 				<div className="bg-[#EAEAEA] py-1 border rounded mt-1 2xl:py-4 lg:py-2 lg:px-4 font-semibold  text-base">
	// 					<p className=""> {datavalue}</p>{" "}
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// };

	return (
		<div>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
				{privi ? (
					<div className="p-6 flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div
								className=""
								onClick={() => navigate("/finance/company-voucher")}>
								<Button buttonType={"primary"} title={"Manage companies"} />
							</div>
							<div
								className=""
								onClick={() => navigate("/finance/bank-voucher")}>
								<Button buttonType={"secondary"} title={"Add Bank"} />
							</div>
						</div>

						<p className="flex items-center gap-2 font-medium">
							{/* <Button
              buttonType={"secondary"}
              title={"Create Request"}
              icon={<AiTwotoneCalendar />}
              width={"w-fit"}
              onClick={() => navigate("/leave/create-leave")}
            /> */}
							<Addbutton
								background={"bg-[#2C78C6]"}
								create={true}
								text={"Create"}
								onClick={() => setIsopen(true)}
							/>
						</p>
					</div>
				) : null}
				<div className="w-5/6 bg-white p-6 rounded-xl">
					<div className="grid lg:grid-cols-3 gap-5">
						{Arr.map(item => (
							<div
								style={{
									border: item.border,
									background: item.bg,
								}}
								onClick={item?.onClick}
								className="min-h-20 rounded-xl p-4 cursor-pointer">
								<h2 className="text-xs manrope font-medium capitalize text-black">
									{item.title}
								</h2>
								<h3 className="text-2xl font-semibold manrope text-black pt-1">
									NGN {numberWithCommas(Number(item.value).toFixed(2))}
								</h3>
								<h4 className="text-xl font-semibold manrope text-black pt-1">
									$ {numberWithCommas(Number(item.valueDollar).toFixed(2))}
								</h4>
							</div>
						))}
					</div>
				</div>
				<div className="p-6 flex justify-between items-center">
					{/* <MainRanger range={range} setRange={setRange} /> */}
					<div></div>
					<div className="flex">
						{data?.docs?.some?.(ic => ic?.isChecked) ? (
							<>
								{canExecute && (
									<Button
										buttonType={"secondary"}
										title={"Endorse"}
										type="button"
										width={"w-fit me-2"}
										loading={loading === "endorse"}
										onClick={() =>
											setUpdater({
												type: "endorse",
												vouchers: data?.docs?.filter(iz => iz?.isChecked),
											})
										}
									/>
								)}
								{canApprove && (
									<Button
										buttonType={"primary"}
										title={"Approve All"}
										type="button"
										width={"w-fit mx-2"}
										loading={loading === "approve"}
										onClick={() =>
											setUpdater({
												type: "approve",
												vouchers: data?.docs?.filter(iz => iz?.isChecked),
											})
										}
									/>
								)}
							</>
						) : (
							<>
								{canExecute && (
									<Button
										buttonType={"secondary"}
										title={"Endorse All"}
										type="button"
										width={"w-fit me-2"}
										loading={loading === "endorse/all"}
										onClick={() =>
											setUpdater({
												type: "endorse/all",
											})
										}
									/>
								)}
								{canApprove && (
									<Button
										buttonType={"primary"}
										title={"Approve All"}
										type="button"
										width={"w-fit mx-2"}
										loading={loading === "approve/all"}
										onClick={() =>
											setUpdater({
												type: "approve/all",
											})
										}
									/>
								)}
							</>
						)}
					</div>
				</div>

				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="p-4">
								<div className="flex items-center">
									<input
										type="checkbox"
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
										onChange={e => {
											let dd = data?.docs;
											dd = dd?.map(ic => {
												let dc = ic;
												return { ...dc, isChecked: e?.target?.checked };
											});
											setData({ ...data, docs: dd });
										}}
										checked={
											data?.docs?.length > 0 &&
											data?.docs?.every(it => it?.isChecked)
										}
									/>
									<label for="checkbox-all-search" className="sr-only">
										checkbox
									</label>
								</div>
							</th>
							<th scope="col" className="p-4 ">
								Voucher No
							</th>
							<th scope="col" className="px-6 py-3">
								Company
							</th>
							<th scope="col" className="px-6 py-3">
								Paying Bank
							</th>
							<th scope="col" className="px-6 py-3">
								Description
							</th>
							<th scope="col" className="px-6 py-3">
								Amount
							</th>
							<th scope="col" className="px-6 py-3">
								Amount in words
							</th>

							<th scope="col" className="px-6 py-3">
								Date created
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
								<td className="w-4 p-4">
									<div className="flex items-center">
										<input
											type="checkbox"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
											onChange={e => {
												let dd = data?.docs;
												let current = it;
												if (e?.target?.checked) {
													current = {
														...current,
														isChecked: true,
													};
												} else {
													current = {
														...current,
														isChecked: false,
													};
												}
												dd = dd?.map(ic =>
													ic?._id === it?._id ? current : ic
												);
												setData({ ...data, docs: dd });
											}}
											checked={it?.isChecked}
										/>
										<label for="checkbox-all-search" className="sr-only">
											checkbox
										</label>
									</div>
								</td>
								<td className="w-4 p-4">{it?.number}</td>
								<td className="px-6 py-4">{it?.receipient?.name}</td>
								<td className="px-6 py-4">{it?.payingBank?.bankName}</td>
								<td className="px-6 py-4 textTrunc">{it?.description}</td>
								<td className="px-6 py-4">
									{it?.currency}
									{numberWithCommas(Number(it?.amount).toFixed(2))}
								</td>
								<td className="px-6 py-4 textTrunc">{it?.wordAmount}</td>
								<td className="px-6 py-4">
									{moment(it?.createdAt).format("dddd Do, MMM")}
								</td>

								<td className="px-6 py-4">
									<div className="cursor-pointer">
										<BadgeBorder
											type={it?.approved ? 1 : 3}
											text={
												it?.approved
													? "Approved"
													: it?.endorsed
													? "Pending Approval"
													: "Pending Endorsement"
											}
										/>
									</div>
								</td>
								<td className="px-6 py-4 cursor-pointer">
									<span onClick={() => setSeevoucher(it)}> View Voucher</span>
								</td>

								{/* <td className="px-6 py-4">
                  <Option type={"horizontal"}>
                    <ul className="">
                      <li>
                        <IconContext.Provider value={{ color: "#2A72A8" }}>
                          <AiFillDelete size={20} />
                        </IconContext.Provider>
                      </li>
                    </ul>
                  </Option>
                </td> */}
							</tr>
						))}
					</tbody>
				</table>
				<div
					className={`mt-4 flex justify-center ${
						!process.env.REACT_APP_NAME ? "mb-4" : ""
					}`}>
					<LoadMore
						next={
							process.env.REACT_APP_NAME
								? page === pageCount && data?.hasNextPage
								: data?.hasNextPage
						}
						loading={loading === "loadmore"}
						handleLoadMore={handleLoadMore}
					/>
				</div>
				{process.env.REACT_APP_NAME && (
					<div className="mt-4 flex justify-center">
						{/* <Pagination /> */}
						<MainPaginate
							pageCount={pageCount}
							handlePageClick={handlePageClick}
						/>
					</div>
				)}
			</div>

			<ModalContainer
				title={`Delete Voucher
				`}
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
			<ModalContainer
				title={`${updater?.type?.replace("/", " ")?.toUpperCase() || ""} Voucher
				`}
				width={"max-w-sm"}
				show={updater ? true : false}
				close={() => setIsDelete(null)}>
				<div className="mx-20">
					<form className="space-y-4">
						<div className="my-auto w-100">
							<p className="text2 Lexend text-center">
								Do you want to {updater?.type?.replace("/", " ")}{" "}
								{updater?.type?.includes("/all") ? null : (
									<>all {updater?.vouchers?.length} selection(s)</>
								)}
								?
							</p>
							<div className="pt-4 flex">
								<Button
									buttonType={"primary"}
									title={"Yes"}
									type="button"
									width={"w-fit me-2"}
									loading={loading}
									onClick={updateSubmit}
								/>
								<Button
									buttonType={"secondary"}
									title={"No"}
									type="button"
									width={"w-fit ms-2"}
									onClick={() => setUpdater(null)}
									disabled={loading}
								/>
							</div>
						</div>
					</form>
				</div>
			</ModalContainer>

			<ModalContainer
				title={isUpdate ? "Update Voucher" : "CREATE VOUCHER"}
				width={"max-w-xl  overflow-y-scroll"}
				show={isopen ? true : false}
				close={() => setIsopen(false)}>
				<div className="mx-20">
					{/* <form className="space-y-4 debug"> */}
					<form className="">
						{/* <div className="my-auto  w-full debug"> */}
						<div>
							{/* <Input label={"Date created"} type={"date"} name="endDate" /> */}
							{/* <Input
								label={"Voucher No  "}
								placeholder={"001"}
								name="number"
								onChange={textChange}
								value={state?.number}
								// options={leaveType?.all?.docs?.filter(item => item?.name)}
							/> */}
							{/* <Input
								label={"Admin"}
								placeholder={"Account manager"}
								name="admin"
								onChange={textChange}
								value={state?.admin}
								// options={leaveType?.all?.docs?.filter(item => item?.name)}
							/>{" "} */}
							<Input
								value={state?.receipient}
								options={voucherCompany?.docs?.filter(item => item?.name)}
								label={"Recipient"}
								type={"select"}
								name="receipient"
								onChange={textChange}
								style="mb-3"
							/>
							<Input
								style="mb-3"
								value={state?.payingBank}
								options={voucherAcc?.docs?.filter(item => item?.bankName)}
								label={" Paying Bank"}
								type={"select"}
								name="payingBank"
								onChange={textChange}
							/>
							<Input
								label={"Cheque No"}
								placeholder={"001"}
								name="checkNumber"
								onChange={textChange}
								value={state?.checkNumber}
								style="mb-3"
							/>{" "}
							<Input
								onChange={textChange}
								value={state?.currency}
								options={[{ value: "NGN" }, { value: "$" }]}
								name="currency"
								label={" Currency"}
								type={"select"}
								style="mb-3"
							/>
							<Input
								label={"Amount"}
								placeholder={"5000"}
								name="amount"
								onChange={textChange}
								value={state?.amount}
								type="number"
								min={0}
								style="mb-3"
							/>{" "}
							<Input
								label={"Amount in Words"}
								placeholder={"Five Thousand naira only"}
								name="wordAmount"
								onChange={textChange}
								value={state?.wordAmount}
								style="mb-3"
								readOnly
							/>{" "}
							{/* <Input
								label={"MESSAGE"}
								placeholder={"Write a message"}
								name="message"
								type="textarea"
								style="mb-3"
								onChange={textChange}
								value={state?.message}
								// options={leaveType?.all?.docs?.filter(item => item?.name)}
							/> */}
							<Input
								type="textarea"
								label={"Remark"}
								placeholder={"Description"}
								name="description"
								onChange={textChange}
								style="mb-3"
								value={state?.description}
								// options={leaveType?.all?.docs?.filter(item => item?.name)}
							/>
							<div className="pt-4 flex justify-center">
								<Button
									buttonType={"primary"}
									title={isUpdate ? "Update" : "CREATE"}
									type="button"
									width={"w-fit me-2"}
									loading={loading}
									onClick={handleSubmit}
								/>
								{/* <Button
                  buttonType={"secondary"}
                  title={"No"}
                  type="button"
                  width={"w-fit ms-2"}
                  // onClick={() => setDelete(null)}
                /> */}
							</div>
						</div>
					</form>
				</div>
			</ModalContainer>

			<ModalContainer
				title={""}
				width={"max-w-3xl  overflow-y-scroll"}
				show={seevoucher ? true : false}
				close={() => setSeevoucher(false)}>
				{/* <div className="w-full" ref={ref}>
					<img
						alt=""
						className="w-full "
						src={require("../../../assets/Group 482228.png")}
					/>
					<div className="bg-white w-[95%]  m-auto">
						<div>
							<div className="flex justify-between  items-center">
								<p className="font-bold  text-[28px]">PAYMENT VOUCHER</p>
								<p className=" font-normal  text-base">
									Voucher No: {seevoucher?.number}
								</p>
							</div>
						</div>

						<div className="bg-white page-break">
							<div className="flex justify-between  mt-10">
								<div>
									<p className=" font-normal  text-[13px]">Recipient</p>
									<p className=" font-normal  text-[13px]">
										Name: {seevoucher?.receipient?.name}
									</p>
									<p className=" font-normal  text-[13px]">
										E-mail: {seevoucher?.receipient?.email}
									</p>
									<p className=" font-normal  text-[13px]">
										Address: {seevoucher?.receipient?.address}
									</p>
								</div>

								<div>
									<p className=" font-normal  text-[13px]">Date:</p>
									<p className=" font-normal  text-[13px]">
										{moment(seevoucher?.createdAt).format("DD/MM/YYYY hh:mm A")}
									</p>
								</div>
							</div>

							<div className="flex justify-between mt-10">
								<div>
									<p className=" font-normal  text-[13px]">
										Cheque No: #{seevoucher?.checkNumber}
									</p>
									<p className=" font-normal  text-[13px]">
										Amount: {seevoucher?.currency}{" "}
										{numberWithCommas(Number(seevoucher?.amount).toFixed(2))}
									</p>
									<p className=" font-normal  text-[13px]">
										Amount in words: {seevoucher?.wordAmount}
									</p>
								</div>

								<div>
									<p className=" font-normal  text-[13px]">
										Paying bank: {seevoucher?.payingBank?.bankName}
									</p>
								</div>
							</div>
						</div>
						<div className="mt-10 page-break">
							<p className=" font-bold text-xl">MESSAGE</p>
							<p>{seevoucher?.message}</p>
						</div>

						<div className="mt-10 page-break">
							<p className=" font-bold text-xl text-[#407BFF]">REMARKS:</p>
							<p>{seevoucher?.description}</p>
						</div>
						<div className="mt-10 page-break">
							{seevoucher?.createdBy && (
								<>
									<p className=" font-bold text-xl">Processed by:</p>
									<p>
										{seevoucher?.createdBy?.lastName ||
											seevoucher?.createdBy?.profile?.lastName}{" "}
										{seevoucher?.createdBy?.firstName ||
											seevoucher?.createdBy?.profile?.firstName}
									</p>
								</>
							)}
							{seevoucher?.endorsedBy && (
								<>
									<p className=" font-bold text-xl">Endorsed by:</p>
									<p>
										{seevoucher?.endorsedBy?.lastName ||
											seevoucher?.endorsedBy?.profile?.lastName}{" "}
										{seevoucher?.endorsedBy?.firstName ||
											seevoucher?.endorsedBy?.profile?.firstName}
									</p>
								</>
							)}
							{seevoucher?.approvedBy && (
								<>
									<p className=" font-bold text-xl">Approved by:</p>
									<p>
										{seevoucher?.approvedBy?.lastName ||
											seevoucher?.approvedBy?.profile?.lastName}{" "}
										{seevoucher?.approvedBy?.firstName ||
											seevoucher?.approvedBy?.profile?.firstName}
									</p>
								</>
							)}
						</div>
					</div>
				</div> */}
				<section
					ref={ref}
					className="w-full printOnly bg-white printPage border rounded-md p-3">
					<div className="flex items-center">
						<img
							src={process.env.REACT_APP_NAME ? Logo2 : Logo}
							alt=""
							className="h-32 pe-3"
						/>
						<p className="text-lg font-semibold py-0 my-0">Payment Voucher</p>
					</div>
					<hr className="my-4" />
					<div className="flex items-center justify-between">
						<p className=" font-normal  text-base">
							Voucher No:{" "}
							<span className="font-semibold">{seevoucher?.number}</span>
						</p>
						<div className="flex items-center">
							<p className=" font-semibold">Date Raised: </p>
							<p className=" font-normal">
								{moment(seevoucher?.createdAt).format("DD/MM/YYYY")}
							</p>
						</div>
					</div>
					<div>
						<p className=" font-normal">Recipient</p>
						<p className=" font-bold text-md uppercase">
							{seevoucher?.receipient?.name}
						</p>
						<p className=" font-semibold">{seevoucher?.receipient?.email}</p>
						<p className=" font-semibold">{seevoucher?.receipient?.address}</p>
					</div>
					<div className="py-10">
						<table className="w-full text-sm text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-[#013468] text-center uppercase whitespace-nowrap bg-gray-50">
								<tr className="">
									<th scope="col" className="px-2 py-3 text-xs">
										Cheque No
									</th>

									<th scope="col" className="px-6 py-3 text-xs">
										Amount
									</th>
									<th scope="col" className="px-6 py-3 text-xs">
										Amount in Words
									</th>
									<th scope="col" className="px-6 py-3 text-xs">
										Description
									</th>
									<th scope="col" className="px-6 py-3 text-xs">
										Paying Bank
									</th>
								</tr>
							</thead>
							<tbody className="">
								<tr className="font-medium bg-white border-b manrope text-xs text-[#3C495E]">
									<td className="px-6 py-4 text-center">
										{seevoucher?.checkNumber}
									</td>
									<td className="px-6 py-4 text-center">
										{seevoucher?.currency}{" "}
										{numberWithCommas(Number(seevoucher?.amount).toFixed(2))}
									</td>
									<td className="px-6 py-4 text-center">
										{seevoucher?.wordAmount}
									</td>
									<td className="px-6 py-4 text-center">
										{seevoucher?.description}
									</td>
									<td className="px-6 py-4 text-center">
										{seevoucher?.payingBank?.bankName}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="py-5">
						{seevoucher?.createdBy && (
							<div className="flex items-center">
								<p className=" font-semibold">Processed by: </p>
								<p className=" font-normal">
									{seevoucher?.createdBy?.lastName ||
										seevoucher?.createdBy?.profile?.lastName}{" "}
									{seevoucher?.createdBy?.firstName ||
										seevoucher?.createdBy?.profile?.firstName}
								</p>
							</div>
						)}
						{seevoucher?.updatedBy && (
							<div className="items-center hidden">
								<p className=" font-semibold">Edited by: </p>
								<p className=" font-normal">
									{seevoucher?.updatedBy?.lastName ||
										seevoucher?.updatedBy?.profile?.lastName}{" "}
									{seevoucher?.updatedBy?.firstName ||
										seevoucher?.updatedBy?.profile?.firstName}{" "}
									({moment(seevoucher?.updatedAt).format("DD/MM/YYYY")})
								</p>
							</div>
						)}
						{seevoucher?.endorsedBy && (
							<div className="flex items-center">
								<p className=" font-semibold">Endorsed by: </p>
								<p className=" font-normal">
									{seevoucher?.endorsedBy?.lastName ||
										seevoucher?.endorsedBy?.profile?.lastName}{" "}
									{seevoucher?.endorsedBy?.firstName ||
										seevoucher?.endorsedBy?.profile?.firstName}
								</p>
							</div>
						)}
						{seevoucher?.approvedBy && (
							<div className="flex items-center">
								<p className=" font-semibold">Approved by: </p>
								<p className=" font-normal">
									{seevoucher?.approvedBy?.lastName ||
										seevoucher?.approvedBy?.profile?.lastName}{" "}
									{seevoucher?.approvedBy?.firstName ||
										seevoucher?.approvedBy?.profile?.firstName}
								</p>
							</div>
						)}
					</div>
				</section>
				<div className="pt-4 flex justify-between">
					<Button
						buttonType={"primary"}
						title={"PRINT"}
						type="button"
						width={"w-fit me-2"}
						// loading={loading}
						// onClick={handleSubmit}
						onClick={handlePrint}
					/>
					<div className="flex">
						{canExecute && !seevoucher?.endorsedBy && (
							<Button
								buttonType={"secondary"}
								title={"Endorse"}
								type="button"
								width={"w-fit me-2"}
								loading={loading === "endorse"}
								onClick={async () => {
									setLoading("endorse");
									await dispatch(manageVoucher("endorse", seevoucher));
									setLoading(false);
									setSubmit(true);
								}}
							/>
						)}
						{canApprove && !seevoucher?.approved && (
							<Button
								buttonType={"primary"}
								title={"Approve"}
								type="button"
								width={"w-fit mx-2"}
								loading={loading === "approve"}
								onClick={async () => {
									setLoading("approve");
									await dispatch(manageVoucher("approve", seevoucher));
									setLoading(false);
									setSubmit(true);
								}}
							/>
						)}
						{privi ? (
							<>
								<Button
									buttonType={"secondary"}
									title={"EDIT"}
									type="button"
									width={"w-fit mx-2"}
									onClick={() => {
										setisUpdate(seevoucher);
										setSeevoucher(null);
									}}
								/>
								<Button
									buttonType={"primary"}
									title={"DELETE"}
									type="button"
									width={"w-fit ms-2"}
									onClick={() => {
										setIsDelete(seevoucher);
										setSeevoucher(null);
									}}
								/>
							</>
						) : null}
					</div>
				</div>
			</ModalContainer>
		</div>
	);
}

export default Voucher;
