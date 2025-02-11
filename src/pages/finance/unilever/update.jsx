import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { GlobalState } from "../../../data/Context";
import { manageInvoice } from "../../../data/Reducers/InvoiceReducer";
import { toast } from "react-toastify";
import axios from "axios";
import { returnErrors } from "../../../data/Reducers/ErrorReducer";
import { MainUnileverUI } from ".";
import { toWords } from "../../../App";

const Update = () => {
	let { invoice } = useSelector(s => s),
		[editState, setEditState] = useState(null),
		location = useLocation(),
		navigate = useNavigate(),
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
		dueDate: "",
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

	useEffect(() => {
		let total = rows?.reduce(
			(ac, i) =>
				(ac += Number(i?.amount || i?.price) * Number(i?.quantity || 1)),
			0
		);

		let vatTotal = 0;
		if (includeVat) vatTotal = total * (varAmount / 100);

		setVatPrice(vatTotal);
		setVatTotalPrice(total + vatTotal);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rows, includeVat]);

	useEffect(() => {
		invoice?.all?.docs?.map(
			item => item?._id === location?.state && setEditState(item)
		);
	}, [location?.state, invoice?.all]);

	useEffect(() => {
		if (editState) {
			setCreateInvoice({
				...createInvoice,
				...editState,
				contacts: editState?.contacts?.[0]?._id,
				tags: editState?.tags?.[0]?._id,
				accounts: editState?.accounts?.[0]?._id,
				dueDate: moment(editState?.dueDate).format("YYYY-MM-DD"),
			});
			setServiceChecked(editState?.includeServiceCharge);
			setVatChecked(editState?.includeVat);
			setRows(editState?.items);
			if (editState?.items?.[0]?.fields?.length > 0) {
				// setHeaderArr(state?.items?.[0]?.fields?.map(item => item?.header));
				let datum = [];
				for (let c = 0; c < editState?.items.length; c++) {
					let da = { ...editState?.items?.[c] };
					for (let d = 0; d < editState?.items?.[c]?.fields.length; d++) {
						da = {
							...da,
							[editState?.items?.[c]?.fields?.[d]?.header]:
								editState?.items?.[c]?.fields?.[d]?.value,
						};
					}
					datum?.push(da);
				}
				setRows(datum);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editState]);

	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
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
			let total = rows?.reduce(
				(ac, i) => (ac += Number(i?.amount || i?.price)),
				0
			);

			let vatTotal = 0,
				serviceTotal = 0;
			if (includeVat) vatTotal = total * (varAmount / 100);
			if (includeServiceCharge) serviceTotal = total * (10 / 100);

			if (!isNaN(total)) setMainPrice(total);
			if (!isNaN(vatTotal)) setVatPrice(vatTotal);
			if (!isNaN(serviceTotal)) setServicePrice(serviceTotal);
			let newTotal = total + vatTotal + serviceTotal;
			console.log({ newTotal, vatTotal, total, serviceTotal });
			if (!isNaN(newTotal)) {
				setVatTotalPrice(newTotal);
				let convertToWords = toWords.convert(newTotal);
				setCreateInvoice({ ...createInvoice, amountInWords: convertToWords });
			}
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
						price: rows?.[a]?.amount || rows?.[a]?.price,
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
				let res = rows?.[a]?._id
					? await axios.put(`/api/v1/invoiceItem/${rows?.[a]?._id}`, {
							...datum,
					  })
					: await axios.post("/api/v1/invoiceItem", {
							...datum,
					  });

				newItems?.push(res?.data?.data?._id);
			} catch (err) {
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
		await dispatch(manageInvoice("put", datum));
		setLoading(false);
		setSubmit(true);
	};

	let reset = () => {
		navigate("/finance/invoice");
		setCreateInvoice(init);
	};

	useEffect(() => {
		if (invoice?.isUpdated && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [invoice?.isUpdated, submit]);

	if (!location?.state || !editState) return;
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
			updater
			mainPrice={mainPrice}
			setServiceChecked={setServiceChecked}
			servicePrice={servicePrice}
			handleOnChangeService={handleOnChangeService}
			includeServiceCharge={includeServiceCharge}
		/>
	);
};

export default Update;
