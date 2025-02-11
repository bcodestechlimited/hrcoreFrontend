import React, { useState, useEffect, useContext } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { manageInvoice } from "../../data/Reducers/InvoiceReducer";
import Button from "../../components/button/button";
import axios from "axios";
import { toast } from "react-toastify";
import { returnErrors } from "../../data/Reducers/ErrorReducer";
import { GlobalState } from "../../data/Context";
import ModalContainer from "../../components/modal-container/modal-container";
import Input from "../../components/input/input";

function UpdateInvoice() {
	const navigate = useNavigate();
	let init = {
		contacts: "",
		accounts: "",
		tags: "",
		dueDate: "",
	};
	const [updateInvoice, setUpdateInvoice] = useState(init);

	let init2 = { name: "", quantity: "", price: "" },
		location = useLocation(),
		[state, setState] = useState();
	const [itemForm, setItemForm] = useState([init2]);

	const [includeVat, setVatChecked] = useState(false);
	const [vatPrice, setVatPrice] = useState(0);
	const [vatTotalPrice, setVatTotalPrice] = useState(0);
	let varAmount = 7.5,
		[headerValue, setHeaderValue] = useState(""),
		[headerArr, setHeaderArr] = useState([]),
		[headers, setHeaders] = useState(null);

	const handleInputChangeUpdateInvoice = e => {
		setUpdateInvoice({ ...updateInvoice, [e.target.name]: e.target.value });
	};

	const handleInputChangeForMutipleItem = (event, index, field) => {
		const { value } = event.target;
		let itemValue = value;

		if (field === "price") {
			let parsedValue = parseFloat(itemValue);
			if (Number.isInteger(parsedValue)) {
				parsedValue = parsedValue.toFixed(0);
				itemValue = parsedValue;
			}
		}

		setItemForm(prevRows => {
			const newRows = [...prevRows];
			newRows[index][field] = itemValue;
			return newRows;
		});
	};

	const handleDeleteRowForMutipleItem = index => {
		setItemForm(prevRows => {
			const newRows = [...prevRows];
			newRows.splice(index, 1);
			return newRows;
		});
	};

	const addRowForMutipleItem = () => {
		const newRow = init2;
		setItemForm([...itemForm, newRow]);
	};

	const handleOnChangeVat = () => {
		setVatChecked(!includeVat);
	};

	useEffect(() => {
		let total = itemForm?.reduce(
			(ac, i) => (ac += Number(i?.price) * Number(i?.quantity)),
			0
		);

		let vatTotal = 0;
		if (includeVat) vatTotal = total * (varAmount / 100);

		setVatPrice(vatTotal);
		setVatTotalPrice(total + vatTotal);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemForm, includeVat]);

	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		{ invoiceTag, invoiceAccount, invoiceContact, invoice } = useSelector(
			state => state
		),
		{ numberWithCommas } = useContext(GlobalState),
		dispatch = useDispatch(),
		handleAddHeader = e => {
			e?.preventDefault();
			if (!headerValue) return;
			let findHeader = headerArr?.find(it => headerValue);
			if (findHeader) return toast.info(`${headerValue} field exist`);
			setHeaderArr([...headerArr, headerValue]);
			setHeaderValue("");
			setHeaders(null);
		};

	const handleSubmit = async e => {
		e?.preventDefault();
		if (!updateInvoice?.dueDate) return;

		setLoading(true);

		let newItems = [];

		for (let a = 0; a < itemForm.length; a++) {
			try {
				let datum = {
						name: itemForm?.[a]?.name,
						price: itemForm?.[a]?.price,
						quantity: itemForm?.[a]?.quantity,
					},
					fields = [];
				for (let h = 0; h < headerArr.length; h++) {
					fields?.push({
						header: headerArr?.[h],
						value: itemForm?.[a]?.[headerArr?.[h]],
					});
				}
				datum.fields = fields;
				console.log({ datum, item: itemForm?.[a] });
				let res =
        itemForm?.[a]?._id ? 
        await axios.put(`/api/v1/invoiceItem/${itemForm?.[a]?._id}`, {
					...datum,
				})
        :
        await axios.post("/api/v1/invoiceItem", {
					...datum,
				});

				newItems?.push(res?.data?.data?._id);
			} catch (err) {
				setLoading(false);
				if (err) console.log({ error: err.response?.data, err });
				if (err?.response?.status === 429) toast.error(err?.response?.data);
				let error = err.response?.data?.error;
				if (error) {
					return dispatch(returnErrors({ error, status: err?.response?.status }));
				} else {
					return toast.error(err?.response?.data?.message);
				}
			}
		}

		let datum = {
			...updateInvoice,
			items: newItems,
			includeVat,
			tags: [updateInvoice?.tags],
			contacts: [updateInvoice?.contacts],
			accounts: [updateInvoice?.accounts],
		};
		console.log({ datum });
		delete datum?.banks;
		await dispatch(manageInvoice("put", datum));
		setLoading(false);
		setSubmit(true);
	};

	let reset = () => {
		navigate("/finance/invoice");
		setUpdateInvoice(init);
	};

	useEffect(() => {
		if (invoice?.isUpdated && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [invoice?.isUpdated, submit]);

	useEffect(() => {
		invoice?.data?.docs?.map(
			item => item?._id === location?.state && setState(item)
		);
	}, [location?.state, invoice?.data]);

	useEffect(() => {
		if (state) {
			setUpdateInvoice({
				...updateInvoice,
				...state,
				contacts: state?.contacts?.[0]?._id,
				tags: state?.tags?.[0]?._id,
				accounts: state?.accounts?.[0]?._id,
				dueDate: moment(state?.dueDate).format("YYYY-MM-DD"),
			});
			setItemForm(state?.items);
			if (state?.items?.[0]?.fields?.length > 0) {
				setHeaderArr(state?.items?.[0]?.fields?.map(item => item?.header));
				let datum = [];
				for (let c = 0; c < state?.items.length; c++) {
					let da = { ...state?.items?.[c] };
					for (let d = 0; d < state?.items?.[c]?.fields.length; d++) {
						da = {
							...da,
							[state?.items?.[c]?.fields?.[d]?.header]:
								state?.items?.[c]?.fields?.[d]?.value,
						};
					}
					datum?.push(da);
				}
				setItemForm(datum);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	if (!location?.state || !state) return;

	return (
		<div>
			<div className="flex justify-center font-normal text-[13px] ">
				<div className="w-[90%]  xl:w-[80%] 2xl:bg-black 2xl:w-[65%]">
					<div className="flex items-center cursor-pointer ml-2">
						<span onClick={() => navigate(-1)}>Invoices</span>
						<MdOutlineKeyboardArrowRight />
						<span>Create Invoice </span>
					</div>

					<div className="bg-[#EAECF0] border rounded-lg px-5 py-5">
						<h2 className=" font-semibold text-xl">Update Invoice</h2>
						<p className="text- font-normal ">
							Fill the options to create your invoice
						</p>

						<form>
							<div className="flex gap-2 mb-5 lg:w-[90%] ">
								<div className="w-full">
									<label htmlFor="select" className="mb-3 block">
										Contacts
									</label>

									<select
										className="bg-[#F0F0F0] py-2 px-4 block rounded w-full outline-none border-none"
										id="select"
										value={updateInvoice.contacts}
										name="contacts"
										onChange={handleInputChangeUpdateInvoice}>
										<option className=" outline-none border-none" value="">
											Select One
										</option>

										<>
											{invoiceContact?.all?.docs?.map((item, index) => (
												<option
													key={index}
													className=" outline-none border-none"
													value={item._id}>
													{item.name}
												</option>
											))}
										</>
									</select>
								</div>

								<div className="w-full">
									<label htmlFor="select" className="mb-3 block">
										Bank(Optional)
									</label>
									<select
										className="bg-[#F0F0F0] py-2 px-4 block rounded w-full outline-none border-none"
										id="select"
										value={updateInvoice.accounts}
										name="accounts"
										onChange={handleInputChangeUpdateInvoice}>
										<option className=" outline-none border-none" value="">
											Select One
										</option>
										{invoiceAccount?.all?.docs?.map((item, index) => (
											<option
												key={index}
												className=" outline-none border-none"
												value={item._id}>
												{item.bankAccountName}
											</option>
										))}
									</select>
								</div>
							</div>
							<div className="flex gap-2 w-full lg:w-[90%] ">
								<div className="w-[50%]">
									<label htmlFor="select" className="mb-3 block">
										Due Date
									</label>

									<div className="">
										<input
											value={updateInvoice.dueDate}
											onChange={handleInputChangeUpdateInvoice}
											type="date"
											name="dueDate"
											id=""
											className="bg-[#F0F0F0] py-2 px-4 block rounded  w-full outline-none border-none"
											min={moment().format("YYYY-MM-DD")}
										/>
									</div>
								</div>

								<div className="w-[50%]">
									<label htmlFor="select" className="mb-3 block">
										Tag(optional)
									</label>
									<select
										className="bg-[#F0F0F0] py-2 px-4 block rounded w-full outline-none border-none"
										id="select"
										value={updateInvoice.tags}
										name="tags"
										onChange={handleInputChangeUpdateInvoice}>
										<option className=" outline-none border-none" value="">
											Select One
										</option>
										{invoiceTag?.all?.docs?.map((item, index) => (
											<option
												key={index}
												className=" outline-none border-none"
												value={item._id}>
												{item.name}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className="flex justify-end mt-2">
								<button
									type="button"
									className=" font-semibold  text-xs bg-[#2A72A8] text-white px-4 py-1 rounded"
									onClick={() => setHeaders(true)}>
									+ Add More Fields
								</button>
							</div>

							<table className="table-auto w-full mt-5">
								<thead className="bg-[#F0F0F0]  font-semibold text-xs">
									<tr className="font-semibold text-xs">
										<th className="border px-1 py-2  text-[10px]">Sr No</th>
										<th className="border px-4 py-2">Item Name</th>
										{headerArr?.map((it, c) => (
											<th className="border px-4 py-2" key={c}>
												<div className="flex">
													{it}
													<span
														className="ml-auto cursor-pointer"
														onClick={() => {
															setHeaderArr(prevRows => {
																const newRows = [...prevRows];
																newRows.splice(c, 1);
																return newRows;
															});
														}}>
														{" "}
														-{" "}
													</span>
												</div>
											</th>
										))}
										<th className="border px-4 py-2">Quantity</th>
										<th className="border px-4 py-2">Price ₦</th>
									</tr>
								</thead>
								<tbody>
									<>
										{itemForm.map((item, index) => (
											<tr className="" key={index}>
												<td className="border px-4 py-2">{index + 1} </td>
												<td className="border  py-2 w-[25%]">
													<input
														className="bg-[#F4F4F4] w-full outline-none py-2 px-2 rounded"
														type="text"
														id=""
														placeholder="add item"
														name="name"
														value={item.name}
														onChange={event =>
															handleInputChangeForMutipleItem(
																event,
																index,
																"name"
															)
														}
													/>
												</td>
												{headerArr?.map((dy, dx) => (
													<td className="border  py-2" key={dx}>
														<input
															className="bg-[#F4F4F4] w-full outline-none py-2 px-2 rounded"
															type="text"
															id=""
															placeholder="add item"
															name={dy}
															value={item?.[dy]}
															onChange={event =>
																handleInputChangeForMutipleItem(
																	event,
																	index,
																	dy
																)
															}
														/>
													</td>
												))}
												<td className="border px-1 py-2">
													<input
														className="bg-[#F4F4F4] w-full outline-none py-2 px-2 rounded"
														type="number"
														id=""
														placeholder="add item"
														name="quantity"
														value={item.quantity}
														onChange={event =>
															handleInputChangeForMutipleItem(
																event,
																index,
																"quantity"
															)
														}
														min={0}
													/>
												</td>
												<td className="border px-1 py-2">
													<input
														className="bg-[#F4F4F4] w-full outline-none py-2 px-2 rounded"
														type="number"
														id=""
														min={0}
														placeholder="add item"
														name="price"
														value={item.price}
														onChange={event =>
															handleInputChangeForMutipleItem(
																event,
																index,
																"price"
															)
														}
													/>
												</td>

												<td className="border px-1 py-2">
													<button
														type="button"
														className="bg-[#F4F4F4] w-full outline-none py-2 px-2 rounded"
														onClick={() =>
															handleDeleteRowForMutipleItem(index)
														}>
														X
													</button>
												</td>
											</tr>
										))}
									</>
								</tbody>
							</table>

							<div className="flex justify-end mt-2">
								<button
									type="button"
									className=" font-semibold  text-xs bg-[#2A72A8] text-white px-4 py-1 rounded"
									onClick={addRowForMutipleItem}>
									+ Add More Items
								</button>
							</div>

							<div className="flex w-full items-center">
								<div className="border w-full h-10 bg text-right flex gap-2 items-center justify-end pr-5">
									<span className=" text-right align-bottom">
										include VAT(7.5%)
									</span>

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
									<span>
										₦{numberWithCommas(Number(vatPrice || 0).toFixed(2))}
									</span>
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

							<div className="flex justify-end mt-2 gap-3">
								<button
									type="button"
									className=" font-semibold  text-xs bg-[#F4F4F4]  px-4 py-1 rounded"
									// onClick={}
								>
									Cancel
								</button>

								<Button
									buttonType={"primary"}
									title={"Update"}
									width={"w-fit bg-[#2A72A8] text-white py-2   px-2  rounded"}
									type="submit"
									loading={loading}
									onClick={handleSubmit}
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
			<ModalContainer
				title={"Add new header"}
				width={"max-w-sm"}
				show={headers}
				close={() => setHeaders(null)}>
				<form className="space-y-4">
					<div className="my-auto w-100">
						<Input
							label={"Header Name"}
							placeholder={"Enter Header Name"}
							value={headerValue}
							name="name"
							onChange={e => setHeaderValue(e?.target?.value)}
						/>
						<div className="pt-4 flex">
							<Button
								buttonType={"primary"}
								title={"Yes"}
								type="button"
								width={"w-fit me-2"}
								onClick={handleAddHeader}
							/>
							{/* <Button
									buttonType={"secondary"}
									title={"No"}
									type="button"
									width={"w-fit ms-2"}
									onClick={() => setIsDelete(null)}
								/> */}
						</div>
					</div>
				</form>
			</ModalContainer>
		</div>
	);
}

export default UpdateInvoice;
