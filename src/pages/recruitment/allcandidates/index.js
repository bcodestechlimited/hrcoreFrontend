import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../../components/pagination/pagination";
import { BiPencil } from "react-icons/bi";
import Search from "../../../components/search/search";
import FormName from "../../../components/form-name/form-name";
import { useState, useEffect } from "react";
import { manageJob } from "../../../data/Reducers/JobReducer";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { CandidateDetailModal } from "../../../components/alljobs/stage-body";
import Button from "../../../components/button/button";
import { AiFillEye } from "react-icons/ai";
import { PageLoader } from "../../../components/modal-container/modal-container";

const Allcandidates = () => {
	const [detail, setDetail] = useState(false);

	// const [downdata, setDowndata] = useState("second")
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	let drop_down_data = [
		{ name: "Newly applied", amount: 0 },
		{ name: "Shortlisted", amount: 0 },
		{ name: "Interview", amount: 0 },
		{ name: "Health check", amount: 0 },
		{ name: "Background check", amount: 0 },
		{ name: "Hired", amount: 0 },
	];

	// Function to toggle the dropdown
	const toggleDropdown = () => {
		setDropdownOpen(!isDropdownOpen);
	};
	const handleItemClick = item => {
		setSelectedItem(item); // Update the selected item
		toggleDropdown(); // Close the dropdown after selecting an item
	};

	let [loading, setLoading] = useState(false),
		{ job, company } = useSelector(state => state),
		[search, setSearch] = useState(""),
		[submit, setSubmit] = useState(false),
		dispatch = useDispatch();
	useEffect(() => {
		dispatch(manageJob("get", null, company?.currentSelected, "candidates"));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);

	useEffect(() => {
		setData(job?.candidates);
	}, [job?.candidates]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	useEffect(() => {
		if (submit && job?.isUpdated) {
			setSubmit(false);
			setSelectedItem("");
			setDetail(null);
		}
	}, [job?.isUpdated, submit]);

	if (!job?.candidates && !data) return <PageLoader />;
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
				manageJob(
					"get",
					{ limit: data?.limit * data?.nextPage, search },
					company?.currentSelected,
					"candidates"
				)
			);
			setLoading(false);
		},
		handleSearch = async e => {
			e?.preventDefault();
			setLoading("search");
			await dispatch(
				manageJob("get", { search }, company?.currentSelected, "candidates")
			);
			setLoading(false);
		};

	return (
		<div className="">
			<div className=" shadow-md sm:rounded-lg mt-10">
				<div className="p-4 flex items-center justify-between">
					<select
						id="countries"
						className="bg-gray-50 w-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
						<option selected>Bulk Commands</option>
						<option value="reset">Reset Password</option>
						<option value="disable">Disable</option>
						<option value="audit">Audit</option>
					</select>

					<div className="flex items-center gap-4 w-2/3 ">
						<Search
							value={search}
							onChange={setSearch}
							handleSubmit={handleSearch}
							loading={loading === "search"}
						/>
					</div>
				</div>
			</div>

			<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
				{/* <MainRanger range={range} setRange={setRange} /> */}
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50">
						<tr>
							<th scope="col" className="p-4">
								<div className="flex items-center">
									<input
										type="checkbox"
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
									/>
									<label for="checkbox-all-search" className="sr-only">
										checkbox
									</label>
								</div>
							</th>
							<th scope="col" className="px-6 py-3">
								Name
							</th>
							<th scope="col" className="px-6 py-3">
								Job/Department
							</th>
							<th scope="col" className="px-6 py-3">
								Date Applied
							</th>
							<th scope="col" className="px-6 py-3">
								Stages Passed
							</th>
							<th scope="col" className="px-6 py-3 mx-auto">
								Email address
							</th>

							<th scope="col" className="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{currentItems?.map((item, i) => (
							<tr key={i} className="bg-white border-b text-xs">
								<td className="w-4 p-4">
									<div className="flex items-center">
										<input
											type="checkbox"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
										/>
										<label for="checkbox-all-search" className="sr-only">
											checkbox
										</label>
									</div>
								</td>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
									<FormName item={item} name={item?.name} />
								</th>
								<td className="px-6 py-4">{item?.job?.name}</td>
								<td className="px-6 py-4">
									{item?.createdAt &&
										moment(item?.createdAt).format("DD/MM/YYYY")}
								</td>
								<td className="px-6 py-4">{item?.stagesPassed}</td>
								<td className="px-6 py-4">{item?.email}</td>
								<td className="" onClick={() => setDetail(item)}>
									<div className="flex justify-center items-center">
										<AiFillEye color="#000" size={20} />
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
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
				<MainPaginate pageCount={pageCount} handlePageClick={handlePageClick} />
			</div>

			<CandidateDetailModal detail={detail} setDetail={setDetail}>
				<h2 className="text-xl  flex  items-center gap-3">
					<span className="text-[#2A72A8] font-bold   text-3xl">
						Current Status:
					</span>

					<div>
						<div className="relative">
							{/* Parent span */}
							<span className="font-medium text-[#DC298A] flex items-center">
								<span> {selectedItem || detail?.status}</span>{" "}
								<span className="ms-3" onClick={toggleDropdown}>
									<BiPencil />
								</span>
								{/* Display selected item */}
								{selectedItem && (
									<Button
										buttonType={"primary"}
										title={"Update"}
										type="button"
										width={"w-fit ms-2"}
										loading={loading === "update"}
										onClick={async e => {
											e?.preventDefault();
											setLoading("update");
											await dispatch(
												manageJob(
													"put",
													{
														_id: detail?._id,
														status: selectedItem,
													},
													company?.currentSelected,
													"candidate"
												)
											);
											setLoading(false);
											setSubmit(true);
										}}
									/>
								)}
							</span>

							{/* Dropdown */}
							{isDropdownOpen && (
								<div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
									{/* Dropdown content */}
									<ul className="py-2 px-3">
										{drop_down_data.map((item, i) => (
											<li
												className="cursor-pointer hover:bg-gray-100 mb-3"
												key={i}
												onClick={() => handleItemClick(item?.name || item)} // Handle item click
											>
												{item?.name || item}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</div>
				</h2>
			</CandidateDetailModal>
		</div>
	);
};

export default Allcandidates;
