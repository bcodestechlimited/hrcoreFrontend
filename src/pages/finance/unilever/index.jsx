import React, { useContext, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../components/input/textinput";
import {
	AiFillEye,
	AiFillEdit,
	AiFillDelete,
	AiFillCloseSquare,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { returnErrors } from "../../../data/Reducers/ErrorReducer";
import { manageInvoice } from "../../../data/Reducers/InvoiceReducer";
import { GlobalState } from "../../../data/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { BillToInvoice } from "../training";
import { toWords } from "../../../App";
import moment from "moment";
import { SumTotalGeneral } from "../legal";
import { ThreeButtons } from "../recruitment";

const CreateUnilever = () => {
	const navigate = useNavigate(),
		[modal, setModal] = useState(""),
		[description, setDescription] = useState({
			name: "",
			amount: "",
		}),
		[rows, setRows] = useState([]),
		[state, setState] = useState({
			vrn: "",
			model: "",
			description: [],
			total_amount: "",
		}),
		textChange = e => {
			let { name, value } = e.target;
			setState({ ...state, [name]: value });
		},
		textDescChange = e => {
			let { name, value } = e.target;
			setDescription({ ...description, [name]: value });
		},
		handleAddRow = add => () => {
			if (!add) setRows([...rows, state]);
			setState({ vrn: "", model: "", description: [], total_amount: "" });
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
		headerArr = ["vrn", "model", "description"];

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
		if (state?.description) {
			let newTotal = state?.description?.reduce(
				(ac, i) => (ac += Number(i?.amount)),
				0
			);
			setState({ ...state, amount: newTotal });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.description]);

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
		handleAddDescription = () => {
			if (description.name && description.amount) {
				if (alter) {
					setAlter({
						...alter,
						item: {
							...alter?.item,
							description: [...alter?.item?.description, description],
						},
					});
				} else {
					setState({
						...state,
						description: [...state.description, description],
					});
				}
			}
			setDescription({ name: "", amount: "" });
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

	useEffect(() => {
		if (alter?.item?.description) {
			let newTotal = alter?.item?.description?.reduce(
				(ac, i) => (ac += Number(i?.amount)),
				0
			);
			setAlter({
				...alter,
				item: {
					...alter?.item,
					amount: newTotal,
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [alter?.item?.description]);

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
			template: "unilever",
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
		<MainUnileverUI
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
			handleAddDescription={handleAddDescription}
			description={description}
			textDescChange={textDescChange}
			mainPrice={mainPrice}
			setServiceChecked={setServiceChecked}
			servicePrice={servicePrice}
			handleOnChangeService={handleOnChangeService}
			includeServiceCharge={includeServiceCharge}
		/>
	);
};

export const MainUnileverUI = ({
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
	updater,
	handleAddDescription,
	description,
	textDescChange,
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
				<span>Create Unilever Invoices </span>
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
							<span
								onClick={handleAddDescription}
								className="text-[#2C78C6] cursor-pointer text-base segoe font-semibold">
								Add description
							</span>
						</div>
						<form action="" className="mt-6">
							<div className="space-y-3">
								<TextInput
									placeholder={"APP$%"}
									label={"VRN"}
									value={state.vrn}
									name={"vrn"}
									onChange={textChange}
								/>
								<TextInput
									placeholder={"Corrolla"}
									label={"Model"}
									value={state.model}
									name={"model"}
									onChange={textChange}
								/>
								<div>
									<p className="text-sm font-mormal manrope text-black">
										{"Description"}
									</p>
									<a href="#description" className="">
										<div className="w-full h-10 mt-2 pl-3 pt-2 cursor-pointer text-sm manrope rounded-md border-[0.5px] border-black border-opacity-30">
											{state.description.length}
										</div>
									</a>
								</div>
								<TextInput
									placeholder={"34,000"}
									label={"Total Amount"}
									value={state.amount}
									type="number"
									name={"amount"}
									onChange={textChange}
									readOnly
								/>
								<div
									id="description"
									className="w-full p-6 bg-[#2c78c61a] rounded-2xl">
									<h5 className="font-bold text-sm manrope text-[#013468]">
										Items/ Descriptions {state.description.length + 1}
									</h5>
									<div className="space-y-4 mt-6">
										<TextInput
											label={"Name"}
											name={"name"}
											value={description.name}
											onChange={textDescChange}
										/>
										<TextInput
											label={"Amount"}
											name={"amount"}
											type="number"
											value={description.amount}
											onChange={textDescChange}
										/>
									</div>
									<div
										onClick={handleAddDescription}
										className="font-semibold text-base text-[#2C78C6] segoe text-right pt-4 cursor-pointer">
										Add
									</div>
								</div>
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
						Unilever Templates
					</h2>
					<div className="bg-white mt-6 min-h-screen w-full rounded-2xl">
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50">
								<tr>
									<th scope="col" className="px-6 py-3">
										S/N
									</th>
									<th scope="col" className="px-6 py-3">
										VRN
									</th>
									<th scope="col" className="px-6 py-3">
										Model
									</th>
									<th scope="col" className="px-6 py-3">
										Description
									</th>
									<th scope="col" className="px-6 py-3">
										Total Amount
									</th>
									<th scope="col" className="px-6 py-3">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{rows?.map((item, i) => (
									<tr key={i} className="bg-white border-b text-xs">
										<td className="px-6 py-4">{i + 1}</td>
										<td className="px-6 py-4">{item?.vrn}</td>
										<td className="px-6 py-4">{item?.model}</td>
										<td className="px-6 py-4">
											{numberWithCommas(item?.description.length || 0)}
										</td>
										<td className={`px-6 py-4`}>
											₦
											{numberWithCommas(
												Number(item?.amount || item?.price || 0).toFixed(2)
											)}
										</td>
										<td className="px-6 py-4 underline">
											<div className="flex items-center gap-1">
												<AiFillEye
													onClick={() => {
														setModal("description");
														setAlter({ item, i });
													}}
													className="cursor-pointer"
													size={14}
												/>
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
									<td className="px-6 py-4">{state?.vrn}</td>
									<td className="px-6 py-4">{state?.model}</td>
									<td className="px-6 py-4">
										{numberWithCommas(state?.description.length || 0)}
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
			{modal === "description" && (
				<DescriptionModal
					handleClose={() => {
						handleClose();
						setAlter(null);
					}}
					description={alter}
					numberWithCommas={numberWithCommas}
				/>
			)}
			{modal === "edit" && (
				<EditModal
					state={state}
					description={description}
					handleAddDescription={handleAddDescription}
					textDescChange={textDescChange}
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
const DescriptionModal = ({ handleClose, description, numberWithCommas }) => {
	// const Arr = [
	// 	{
	// 		name: "Fan not working",
	// 		amount: "36,000",
	// 	},
	// 	{
	// 		name: "Fan not working",
	// 		amount: "36,000",
	// 	},
	// 	{
	// 		name: "Fan not working",
	// 		amount: "36,000",
	// 	},
	// 	{
	// 		name: "Fan not working",
	// 		amount: "36,000",
	// 	},
	// ];
	return (
		<div>
			<ModalCtn>
				<div className="w-1/3 bg-white p-6 rounded-2xl">
					<div className="flex justify-between items-center">
						<h6 className="text-xl manrope font-semibold text-[#19202C]">
							{description?.item?.vrn}
						</h6>
						<AiFillCloseSquare
							size={15}
							onClick={handleClose}
							className="cursor-pointer"
						/>
					</div>
					<div className="bg-] mt-6 border border-[#667085] w-full">
						{description?.item?.description?.map((item, i) => (
							<div
								key={i}
								className="h-12 border-b border-b-[#EAECF0] bg-[#F9FAFB] w-full flex justify-between items-center px-5">
								<h6 className="manrope text-sm text-[#667085] font-normal">
									{item?.name}
								</h6>
								<h6 className="manrope text-sm text-[#667085] font-medium">
									₦{numberWithCommas(Number(item?.amount || 0).toFixed(2))}
								</h6>
							</div>
						))}
					</div>
				</div>
			</ModalCtn>
		</div>
	);
};
const EditModal = ({
	handleClose,
	state,
	handleAddRow,
	handleAddDescription,
	textChange,
	textDescChange,
	description,
	alter,
	handleAlter,
}) => {
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
								placeholder={"APP$%"}
								label={"VRN"}
								value={alter?.item?.vrn}
								name={"vrn"}
								onChange={textChange}
							/>
							<TextInput
								placeholder={"Corrolla"}
								label={"Model"}
								value={alter?.item?.model}
								name={"model"}
								onChange={textChange}
							/>
							<div>
								<p className="text-sm font-mormal manrope text-black">
									{"Description"}
								</p>
								<a href="#description" className="">
									<div className="w-full h-10 mt-2 pl-3 pt-2 cursor-pointer text-sm manrope rounded-md border-[0.5px] border-black border-opacity-30">
										{alter?.item?.description.length}
									</div>
								</a>
							</div>
							<TextInput
								placeholder={"34,000"}
								label={"Total Amount"}
								value={alter?.item?.amount || alter?.item?.price}
								name={"amount"}
								onChange={textChange}
							/>
							<div
								id="description"
								className="w-full p-6 bg-[#2c78c61a] rounded-2xl">
								<h5 className="font-bold text-sm manrope text-[#013468]">
									Items/ Descriptions {alter?.item.description.length + 1}
								</h5>
								<div className="space-y-4 mt-6">
									<TextInput
										label={"Name"}
										name={"name"}
										value={description.name}
										onChange={textDescChange}
									/>
									<TextInput
										label={"Amount"}
										name={"amount"}
										value={description.amount}
										onChange={textDescChange}
									/>
								</div>
								<div
									onClick={handleAddDescription}
									className="font-semibold text-base text-[#2C78C6] segoe text-right pt-4 cursor-pointer">
									Add
								</div>
							</div>
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
export default CreateUnilever;
