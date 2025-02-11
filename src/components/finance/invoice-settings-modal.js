import React, { useState, useEffect } from "react";
import ModalContainer from "../modal-container/modal-container";
import { manageInvoiceTag } from "../../data/Reducers/InvoiceTagReducer";
import { manageInvoiceContact } from "../../data/Reducers/InvoiceContactReducer";
import { manageInvoiceAccount } from "../../data/Reducers/InvoiceAccountReducer";
import { useSelector, useDispatch } from "react-redux";
import Button from "../button/button";
import { manageInvoiceCode } from "../../data/Reducers/InvoiceCodeReducer";
import { InvoiceTemplateArray } from "../../pages/finance/create-invoice";
import { toast } from "react-toastify";
import { manageInvoiceEmail } from "../../data/Reducers/InvoiceEmailReducer";
import { manageVoucherAccount } from "../../data/Reducers/VoucherAccountReducer";

function InvoiceSettingsModal({
	showModal,
	setShowModal,
	settingsTab,
	data,
	setData,
	voucher,
}) {
	let initTag = { name: "" },
		initAccount = {
			bankName: "",
			bankAccountNumber: "",
			bankAccountName: "",
			bankSortCode: "",
			bankTIN: "",
		},
		initContact = {
			name: "",
			address: "",
			email: "",
			phone_number: "",
			attention: "",
		},
		initCode = {
			type: "",
			code: "",
		},
		initEmail = {
			email: "",
		},
		[state, setState] = useState(
			settingsTab === "Tags"
				? initTag
				: settingsTab === "Contact"
				? initContact
				: settingsTab === "Code"
				? initCode
				: settingsTab === "Email"
				? initEmail
				: initAccount
		),
		textChange = e => {
			let { name, value } = e?.target;
			setState({ ...state, [name]: value });
		};
	// console.log({ data });
	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		{
			invoiceTag,
			invoiceAccount,
			invoiceContact,
			invoiceCode,
			invoiceEmail,
			voucherAccount,
		} = useSelector(state => state),
		dispatch = useDispatch();
	const handleSubmit = async e => {
		e?.preventDefault();
		if (settingsTab === "Tags")
			if (!state?.name) return toast.info("Tag name is required");
		if (settingsTab === "Email")
			if (!state?.email) return toast.info("Invoice email is required");

		if (settingsTab === "Contact")
			if (!state?.name && !state?.email && !state?.address && !state?.attention)
				return toast.info("Contact name/email/address/attention is required");
		if (settingsTab === "Code")
			if (!state?.code || !state?.type)
				return toast.info("Invoice code/type is required");

		if (settingsTab === "Account") {
			if (!voucher)
				if (
					!state?.bankAccountName ||
					!state?.bankAccountNumber ||
					!state?.bankName
				)
					return toast.info(
						"Account bankName/accountName/accountNumber is required"
					);
			if (voucher)
				if (!state?.bankName) return toast.info("Account bankName is required");
		}

		setLoading(true);
		if (settingsTab === "Tags")
			await dispatch(
				manageInvoiceTag(
					data ? "put" : "post",
					{
						name: state?.name,
						_id: data?._id,
					},
					data?._id
				)
			);
		if (settingsTab === "Email")
			await dispatch(
				manageInvoiceEmail(
					data ? "put" : "post",
					{
						email: state?.email,
						_id: data?._id,
					},
					data?._id
				)
			);
		if (settingsTab === "Code")
			await dispatch(
				manageInvoiceCode(
					data ? "put" : "post",
					{
						code: state?.code,
						type: state?.type,
						_id: data?._id,
					},
					data?._id
				)
			);
		if (settingsTab === "Contact")
			await dispatch(
				manageInvoiceContact(
					data ? "put" : "post",
					{
						name: state?.name,
						address: state.address,
						email: state?.email,
						_id: data?._id,
						attention: state?.attention,
					},
					data?._id
				)
			);
		if (settingsTab === "Account") {
			let dd = {
				bankName: state?.bankName,
				_id: data?._id,
			};
			if (!voucher) {
				dd = {
					...dd,
					bankAccountNumber: state.bankAccountNumber,
					bankAccountName: state?.bankAccountName,
					bankSortCode: state?.bankSortCode,
					bankTIN: state?.bankTIN,
				};
			}
			if (voucher) {
				await dispatch(
					manageVoucherAccount(data ? "put" : "post", dd, data?._id)
				);
			} else {
				await dispatch(
					manageInvoiceAccount(data ? "put" : "post", dd, data?._id)
				);
			}
		}
		setLoading(false);
		setSubmit(true);
	};

	let reset = () => {
		setSubmit(false);
		setShowModal(false);
		setData(null);
		setState(
			settingsTab === "Tags"
				? initTag
				: settingsTab === "Contact"
				? initContact
				: settingsTab === "Code"
				? initCode
				: settingsTab === "Email"
				? initEmail
				: initAccount
		);
	};

	useEffect(() => {
		if (invoiceTag?.isAdded && submit) {
			reset();
		}
		if (invoiceEmail?.isAdded && submit) {
			reset();
		}
		if (invoiceContact?.isAdded && submit) {
			reset();
		}
		if (invoiceCode?.isAdded && submit) {
			reset();
		}
		if (invoiceAccount?.isAdded && submit) {
			reset();
		}
		if (voucherAccount?.isAdded && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		invoiceTag?.isAdded,
		invoiceEmail?.isAdded,
		submit,
		invoiceAccount?.isAdded,
		voucherAccount?.isAdded,
		invoiceContact?.isAdded,
		invoiceCode?.isAdded,
	]);

	useEffect(() => {
		if (data) setState({ ...data });
	}, [data]);

	return (
		<>
			<ModalContainer
				show={showModal}
				close={() => {
					setData(null);
					setShowModal(false);
				}}
				title={`${data ? "Edit" : ""} ${
					settingsTab === "Tags"
						? "Tag"
						: settingsTab === "Contact"
						? "Contact"
						: settingsTab === "Code"
						? "Code"
						: settingsTab === "Email"
						? "Email"
						: `${data ? "" : "Add"} Bank Account`
				}`}>
				{settingsTab === "Account" && (
					<div className="relative  flex-auto mt-5">
						<form action="" method="post">
							<div className="flex items-center gap-2 mb-5 ">
								<label htmlFor="" className=" text-sm w-[25%]">
									Bank Name
								</label>
								<input
									className="bg-[#F0F0F0] px-2 py-2 w-[75%] rounded"
									value={state?.bankName}
									type="text"
									name="bankName"
									placeholder="International Banks or Local Banks"
									onChange={textChange}
									required
								/>
							</div>

							<div
								className={`flex items-center gap-2 mb-5 ${
									voucher ? "hidden" : ""
								}`}>
								<label htmlFor="" className=" text-sm w-[25%]">
									Account Number
								</label>
								<input
									className="bg-[#F0F0F0] px-2 py-2 w-[75%] rounded"
									type="tel"
									placeholder="00000000000"
									name="bankAccountNumber"
									value={state?.bankAccountNumber}
									onChange={textChange}
									maxLength={10}
									required
								/>
							</div>

							<div
								className={`flex items-center gap-2 mb-5 ${
									voucher ? "hidden" : ""
								}`}>
								<label htmlFor="" className=" text-sm w-[25%]">
									Account Name
								</label>
								<input
									className="bg-[#F0F0F0] px-2 py-2 w-[75%] rounded"
									type="text"
									id=""
									placeholder="Name attached to account"
									name="bankAccountName"
									value={state?.bankAccountName}
									onChange={textChange}
									required
								/>
							</div>

							<div
								className={`flex items-center gap-2 mb-5 ${
									voucher ? "hidden" : ""
								}`}>
								<label htmlFor="" className=" text-sm w-[25%]">
									Sort Code (Optional)
								</label>
								<input
									className="bg-[#F0F0F0] px-2 py-2 w-[75%] rounded"
									type="text"
									name="bankSortCode"
									id=""
									placeholder="Sort Code (Optional)"
									value={state?.bankSortCode}
									onChange={textChange}
									required
								/>
							</div>

							<div
								className={`flex items-center gap-2 mb-5 ${
									voucher ? "hidden" : ""
								}`}>
								<label htmlFor="" className=" text-sm w-[25%]">
									TIN (Optional)
								</label>
								<input
									className="bg-[#F0F0F0] px-2 py-2 w-[75%] rounded"
									type="text"
									name="bankTIN"
									id=""
									placeholder="Sort Code (Optional)"
									value={state?.bankTIN}
									onChange={textChange}
									required
								/>
							</div>
						</form>
					</div>
				)}

				{settingsTab === "Contact" && (
					<div className="relative  flex-auto mt-5">
						<form action="" method="post">
							<div className="flex items-center gap-2 mb-5 ">
								<label htmlFor="" className=" text-sm w-[25%]">
									Name
								</label>
								<input
									className="bg-[#F0F0F0] px-2 py-2 w-[75%] rounded"
									value={state?.name}
									type="text"
									name="name"
									onChange={textChange}
								/>
							</div>

							<div className="flex items-center gap-2 mb-5 ">
								<label htmlFor="" className=" text-sm w-[25%]">
									Address
								</label>
								<textarea
									className="bg-[#F0F0F0] px-2 py-2 w-[75%] rounded"
									type="text"
									name="address"
									value={state?.address}
									onChange={textChange}
									style={{
										height: "10rem",
										resize: "none",
									}}
								/>
							</div>

							{/* <div className="flex items-center gap-2 mb-5 ">
								<label htmlFor="" className=" text-sm w-[25%]">
									Phone number
								</label>
								<input
									className="bg-[#F0F0F0] px-2 py-2 w-[75%] rounded"
									type="text"
									name="phone_number"
									value={state?.phone_number}
									onChange={textChange}
								/>
							</div> */}

							<div className="flex items-center gap-2 mb-5 ">
								<label htmlFor="" className=" text-sm w-[25%]">
									Email(*)
								</label>
								<input
									className="bg-[#F0F0F0] px-2 py-2 w-[75%] rounded"
									type="email"
									name="email"
									id=""
									value={state?.email}
									onChange={textChange}
								/>
							</div>
							<div className="flex items-center gap-2 mb-5 ">
								<label htmlFor="" className=" text-sm w-[25%]">
									Attention
								</label>
								<textarea
									className="bg-[#F0F0F0] px-2 py-2 w-[75%] rounded"
									type="text"
									name="attention"
									value={state?.attention}
									onChange={textChange}
									style={{
										height: "10rem",
										resize: "none",
									}}
								/>
							</div>
						</form>
					</div>
				)}

				{settingsTab === "Email" && (
					<div className="relative  flex-auto mt-5">
						<form action="" method="post">
							<div className="flex items-center gap-2 mb-5 ">
								<label htmlFor="" className=" text-sm w-[25%]">
									Email
								</label>
								<input
									className="bg-[#F0F0F0] px-2 py-2 w-[75%] rounded"
									value={state?.email}
									type="email"
									name="email"
									onChange={textChange}
								/>
							</div>
						</form>
					</div>
				)}
				{settingsTab === "Tags" && (
					<div className="relative  flex-auto mt-5">
						<form action="" method="post">
							<div className="flex items-center gap-2 mb-5 ">
								<label htmlFor="" className=" text-sm w-[25%]">
									Name
								</label>
								<input
									className="bg-[#F0F0F0] px-2 py-2 w-[75%] rounded"
									value={state?.name}
									type="text"
									name="name"
									onChange={textChange}
								/>
							</div>
						</form>
					</div>
				)}
				{settingsTab === "Code" && (
					<div className="relative  flex-auto mt-5">
						<form action="" method="post">
							<div className="flex items-center gap-2 mb-5 ">
								<label htmlFor="" className=" text-sm w-[25%]">
									Type
								</label>
								<select
									className="bg-[#F0F0F0] px-2 py-2 w-[75%] rounded capitalize"
									value={state?.type}
									type="text"
									name="type"
									onChange={textChange}>
									<option value={""}>Select type</option>
									{InvoiceTemplateArray?.map((item, i) => (
										<option key={i} value={item?.template}>
											{item?.name} type
										</option>
									))}
								</select>
							</div>
							<div className="flex items-center gap-2 mb-5 ">
								<label htmlFor="" className=" text-sm w-[25%]">
									Code
								</label>
								<input
									className="bg-[#F0F0F0] px-2 py-2 w-[75%] rounded"
									value={state?.code}
									type="text"
									name="code"
									onChange={textChange}
								/>
							</div>
						</form>
					</div>
				)}

				{/*footer*/}
				<div className="gap-3 flex justify-end mb-5">
					<button
						className="bg-[#F4F4F4]  py-2   px-2  rounded "
						onClick={() => {
							setData(null);
							setShowModal(false);
						}}>
						Cancel
					</button>
					<Button
						buttonType={"primary"}
						title={data ? "Update" : "Create"}
						width={"w-fit bg-[#2A72A8] text-white py-2   px-2  rounded"}
						type="submit"
						loading={loading}
						onClick={handleSubmit}
					/>
				</div>
			</ModalContainer>
		</>
	);
}

export default InvoiceSettingsModal;
