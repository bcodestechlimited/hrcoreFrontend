import React, { useContext, useState, useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../components/input/textinput";
import { AiFillEdit, AiFillDelete, AiFillCloseSquare } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { GlobalState } from "../../../data/Context";
import { returnErrors } from "../../../data/Reducers/ErrorReducer";
import { manageInvoice } from "../../../data/Reducers/InvoiceReducer";
import { BillToInvoice } from "../training";
import Button from "../../../components/button/button";
import { toWords } from "../../../App";
import { SumTotalGeneral } from "../legal";
import moment from "moment";
import ModalContainer from "../../../components/modal-container/modal-container";

const CreateRecruitment = () => {
	const navigate = useNavigate(),
		[modal, setModal] = useState(""),
		[rows, setRows] = useState([]),
		[state, setState] = useState({
			description: "",
			quantity: "",
			cost: "",
			amount: "",
		}),
		textChange = e => {
			let { name, value } = e.target;
			setState({ ...state, [name]: value });
		},
		handleAddRow = add => () => {
			if (!add) setRows([...rows, state]);
			setState({ roles: "", salary: "", units: "", amount: "" });
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
	const [serviceCharge, setserviceCharge] = useState(10);
	const [mainPrice, setMainPrice] = useState(0);
	const [vatPrice, setVatPrice] = useState(0);
	const [servicePrice, setServicePrice] = useState(0);
	const [vatTotalPrice, setVatTotalPrice] = useState(0);
	let varAmount = 7.5,
		headerArr = ["roles", "salary", "units"];

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
		if (state?.units && state?.salary) {
			setState({ ...state, amount: state?.units * state?.salary });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.units, state?.salary]);

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
		if (alter?.item?.salary && alter?.item?.units) {
			setAlter({
				...alter,
				item: {
					...alter?.item,
					amount: alter?.item?.salary * alter?.item?.units,
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [alter?.item?.salary, alter?.item?.units]);

	useEffect(() => {
		if (rows) {
			let total = rows?.reduce((ac, i) => (ac += Number(i?.amount)), 0);

			let vatTotal = 0,
				serviceTotal = 0;
			if (includeServiceCharge) {
				serviceTotal = total * (serviceCharge / 100);
				if (includeVat) vatTotal = serviceTotal * (varAmount / 100);
			}

			setMainPrice(total);
			setVatPrice(vatTotal);
			setServicePrice(serviceTotal);
			let newTotal =
				// total +
				vatTotal + serviceTotal;
			setVatTotalPrice(newTotal);
			let convertToWords = toWords.convert(newTotal);
			setCreateInvoice({ ...createInvoice, amountInWords: convertToWords });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rows, includeVat, includeServiceCharge, alter, serviceCharge]);

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
			template: "recruitment",
			includeServiceCharge,
			serviceCharge,
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
		<MainRecruitUI
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
			serviceCharge={serviceCharge}
			setserviceCharge={setserviceCharge}
		/>
	);
};

export const MainRecruitUI = ({
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
	mainPrice,
	servicePrice,
	handleOnChangeService,
	includeServiceCharge,
	serviceCharge,
	setserviceCharge,
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
				serviceCharge={serviceCharge}
				setserviceCharge={setserviceCharge}
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
									placeholder={"Sale Associate"}
									label={"Roles"}
									value={state?.roles}
									name={"roles"}
									onChange={textChange}
								/>
								<TextInput
									placeholder={"34,000"}
									label={"Salary"}
									type="number"
									value={state?.salary}
									name={"salary"}
									onChange={textChange}
								/>
								<TextInput
									placeholder={"34"}
									label={"Units"}
									value={state?.units}
									type="number"
									name={"units"}
									onChange={textChange}
								/>
								<TextInput
									placeholder={"34,000"}
									label={"Amount"}
									type="number"
									value={state?.amount}
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
						Recruitments Templates
					</h2>
					<div className="bg-white mt-6 min-h-screen w-full rounded-2xl">
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50">
								<tr>
									<th scope="col" className="px-6 py-3">
										S/N
									</th>
									<th scope="col" className="px-6 py-3">
										Roles
									</th>
									<th scope="col" className="px-6 py-3">
										Salary
									</th>
									<th scope="col" className="px-6 py-3">
										Units
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
										<td className="px-6 py-4">{item?.roles}</td>
										<td className="px-6 py-4">
											₦{numberWithCommas(Number(item?.salary || 0).toFixed(2))}
										</td>
										<td className="px-6 py-4">
											{numberWithCommas(item?.units || 0)}
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
									<td className="px-6 py-4">{state?.roles}</td>
									<td className="px-6 py-4">
										₦{numberWithCommas(Number(state?.salary || 0).toFixed(2))}
									</td>
									<td className="px-6 py-4">
										{numberWithCommas(state?.units || 0)}
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
							serviceCharge={serviceCharge}
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

const EditModal = ({
	handleClose,

	textChange,
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
								placeholder={""}
								label={"Roles"}
								name={"roles"}
								onChange={textChange}
								value={alter?.item?.roles}
							/>
							<TextInput
								placeholder={""}
								label={"Salary"}
								name={"salary"}
								onChange={textChange}
								value={alter?.item?.salary}
							/>
							<TextInput
								label={"Units"}
								name={"units"}
								onChange={textChange}
								value={alter?.item?.units}
							/>

							<TextInput
								placeholder={"34,000"}
								label={"Amount"}
								name={"amount"}
								onChange={textChange}
								readOnly
								value={alter?.item?.amount || alter?.item?.price}
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
export default CreateRecruitment;

export const ThreeButtons = ({
	loading,
	updater,
	handleAddRow,
	handleSubmit,
}) => {
	let [isSubmit, setIsSubmit] = useState(null);

	return (
		<>
			<div className="w-full flex items-center justify-between gap-5 mt-5">
				<div
					type="button"
					onClick={handleAddRow()}
					className="h-8 flex justify-center items-center cursor-pointer capitalize border bg-[#2c78c61a] text-xs text-[#2C78C6] segoe border-[#0080C4] w-32 rounded-lg">
					Sum
				</div>
				<button
					type="button"
					onClick={handleAddRow("add")}
					className="h-8 flex justify-center items-center cursor-pointer capitalize border text-xs text-[#2C78C6] segoe border-[#0080C4] w-32 rounded-lg">
					Add new row
				</button>
			</div>
			<div className="w-full flex items-center justify-center gap-5 mt-5">
				<Button
					// buttonType={"primary"}
					title={updater ? "Update Invoice" : "Upload Invoice"}
					width={
						"bg-[#2C78C6] h-8 w-40 rounded-full font-semibold text-xs segoe text-white text-center flex justify-center items-center"
					}
					type="button"
					loading={loading}
					onClick={() => setIsSubmit(true)}
				/>
			</div>
			<ModalContainer
				title={"Submit Invoice"}
				width={"max-w-sm"}
				show={isSubmit ? true : false}
				close={() => setIsSubmit(null)}>
				<div className="mx-20">
					<form className="space-y-4">
						<div className="my-auto w-100">
							<p className="text2 Lexend text-center">
								Are you sure you want to submit the Invoice?
							</p>
							<div className="pt-4 flex">
								<Button
									buttonType={"primary"}
									title={"Yes"}
									type="button"
									width={"w-fit me-2"}
									loading={loading}
									onClick={() => {
										handleSubmit();
										setIsSubmit(null);
									}}
								/>
								<Button
									buttonType={"secondary"}
									title={"No"}
									type="button"
									width={"w-fit ms-2"}
									onClick={() => setIsSubmit(null)}
								/>
							</div>
						</div>
					</form>
				</div>
			</ModalContainer>
		</>
	);
};
