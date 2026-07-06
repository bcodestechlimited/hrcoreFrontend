import React, { useState, useEffect, useContext } from "react";
// import { AiFillEye } from "react-icons/ai";
// import { BsPen, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Edit from "../../../assets/edit.svg";
import Delete from "../../../assets/delete.svg";
import { useSelector, useDispatch } from "react-redux";
import {
	manageInvoice,
	resetInvoiceSearch,
} from "../../../data/Reducers/InvoiceReducer";
import ModalContainer, {
	PageLoader,
} from "../../../components/modal-container/modal-container";
import { GlobalState } from "../../../data/Context";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../../components/pagination/pagination";
import moment from "moment";
import Button from "../../../components/button/button";

const Invoice = () => {
	const navigate = useNavigate(),
		[table, setTable] = useState("");

	let [loading, setLoading] = useState(false),
		{ invoice, auth } = useSelector(state => state),
		{ canAdmin, canApprove } = useContext(GlobalState),
		dispatch = useDispatch();

	const Arr = [
		{
			title: "total invoices",
			value: invoice?.all?.docs?.length || 0,
			bg: "rgba(44, 120, 198, 0.10)",
			border: "0.5px solid #0080C4",
		},
		{
			title: "open invoices",
			value:
				invoice?.all?.docs?.filter(el => el.status?.toLowerCase() === "open")
					.length || 0,
			bg: "rgba(27, 136, 0, 0.10)",
			border: " 0.5px solid #1B8800",
		},
		{
			title: "closed invoices",
			value:
				invoice?.all?.docs?.filter(el => el.status?.toLowerCase() === "closed")
					.length || 0,
			bg: "rgba(164, 41, 2, 0.10)",
			border: "0.5px solid #A42902",
		},
	];
	let tabs = [
		{
			name: "fleet management",
			table: "fleet",
		},
		{
			name: "recruitments",
			table: "recruitment",
		},
		{
			name: "unilever",
			table: "unilever",
		},
		{
			name: "legal and law",
			table: "legal",
		},
		{
			name: "training",
			table: "training",
		},
	];
	if (process.env.REACT_APP_NAME === "Cephas HR Core")
		tabs = [...tabs, { name: "Software Development", table: "client" }];

	useEffect(() => {
		dispatch(resetInvoiceSearch());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1),
		[search, setSearch] = useState(""),
		[privi, setPrivi] = useState(null);

	useEffect(() => {
		setPrivi(auth?.user?.isAdmin || canAdmin || canApprove);
	}, [canAdmin, canApprove, auth?.user]);

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				dispatch(resetInvoiceSearch());
			});
			let handleSubmit = async () => {
				if (!search) return;

				await dispatch(manageInvoice("get", { template: table, search }));
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		dispatch(manageInvoice("get", table ? { template: table } : null));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [table]);

	useEffect(() => {
		if (invoice?.isFound) setData(invoice?.mainSearch);
		else if (table === "fleet") setData(invoice?.fleet);
		else if (table === "recruitment") setData(invoice?.recruitment);
		else if (table === "unilever") setData(invoice?.unilever);
		else if (table === "training") setData(invoice?.training);
		else if (table === "legal") setData(invoice?.legal);
		else if (table === "client") setData(invoice?.client);
		else setData(invoice?.data);
	}, [
		invoice?.data,
		invoice?.mainSearch,
		invoice?.isFound,
		invoice?.legal,
		invoice?.fleet,
		invoice?.recruitment,
		invoice?.training,
		invoice?.unilever,
		invoice?.client,
		table,
	]);

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
				manageInvoice("get", {
					limit: data?.limit * data?.nextPage,
					template: table,
				})
			);
			setLoading(false);
		};

	return (
		<div className="bg-[#EFF6FC] w-full h-full py-8 px-4">
			<div className="flex w-5/6 justify-between items-center">
				<h1 className="text-base text-black font-semibold manrope ">Invoice</h1>
				{privi ? (
					<div className="gap-3">
						<button
							onClick={() => navigate("/finance/create-invoice")}
							className="bg-[#2C78C6] h-8 w-32 rounded-full font-semibold text-xs segoe text-white me-2">
							Create Invoice
						</button>
						<button
							onClick={() => navigate("/finance/invoice-setting")}
							className="bg-[#2C78C6] h-8 w-32 rounded-full font-semibold text-xs segoe text-white ms-2">
							Invoice Setting
						</button>
					</div>
				) : null}
			</div>
			<div className="w-5/6 mt-8 bg-white p-6 rounded-xl">
				<div className="grid lg:grid-cols-3 gap-5">
					{Arr.map(item => (
						<div
							style={{
								border: item.border,
								background: item.bg,
							}}
							className="h-20 rounded-xl p-4">
							<h2 className="text-xs manrope font-medium capitalize text-black">
								{item.title}
							</h2>
							<h3 className="text-2xl font-semibold manrope text-black pt-1">
								{item.value}
							</h3>
						</div>
					))}
				</div>
			</div>
			<div className="w-5/6 mt-4 bg-white p-6 rounded-xl">
				<div className="w-full grid grid-cols-5 gap-2">
					{tabs.map(item => (
						<div
							onClick={() => {
								setTable(item.table);
								if (search) {
									dispatch(resetInvoiceSearch());
								}
							}}
							className={
								table === item.table
									? "h-12 rounded-full cursor-pointer capitalize flex justify-center items-center bg-[#2C78C6] text-sm text-white font-normal manrope"
									: "h-12 rounded-full cursor-pointer capitalize flex justify-center items-center border text-sm text-[#034264] manrope border-[#0080C4]"
							}>
							{item.name}
						</div>
					))}
				</div>
			</div>
			<div className="w-5/6 mt-16 bg-white p-6 rounded-xl">
				<div className="flex justify-between items-center">
					<div>
						<input
							type="search"
							name="search"
							placeholder="Search"
							className="h-12 rounded-full capitalize border text-sm text-[#034264] manrope border-[#0080C4]"
							id="Search"
							value={search}
							onChange={e => setSearch(e?.target?.value)}
						/>
					</div>
					<div className="flex gap-4">
						{/* <button className="h-8 w-20 rounded-full cursor-pointer capitalize flex justify-center items-center border bg-[#2c78c61a] text-xs text-[#2C78C6] segoe border-[#0080C4]">
							Filter
						</button>
						<button className="h-8 w-20 rounded-full cursor-pointer capitalize flex justify-center items-center border bg-[#2c78c61a] text-xs text-[#2C78C6] segoe border-[#0080C4]">
							Export
						</button> */}
					</div>
				</div>
				<div className="mt-8">
					{/* <MainRanger range={range} setRange={setRange} /> */}
					<InvoiceTable currentItems={currentItems} />
					{/* {table === "fleet" && <FleetTable />} */}
					{/* {table === "recruitment" && <RecruitmentTable />} */}
					{/* {table === "unilever" && <UnileverTable />} */}
					{/* {table === "legal" && <LegalTable />} */}
					{/* {table === "training" && <TrainingTable />} */}
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
	);
};

const InvoiceTable = ({ currentItems }) => {
	const navigate = useNavigate();
	// const Arr = [
	// 	{
	// 		tags: "Fleet management",
	// 		created: "25/06/2023",
	// 		issue_date: "25/06/2023",
	// 		due_date: "25/06/2023",
	// 		open: true,
	// 		type: "fleet",
	// 	},
	// 	{
	// 		tags: "Unilever",
	// 		created: "25/06/2023",
	// 		issue_date: "25/06/2023",
	// 		due_date: "25/06/2023",
	// 		open: true,
	// 		type: "unilever",
	// 	},
	// 	{
	// 		tags: "Recruitment",
	// 		created: "25/06/2023",
	// 		issue_date: "25/06/2023",
	// 		due_date: "25/06/2023",
	// 		open: true,
	// 		type: "recruitment",
	// 	},
	// 	{
	// 		tags: "Legal",
	// 		created: "25/06/2023",
	// 		issue_date: "25/06/2023",
	// 		due_date: "25/06/2023",
	// 		open: true,
	// 		type: "legal",
	// 	},
	// 	{
	// 		tags: "training",
	// 		created: "25/06/2023",
	// 		issue_date: "25/06/2023",
	// 		due_date: "25/06/2023",
	// 		open: false,
	// 		type: "training",
	// 	},
	// ];

	let [loading, setLoading] = useState(false),
		{ invoice, auth } = useSelector(state => state),
		{ canAdmin, canApprove } = useContext(GlobalState),
		dispatch = useDispatch(),
		[isDelete, setDelete] = useState(null),
		[submit, setSubmit] = useState(null),
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading("delete");
			await dispatch(manageInvoice("delete", isDelete));
			setLoading(false);
			setSubmit(true);
		},
		[privi, setPrivi] = useState(null);

	useEffect(() => {
		setPrivi(canAdmin || canApprove || auth?.user?.isAdmin);
	}, [canAdmin, canApprove, auth?.user]);

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
				<thead className="text-xs text-gray-700 uppercase whitespace-nowrap bg-gray-50">
					<tr cl>
						<th scope="col" className="px-6 py-3 text-xs">
							S/N
						</th>
						{/* <th scope="col" className="px-6 py-3">
							Unique ID
						</th> */}
						<th scope="col" className="px-6 py-3 text-xs">
							Contact
						</th>
						{/* <th scope="col" className="px-6 py-3 text-xs">
							Created
						</th> */}
						<th scope="col" className="px-6 py-3 text-xs">
							Issue Date
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Due date
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Status
						</th>

						<th scope="col" className="px-6 py-3 text-xs">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{currentItems.map((item, i) => (
						<tr className="bg-white border-b text-xs" key={i}>
							<td className="px-6 py-4">{i + 1}</td>
							<td className="px-6 py-4">{item?.contacts?.[0]?.name}</td>
							<td className="px-6 py-4">
								{moment(item?.createdAt).format("DD/MM/YYYY")}
							</td>
							{/* <td className="px-6 py-4">{item?.issue_date}</td> */}
							<td className="px-6 py-4">
								{moment(item?.dueDate).format("DD/MM/YYYY")}
							</td>
							<td
								className={`px-6 py-4 ${
									["open", "sent"]?.includes(item?.status)
										? "text-[#1B8800]"
										: "text-[#A42902]"
								}`}>
								{item?.status}
							</td>
							<td className="px-6 py-4">
								{privi ? (
									<div className="flex">
										<img
											onClick={() =>
												navigate(
													`/finance/${item?.template || "invoices"}/${
														item?._id
													}`,
													{ state: item?._id }
												)
											}
											src={Edit}
											alt=""
											className="cursor-pointer"
										/>
										<img
											src={Delete}
											alt=""
											onClick={() => setDelete(item)}
											className="cursor-pointer"
										/>
									</div>
								) : null}
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

export const FleetTable = () => {
	const navigate = useNavigate();
	const Arr = [
		{
			tags: "Fleet management",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "fleet",
		},
		{
			tags: "Fleet management",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "fleet",
		},

		{
			tags: "Fleet management",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "fleet",
		},

		{
			tags: "Fleet management",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "fleet",
		},

		{
			tags: "Fleet management",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "fleet",
		},
	];
	return (
		<>
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase whitespace-nowrap bg-gray-50">
					<tr cl>
						<th scope="col" className="px-6 py-3 text-xs">
							S/N
						</th>
						{/* <th scope="col" className="px-6 py-3">
							Unique ID
						</th> */}
						<th scope="col" className="px-6 py-3 text-xs">
							Tags
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Created
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Issue Date
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Due date
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Status
						</th>

						<th scope="col" className="px-6 py-3 text-xs">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{Arr.map((item, i) => (
						<tr className="bg-white border-b text-xs">
							<td className="px-6 py-4">25</td>

							<td className="px-6 py-4 capitalize">{item?.tags}</td>
							<td className="px-6 py-4">{item?.created}</td>
							<td className="px-6 py-4">{item?.issue_date}</td>
							<td className="px-6 py-4">{item?.due_date}</td>
							<td
								className={`px-6 py-4 ${
									item.open ? "text-[#1B8800]" : "text-[#A42902]"
								}`}>
								{item.open ? "Open" : "Closed"}
							</td>
							<td className="px-6 py-4">
								<div className="flex">
									<img
										onClick={() => navigate(`/finance/${item?.type}/${i}`)}
										src={Edit}
										alt=""
										className="cursor-pointer"
									/>
									<img src={Delete} alt="" className="cursor-pointer" />
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export const RecruitmentTable = () => {
	const navigate = useNavigate();
	const Arr = [
		{
			tags: "Recruitment",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "recruitment",
		},

		{
			tags: "Recruitment",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "recruitment",
		},
		{
			tags: "Recruitment",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "recruitment",
		},
		{
			tags: "Recruitment",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "recruitment",
		},
		{
			tags: "Recruitment",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "recruitment",
		},
	];
	return (
		<>
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase whitespace-nowrap bg-gray-50">
					<tr cl>
						<th scope="col" className="px-6 py-3 text-xs">
							S/N
						</th>
						{/* <th scope="col" className="px-6 py-3">
							Unique ID
						</th> */}
						<th scope="col" className="px-6 py-3 text-xs">
							Tags
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Created
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Issue Date
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Due date
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Status
						</th>

						<th scope="col" className="px-6 py-3 text-xs">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{Arr.map((item, i) => (
						<tr className="bg-white border-b text-xs">
							<td className="px-6 py-4">25</td>

							<td className="px-6 py-4 capitalize">{item?.tags}</td>
							<td className="px-6 py-4">{item?.created}</td>
							<td className="px-6 py-4">{item?.issue_date}</td>
							<td className="px-6 py-4">{item?.due_date}</td>
							<td
								className={`px-6 py-4 ${
									item.open ? "text-[#1B8800]" : "text-[#A42902]"
								}`}>
								{item.open ? "Open" : "Closed"}
							</td>
							<td className="px-6 py-4">
								<div className="flex">
									<img
										onClick={() => navigate(`/finance/${item?.type}/${i}`)}
										src={Edit}
										alt=""
										className="cursor-pointer"
									/>
									<img src={Delete} alt="" className="cursor-pointer" />
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export const UnileverTable = () => {
	const navigate = useNavigate();
	const Arr = [
		{
			tags: "Unilever",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "unilever",
		},
		{
			tags: "Unilever",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "unilever",
		},
		{
			tags: "Unilever",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "unilever",
		},
		{
			tags: "Unilever",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "unilever",
		},
	];
	return (
		<>
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase whitespace-nowrap bg-gray-50">
					<tr cl>
						<th scope="col" className="px-6 py-3 text-xs">
							S/N
						</th>
						{/* <th scope="col" className="px-6 py-3">
							Unique ID
						</th> */}
						<th scope="col" className="px-6 py-3 text-xs">
							Tags
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Created
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Issue Date
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Due date
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Status
						</th>

						<th scope="col" className="px-6 py-3 text-xs">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{Arr.map((item, i) => (
						<tr className="bg-white border-b text-xs">
							<td className="px-6 py-4">25</td>

							<td className="px-6 py-4 capitalize">{item?.tags}</td>
							<td className="px-6 py-4">{item?.created}</td>
							<td className="px-6 py-4">{item?.issue_date}</td>
							<td className="px-6 py-4">{item?.due_date}</td>
							<td
								className={`px-6 py-4 ${
									item.open ? "text-[#1B8800]" : "text-[#A42902]"
								}`}>
								{item.open ? "Open" : "Closed"}
							</td>
							<td className="px-6 py-4">
								<div className="flex">
									<img
										onClick={() => navigate(`/finance/${item?.type}/${i}`)}
										src={Edit}
										alt=""
										className="cursor-pointer"
									/>
									<img src={Delete} alt="" className="cursor-pointer" />
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
export const LegalTable = () => {
	const navigate = useNavigate();
	const Arr = [
		{
			tags: "Legal",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "legal",
		},
		{
			tags: "Legal",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "legal",
		},
		{
			tags: "Legal",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "legal",
		},
		{
			tags: "Legal",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: true,
			type: "legal",
		},
	];
	return (
		<>
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase whitespace-nowrap bg-gray-50">
					<tr cl>
						<th scope="col" className="px-6 py-3 text-xs">
							S/N
						</th>
						{/* <th scope="col" className="px-6 py-3">
							Unique ID
						</th> */}
						<th scope="col" className="px-6 py-3 text-xs">
							Tags
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Created
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Issue Date
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Due date
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Status
						</th>

						<th scope="col" className="px-6 py-3 text-xs">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{Arr.map((item, i) => (
						<tr className="bg-white border-b text-xs">
							<td className="px-6 py-4">25</td>

							<td className="px-6 py-4 capitalize">{item?.tags}</td>
							<td className="px-6 py-4">{item?.created}</td>
							<td className="px-6 py-4">{item?.issue_date}</td>
							<td className="px-6 py-4">{item?.due_date}</td>
							<td
								className={`px-6 py-4 ${
									item.open ? "text-[#1B8800]" : "text-[#A42902]"
								}`}>
								{item.open ? "Open" : "Closed"}
							</td>
							<td className="px-6 py-4">
								<div className="flex">
									<img
										onClick={() => navigate(`/finance/${item?.type}/${i}`)}
										src={Edit}
										alt=""
										className="cursor-pointer"
									/>
									<img src={Delete} alt="" className="cursor-pointer" />
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
export const TrainingTable = () => {
	const navigate = useNavigate();
	const Arr = [
		{
			tags: "training",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: false,
			type: "training",
		},
		{
			tags: "training",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: false,
			type: "training",
		},
		{
			tags: "training",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: false,
			type: "training",
		},
		{
			tags: "training",
			created: "25/06/2023",
			issue_date: "25/06/2023",
			due_date: "25/06/2023",
			open: false,
			type: "training",
		},
	];
	return (
		<>
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase whitespace-nowrap bg-gray-50">
					<tr cl>
						<th scope="col" className="px-6 py-3 text-xs">
							S/N
						</th>
						{/* <th scope="col" className="px-6 py-3">
							Unique ID
						</th> */}
						<th scope="col" className="px-6 py-3 text-xs">
							Tags
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Created
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Issue Date
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Due date
						</th>
						<th scope="col" className="px-6 py-3 text-xs">
							Status
						</th>

						<th scope="col" className="px-6 py-3 text-xs">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{Arr.map((item, i) => (
						<tr className="bg-white border-b text-xs">
							<td className="px-6 py-4">25</td>

							<td className="px-6 py-4 capitalize">{item?.tags}</td>
							<td className="px-6 py-4">{item?.created}</td>
							<td className="px-6 py-4">{item?.issue_date}</td>
							<td className="px-6 py-4">{item?.due_date}</td>
							<td
								className={`px-6 py-4 ${
									item.open ? "text-[#1B8800]" : "text-[#A42902]"
								}`}>
								{item.open ? "Open" : "Closed"}
							</td>
							<td className="px-6 py-4">
								<div className="flex">
									<img
										onClick={() => navigate(`/finance/${item?.type}/${i}`)}
										src={Edit}
										alt=""
										className="cursor-pointer"
									/>
									<img src={Delete} alt="" className="cursor-pointer" />
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
export default Invoice;