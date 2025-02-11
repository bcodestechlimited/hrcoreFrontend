import React, { useState, useEffect, useContext } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../components/input/textinput";
import { AiFillEdit, AiFillDelete, AiFillCloseSquare } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { manageInvoice } from "../../../data/Reducers/InvoiceReducer";
import { toast } from "react-toastify";
import axios from "axios";
import { GlobalState } from "../../../data/Context";
import { returnErrors } from "../../../data/Reducers/ErrorReducer";
import { BillToInvoice } from "../training";
import Input from "../../../components/input/input";
import { toWords } from "../../../App";
import moment from "moment";
import { ThreeButtons } from "../recruitment";

const CreateLegal = () => {
	const navigate = useNavigate(),
		[modal, setModal] = useState(""),
		[rows, setRows] = useState([]),
		[state, setState] = useState({
			description: "",
			cost: "",
			quantity: "",
			amount: "",
		}),
		textChange = e => {
			let { name, value } = e.target;
			setState({ ...state, [name]: value });
		},
		handleAddRow = add => () => {
			if (!add) setRows([...rows, state]);
			setState({ description: "", cost: "", quantity: "", amount: "" });
		},
		handleClose = () => {
			setModal("");
		};

	let init = {
		contacts: "",
		accounts: "",
		tags: "",
		dueDate: moment().add(7, "days").format("YYYY-MM-DD"),
	};
	const [createInvoice, setCreateInvoice] = useState(init);

	const [includeVat, setVatChecked] = useState(false);
	const [includeServiceCharge, setServiceChecked] = useState(false);
	const [mainPrice, setMainPrice] = useState(0);
	const [vatPrice, setVatPrice] = useState(0);
	const [servicePrice, setServicePrice] = useState(0);
	const [vatTotalPrice, setVatTotalPrice] = useState(0);
	let varAmount = 7.5,
		headerArr = ["description", "quantity", "cost"];

	const handleInputChangeCreateInvoice = e => {
		setCreateInvoice({ ...createInvoice, [e.target.name]: e.target.value });
	};

	const handleOnChangeVat = () => {
		setVatChecked(!includeVat);
	};
	const handleOnChangeService = () => {
		setServiceChecked(!includeServiceCharge);
	};

	useEffect(() => {
		if (state?.quantity && state?.cost) {
			setState({ ...state, amount: state?.quantity * state?.cost });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.quantity, state?.cost]);

	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		{ invoice } = useSelector(state => state),
		{ numberWithCommas } = useContext(GlobalState),
		dispatch = useDispatch(),
		[alter, setAlter] = useState(null),
		textChangeAlter = e => {
			let { name, value } = e.target;
			setAlter({
				...alter,
				item: {
					...alter?.item,
					[name]: value,
				},
			});
		},
		handeUpdateAlter = () => {
			let prevRows = rows;
			prevRows[alter?.i] = alter?.item;
			setRows(prevRows);
			setModal("");
			setAlter(null);
		},
		handleDeleteAlter = () => {
			setRows(prevRows => {
				const newRows = [...prevRows];
				newRows.splice(alter?.i, 1);
				return newRows;
			});
			setModal("");
			setAlter(null);
		};

	useEffect(() => {
		if (alter?.item?.cost && alter?.item?.quantity) {
			setAlter({
				...alter,
				item: {
					...alter?.item,
					amount: alter?.item?.cost * alter?.item?.quantity,
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [alter?.item?.cost, alter?.item?.quantity]);

	useEffect(() => {
		if (rows) {
			let total = rows?.reduce((ac, i) => (ac += Number(i?.amount)), 0);

			let vatTotal = 0,
				serviceTotal = 0;
			if (includeVat) vatTotal = total * (varAmount / 100);
			if (includeServiceCharge) serviceTotal = total * (10 / 100);

			setMainPrice(total);
			setVatPrice(vatTotal);
			setServicePrice(serviceTotal);
			let newTotal = total + vatTotal + serviceTotal;
			setVatTotalPrice(newTotal);
			let convertToWords = toWords.convert(newTotal);
			setCreateInvoice({ ...createInvoice, amountInWords: convertToWords });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rows, includeVat, includeServiceCharge, alter]);

	const handleSubmit = async e => {
		e?.preventDefault();
		if (!createInvoice?.dueDate)
			return toast.info("Invoice Due Date is required");
		if (!createInvoice?.contacts)
			return toast.info("Invoice Contact is required");
		if (!createInvoice?.amountInWords)
			return toast.info("Invoice Amount in words is required");
		if (!rows?.length === 0) return toast.info("Invoice items is required");

		setLoading(true);

		let newItems = [];

		for (let a = 0; a < rows.length; a++) {
			try {
				let datum = {
						name: rows?.[a]?.name,
						price: rows?.[a]?.amount,
						quantity: rows?.[a]?.quantity || 1,
					},
					fields = [];
				for (let h = 0; h < headerArr.length; h++) {
					fields?.push({
						header: headerArr?.[h],
						value: rows?.[a]?.[headerArr?.[h]],
					});
				}
				datum.fields = fields;
				console.log({ datum, item: rows?.[a] });
				let res = await axios.post("/api/v1/invoiceItem", {
					...datum,
				});

				newItems?.push(res?.data?.data?._id);
			} catch (err) {
				for (let n = 0; n < newItems.length; n++) {
					await axios.delete(`/api/v1/invoiceItem/${newItems?.[n]}`);
				}
				setLoading(false);
				if (err) console.log({ error: err.response?.data, err });
				if (err?.response?.status === 429) toast.error(err?.response?.data);
				let error = err.response?.data?.error;
				if (error) {
					return dispatch(
						returnErrors({ error, status: err?.response?.status })
					);
				} else {
					return toast.error(err?.response?.data?.message);
				}
			}
		}

		let datum = {
			...createInvoice,
			items: newItems,
			includeVat,
			template: "legal",
			includeServiceCharge,
		};
		if (createInvoice?.tags) datum.tags = [createInvoice?.tags];
		if (createInvoice?.contacts) datum.contacts = [createInvoice?.contacts];
		if (createInvoice?.email) datum.email = [createInvoice?.email];
		if (createInvoice?.accounts) datum.accounts = [createInvoice?.accounts];
		console.log({ datum });
		delete datum?.banks;
		await dispatch(manageInvoice("post", datum));
		setLoading(false);
		setSubmit(true);
	};

	let reset = () => {
		navigate("/finance/invoice");
		setCreateInvoice(init);
	};

	useEffect(() => {
		if (invoice?.isAdded && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [invoice?.isAdded, submit]);

	return (
		<MainLegalUI
			navigate={navigate}
			handleInputChangeCreateInvoice={handleInputChangeCreateInvoice}
			createInvoice={createInvoice}
			rows={rows}
			state={state}
			textChange={textChange}
			loading={loading}
			handleSubmit={handleSubmit}
			handleAddRow={handleAddRow}
			numberWithCommas={numberWithCommas}
			setModal={setModal}
			setAlter={setAlter}
			includeVat={includeVat}
			handleOnChangeVat={handleOnChangeVat}
			vatPrice={vatPrice}
			vatTotalPrice={vatTotalPrice}
			modal={modal}
			textChangeAlter={textChangeAlter}
			handleClose={handleClose}
			alter={alter}
			handeUpdateAlter={handeUpdateAlter}
			handleDeleteAlter={handleDeleteAlter}
			mainPrice={mainPrice}
			setServiceChecked={setServiceChecked}
			servicePrice={servicePrice}
			handleOnChangeService={handleOnChangeService}
			includeServiceCharge={includeServiceCharge}
		/>
	);
};

export const MainLegalUI = ({
	navigate,
	handleInputChangeCreateInvoice,
	createInvoice,
	rows,
	state,
	textChange,
	loading,
	handleSubmit,
	handleAddRow,
	numberWithCommas,
	setModal,
	setAlter,
	includeVat,
	handleOnChangeVat,
	vatPrice,
	vatTotalPrice,
	modal,
	textChangeAlter,
	handleClose,
	alter,
	handeUpdateAlter,
	handleDeleteAlter,
	updater = false,
	mainPrice,
	servicePrice,
	handleOnChangeService,
	includeServiceCharge,
}) => {
	return (
		<div className="bg-[#EFF6FC] w-full px-4 py-8">
			<div className="flex items-center cursor-pointer ml-2">
				<span onClick={() => navigate(-1)}>Invoices</span>

				<MdOutlineKeyboardArrowRight className="pt-1" />
				<span>Create Legal Invoice </span>
			</div>
			<BillToInvoice
				handleInputChangeCreateInvoice={handleInputChangeCreateInvoice}
				createInvoice={createInvoice}
			/>
			<div className="flex w-full mt-10 gap-6">
				<div className="w-[35%]">
					<h2 className="text-base manrope text-black font-bold">
						Edit Templates
					</h2>
					<div className="bg-white mt-6 w-full p-5 rounded-2xl">
						<h3 className="text-[#013468] manrope text-xl font-semibold">
							Edit template
						</h3>
						<div className="flex mt-6 justify-between items-center">
							<span className="text-[#013468] manrope font-medium text-sm">
								Row 1
							</span>
						</div>
						<form action="" className="mt-6">
							<div className="space-y-3">
								<TextInput
									placeholder={""}
									label={"Description"}
									value={state?.description}
									name={"description"}
									onChange={textChange}
								/>
								<TextInput
									placeholder={"34,000"}
									label={"Cost"}
									value={state?.cost}
									type="number"
									name={"cost"}
									onChange={textChange}
								/>
								<TextInput
									placeholder={"34"}
									label={"Quantity"}
									value={state?.quantity}
									type="number"
									name={"quantity"}
									onChange={textChange}
								/>
								<TextInput
									placeholder={"34,000"}
									label={"Amount"}
									value={state?.amount}
									type="number"
									name={"amount"}
									onChange={textChange}
									readOnly
								/>
							</div>
							<ThreeButtons
								loading={loading}
								handleAddRow={handleAddRow}
								handleSubmit={handleSubmit}
								updater={updater}
							/>
						</form>
					</div>
				</div>
				<div className="w-[65%] ">
					<h2 className="text-base manrope text-black font-bold">
						Legal And Law Templates
					</h2>
					<div className="bg-white mt-6 min-h-screen w-full rounded-2xl">
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50">
								<tr>
									<th scope="col" className="px-6 py-3">
										S/N
									</th>
									<th scope="col" className="px-6 py-3">
										Description
									</th>
									<th scope="col" className="px-6 py-3">
										Cost
									</th>
									<th scope="col" className="px-6 py-3">
										Quantity
									</th>
									<th scope="col" className="px-6 py-3">
										Amount
									</th>
									<th scope="col" className="px-6 py-3">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{rows?.map((item, i) => (
									<tr key={i} className="bg-white border-b text-xs">
										<td className="px-6 py-4">{i + 1}</td>
										<td className="px-6 py-4">{item?.description}</td>
										<td className="px-6 py-4">
											₦{numberWithCommas(Number(item?.cost || 0).toFixed(2))}
										</td>
										<td className="px-6 py-4">
											{numberWithCommas(item?.quantity)}
										</td>
										<td className={`px-6 py-4`}>
											₦
											{numberWithCommas(
												Number(item?.amount || item?.price || 0).toFixed(2)
											)}
										</td>
										<td className="px-6 py-4 underline">
											<div className="flex items-center gap-1">
												<AiFillEdit
													onClick={() => {
														setModal("edit");
														setAlter({ item, i });
													}}
													className="cursor-pointer"
													size={14}
												/>
												<AiFillDelete
													onClick={() => {
														setModal("delete");
														setAlter({ item, i });
													}}
													className="cursor-pointer"
													size={14}
												/>
											</div>
										</td>
									</tr>
								))}
								<tr className="bg-white border-b text-xs">
									<td className="px-6 py-4">#</td>
									<td className="px-6 py-4">{state?.description}</td>
									<td className="px-6 py-4">
										₦{numberWithCommas(Number(state?.cost || 0).toFixed(2))}
									</td>
									<td className="px-6 py-4">
										{numberWithCommas(state?.quantity)}
									</td>
									<td className={`px-6 py-4`}>
										₦{numberWithCommas(Number(state?.amount || 0).toFixed(2))}
									</td>
								</tr>
							</tbody>
						</table>
						<SumTotalGeneral
							numberWithCommas={numberWithCommas}
							mainPrice={mainPrice}
							includeServiceCharge={includeServiceCharge}
							handleOnChangeService={handleOnChangeService}
							servicePrice={servicePrice}
							includeVat={includeVat}
							handleOnChangeVat={handleOnChangeVat}
							vatPrice={vatPrice}
							vatTotalPrice={vatTotalPrice}
							createInvoice={createInvoice}
							handleInputChangeCreateInvoice={handleInputChangeCreateInvoice}
						/>
					</div>
				</div>
			</div>
			{modal === "edit" && (
				<EditModal
					textChange={textChangeAlter}
					handleClose={() => {
						handleClose();
						setAlter(null);
					}}
					alter={alter}
					handleAlter={handeUpdateAlter}
				/>
			)}
			{modal === "delete" && (
				<ModalCtn>
					<div className="w-1/3 bg-white p-6 h-1/4 overflow-y-scroll rounded-2xl">
						<div className="flex justify-between items-center">
							<h6 className="text-xl manrope font-semibold text-[#19202C]">
								Delete Invoice
							</h6>
							<AiFillCloseSquare
								size={15}
								onClick={() => {
									handleClose();
									setAlter(null);
								}}
								className="cursor-pointer"
							/>
						</div>
						<p>Do you want to remove selection?</p>
						<form action="" className="mt-6">
							<button
								onClick={handleDeleteAlter}
								className="bg-[#2C78C6] h-8 w-32 rounded-full font-semibold text-xs segoe text-white">
								Remove Invoice
							</button>
						</form>
					</div>
				</ModalCtn>
			)}
		</div>
	);
};

const ModalCtn = ({ children }) => {
	return (
		<div>
			<div className="fixed inset-0 bg-black bg-opacity-5 flex w-full h-screen justify-center items-center">
				{children}
			</div>
		</div>
	);
};

const EditModal = ({ handleClose, alter, handleAlter, textChange }) => {
	return (
		<div>
			<ModalCtn>
				<div className="w-1/3 bg-white p-6 h-3/4 overflow-y-scroll rounded-2xl">
					<div className="flex justify-between items-center">
						<h6 className="text-xl manrope font-semibold text-[#19202C]">
							Edit Invoice
						</h6>
						<AiFillCloseSquare
							size={15}
							onClick={handleClose}
							className="cursor-pointer"
						/>
					</div>
					<form action="" className="mt-6">
						<div className="space-y-3">
							<TextInput
								placeholder={""}
								label={"Description"}
								name={"description"}
								onChange={textChange}
								value={alter?.item?.description}
							/>
							<TextInput
								placeholder={"34,000"}
								label={"Cost"}
								name={"cost"}
								onChange={textChange}
								value={alter?.item?.cost}
							/>
							<TextInput
								placeholder={"34"}
								label={"Quantity"}
								name={"quantity"}
								onChange={textChange}
								value={alter?.item?.quantity}
							/>
							<TextInput
								value={alter?.item?.amount || alter?.item?.price}
								placeholder={"34,000"}
								label={"Amount"}
								name={"amount"}
								onChange={textChange}
								readOnly
							/>
						</div>
						<div className="w-full grid grid-cols-2 gap-5 mt-5">
							<button
								onClick={handleAlter}
								className="bg-[#2C78C6] h-8 w-32 rounded-full font-semibold text-xs segoe text-white">
								Update Invoice
							</button>
						</div>
					</form>
				</div>
			</ModalCtn>
		</div>
	);
};
export default CreateLegal;

export const SumTotalGeneral = ({
	numberWithCommas,
	mainPrice,
	includeServiceCharge,
	handleOnChangeService,
	servicePrice,
	includeVat,
	handleOnChangeVat,
	vatPrice,
	vatTotalPrice,
	createInvoice,
	handleInputChangeCreateInvoice,
	serviceCharge,
	hideSubtotal = false,
}) => {
	return (
		<>
			{!hideSubtotal && (
				<div className="flex w-full items-center">
					<div className="border w-full h-10 bg text-right flex gap-2 items-center justify-end pr-5">
						<span className=" text-right align-bottom">Sub-Total</span>
					</div>

					<div className="border w-full h-10 bg text-right flex items-center  pl-5">
						<span>₦ {numberWithCommas(Number(mainPrice || 0).toFixed(2))}</span>
					</div>
				</div>
			)}
			<div className="flex w-full items-center">
				<div className="border w-full h-10 bg text-right flex gap-2 items-center justify-end pr-5">
					<span className=" text-right align-bottom">
						Include Service Charge({serviceCharge || 10}%)
					</span>

					<input
						type="checkbox"
						id="serviceCharge"
						name="serviceCharge"
						value="Paneer"
						checked={includeServiceCharge}
						onChange={handleOnChangeService}
					/>
				</div>

				<div className="border w-full h-10 bg text-right flex items-center  pl-5">
					<span>₦{numberWithCommas(Number(servicePrice || 0).toFixed(2))}</span>
				</div>
			</div>
			<div className="flex w-full items-center">
				<div className="border w-full h-10 bg text-right flex gap-2 items-center justify-end pr-5">
					<span className=" text-right align-bottom">Include VAT(7.5%)</span>

					<input
						type="checkbox"
						id="topping"
						name="topping"
						value="Paneer"
						checked={includeVat}
						onChange={handleOnChangeVat}
					/>
				</div>

				<div className="border w-full h-10 bg text-right flex items-center  pl-5">
					<span>₦{numberWithCommas(Number(vatPrice || 0).toFixed(2))}</span>
				</div>
			</div>
			<div className="flex w-full items-center">
				<div className="border w-full h-10 bg text-right flex gap-2 items-center justify-end pr-5">
					<span className=" text-right align-bottom">Total</span>
				</div>

				<div className="border w-full h-10 bg text-right flex items-center  pl-5">
					<span>
						₦ {numberWithCommas(Number(vatTotalPrice || 0).toFixed(2))}
					</span>
				</div>
			</div>
			<div className="px-5">
				<Input
					label={"Amount in Words"}
					placeholder={"Five Thousand naira only"}
					name="amountInWords"
					onChange={handleInputChangeCreateInvoice}
					value={createInvoice?.amountInWords}
				/>{" "}
			</div>
		</>
	);
};