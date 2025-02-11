import React, { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import Search from "../../components/search/search";
// import ModalContainer from "../../components/modal-container/modal-container";
import InvoiceSettingsModal from "../../components/finance/invoice-settings-modal";
import { IconContext } from "react-icons";
import Option from "../../components/oprion/option";
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { manageInvoiceTag } from "../../data/Reducers/InvoiceTagReducer";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../components/pagination/pagination";
import { manageInvoiceContact } from "../../data/Reducers/InvoiceContactReducer";
import { manageInvoiceAccount } from "../../data/Reducers/InvoiceAccountReducer";
import Button from "../../components/button/button";
import ModalContainer, {
	PageLoader,
} from "../../components/modal-container/modal-container";
import { manageInvoiceCode } from "../../data/Reducers/InvoiceCodeReducer";
import { InvoiceTemplateArray } from "./create-invoice";
import { manageInvoiceEmail } from "../../data/Reducers/InvoiceEmailReducer";

// const AllAccountData = {
// 	data: [
// 		{
// 			id: 1,
// 			bank_name: "ABC Bank",
// 			account_name: "John Doe",
// 			short_code: "12345",
// 			tin: "123-456-789",
// 		},
// 		{
// 			id: 2,
// 			bank_name: "XYZ Bank",
// 			account_name: "Jane Smith",
// 			short_code: "67890",
// 			tin: "987-654-321",
// 		},
// 		{
// 			id: 3,
// 			bank_name: "PQR Bank",
// 			account_name: "Alice Johnson",
// 			short_code: "54321",
// 			tin: "456-789-123",
// 		},
// 		// Add more objects as needed
// 	],
// };

// const AllTagData = {
// 	data: [
// 		{
// 			id: 1,
// 			name: "Tag 1",
// 		},
// 		{
// 			id: 2,
// 			name: "Tag 2",
// 		},
// 		{
// 			id: 3,
// 			name: "Tag 3",
// 		},
// 		// Add more objects as needed
// 	],
// };

// const contacts = {
// 	data: [
// 		{
// 			id: 1,
// 			email: "john@example.com",
// 			address: "123 Main St, City, Country",
// 			phone_number: "+1 (123) 456-7890",
// 		},
// 		{
// 			id: 2,
// 			email: "jane@example.com",
// 			address: "456 Elm St, Town, Country",
// 			phone_number: "+1 (987) 654-3210",
// 		},
// 		{
// 			id: 3,
// 			email: "alice@example.com",
// 			address: "789 Oak St, Village, Country",
// 			phone_number: "+1 (543) 210-9876",
// 		},
// 		// Add more objects as needed
// 	],
// };

function Invoicesetting() {
	const navigate = useNavigate();
	const [settingsTab, setSettingsTab] = useState("Account");
	const [showModal, setShowModal] = useState(false);

	const handleTab = data => {
		setSettingsTab(data);
	};

	let [data, setData] = useState(null),
		dispatch = useDispatch(),
		[loading, setLoading] = useState(false),
		[isDelete, setIsDelete] = useState(null),
		{ invoiceTag, invoiceAccount, invoiceContact, invoiceCode, invoiceEmail } =
			useSelector(state => state),
		[submit, setSubmit] = useState(null);

	const handleSubmit = async e => {
		e?.preventDefault();

		setLoading(true);
		if (settingsTab === "Tags")
			await dispatch(manageInvoiceTag("delete", isDelete));
		if (settingsTab === "Email")
			await dispatch(manageInvoiceEmail("delete", isDelete));
		if (settingsTab === "Contact")
			await dispatch(manageInvoiceContact("delete", isDelete));
		if (settingsTab === "Account")
			await dispatch(manageInvoiceAccount("delete", isDelete));
		if (settingsTab === "Code")
			await dispatch(manageInvoiceCode("delete", isDelete));
		setLoading(false);
		setSubmit(true);
	};

	let reset = () => {
		setData(null);
		setIsDelete(null);
	};

	useEffect(() => {
		if (data) setShowModal(true);
	}, [data]);

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
		if (invoiceAccount?.isAdded && submit) {
			reset();
		}
		if (invoiceCode?.isAdded && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		invoiceEmail?.isAdded,
		invoiceTag?.isAdded,
		submit,
		invoiceAccount?.isAdded,
		invoiceContact?.isAdded,
		invoiceCode?.isAdded,
	]);

	return (
		<div>
			<div className="flex justify-center font-normal text-[13px]">
				<div className="w-[90%]  xl:w-[80%]  2xl:w-[65%]">
					<div className="flex items-center cursor-pointer ml-2">
						<span onClick={() => navigate("/finance/invoice")}>Invoices</span>
						<MdOutlineKeyboardArrowRight />

						<span>Invoice Setting</span>
					</div>

					<div className="mt-10 ">
						<div>
							<div className="flex justify-end mb-3">
								<span
									onClick={() => setShowModal(true)}
									className="bg-[#2A72A8]  text-center  text-[10px]  rounded   py-1 lg:px-6 lg:py-2 text-white  w-[15%] cursor-pointer">
									+{" "}
									{settingsTab === "Tags"
										? `Tag`
										: settingsTab === "Contact"
										? "Contact"
										: settingsTab === "Code"
										? "Code"
										: settingsTab === "Email"
										? "Email"
										: "Account"}
								</span>
							</div>

							<div className=" shadow-md sm:rounded-lg mt-10 mb-5 ">
								<div className="p-4 grid grid-cols-3 gap-3">
									<span
										onClick={() => handleTab("Account")}
										className={`w-[33%] text-center   py-1 px-6 rounded font-semibold text-[15px] ${
											settingsTab === "Account"
												? "bg-[#2A72A8] text-white"
												: "bg-[#FFFFFF] text-black  border-2 cursor-pointer "
										} w-full`}>
										Account
									</span>
									<span
										onClick={() => handleTab("Contact")}
										className={`w-[33%] text-center   py-1 px-6 rounded font-semibold text-[15px] ${
											settingsTab === "Contact"
												? "bg-[#2A72A8] text-white"
												: "bg-[#FFFFFF] text-black  border-2 cursor-pointer "
										} w-full`}>
										Contact
									</span>
									<span
										onClick={() => handleTab("Tags")}
										className={`w-[33%] text-center   py-1 px-6 rounded font-semibold text-[15px] ${
											settingsTab === "Tags"
												? "bg-[#2A72A8] text-white"
												: "bg-[#FFFFFF] text-black  border-2 cursor-pointer "
										} w-full`}>
										Tags
									</span>
									<span
										onClick={() => handleTab("Code")}
										className={`w-[33%] text-center   py-1 px-6 rounded font-semibold text-[15px] ${
											settingsTab === "Code"
												? "bg-[#2A72A8] text-white"
												: "bg-[#FFFFFF] text-black  border-2 cursor-pointer "
										} w-full`}>
										Invoice ID Prefix
									</span>
									<span
										onClick={() => handleTab("Email")}
										className={`w-[33%] text-center   py-1 px-6 rounded font-semibold text-[15px] ${
											settingsTab === "Email"
												? "bg-[#2A72A8] text-white"
												: "bg-[#FFFFFF] text-black  border-2 cursor-pointer "
										} w-full`}>
										Invoice Recipient
									</span>
									{/* <span
										onClick={() => navigate("/finance/company-voucher")}
										className={`w-[33%] text-center   py-1 px-6 rounded font-semibold text-[15px] ${
											settingsTab === "Company Settings"
												? "bg-[#2A72A8] text-white"
												: "bg-[#FFFFFF] text-black  border-2 cursor-pointer "
										} w-full`}>
										Manage Company
									</span> */}
								</div>
							</div>

							<div>
								<div className="relative overflow-x-auto">
									{settingsTab === "Account" && (
										<InvoiceAccount
											setDatum={setData}
											setIsDelete={setIsDelete}
										/>
									)}

									{settingsTab === "Contact" && (
										<InvoiceContact
											setDatum={setData}
											setIsDelete={setIsDelete}
										/>
									)}

									{settingsTab === "Tags" && (
										<InvoiceTag setDatum={setData} setIsDelete={setIsDelete} />
									)}
									{settingsTab === "Email" && (
										<InvoiceEmail
											setDatum={setData}
											setIsDelete={setIsDelete}
										/>
									)}
									{settingsTab === "Code" && (
										<InvoiceCode setDatum={setData} setIsDelete={setIsDelete} />
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<InvoiceSettingsModal
				showModal={showModal}
				setShowModal={setShowModal}
				settingsTab={settingsTab}
				data={data}
				setData={setData}
			/>
			<ModalContainer
				title={`Delete ${
					settingsTab === "Tags"
						? "Tag"
						: settingsTab === "Contact"
						? "Contact"
						: settingsTab === "Code"
						? "Code"
						: settingsTab === "Email"
						? "Email"
						: "Bank Account"
				}`}
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
		</div>
	);
}

export default Invoicesetting;

const InvoiceTag = ({ setDatum, setIsDelete }) => {
	let [loading, setLoading] = useState(false),
		{ invoiceTag } = useSelector(state => state),
		dispatch = useDispatch();

	useEffect(() => {
		dispatch(manageInvoiceTag("get", null));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);
	useEffect(() => {
		setData(invoiceTag?.data);
	}, [invoiceTag?.data]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!invoiceTag?.data && !data) return <PageLoader />;
	if (!data) return;

	const currentItems = data?.docs?.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data?.docs.length / range);

	const handlePageClick = event => {
			const newOffset = (event.selected * range) % data?.docs.length;
			setItemOffset(newOffset);
			setPage(1 + event?.selected);
		},
		handleLoadMore = async () => {
			setLoading("loadmore");
			await dispatch(
				manageInvoiceTag("get", { limit: data?.limit * data?.nextPage })
			);
			setLoading(false);
		};

	return (
		<>
			{/* <MainRanger range={range} setRange={setRange} /> */}
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							Sr/No
						</th>
						<th scope="col" className="px-6 py-3">
							Tag Name
						</th>

						<th scope="col" className="px-6 py-3">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					<>
						{currentItems?.map((item, i) => (
							<tr
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
								key={i}>
								<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{i + 1}
								</td>
								<td className="px-6 py-4">{item?.name}</td>

								<td className="px-6 py-4">
									<ActionButton
										each={item}
										update={setDatum}
										remove={setIsDelete}
									/>
								</td>
							</tr>
						))}
					</>
				</tbody>
			</table>
			<div className="mt-4 flex justify-center">
				<LoadMore
					next={page === pageCount && data?.hasNextPage}
					loading={loading === "loadmore"}
					handleLoadMore={handleLoadMore}
				/>
			</div>
			<div className="mt-4 flex justify-center">
				{/* <Pagination /> */}
				<MainPaginate pageCount={pageCount} handlePageClick={handlePageClick} />
			</div>
		</>
	);
};

const InvoiceEmail = ({ setDatum, setIsDelete }) => {
	let [loading, setLoading] = useState(false),
		{ invoiceEmail } = useSelector(state => state),
		dispatch = useDispatch();

	useEffect(() => {
		dispatch(manageInvoiceEmail("get", null));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);
	useEffect(() => {
		setData(invoiceEmail?.data);
	}, [invoiceEmail?.data]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!invoiceEmail?.data && !data) return <PageLoader />;
	if (!data) return;

	const currentItems = data?.docs?.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data?.docs.length / range);

	const handlePageClick = event => {
			const newOffset = (event.selected * range) % data?.docs.length;
			setItemOffset(newOffset);
			setPage(1 + event?.selected);
		},
		handleLoadMore = async () => {
			setLoading("loadmore");
			await dispatch(
				manageInvoiceEmail("get", { limit: data?.limit * data?.nextPage })
			);
			setLoading(false);
		};

	return (
		<>
			{/* <MainRanger range={range} setRange={setRange} /> */}
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							Sr/No
						</th>
						<th scope="col" className="px-6 py-3">
							Invoice email
						</th>

						<th scope="col" className="px-6 py-3">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					<>
						{currentItems?.map((item, i) => (
							<tr
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
								key={i}>
								<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{i + 1}
								</td>
								<td className="px-6 py-4">{item?.email}</td>

								<td className="px-6 py-4">
									<ActionButton
										each={item}
										update={setDatum}
										remove={setIsDelete}
									/>
								</td>
							</tr>
						))}
					</>
				</tbody>
			</table>
			<div className="mt-4 flex justify-center">
				<LoadMore
					next={page === pageCount && data?.hasNextPage}
					loading={loading === "loadmore"}
					handleLoadMore={handleLoadMore}
				/>
			</div>
			<div className="mt-4 flex justify-center">
				{/* <Pagination /> */}
				<MainPaginate pageCount={pageCount} handlePageClick={handlePageClick} />
			</div>
		</>
	);
};

const InvoiceContact = ({ setDatum, setIsDelete }) => {
	let [loading, setLoading] = useState(false),
		{ invoiceContact } = useSelector(state => state),
		dispatch = useDispatch();

	useEffect(() => {
		dispatch(manageInvoiceContact("get", null));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);
	useEffect(() => {
		setData(invoiceContact?.data);
	}, [invoiceContact?.data]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!invoiceContact?.data && !data) return <PageLoader />;
	if (!data) return;

	const currentItems = data?.docs?.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data?.docs.length / range);

	const handlePageClick = event => {
			const newOffset = (event.selected * range) % data?.docs.length;
			setItemOffset(newOffset);
			setPage(1 + event?.selected);
		},
		handleLoadMore = async () => {
			setLoading("loadmore");
			await dispatch(
				manageInvoiceContact("get", { limit: data?.limit * data?.nextPage })
			);
			setLoading(false);
		};

	return (
		<>
			{/* <MainRanger range={range} setRange={setRange} /> */}
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-[10px]  lg:text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							Sr/No
						</th>
						<th scope="col" className="px-6 py-3">
							Name
						</th>
						<th scope="col" className="px-6 py-3">
							Email
						</th>
						<th scope="col" className="px-6 py-3">
							Address
						</th>
						<th scope="col" className="px-6 py-3">
							Attention
						</th>
						<th scope="col" className="px-6 py-3">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					<>
						{currentItems?.map((item, i) => (
							<tr
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
								key={i}>
								<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{i + 1}
								</td>
								<td className="px-6 py-4">{item?.name}</td>
								<td className="px-6 py-4">{item?.email}</td>

								<td className="px-6 py-4">{item?.address}</td>
								<td className="px-6 py-4">{item?.attention}</td>
								<td className="px-6 py-4">
									<ActionButton
										each={item}
										update={setDatum}
										remove={setIsDelete}
									/>
								</td>
							</tr>
						))}
					</>
				</tbody>
			</table>
			<div className="mt-4 flex justify-center">
				<LoadMore
					next={page === pageCount && data?.hasNextPage}
					loading={loading === "loadmore"}
					handleLoadMore={handleLoadMore}
				/>
			</div>
			<div className="mt-4 flex justify-center">
				{/* <Pagination /> */}
				<MainPaginate pageCount={pageCount} handlePageClick={handlePageClick} />
			</div>
		</>
	);
};

const InvoiceAccount = ({ setDatum, setIsDelete }) => {
	let [loading, setLoading] = useState(false),
		{ invoiceAccount } = useSelector(state => state),
		dispatch = useDispatch();

	useEffect(() => {
		dispatch(manageInvoiceAccount("get", null));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);
	useEffect(() => {
		setData(invoiceAccount?.data);
	}, [invoiceAccount?.data]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!invoiceAccount?.data && !data) return <PageLoader />;
	if (!data) return;

	const currentItems = data?.docs?.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data?.docs?.length / range);

	const handlePageClick = event => {
			const newOffset = (event.selected * range) % data?.docs?.length;
			setItemOffset(newOffset);
			setPage(1 + event?.selected);
		},
		handleLoadMore = async () => {
			setLoading("loadmore");
			await dispatch(
				manageInvoiceAccount("get", { limit: data?.limit * data?.nextPage })
			);
			setLoading(false);
		};

	return (
		<>
			{/* <MainRanger range={range} setRange={setRange} /> */}
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-[8px]  lg:text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							Sr/No
						</th>
						<th scope="col" className="px-6 py-3">
							Bank Name
						</th>
						<th scope="col" className="px-6 py-3">
							Account Name
						</th>
						<th scope="col" className="px-6 py-3">
							Sort Code
						</th>
						<th scope="col" className="px-6 py-3">
							TIN
						</th>
						<th scope="col" className="px-6 py-3">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					<>
						{currentItems?.map((item, i) => (
							<tr
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
								key={i}>
								<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{i + 1}
								</td>
								<td className="px-6 py-4">{item?.bankName}</td>

								<td className="px-6 py-4">{item?.bankAccountName}</td>
								<td className="px-6 py-4">{item?.bankSortCode}</td>
								<td className="px-6 py-4">{item?.bankTIN}</td>
								<td className="px-6 py-4">
									<ActionButton
										each={item}
										update={setDatum}
										remove={setIsDelete}
									/>
								</td>
							</tr>
						))}
					</>
				</tbody>
			</table>
			<div className="mt-4 flex justify-center">
				<LoadMore
					next={page === pageCount && data?.hasNextPage}
					loading={loading === "loadmore"}
					handleLoadMore={handleLoadMore}
				/>
			</div>
			<div className="mt-4 flex justify-center">
				{/* <Pagination /> */}
				<MainPaginate pageCount={pageCount} handlePageClick={handlePageClick} />
			</div>
		</>
	);
};

const InvoiceCode = ({ setDatum, setIsDelete }) => {
	let [loading, setLoading] = useState(false),
		{ invoiceCode } = useSelector(state => state),
		dispatch = useDispatch();

	useEffect(() => {
		dispatch(manageInvoiceCode("get", null));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);
	useEffect(() => {
		setData(invoiceCode?.data);
	}, [invoiceCode?.data]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!invoiceCode?.data && !data) return <PageLoader />;
	if (!data) return;

	const currentItems = data?.docs?.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data?.docs.length / range);

	const handlePageClick = event => {
			const newOffset = (event.selected * range) % data?.docs.length;
			setItemOffset(newOffset);
			setPage(1 + event?.selected);
		},
		handleLoadMore = async () => {
			setLoading("loadmore");
			await dispatch(
				manageInvoiceCode("get", { limit: data?.limit * data?.nextPage })
			);
			setLoading(false);
		};

	return (
		<>
			{/* <MainRanger range={range} setRange={setRange} /> */}
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							Sr/No
						</th>
						<th scope="col" className="px-6 py-3">
							Type
						</th>
						<th scope="col" className="px-6 py-3">
							Code
						</th>
						<th scope="col" className="px-6 py-3">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					<>
						{currentItems?.map((item, i) => (
							<tr
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
								key={i}>
								<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{i + 1}
								</td>
								<td className="px-6 py-4 capitalize">
									{
										InvoiceTemplateArray?.find(
											it => it?.template === item?.type
										)?.name
									}
								</td>
								<td className="px-6 py-4">{item?.code}</td>

								<td className="px-6 py-4">
									<ActionButton
										each={item}
										update={setDatum}
										remove={setIsDelete}
									/>
								</td>
							</tr>
						))}
					</>
				</tbody>
			</table>
			<div className="mt-4 flex justify-center">
				<LoadMore
					next={page === pageCount && data?.hasNextPage}
					loading={loading === "loadmore"}
					handleLoadMore={handleLoadMore}
				/>
			</div>
			<div className="mt-4 flex justify-center">
				{/* <Pagination /> */}
				<MainPaginate pageCount={pageCount} handlePageClick={handlePageClick} />
			</div>
		</>
	);
};

export const ActionButton = ({ update, remove, each, view }) => {
	return (
		<Option type={"horizontal"}>
			<div className="flex gap-4">
				{view ? (
					<IconContext.Provider value={{ color: "#000" }}>
						<AiFillEye onClick={() => view(each)} size={20} />
					</IconContext.Provider>
				) : null}
				{update ? (
					<IconContext.Provider value={{ color: "#2A72A8" }}>
						<AiFillEdit onClick={() => update(each)} size={20} />
					</IconContext.Provider>
				) : null}
				{remove ? (
					<IconContext.Provider value={{ color: "red" }}>
						<AiFillDelete onClick={() => remove(each)} size={20} />
					</IconContext.Provider>
				) : null}
			</div>
		</Option>
	);
};