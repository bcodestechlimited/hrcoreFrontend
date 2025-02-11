import React, { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Logo from "../../../assets/ICS Logo FA.png";
import Logo2 from "../../../assets/Cephas.png";
import moment from "moment";
import { useSelector } from "react-redux";
import { GlobalState } from "../../../data/Context";

const RecruitmentPreview = () => {
	const navigate = useNavigate();

	const { step } = useParams(),
		{ invoice, invoiceCode } = useSelector(state => state),
		{ numberWithCommas } = useContext(GlobalState),
		[state, setState] = useState(null),
		[headerArr, setHeaderArr] = useState([]);

	useEffect(() => {
		invoice?.all?.docs?.map(item => item?._id === step && setState(item));
	}, [step, invoice]);

	const [mainPrice, setMainPrice] = useState(0);
	const [vatPrice, setVatPrice] = useState(0);
	const [servicePrice, setServicePrice] = useState(0);
	const [vatTotalPrice, setVatTotalPrice] = useState(0);
	useEffect(() => {
		if (state) {
			let total = state?.items?.reduce(
				(ac, i) => (ac += Number(i?.amount || i?.price)),
				0
			);

			let vatTotal = 0,
				serviceTotal = 0;
			if (state?.includeServiceCharge) {
				serviceTotal = total * ((state?.serviceCharge || 10) / 100);
				if (state?.includeVat) vatTotal = serviceTotal * (7.5 / 100);
			}

			setMainPrice(total);
			setVatPrice(vatTotal);
			setServicePrice(serviceTotal);
			let newTotal =
				//  total +
				vatTotal + serviceTotal;
			setVatTotalPrice(newTotal);
			setHeaderArr(state?.items?.[0]?.fields?.map(item => item?.header));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	let ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		documentTitle: `${state?.template}-${moment(state?.createdAt).format(
			"DD/MM/YYYY"
		)}`,
		bodyClass: "px-4 py-10",
	});

	if (!state) return;

	const Arr1 = [
		{
			title: "Invoice No",
			value: `${
				invoiceCode?.all?.docs?.find(item => item?.type === "recruitment")
					?.code || ""
			}${state?.invoiceId || ""}`,
		},
		{
			title: "Date",
			value: moment(state?.createdAt).format("DD-MMMM-YYYY"),
		},
		{
			title: "VAT No",
			value: "IKV10002252871",
		},
		{
			title: "TIN",
			value: state?.accounts?.[0]?.bankTIN,
		},
	];

	const second = [
		{
			title: "Company Name",
			value: state?.contacts?.[0]?.name,
		},
		{
			title: "Address",
			value: state?.contacts?.[0]?.address,
		},
		{
			title: "Email Address",
			value: state?.contacts?.[0]?.email,
		},
	];
	const accountDetails = [
		{
			title: "Bank Name",
			value: state?.accounts?.[0]?.bankName,
		},
		{
			title: "Account Name",
			value: state?.accounts?.[0]?.bankAccountName,
		},
		{
			title: "Account No",
			value: state?.accounts?.[0]?.bankAccountNumber,
		},
		{
			title: "Sort Code",
			value: state?.accounts?.[0]?.bankSortCode,
		},
	];
	// const tableData = [
	// 	{
	// 		roles: "Sales Associate",
	// 		salary: "₦560,000",
	// 		units: "2",
	// 		amount: "₦560,000",
	// 	},
	// 	{
	// 		roles: "Sales Associate",
	// 		salary: "₦560,000",
	// 		units: "2",
	// 		amount: "₦560,000",
	// 	},
	// 	{
	// 		roles: "Sales Associate",
	// 		salary: "₦560,000",
	// 		units: "2",
	// 		amount: "₦560,000",
	// 	},
	// 	{
	// 		roles: "Sales Associate",
	// 		salary: "₦560,000",
	// 		units: "2",
	// 		amount: "₦560,000",
	// 	},
	// 	{
	// 		roles: "Sales Associate",
	// 		salary: "₦560,000",
	// 		units: "2",
	// 		amount: "₦560,000",
	// 	},
	// ];

	return (
		<div>
			<div className="bg-white printOnly w-full px-4 py-8">
				<div className="flex items-center cursor-pointer ml-2">
					<span onClick={() => navigate(-1)}>Invoices</span>
					<MdOutlineKeyboardArrowRight className="pt-1" />
					<span className="capitalize">{state?.template} </span>
				</div>
				<div className="mt-10 bg-white rounded-xl w-full p-8">
					<div className="flex justify-between">
						<div>
							<h2 className="manrope text-base font-normal text-black">
								Attention:{" "}
								<span className="font-semibold capitalize">
									{state?.contacts?.[0]?.attention || state?.template}
								</span>
							</h2>
						</div>
						<div className="flex gap-5">
							<div
								onClick={handlePrint}
								className="h-8s w-24 flex justify-center items-center rounded-full cursor-pointer capitalize border bg-[#2c78c61a] text-xs text-[#2C78C6] segoe border-[#0080C4]">
								Download
							</div>
							<button
								onClick={() =>
									navigate("/finance/recruitment/update", { state: state?._id })
								}
								className="bg-[#2C78C6] h-8 w-32 rounded-full font-semibold text-xs segoe text-white">
								Edit
							</button>
						</div>
					</div>
					<div className="bg-[#F9FAFB] mt-8 border border-[#EAECF0] rounded-xl h-20 w-full grid grid-cols-4 gap-2 px-3 items-center">
						{Arr1?.map(item => (
							<div className="">
								<h2 className="text-[#19202C] text-sm font-normal manrope">
									{item?.title}:
								</h2>
								<h3 className="text-[#19202C] text-sm font-medium manrope">
									{item?.value}
								</h3>
							</div>
						))}
					</div>
					<div className="bg-[#F9FAFB] mt-8 border border-[#EAECF0] rounded-xl h-20 w-full grid grid-cols-3 gap-2 px-3 items-center">
						{second?.map(item => (
							<div className="">
								<h2 className="text-[#19202C] text-sm font-normal manrope">
									{item?.title}:
								</h2>
								<h3 className="text-[#19202C] text-sm font-medium manrope">
									{item?.value}
								</h3>
							</div>
						))}
					</div>
				</div>
				<div className="mt-10 bg-white pb-10">
					<table className="w-full text-sm text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-[#013468] text-center uppercase whitespace-nowrap bg-gray-50">
							<tr cl>
								<th scope="col" className="px-2 py-3 text-xs">
									S/N
								</th>

								<th scope="col" className="px-6 py-3 text-xs">
									Roles
								</th>
								<th scope="col" className="px-6 py-3 text-xs">
									salary
								</th>
								<th scope="col" className="px-6 py-3 text-xs">
									Units
								</th>
								<th scope="col" className="px-6 py-3 text-xs">
									Amount
								</th>
							</tr>
						</thead>
						<tbody className="">
							{state?.items?.map((item, b) => (
								<tr
									className="font-medium bg-white border-b manrope text-xs text-[#3C495E]"
									key={b}>
									<td className="px-6 py-4 text-center">{b + 1}</td>
									{headerArr?.map((it, x) => (
										<td className="px-6 py-4 text-center" key={x}>
											{it === "salary"
												? `₦${numberWithCommas(
														Number(
															item?.fields?.find(ti => ti?.header === it)
																?.value || 0
														).toFixed(2)
												  )}`
												: it === "units"
												? numberWithCommas(
														item?.fields?.find(ti => ti?.header === it)
															?.value || 0
												  )
												: item?.fields?.find(ti => ti?.header === it)?.value}
										</td>
									))}
									{/* <td className="p-4 text-center">{item?.cost}</td> */}
									{/* <td className="p-4 text-center">{item?.no_of_particapant}</td> */}
									<td className="p-4 text-center">
										₦{numberWithCommas(Number(item?.price).toFixed(2))}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="w-full px-8">
						<div className="mt-8 bg-white border border-[#EAECF0] rounded-xl pt-2 space-y-[0.5px]">
							<div className="bg-[#F9FAFB] h-10 flex justify-between items-center px-5">
								<h2 className="text-base text-[#19202C] font-normal manrope">
									Sub Total Amount
								</h2>
								<h3 className="text-base text-[#19202C] font-normal manrope">
									₦{numberWithCommas(Number(mainPrice || 0).toFixed(2))}
								</h3>
							</div>
							<div className="bg-[#F9FAFB] h-10 flex justify-between items-center px-5">
								<h2 className="text-base text-[#19202C] font-normal manrope">
									Service Charge({state?.serviceCharge || 10}%)
								</h2>
								<h3 className="text-base text-[#19202C] font-normal manrope">
									₦{numberWithCommas(Number(servicePrice || 0).toFixed(2))}
								</h3>
							</div>
							<div className="bg-[#F9FAFB] h-10 flex justify-between items-center px-5">
								<h2 className="text-base text-[#19202C] font-normal manrope">
									VAT(7.5%)
								</h2>
								<h3 className="text-base text-[#19202C] font-normal manrope">
									₦{numberWithCommas(Number(vatPrice || 0).toFixed(2))}
								</h3>
							</div>
							<div className="bg-[#F9FAFB] h-10 flex justify-between items-center px-5">
								<h2 className="text-base text-[#19202C] font-normal manrope">
									Total Amount
								</h2>
								<h3 className="text-base text-[#19202C] font-normal manrope">
									₦{numberWithCommas(Number(vatTotalPrice || 0).toFixed(2))}
								</h3>
							</div>
							<div className="bg-[#F9FAFB] h-10 flex justify-between items-center px-5">
								<h2 className="text-base text-[#19202C] font-normal manrope">
									Due to{" "}
									{process.env.REACT_APP_NAME === "Cephas HR Core"
										? " CEPHAS ICT HUB"
										: ` ICS Outsourcing`}
								</h2>
								<h3 className="text-base text-[#19202C] font-normal manrope">
									{/* ₦560,000 */}
								</h3>
							</div>
						</div>
						<div className="bg-[#F9FAFB] mt-4 h-20 py-3 pl-5 rounded">
							<h2 className="text-base text-[#19202C] font-normal manrope">
								Amount In Words
							</h2>
							<h3 className="text-base text-[#19202C] font-semibold manrope">
								{state?.amountInWords}
							</h3>
						</div>
						<div className="mt-10 bg-[#F9FAFB] rounded-xl border p-6 border-[#EAECF0]">
							<h5 className="manrope text-base font-normal text-[#235FD6]">
								Account Details
							</h5>
							<div className="mt-6 w-full grid grid-cols-3 gap-4">
								{accountDetails?.map(item => (
									<div className="">
										<h2 className="text-[#19202C] text-sm font-normal manrope">
											{item?.title}:
										</h2>
										<h3 className="text-[#19202C] text-sm font-medium manrope">
											{item?.value}
										</h3>
									</div>
								))}
							</div>
						</div>
						<h5 className="text-sm font-normal text-[#19202C] manrope pt-5">
							Scanned Copy of teller sent to{" "}
							{state?.email?.[0]?.email || "oowoyele@icsourcing.com"}
						</h5>
					</div>
				</div>
			</div>
			<div className="hidden">
				{" "}
				<PrintableDocs
					ref={ref}
					accountDetails={accountDetails}
					total={vatTotalPrice}
					headerArr={headerArr}
					state={state}
					numberWithCommas={numberWithCommas}
					Arr1={Arr1}
					vatTotalPrice={vatTotalPrice}
					servicePrice={servicePrice}
					mainPrice={mainPrice}
					vatPrice={vatPrice}
				/>
			</div>
		</div>
	);
};

export default RecruitmentPreview;
const PrintableDocs = React.forwardRef(
	(
		{
			total,
			headerArr,
			state,
			numberWithCommas,
			accountDetails,
			Arr1,
			vatPrice,
			mainPrice,
			servicePrice,
			vatTotalPrice,
		},
		ref
	) => {
		// const accountDetails = [
		// 	{
		// 		title: "Bank Name",
		// 		value: "Guarantee Trust Bank",
		// 	},
		// 	{
		// 		title: "Account Name",
		// 		value: "ICS Outsourcing Nigeria Limited",
		// 	},
		// 	{
		// 		title: "Account No",
		// 		value: "IKV100022528",
		// 	},
		// 	{
		// 		title: "Sort Code",
		// 		value: "058152010",
		// 	},
		// ];
		// const AddressArr1 = [
		// 	{
		// 		title: "Invoice No",
		// 		value: "ICS/HO/LD/023/037",
		// 	},
		// 	{
		// 		title: "Date",
		// 		value: "04 August, 2023",
		// 	},
		// 	{
		// 		title: "VAT No",
		// 		value: "IKV10002252871",
		// 	},
		// 	{
		// 		title: "TIN",
		// 		value: "00155335-0001",
		// 	},
		// ];
		// const tableData = [
		// 	{
		// 		roles: "Sales Associate",
		// 		salary: "₦560,000",
		// 		units: "2",
		// 		amount: "₦560,000",
		// 	},
		// 	{
		// 		roles: "Sales Associate",
		// 		salary: "₦560,000",
		// 		units: "2",
		// 		amount: "₦560,000",
		// 	},
		// 	{
		// 		roles: "Sales Associate",
		// 		salary: "₦560,000",
		// 		units: "2",
		// 		amount: "₦560,000",
		// 	},
		// 	{
		// 		roles: "Sales Associate",
		// 		salary: "₦560,000",
		// 		units: "2",
		// 		amount: "₦560,000",
		// 	},
		// 	{
		// 		roles: "Sales Associate",
		// 		salary: "₦560,000",
		// 		units: "2",
		// 		amount: "₦560,000",
		// 	},
		// ];

		return (
			<section
				ref={ref}
				className={`w-full printOnly bg-white printPage ${
					process.env.REACT_APP_NAME ? "receiptPrint3" : "receiptPrint"
				}`}>
				<img
					src={process.env.REACT_APP_NAME ? Logo2 : Logo}
					alt=""
					className="h-32 ms-auto pe-6"
				/>
				<div className="flex justify-end mt-3 pe-6">
					<div className="space-y-1">
						{Arr1?.map(item => (
							<h3 className="text-sm text-[#19202C] manrope font-bold">
								{item?.title === "TIN"
									? item?.value
										? item?.title
										: ""
									: item?.title}
								{item?.value && ":"}{" "}
								<span className="font-medium">{item?.value}</span>
							</h3>
						))}
					</div>
				</div>
				<div className="mt-3">
					<h3 className="text-black font-bold text-sm manrope capitalize">
						{state?.contacts?.[0]?.name &&
						state?.contacts?.[0]?.name?.length > 1
							? state?.contacts?.[0]?.name
							: null}
					</h3>
					<pre className="text-base font-medium manrope text-black">
						{state?.contacts?.[0]?.address &&
						state?.contacts?.[0]?.address?.length > 1
							? state?.contacts?.[0]?.address
							: null}
					</pre>
					{state?.contacts?.[0]?.email &&
						state?.contacts?.[0]?.email?.length >= 5 && (
							<h3 className="text-base pt-2 text-black manrope font-bold">
								Email Address:
								<span className="font-medium">
									{state?.contacts?.[0]?.email}
								</span>
							</h3>
						)}
					{state?.contacts?.[0]?.attention && (
						<h3 className="text-sm pt-2 text-black manrope font-bold">
							Attention:{" "}
							<pre className="font-medium">
								{state?.contacts?.[0]?.attention}
							</pre>
						</h3>
					)}
				</div>
				<div className="p-2 mt-5 ps-6">
					<h3 className="text-center text-base font-bold">{state?.title}</h3>
					<table className="w-full mt-3 border-collapse border border-black">
						<thead className="capitalize text-sm text-white tw-font-bold text-center whitespace-nowrap bg-black">
							<tr>
								<th className="border border-black border-r-white p-2">S/N</th>
								<th className="border border-black border-x-white p-2">
									Roles
								</th>
								<th className="border border-black border-x-white p-2">
									Salary
								</th>
								<th className="border border-black border-x-white p-2">
									Units
								</th>
								<th className="border border-black border-l-white p-2">
									amount
								</th>
							</tr>
						</thead>

						<tbody>
							{/* {tableData?.map((item, i) => (
								<tr
									key={i}
									className="text-sm manrope font-normal text-[#3C495E]">
									<td className="border border-black p-2">2</td>
									<td className="border border-black p-2">{item?.roles}</td>
									<td className="border border-black p-2">{item.salary}</td>
									<td className="border border-black p-2">{item.units}</td>
									<td className="border border-black p-2">{item.amount}</td>
								</tr>
							))} */}
							{state?.items?.map((item, b) => (
								<tr
									className="text-xs manrope font-medium text-black page-break"
									key={b}>
									<td className="border border-black p-2 text-center">
										{b + 1}
									</td>
									{headerArr?.map((it, x) => (
										<td className="border border-black p-2 text-center" key={x}>
											{it === "salary"
												? `₦${numberWithCommas(
														Number(
															item?.fields?.find(ti => ti?.header === it)
																?.value || 0
														).toFixed(2)
												  )}`
												: it === "units"
												? numberWithCommas(
														item?.fields?.find(ti => ti?.header === it)
															?.value || 0
												  )
												: item?.fields?.find(ti => ti?.header === it)?.value}
										</td>
									))}
									<td className="border border-black p-2 text-center">
										₦{numberWithCommas(Number(item?.price).toFixed(2))}
									</td>
								</tr>
							))}
							<SummationTable
								numberWithCommas={numberWithCommas}
								vatPrice={vatPrice}
								vatTotalPrice={vatTotalPrice}
								servicePrice={servicePrice}
								mainPrice={mainPrice}
								colSpan={3}
								serviceCharge={state?.serviceCharge}
							/>
						</tbody>
					</table>
					<TableBottom
						state={state}
						accountDetails={accountDetails}
						Arr1={Arr1}
					/>
				</div>
			</section>
		);
	}
);

export const SummationTable = ({
	mainPrice,
	servicePrice,
	vatPrice,
	vatTotalPrice,
	numberWithCommas,
	colSpan,
	hideSubtotal = false,
	serviceCharge = 10,
}) => {
	return (
		<>
			{!hideSubtotal && (
				<tr className="text-xs manrope font-normal text-black">
					<td className="border border-black p-2"></td>
					<td
						colSpan={Number(colSpan) || 5}
						className="border border-black p-2 font-bold text-center">
						Sub Total
					</td>
					<td className="border border-black p-2 font-bold text-center">
						₦{numberWithCommas(Number(mainPrice || 0).toFixed(2))}
					</td>
				</tr>
			)}
			<tr className="text-xs manrope font-normal text-black">
				<td className="border border-black p-2"></td>
				<td
					colSpan={Number(colSpan) || 5}
					className="border border-black p-2 font-bold text-center">
					Service Charge({serviceCharge}%)
				</td>
				<td className="border border-black p-2 font-bold text-center">
					₦{numberWithCommas(Number(servicePrice || 0).toFixed(2))}
				</td>
			</tr>
			<tr className="text-xs manrope font-normal text-black">
				<td className="border border-black p-2"></td>
				<td
					colSpan={Number(colSpan) || 5}
					className="border border-black p-2 font-bold text-center">
					VAT(7.5%)
				</td>
				<td className="border border-black p-2 font-bold text-center">
					₦{numberWithCommas(Number(vatPrice || 0).toFixed(2))}
				</td>
			</tr>
			<tr className="text-xs manrope font-normal text-black">
				<td className="border border-black p-2"></td>
				<td
					colSpan={Number(colSpan) || 5}
					className="border border-black p-2 font-bold text-center">
					Total Amount
				</td>
				<td className="border border-black p-2 font-bold text-center">
					₦{numberWithCommas(Number(vatTotalPrice || 0).toFixed(2))}
				</td>
			</tr>
		</>
	);
};

export const TableBottom = ({ accountDetails, state, Arr1, paymentFavour }) => {
	console.log({ state });

	let [show, setShow] = useState("true");

	useEffect(() => {
		if (state?.template === "training")
			if (process.env.REACT_APP_NAME === "Cephas HR Core") {
				setShow("false");
			}
	}, [state]);

	return (
		<>
			{/* <div className="mt-8 bg-white border border-[#EAECF0] rounded-xl pt-2 space-y-[0.5px] page-break">
						<div className="bg-[#F9FAFB] h-10 flex justify-between items-center px-5">
							<h2 className="text-base text-[#19202C] font-normal manrope">
								Sub Total Amount
							</h2>
							<h3 className="text-base text-[#19202C] font-normal manrope">
								₦{numberWithCommas(Number(mainPrice || 0).toFixed(2))}
							</h3>
						</div>
						<div className="bg-[#F9FAFB] h-10 flex justify-between items-center px-5">
							<h2 className="text-base text-[#19202C] font-normal manrope">
								Service Charge(10%)
							</h2>
							<h3 className="text-base text-[#19202C] font-normal manrope">
								₦{numberWithCommas(Number(servicePrice || 0).toFixed(2))}
							</h3>
						</div>
						<div className="bg-[#F9FAFB] h-10 flex justify-between items-center px-5">
							<h2 className="text-base text-[#19202C] font-normal manrope">
								VAT(7.5%)
							</h2>
							<h3 className="text-base text-[#19202C] font-normal manrope">
								₦{numberWithCommas(Number(vatPrice || 0).toFixed(2))}
							</h3>
						</div>
						<div className="bg-[#F9FAFB] h-10 flex justify-between items-center px-5">
							<h2 className="text-base text-[#19202C] font-normal manrope">
								Total Amount
							</h2>
							<h3 className="text-base text-[#19202C] font-normal manrope">
								₦{numberWithCommas(Number(vatTotalPrice || 0).toFixed(2))}
							</h3>
						</div>
						<div className="bg-[#F9FAFB] h-10 flex justify-between items-center px-5">
							<h2 className="text-base text-[#19202C] font-normal manrope">
								Due to ICS Outsourcing
							</h2>
							<h3 className="text-base text-[#19202C] font-normal manrope">
								₦560,000
							</h3>
						</div>
					</div> */}
			<h2 className="text-sm text-black manrope capitalize underline font-bold py-3">
				Amount In Words: {state?.amountInWords}
			</h2>
			<div className="mt-5 bg-white rounded-xl py-4 page-break">
				{show === "true" && (
					<>
						<h5 className="manrope text-sm font-bold underline uppercase">
							Note:
						</h5>
						<h4 className="manrope text-sm page-break">
							Payment can be made in favour of{" "}
							<span className="font-bold">
								{paymentFavour
									? paymentFavour
									: process.env.REACT_APP_NAME === "Cephas HR Core"
									? "CEPHAS ICT HUB"
									: "ICS Outsourcing Nigeria Limited"}
								.
							</span>
						</h4>
						<h4 className="manrope text-sm py-3 page-break">
							Account details:{" "}
							<span>
								{" "}
								({
									accountDetails?.find(it => it?.title === "Bank Name")?.value
								}{" "}
								No:{" "}
								<span className="font-bold">
									{
										accountDetails?.find(it => it?.title === "Account No")
											?.value
									}
								</span>
								, A/C Name:{" "}
								{
									accountDetails?.find(it => it?.title === "Account Name")
										?.value
								}
								)
							</span>
						</h4>
					</>
				)}
				{show === "false" && (
					<>
						<div className="flex justify-between items-center gap-3 mt-5 mb-2 manrope text-sm py-3 page-break">
							<div className="">
								<p>...........................</p>
								<p>Signature & Date</p>
							</div>
							<div className="">
								<p>..............................................</p>
								<p>Managers' Signature & Date</p>
							</div>
						</div>
					</>
				)}
				<h4 className="text-sm font-normal text-[#19202C] manrope py-3 page-break">
					Scanned Copy of teller sent to{" "}
					<span className="font-italize text-[#235FD6]">
						{state?.email?.[0]?.email
							? state?.email?.[0]?.email
							: process.env.REACT_APP_NAME === "Cephas HR Core"
							? "hr@cephasict.com"
							: "oowoyele@icsourcing.com"}
					</span>
				</h4>
				{show === "true" && (
					<>
						{accountDetails?.find(it => it?.title === "Sort Code")?.value && (
							<h4 className="manrope text-sm page-break">
								{accountDetails?.find(it => it?.title === "Bank Name")?.value}{" "}
								Sort Code:{" "}
								<span>
									{accountDetails?.find(it => it?.title === "Sort Code")?.value}
								</span>
							</h4>
						)}
						{Arr1?.find(it => it?.title === "TIN")?.value && (
							<h4 className="manrope text-sm page-break">
								TIN: <span>{Arr1?.find(it => it?.title === "TIN")?.value}</span>
							</h4>
						)}
					</>
				)}
				{/* <div className="mt-6 w-full grid grid-cols-3 gap-4">
					{accountDetails?.map(item => (
						<div className="">
							<h2 className="text-[#19202C] text-sm font-normal manrope">
								{item?.title}:
							</h2>
							<h3 className="text-[#19202C] text-sm font-medium manrope">
								{item?.value}
							</h3>
						</div>
					))}
				</div> */}
			</div>
			{/* <h5 className="text-sm font-normal text-[#19202C] manrope pt-5 page-break">
				Scanned Copy of teller sent to oowoyele@icsourcing.com
			</h5> */}
		</>
	);
};
