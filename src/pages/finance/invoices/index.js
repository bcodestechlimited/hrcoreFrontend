import React, { useState, useEffect, useContext } from "react";
import Search from "../../../components/search/search";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../../components/pagination/pagination";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { manageInvoice } from "../../../data/Reducers/InvoiceReducer";
import moment from "moment";
import { GlobalState } from "../../../data/Context";
import { AiFillEye } from "react-icons/ai";
import { BsPen, BsTrash } from "react-icons/bs";
import ModalContainer, {
	PageLoader,
} from "../../../components/modal-container/modal-container";
import Button from "../../../components/button/button";

function Invoice() {
	const navigate = useNavigate();

	const InvoiceGeneratorHeader = ({ title, datavalue }) => {
		return (
			<div className="bg bg-white    w-full  2xl:w-[270px] rounded-xl py-5 h-[150px] shadow-xl p-4 cursor-pointer mb-5">
				<div className="bg-white  text-base 2xl:text-[2rem] w-full  text-center lg:py-7 lg:px-6  py-5 px-3  2xl:py-16 2xl:px-10">
					<p className=" font-semibold   2xl:mb-2 text-base "> {title}</p>
					<div className="bg-[#EAEAEA] py-1 border rounded mt-1 2xl:py-4 lg:py-2 lg:px-4 font-semibold  text-base">
						<p className=""> {datavalue}</p>{" "}
					</div>
				</div>
			</div>
		);
	};

	let [loading, setLoading] = useState(false),
		{ invoice, auth } = useSelector(state => state),
		{ canAdmin, canApprove } = useContext(GlobalState),
		dispatch = useDispatch(),
		[search, setSearch] = useState("");

	useEffect(() => {
		dispatch(manageInvoice("get", null));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);
	useEffect(() => {
		if (invoice?.isFound) setData(invoice?.mainSearch);
		else setData(invoice?.data);
	}, [invoice?.data, invoice?.mainSearch, invoice?.isFound]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!invoice?.data && !data) return <PageLoader />;
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
				manageInvoice("get", { limit: data?.limit * data?.nextPage, search })
			);
			setLoading(false);
		},
		handleSearch = async e => {
			e?.preventDefault();
			setLoading("search");
			await dispatch(manageInvoice("get", { search }));
			setLoading(false);
		};

	return (
		<div>
			<div className="flex  justify-center">
				<div className="  w-[90%] ">
					<h2 className="  font-semibold  text-xl mb-3 2xl:text-[2rem] 2xl:mb-5">
						Invoice
					</h2>
					<div className="flex justify-between gap-2   lg:w-[70%]   2xl:gap-4  ">
						<InvoiceGeneratorHeader
							title="Total Invoices"
							datavalue={invoice?.all?.docs?.length}
						/>
						<InvoiceGeneratorHeader
							title="Closed Invoices"
							// datavalue={1}
							datavalue={
								invoice?.all?.docs?.filter(
									el => el.status?.toLowerCase() === "closed"
								).length
							}
						/>
						<InvoiceGeneratorHeader
							title="Open Invoices"
							// datavalue={1}
							datavalue={
								invoice?.all?.docs?.filter(
									el => el.status?.toLowerCase() === "open"
								).length
							}
						/>
					</div>
					<div className="mt-5">
						<div className="employeedirtable__body">
							<div className="">
								<div className=" shadow-md sm:rounded-lg mt-10 mb-5 ">
									<div className="p-4 flex items-center justify-between">
										<div className="flex items-center gap-2 w-[40%] ">
											<Search
												value={search}
												onChange={setSearch}
												handleSubmit={handleSearch}
												loading={loading === "search"}
											/>
										</div>

										{/* <select
											id="countries"
											className="bg-gray-50 w-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
											<option selected>Bulk Commands</option>
											<option value="reset">Reset Password</option>
											<option value="disable">Disable</option>
											<option value="audit">Audit</option>
										</select> */}
										{canAdmin || canApprove || auth?.user?.isAdmin ? (
											<>
												<div>
													<button
														class="bg-[#E6E6E6] text-[10px] py-2 px-2  lg:text-base   lg:py-2  lg:px-4 rounded"
														onClick={() =>
															navigate("/finance/invoice-setting")
														}>
														Invoice Settings
													</button>
												</div>

												<div>
													<button
														onClick={() => navigate("/finance/create-invoices")}
														class="bg-[#2A72A8] text-[10px] py-2 px-2 lg:text-base text-white   lg:py-2  lg:px-4 rounded">
														Create Invoice
													</button>
												</div>
											</>
										) : null}
									</div>
								</div>

								<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
									{/* <MainRanger range={range} setRange={setRange} /> */}
									<InvoiceTable currentItems={currentItems} />
								</div>

								<div className="mt-4 flex justify-center">
									<LoadMore
										next={page === pageCount && data?.hasNextPage}
										loading={loading === "loadmore"}
										handleLoadMore={handleLoadMore}
									/>
								</div>
								<div className="mt-4 flex justify-center">
									{/* <Pagination /> */}
									<MainPaginate
										pageCount={pageCount}
										handlePageClick={handlePageClick}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Invoice;

export const InvoiceTable = ({ currentItems }) => {
	let { numberWithCommas, canAdmin, canApprove } = useContext(GlobalState),
		{ invoice, auth } = useSelector(state => state),
		[isDelete, setDelete] = useState(null),
		[loading, setLoading] = useState(null),
		[submit, setSubmit] = useState(null),
		dispatch = useDispatch(),
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading(true);
			await dispatch(manageInvoice("delete", isDelete));
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (invoice?.isDeleted && submit) {
			setSubmit(false);
			setDelete(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [invoice?.isDeleted, submit]);

	return (
		<>
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50">
					<tr>
						<th scope="col" className="px-6 py-3">
							S/N
						</th>
						{/* <th scope="col" className="px-6 py-3">
							Unique ID
						</th> */}
						<th scope="col" className="px-6 py-3">
							Contact
						</th>
						<th scope="col" className="px-6 py-3">
							Issue Date
						</th>
						<th scope="col" className="px-6 py-3">
							Due_date
						</th>
						<th scope="col" className="px-6 py-3">
							Status
						</th>
						<th scope="col" className="px-6 py-3">
							Total
						</th>

						<th scope="col" className="px-6 py-3">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{currentItems?.map((item, i) => (
						<tr key={i} className="bg-white border-b text-xs">
							<td className="px-6 py-4">{i + 1}</td>

							{/* <td className="px-6 py-4">{item?.invoiceId}</td> */}
							<td className="px-6 py-4">{item?.contacts?.[0]?.name}</td>
							<td className="px-6 py-4">
								{moment(item?.createdAt).format("DD/MM/YYYY")}
							</td>
							<td className="px-6 py-4">
								{moment(item?.dueDate).format("DD/MM/YYYY")}
							</td>
							<td className="px-6 py-4">{item?.status}</td>
							<td className="px-6 py-4">
								₦{" "}
								{numberWithCommas(
									Number(
										item?.items?.reduce(
											(ac, i) => (ac += i?.price * i?.quantity),
											0
										) || 0
									).toFixed(2)
								)}
							</td>
							<td className="px-6 py-4">
								<div className="flex">
									<span className="cursor-pointer">
										<Link
											to={`/finance/invoices/${item?._id}`}
											state={item?._id}>
											<AiFillEye size={20} />
										</Link>
									</span>
									{canAdmin || canApprove || auth?.user?.isAdmin ? (
										<>
											<span className="cursor-pointer px-3">
												<Link to={`/finance/update-invoice`} state={item?._id}>
													<BsPen size={20} />
												</Link>
											</span>
											<span
												className="cursor-pointer"
												onClick={() => setDelete(item)}>
												<BsTrash className="text-red-700" size={20} />
											</span>
										</>
									) : null}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<ModalContainer
				title={"Delete Invoice"}
				width={"max-w-sm"}
				show={isDelete ? true : false}
				close={() => setDelete(null)}>
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
									onClick={() => setDelete(null)}
								/>
							</div>
						</div>
					</form>
				</div>
			</ModalContainer>
		</>
	);
};
