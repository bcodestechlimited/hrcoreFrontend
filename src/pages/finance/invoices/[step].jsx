import React, { useEffect, useState, useContext, useRef } from "react";
// import { BsArrowRightShort } from "react-icons/bs";
// import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { GlobalState } from "../../../data/Context";
import { useReactToPrint } from "react-to-print";
// import { NonAuthHeader } from "../../../screens/login";
import Address from "../../../assets/address.svg";
import EmailIcon from "../../../assets/email.svg";
import PhoneIcon from "../../../assets/phone.svg";
import Logo from "../../../assets/ICS Logo FA.png";
import Logo2 from "../../../assets/Cephas.png";

function Details() {
	const { step } = useParams(),
		{ invoice } = useSelector(state => state),
		{ numberWithCommas } = useContext(GlobalState),
		[state, setState] = useState(null),
		[vat, setVat] = useState(0),
		[total, setTotal] = useState(0),
		[headerArr, setHeaderArr] = useState([]);

	useEffect(() => {
		invoice?.all?.docs?.map(item => item?._id === step && setState(item));
	}, [step, invoice]);

	useEffect(() => {
		if (state) {
			setTotal(
				state?.items?.reduce((ac, i) => (ac += i?.price * i?.quantity), 0)
			);
			setVat(
				state?.items?.reduce((ac, i) => (ac += i?.price * i?.quantity), 0) *
					(7.5 / 100)
			);
			setHeaderArr(state?.items?.[0]?.fields?.map(item => item?.header));
		}
	}, [state]);

	let ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		documentTitle: `HRCORE-${state?.invoiceId || ""}-${moment(
			state?.createdAt
		).format("dddd, L")}`,
		bodyClass: "p-2",
	});

	if (!state) return;
	console.log({ state, headerArr });
	return (
		<div>
			<div className="flex justify-center font-normal text-[13px]">
				<div className="w-[90%]  xl:w-[80%] 2xl:bg-black 2xl:w-[65%]">
					<div className=" border rounded-lg px-5 py-5 bg-white">
						<div className="" ref={ref}>
							<div className="printOnly">
								{/* <NonAuthHeader
									img={
										"https://www.icsoutsourcing.com/wp-content/uploads/2023/05/fav-1.png"
									}
								/> */}
								<div className="bg-white border-b py-8 px-6 flex justify-between w-full items-center">
									<div>
										<h2 className="font-medium poppins text-3xl text-black">
											ICS OUTSOURCING
										</h2>
										<div className="mt-4 space-y-2">
											<div className="flex gap-2 items-center">
												<img src={Address} alt="" className="" />
												<p className="text-base poppins font-medium">
													6, Olusoji Idowu Street, Ilupeju, Lagos
												</p>
											</div>
											<div className="flex gap-2 items-center">
												<img src={EmailIcon} alt="" className="" />
												<p className="text-base poppins font-medium">
													enquiries@icsoutsourcing.com
												</p>
											</div>
											<div className="flex gap-2 items-center">
												<img src={PhoneIcon} alt="" className="" />
												<p className="text-base poppins font-medium">
													09087222874, 01-2801547
												</p>
											</div>
										</div>
									</div>
									<div>
										<img
											src={process.env.REACT_APP_NAME ? Logo2 : Logo}
											alt=""
											className=""
										/>
									</div>
								</div>
								<hr />
							</div>
							{/* <div className="flex items-center cursor-pointer ml-2">
								<span onClick={() => navigate(-1)}>Invoices</span>

								<MdOutlineKeyboardArrowRight />

								<span>Details</span>
							</div> */}
							<div className="mb-10">
								<div className="flex justify-between items-center">
									<p className="text-[28px]">Due Date:</p>

									<p>Invoice ID # {state?.invoiceId}</p>
								</div>

								<div className=" lg:text-[28px]">
									<p>
										{moment(state?.dueDate)
											.subtract(1, "hour")
											.format("YYYY-MM-DD hh:mm:ss A")}
									</p>
								</div>
							</div>

							<div className="flex justify-between mb-10">
								<div className="flex flex-col  gap-1">
									<p>Billed To:</p>
									<p>{state?.contacts?.[0]?.bankName}</p>
									<p>E-mail: {state?.contacts?.[0]?.email}</p>
									<p>Address: {state?.contacts?.[0]?.address}</p>
								</div>

								<div className="text-right flex flex-col  gap-1">
									<p>Date:</p>
									<p>
										{moment(state?.createdAt)
											.subtract(1, "hour")
											.format("YYYY-MM-DD hh:mm:ss A")}
									</p>
								</div>
							</div>

							<div className="flex flex-col  gap-1 mb-10">
								<p>Account Details:</p>
								<p>Bank: {state?.accounts?.[0]?.bankName}</p>
								<p>Account Number: {state?.accounts?.[0]?.bankAccountNumber}</p>
								<p>Account Name:{state?.accounts?.[0]?.bankAccountName}</p>
								<p>Sort Code:{state?.accounts?.[0]?.accountsortName}</p>
								<p>TIN: {state?.accounts?.[0]?.bankTIN}</p>
							</div>

							<div className="invoiceSummary bg-white rounded py-5 pl-5 pr-2">
								<h2 className="text-[20px]">Invoice summary</h2>

								<div className="tablehead flex w-full  font-medium py-3 border-y">
									<span className=" w-[40%] ">Name</span>
									{headerArr?.map((it, x) => (
										<span className=" w-[20%] text-center" key={x}>
											{" "}
											{it}
										</span>
									))}
									<span className=" w-[20%] text-center"> Price</span>
									<span className=" w-[20%] text-center">Quantity</span>
									<span className=" w-[20%] text-right">Total</span>
								</div>

								{state?.items?.map(item => (
									<div className="tablehead flex w-full  py-3 border-y">
										<span className=" w-[40%] capitalize">{item?.name}</span>
										{headerArr?.map((it, x) => (
											<span className=" w-[20%] text-center" key={x}>
												{item?.fields?.find(ti => ti?.header === it)?.value}
											</span>
										))}
										<span className=" w-[20%] text-center">
											₦ {numberWithCommas(Number(item?.price || 0).toFixed(2))}
										</span>
										<span className=" w-[20%] text-center">
											{numberWithCommas(Number(item?.quantity || 0).toFixed(0))}
										</span>
										<span className=" w-[20%] text-right">
											₦
											{`${numberWithCommas(
												Number(
													Number(item?.price) * Number(item?.quantity)
												).toFixed(2)
											)}`}
										</span>
									</div>
								))}

								<div className="TotalSummary flex justify-end  border-y py-3">
									<div className="flex flex-col  w-[20%] gap-1 text-center">
										<p>Subtotal</p>

										<p>VAT (7.5%)</p>
									</div>

									<div className="w-[20%] text-right flex flex-col gap-1">
										<span>
											₦{""}
											{numberWithCommas(Number(total || 0).toFixed(2))}
										</span>
										<span>
											₦{""}
											{numberWithCommas(
												Number(state?.includeVat ? vat : 0 || 0).toFixed(2)
											)}
										</span>
									</div>
								</div>

								<div className="flex  justify-end  items-center border-y py-3">
									<p className="w-[20%] text-center">Total</p>
									<p className="w-[20%] text-[28px] text-right">
										₦{""}
										{numberWithCommas(
											Number(
												state?.includeVat ? total + vat : total || 0
											).toFixed(2)
										)}
									</p>
								</div>
							</div>
						</div>
						<div className="flex justify-between gap-3 items-end py-4">
							<div>
								{/* <p className="text-base  font-normal pl-4">Payment Status:</p>
								<div>
									<button
										className="bg-[#2A72A8] text-[#F8F8F8] rounded px-2  lg:px-4 
                py-2 font-medium text-[10px] lg:text-[16px] mr-3 capitalize"
										// onClick={handleClose}
									>
										{state?.status} Invoice
									</button>
								</div> */}
								{/* <div className="bg-[#F0F1F1] w-60 px-4 py-[10px] flex justify-between items-center">
                <span className="text-base  font-normal"> Open(Not Paid)</span>

                <KeyboardArrowDownIcon />
              </div> */}
							</div>

							<div className="flex">
								<div>
									<button
										type="button"
										onClick={handlePrint}
										className="bg-[#F8F8F8] text-[#2A72A8] rounded px-2  lg:px-4 py-2 font-medium text-[10px] lg:text-[16px] mr-3">
										Download
									</button>
								</div>

								{/* <div>
									<button className="bg-[#2A72A8] text-[#F8F8F8] rounded px-2  lg:px-4 py-2 font-medium text-[10px] lg:text-[16px] mr-3">
										Send Invoice
									</button>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Details;
