import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { manageVoucherAccount } from "../../data/Reducers/VoucherAccountReducer";
import ModalContainer, { PageLoader } from "../../components/modal-container/modal-container";
import {
	LoadMore,
	MainPaginate,
	// MainRanger
} from "../../components/pagination/pagination";
import { ActionButton } from "./invoice-setting";
import Button from "../../components/button/button";
import InvoiceSettingsModal from "../../components/finance/invoice-settings-modal";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BankVoucher = () => {
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
		{ voucherAccount } = useSelector(state => state),
		[submit, setSubmit] = useState(null);

	const handleSubmit = async e => {
		e?.preventDefault();

		setLoading(true);
		if (settingsTab === "Account")
			await dispatch(manageVoucherAccount("delete", isDelete));
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
		if (voucherAccount?.isAdded && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, voucherAccount?.isAdded]);

	return (
		<div>
			<div className="flex justify-center font-normal text-[13px]">
				<div className="w-[90%]  xl:w-[80%]  2xl:w-[65%]">
					<div className="flex items-center cursor-pointer ml-2">
						<span onClick={() => navigate("/finance/voucher")}>Voucher</span>
						<MdOutlineKeyboardArrowRight />

						<span>Voucher Setting</span>
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
										: "Bank"}
								</span>
							</div>

							<div className=" shadow-md sm:rounded-lg mt-10 mb-5 hidden">
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
										<VoucherAccount
											setDatum={setData}
											setIsDelete={setIsDelete}
										/>
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
				voucher={"voucher"}
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
};

export default BankVoucher;

const VoucherAccount = ({ setDatum, setIsDelete }) => {
	let [loading, setLoading] = useState(false),
		{ voucherAccount } = useSelector(state => state),
		dispatch = useDispatch();

	useEffect(() => {
		dispatch(manageVoucherAccount("get", null));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);
	useEffect(() => {
		setData(voucherAccount?.data);
	}, [voucherAccount?.data]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!voucherAccount?.data && !data) return <PageLoader />;
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
				manageVoucherAccount("get", { limit: data?.limit * data?.nextPage })
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
						<th scope="col" className="px-6 py-3 hidden">
							Account Name
						</th>
						<th scope="col" className="px-6 py-3 hidden">
							Sort Code
						</th>
						<th scope="col" className="px-6 py-3 hidden">
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

								<td className="px-6 py-4 hidden">{item?.bankAccountName}</td>
								<td className="px-6 py-4 hidden">{item?.bankSortCode}</td>
								<td className="px-6 py-4 hidden">{item?.bankTIN}</td>
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