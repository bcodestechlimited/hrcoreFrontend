import React, { useState, useEffect, useContext, useRef } from "react";
import Addbutton from "../../components/button/addbutton";
import Search from "../../components/search/search";
import { IconContext } from "react-icons";
import { AiFillDelete, AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import DeleteGif from "../../assets/delete.gif";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
// import { GlobalState } from "../../data/Context";
import {
	managePerformance,
	resetPerformanceSearch,
} from "../../data/Reducers/PerformanceReducer";
import Button from "../../components/button/button";
import { GlobalState } from "../../data/Context";
import ModalContainer, {
	PageLoader,
} from "../../components/modal-container/modal-container";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../components/pagination/pagination";
import moment from "moment";
import {
	managePerformanceReview,
	resetPerformanceReviewSearch,
} from "../../data/Reducers/PerformanceReviewReducer";
import { returnErrors } from "../../data/Reducers/ErrorReducer";
import FormName from "../../components/form-name/form-name";
// import { BsPen, BsTrash } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import Logo2 from "../../assets/Cephas.png";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import Input from "../../components/input/input";
export const createMarkup = html => {
	return {
		__html: DOMPurify.sanitize(html),
	};
};

let gradeData = [
		{ minimumScore: 0, maximumScore: 20, grade: "Poor", short: "F" },
		{
			minimumScore: 21,
			maximumScore: 39,
			grade: "Below Expectation",
			short: "E",
		},
		{ minimumScore: 40, maximumScore: 59, grade: "Average", short: "D" },
		{ minimumScore: 60, maximumScore: 79, grade: "Commendable", short: "C" },
		{ minimumScore: 80, maximumScore: 90, grade: "Excellent", short: "B" },
		{ minimumScore: 91, maximumScore: 100, grade: "Outstanding", short: "A" },
	],
	scoreData = [
		{ grade: "Poor", score: 1 },
		{
			grade: "Below Expectation",
			score: 2,
		},
		{ grade: "Average", score: 3 },
		{ grade: "Commendable", score: 4 },
		{ grade: "Excellent", score: 5 },
	],
	recommendationData = [
		{ value: "Promotion" },
		{ value: "Salary Increment" },
		{ value: "Additional Responsibility" },
		{ value: "Others" },
	];

const Performance = () => {
	const [performanceTab, setPerformanceTab] = useState("my");
	const navigate = useNavigate();

	let { auth } = useSelector(s => s),
		{ canManager1, canManager2 } = useContext(GlobalState),
		[privi, setPrivi] = useState(null);

	useEffect(() => {
		setPrivi(auth?.user?.isAdmin || canManager1 || canManager2);
	}, [canManager2, canManager1, auth?.user]);
	// console.log({ canManager1, canManager2 });
	return (
		<div className="relative bg-[#EFF6FC] min-h-[100vh]">
			<div className="flex items-center font-bold  p-3">
				<p className="text-[#667085]">Performance</p>
				<p className="text-[#667085] mx-4">
					<LiaGreaterThanSolid />
				</p>
				<p>Performance Appraisal</p>
			</div>
			<div className="flex justify-between items-center px-3">
				<div className="my-10 md:w-3/4 xl:w-1/2 grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-5">
					<button
						onClick={() => setPerformanceTab("my")}
						className={`${
							performanceTab === "my"
								? "bg-black shadow-xl text-white"
								: "bg-white shadow-xl text-black"
						} h-12 inter text-sm capitalize font-semibold rounded-lg px-2`}>
						My Evaluation
					</button>
					<button
						onClick={() => setPerformanceTab("guide")}
						className={`${
							performanceTab === "guide"
								? "bg-black shadow-xl text-white"
								: "bg-white shadow-xl text-black"
						} h-12 inter text-sm capitalize font-semibold rounded-lg px-2`}>
						Evaluation Guide
					</button>
					{privi ? (
						<button
							onClick={() => setPerformanceTab("employee")}
							className={`${
								performanceTab === "employee"
									? "bg-black shadow-xl text-white"
									: "bg-white shadow-xl text-black"
							} h-12  inter text-sm font-semibold rounded-lg px-2`}>
							Employees Evaluation
						</button>
					) : null}
					{auth?.user?.isAdmin ? (
						<button
							onClick={() => setPerformanceTab("list")}
							className={`${
								performanceTab === "list"
									? "bg-black shadow-xl text-white"
									: "bg-white shadow-xl text-black"
							} h-12  inter text-sm font-semibold rounded-lg px-2`}>
							Evaluation List
						</button>
					) : null}
				</div>
				{auth?.user?.isAdmin ? (
					<Addbutton
						background={"bg-secondary"}
						onClick={() => navigate("/performance/add-evaluation")}
						text={"Add New Evaluation"}
						add={true}
					/>
				) : null}
			</div>

			{performanceTab === "employee" && <Employees />}
			{performanceTab === "my" && <MyEvaluation type={"self_score"} />}
			{performanceTab === "list" && <EvaluationList />}
			{performanceTab === "guide" && <EvaluationGuide />}
		</div>
	);
};

export const Employees = () => {
	const [modal, setModal] = useState(false);
	// const Arr = [
	// 	{
	// 		name: "Olivia rhye",
	// 		department: "design",
	// 		project: "HR app development",
	// 		performance: "100",
	// 		task: "design homepage",
	// 	},
	// 	{
	// 		name: "Olivia rhye",
	// 		department: "design",
	// 		project: "HR app development",
	// 		performance: "100",
	// 		task: "design homepage",
	// 	},
	// 	{
	// 		name: "Olivia rhye",
	// 		department: "design",
	// 		project: "HR app development",
	// 		performance: "100",
	// 		task: "design homepage",
	// 	},
	// 	{
	// 		name: "Olivia rhye",
	// 		department: "design",
	// 		project: "HR app development",
	// 		performance: "100",
	// 		task: "design homepage",
	// 	},
	// 	{
	// 		name: "Olivia rhye",
	// 		department: "design",
	// 		project: "HR app development",
	// 		performance: "100",
	// 		task: "design homepage",
	// 	},
	// ];

	let [loading, setLoading] = useState(false),
		{ performanceReview, position } = useSelector(state => state),
		{ canManager1, canManager2, auth } = useContext(GlobalState),
		[search, setSearch] = useState(""),
		dispatch = useDispatch();

	let [data, setData] = useState(null),
		[page, setPage] = useState(1),
		[positionSelect, setPositionSelect] = useState(null),
		[positionSelected, setPositionSelected] = useState(null);

	useEffect(() => {
		if (performanceReview?.isFound) setData(performanceReview?.mainSearch);
		else {
			let mainData = performanceReview?.all || performanceReview?.data;

			let newDocs = mainData?.docs;
			if (!auth?.user?.isAdmin)
				if (canManager1 || canManager2) {
					let g1 =
							auth?.user?.gradeForPosition1 ||
							auth?.user?.profile?.gradeForPosition1 ||
							[],
						g2 =
							auth?.user?.gradeForPosition2 ||
							auth?.user?.profile?.gradeForPosition2 ||
							[],
						newGrade = [...new Set([...g1, ...g2])];
					setPositionSelect(newGrade);
					newDocs = newDocs?.filter(it => newGrade?.includes(it?.position));
					newDocs = newDocs?.filter(
						it => it?.createdBy?._id !== auth?.user?._id
					);
					if (positionSelected)
						newDocs = newDocs?.filter(it => it?.position === positionSelected);
				}
			mainData = {
				...mainData,
				docs: auth?.user?.isAdmin ? mainData?.docs : newDocs,
			};
			setData(mainData);
		}
	}, [
		performanceReview?.all,
		performanceReview?.data,
		performanceReview?.mainSearch,
		performanceReview?.isFound,
		canManager1,
		canManager2,
		auth?.user,
		positionSelected,
	]);

	useEffect(() => {
		dispatch(managePerformanceReview("get", null));
		dispatch(resetPerformanceReviewSearch());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [range] = useState(10),
		[isEvaluate, setIsEvaluate] = useState(null),
		[isDelete, setDelete] = useState(null),
		[loading2, setLoading2] = useState(null),
		[submit, setSubmit] = useState(null),
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading2(true);
			await dispatch(
				managePerformanceReview("delete", isDelete, isDelete?._id)
			);
			setLoading2(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (performanceReview?.isDeleted && submit) {
			setSubmit(false);
			setDelete(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [performanceReview?.isDeleted, submit]);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!performanceReview?.data && !data) return <PageLoader />;
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
				managePerformanceReview("get", {
					limit: data?.limit * data?.nextPage,
					search,
				})
			);
			setLoading(false);
		},
		handleSearch = async e => {
			e?.preventDefault();
			setLoading("search");
			await dispatch(managePerformanceReview("get", { search }));
			setLoading(false);
		};

	return (
		<div>
			{isEvaluate ? (
				<>
					<MyEvaluation
						type={
							auth?.user?.isAdmin ||
							(canManager2 &&
								auth?.user?.gradeForPosition2?.includes(isEvaluate?.position))
								? "manager_score2"
								: auth?.user?.isAdmin ||
								  (canManager1 &&
										auth?.user?.gradeForPosition1?.includes(
											isEvaluate?.position
										))
								? "manager_score"
								: ""
						}
						user={isEvaluate?._id}
						isEvaluate={isEvaluate}
						manager_score={
							auth?.user?.isAdmin ||
							(canManager1 &&
								auth?.user?.gradeForPosition1?.includes(isEvaluate?.position))
						}
						manager_score2={
							auth?.user?.isAdmin ||
							(canManager2 &&
								auth?.user?.gradeForPosition2?.includes(isEvaluate?.position))
						}
					/>
				</>
			) : (
				<div className="mt-8">
					<div className="p-4 flex items-center justify-between">
						{/* <select
							id="countries"
							class="bg-gray-50 w-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
							<option selected>Bulk Commands</option>
							<option value="reset">Reset Password</option>
							<option value="disable">Disable</option>
							<option value="audit">Audit</option>
						</select> */}
						<span></span>
						<div className="flex items-center gap-4 w-2/3">
							<Search
								value={search}
								onChange={setSearch}
								handleSubmit={handleSearch}
								loading={loading === "search"}
							/>
						</div>
					</div>
					<div className="w-full">
						{/* <MainRanger range={range} setRange={setRange} /> */}
						{positionSelect && (
							<div className="flex justify-end my-3">
								<Input
									label={""}
									type={"select"}
									name="positionSelected"
									onChange={e => setPositionSelected(e?.target?.value)}
									value={positionSelected}
									options={[
										...positionSelect?.map(it => {
											return {
												value: it,
												name: position?.all?.docs?.find(ic => ic?._id === it)
													?.name,
											};
										}),
									]}
								/>
							</div>
						)}
						<table className="w-full">
							<thead className="text-xs manrope text-[#667085] text-left font-medium capitalize bg-[#F9FAFB] border-b border-b-[#EAECF0]">
								<tr>
									<th scope="col" className="p-4">
										S/N
									</th>
									<th scope="col" className="px-4 py-3">
										Name
									</th>
									<th scope="col" className="px-4 py-3">
										Employee ID
									</th>
									<th scope="col" className="px-4 py-3">
										Department
									</th>
									<th scope="col" className="px-4 py-3">
										Position
									</th>
									<th scope="col" className="px-4 py-3">
										Role
									</th>
									<th scope="col" className="px-4 py-3">
										Email Address
									</th>
									<th scope="col" className="px-4 py-3">
										Phone Number
									</th>
									<th scope="col" className="px-4 py-3">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{currentItems?.map((item, i) => (
									<>
										{/* <tr
										key={i}
										className="text-sm inter text-left font-normal capitalize text-[#667085] inter border-b border-b-[#EAECF0]">
										<td className="w-8 pr-4 pl-2 py-4">
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
										<td className="flex p-4 h-full items-center gap-3 text-[#101828] inter font-medium text-sm">
											{" "}
											<img
												class="w-10 h-10 border-2 border-[#F72585] rounded-full"
												src={require("../../assets/photo-2.png")}
												alt=""
											/>
											<p className="">{item.name}</p>
										</td>
										<td className="pr-3">{item.department}</td>
										<td className="pr-3">{item.project}</td>
										<td className="pr-3">{item.performance}%</td>
										<td className="pr-3">{item.task}</td>
										<td className="px-3 cursor-pointer">
											<IconContext.Provider value={{ color: "#2A72A8" }}>
												<AiFillEye onClick={i => setModal(true)} size={20} />
											</IconContext.Provider>
										</td>
									</tr> */}
										<tr
											// onClick={() => setIsEvaluate(item)}
											key={i}
											className="text-sm inter text-left font-normal capitalize text-[#667085] inter border-b border-b-[#EAECF0] cursor-pointer">
											<td className="w-8 pr-4 pl-2 py-4">{i + 1}</td>
											<td className="flex p-4 h-full items-center gap-3 text-[#101828] inter font-medium text-sm">
												<FormName
													item={
														item?.createdBy?.profile?._id
															? item?.createdBy?.profile || item?.createdBy
															: item?.createdBy
													}
												/>
											</td>
											<td className="pr-3">
												{item?.createdBy?.profile?.employeeId ||
													item?.createdBy?.employeeId}
											</td>
											<td className="pr-3">
												{item?.createdBy?.profile?.department?.name ||
													item?.createdBy?.department?.name}
											</td>
											<td className="pr-3">
												{item?.createdBy?.profile?.position?.name ||
													item?.createdBy?.position?.name}
											</td>
											<td className="pr-3">
												{item?.createdBy?.profile?.type ||
													item?.createdBy?.type}
											</td>
											<td className="pr-3 lowercase">
												{item?.createdBy?.profile?.email ||
													item?.createdBy?.email}
											</td>
											<td className="pr-3">
												{item?.createdBy?.profile?.phone ||
													item?.createdBy?.phone}
											</td>
											<td className="pr-3">
												{/* <div className="flex">
													<>
														<span className="cursor-pointer px-3">
															<BsPen
																size={20}
																onClick={() => setIsEvaluate(item)}
																/>
														</span>
														<span
															className="cursor-pointer"
															onClick={() => setDelete(item)}
															>
															<BsTrash className="text-red-700" size={20} />
														</span>
													</>
												</div> */}
												<div className="flex">
													<img
														onClick={() => setIsEvaluate(item)}
														src={Edit}
														alt=""
														className="cursor-pointer"
													/>
													<img
														onClick={() => setDelete(item)}
														src={Delete}
														alt=""
														className="cursor-pointer"
													/>
												</div>
											</td>
										</tr>
									</>
								))}
							</tbody>
						</table>
						<div className="hidden">
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
			)}
			{modal && <EmployeeModal handleClose={() => setModal(false)} />}
			<ModalContainer
				title={"Delete Performance Review"}
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
									loading={loading2}
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
		</div>
	);
};

export const EvaluationList = () => {
	let [loading, setLoading] = useState(false),
		{ performance, department } = useSelector(state => state),
		dispatch = useDispatch(),
		[search, setSearch] = useState(""),
		[filterDept, setFilterDept] = useState(null);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);
	useEffect(() => {
		if (performance?.isFound) setData(performance?.mainSearch);
		else if (filterDept) {
			setData({
				...performance?.data,
				docs: performance?.data?.docs?.filter(
					it => it?.department?._id === filterDept
				),
			});
		} else setData(performance?.data);
	}, [
		performance?.data,
		performance?.mainSearch,
		performance?.isFound,
		filterDept,
	]);

	let [range] = useState(10),
		[isDelete, setDelete] = useState(null),
		[loading2, setLoading2] = useState(null),
		[submit, setSubmit] = useState(null),
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading2(true);
			await dispatch(managePerformance("delete", isDelete, isDelete?._id));
			setLoading2(false);
			setSubmit(true);
		},
		navigate = useNavigate();

	useEffect(() => {
		if (performance?.isDeleted && submit) {
			setSubmit(false);
			setDelete(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [performance?.isDeleted, submit]);

	useEffect(() => {
		dispatch(managePerformance("get", null));
		dispatch(resetPerformanceSearch());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!performance?.data && !data) return <PageLoader />;
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
				managePerformance("get", {
					limit: data?.limit * data?.nextPage,
					search,
				})
			);
			setLoading(false);
		},
		handleSearch = async e => {
			e?.preventDefault();
			setLoading("search");
			await dispatch(managePerformance("get", { search }));
			setLoading(false);
		};

	return (
		<div>
			<div className="mt-8">
				<div className="p-4 flex items-center justify-between">
					<select
						id="department"
						value={filterDept}
						onChange={e => setFilterDept(e?.target?.value)}
						class="bg-gray-50 w-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
						<option value="">Filter by Department</option>
						{department?.all?.docs?.map((it, i) => (
							<option key={i} value={it?._id}>
								{it?.name}
							</option>
						))}
					</select>
					<div className="flex items-center gap-4 w-2/3">
						<Search
							value={search}
							onChange={setSearch}
							handleSubmit={handleSearch}
							loading={loading === "search"}
						/>
					</div>
				</div>
				<div className="w-full">
					{/* <MainRanger range={range} setRange={setRange} /> */}
					<table className="w-full">
						<thead className="text-xs manrope text-[#667085] text-left font-medium capitalize bg-[#F9FAFB] border-b border-b-[#EAECF0]">
							<tr>
								<th scope="col" className="p-3">
									S/N
								</th>
								<th scope="col" className="px-4 py-3">
									Title
								</th>
								<th scope="col" className="pr-4 py-3">
									Department
								</th>
								<th scope="col" className="pr-4 py-3">
									Position
								</th>
								<th scope="col" className="pr-4 py-3">
									Review Period
								</th>
								<th scope="col" className="pr-4 py-3">
									Date added
								</th>
								<th scope="col" className="pr-4 py-3">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{currentItems?.map((item, i) => (
								<tr
									key={i}
									className="text-sm inter text-left font-normal capitalize text-[#667085] inter border-b border-b-[#EAECF0]">
									<td className="w-8 pr-4 pl-2 py-4">{i + 1}</td>
									<td className="flex p-4 h-full items-center gap-3 text-[#101828] inter font-medium text-sm">
										{" "}
										<p className="">{item?.name}</p>
									</td>
									<td className="pr-3">{item?.department?.name}</td>
									<td className="pr-3">{item?.position?.name}</td>
									<td className="pr-3">{item?.reviewPeriod}</td>
									<td className="pr-3">
										{moment(item?.createdAt).format("DD/MM/YYYY")}
									</td>
									<td className="pr-3">
										{/* <div className="flex">
											<>
												<span className="cursor-pointer px-3">
													<Link to={`/performance/add-evaluation`} state={item}>
														<BsPen size={20} />
													</Link>
												</span>
												<span
													className="cursor-pointer"
													onClick={() => setDelete(item)}>
													<BsTrash className="text-red-700" size={20} />
												</span>
											</>
										</div> */}
										<div className="flex">
											<img
												onClick={() =>
													navigate(`/performance/add-evaluation`, {
														state: item,
													})
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
									</td>
								</tr>
							))}
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
						<MainPaginate
							pageCount={pageCount}
							handlePageClick={handlePageClick}
						/>
					</div>
				</div>
			</div>
			<ModalContainer
				title={"Delete Performance"}
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
									loading={loading2}
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
		</div>
	);
};

const EmployeeModal = ({ handleClose }) => {
	const [deleteModal, setDeleteModal] = useState(false);
	const navigate = useNavigate();
	const Arr = [
		{
			info: [
				{
					title: "Employee",
					description: "George William",
				},
				{
					title: "Task Given",
					description: "Create Onboarding Screens",
				},
				{
					title: "date given",
					description: "03/04/2023",
				},
				{
					title: "date submitted",
					description: "04/04/2023",
				},
				{
					title: "date evaluated",
					description: "05/04/2023",
				},
			],
			ratings: [
				{
					title: "efficeincy",
					description: "5",
				},
				{
					title: "timeliness",
					description: "5",
				},
				{
					title: "accuracy",
					description: "5",
				},
				{
					title: "excellence",
					description: "5",
				},
				{
					title: "performance average",
					description: "100",
				},
				{
					title: "remarks",
					description: "A good job done,there is room for improvement",
				},
			],
		},
	];
	return (
		<div>
			<div className="absolute bg-main bg-opacity-30 backdrop-blur-lg flex justify-center items-center inset-0">
				<div className="w-1/2 bg-white rounded-sm p-8">
					<div className="flex justify-between border-b-main border-b pb-4 items-center">
						<p className="text-main text-sm manrope font-medium">
							Employee Evaluation Details
						</p>
						<div className="cursor-pointer">
							<IconContext.Provider value={{ color: "2A72A8" }}>
								<AiOutlineClose onClick={handleClose} size={20} />
							</IconContext.Provider>
						</div>
					</div>
					<div className="flex mt-6 justify-between items-center">
						<div>
							<img
								class="w-20 h-20  rounded-full"
								src={require("../../assets/photo-2.png")}
								alt=""
							/>
							<div className="mt-8">
								{Arr.map((item, i) => (
									<div key={i} className="space-y-4">
										{item.info.map((item, i) => (
											<div className="" key={i}>
												<h6 className="text-xs font-semibold text-black nunito uppercase">
													{item.title}
												</h6>
												<p className="text-[11px] text-[#1b1b1b] capitalize text-opacity-80 nunito font-normal">
													{item.description}
												</p>
											</div>
										))}
									</div>
								))}
							</div>
						</div>
						<div className="">
							<h5 className="text-xs font-semibold text-[#393F93] uppercase">
								ratings
							</h5>
							<div className="mt-6">
								{Arr.map((item, i) => (
									<div key={i} className="space-y-4">
										{item.ratings.map((item, i) => (
											<div key={i} className="">
												<h6 className="text-xs font-semibold text-black nunito uppercase">
													{item.title}
												</h6>
												<p className="text-[11px] w-40 text-[#1b1b1b] capitalize text-opacity-80 nunito font-normal">
													{item.description}
												</p>
											</div>
										))}
									</div>
								))}
							</div>
							{/* <div className="flex gap-4">
                <div>
                  <IconContext.Provider>
                    <AiFillEdit size={20} />
                  </IconContext.Provider>
                </div>
                <div>
                  <IconContext.Provider>
                    <AiFillDelete size={20} />
                  </IconContext.Provider>
                </div>
              </div> */}
							<div className="flex gap-4 mt-4 float-right cursor-pointer">
								<IconContext.Provider value={{ color: "#2A72A8" }}>
									<AiFillEdit
										onClick={() => navigate("/performance/edit-evaluation")}
										size={20}
									/>
								</IconContext.Provider>
								<IconContext.Provider value={{ color: "red" }}>
									<AiFillDelete
										size={20}
										onClick={() => setDeleteModal(true)}
									/>
								</IconContext.Provider>
							</div>
						</div>
					</div>
					<div className="flex justify-center mt-10">
						<button
							onClick={handleClose}
							className="w-32 rounded-md h-10 manrope text-sm font-normal bg-main text-white">
							Close
						</button>
					</div>
				</div>
			</div>
			{deleteModal && <DeleteModal handleClose={() => setDeleteModal(false)} />}
		</div>
	);
};

export const MyEvaluation = ({
	type,
	user,
	isEvaluate,
	manager_score,
	manager_score2,
}) => {
	const [formInfo, setFormInfo] = useState(null);
	let [data, setData] = useState(null),
		[updater, setUpdater] = useState(null),
		[mainTotal, setMainTotal] = useState(null),
		[grader, setGrader] = useState(""),
		[managerLength, setManagerLength] = useState(0),
		[formLength, setFormLength] = useState(0);
	const handleKpi = (event, formIndex, kpiIndex) => {
		const newInputs = [...formInfo];
		let { name, value } = event.target;
		// newInputs[formIndex].subTitle[kpiIndex][name] = value;
		let clonedObject = { ...newInputs[formIndex].subTitle[kpiIndex] };
		clonedObject = { ...clonedObject, [name]: value };

		let arr1 = [
			...newInputs[formIndex].subTitle?.map((it, i) =>
				i === kpiIndex ? clonedObject : it
			),
		];
		let newArr = arr1?.map(ww => {
			let we = Number(ww?.manager_score || 0) + Number(ww?.manager_score2 || 0),
				we2 = Number(ww?.manager_score || 0);
			let newW = managerLength > 1 ? we / 2 : we2;
			return { ...ww, weighted_score: newW * ww?.weight };
		});
		let total = newArr?.reduce((ac, i) => (ac += Number(i?.[type] || 0)), 0);
		let total2 = newArr?.reduce(
			(ac, i) => (ac += Number(i?.weighted_score || 0)),
			0
		);
		let total3 = newArr?.reduce((ac, i) => (ac += Number(i?.weight || 0)), 0);
		// let total4 = newArr?.reduce(
		// 	(ac, i) => (ac += Number(i?.self_score || 0)),
		// 	0
		// );
		// console.log({ arr1, total, newArr, total2 });
		let arr2 = [
			...newInputs?.map((it, i) =>
				i === formIndex
					? {
							...it,
							subTitle: newArr,
							[type]: total,
							weighted_score: total2,
							weight: total3,
							// self_score: total4,
					  }
					: it
			),
		];
		setFormInfo(arr2);
	};

	useEffect(() => {
		if (formInfo?.length > 0) {
			setMainTotal({
				weight: formInfo?.reduce?.((ac, i) => (ac += i?.weight || 0), 0),
				self_score: formInfo?.reduce?.(
					(ac, i) => (ac += i?.self_score || 0),
					0
				),
				manager_score: formInfo?.reduce?.(
					(ac, i) => (ac += i?.manager_score || 0),
					0
				),
				manager_score2: formInfo?.reduce?.(
					(ac, i) => (ac += i?.manager_score2 || 0),
					0
				),
				weighted_score: formInfo?.reduce?.(
					(ac, i) => (ac += i?.weighted_score || 0),
					0
				),
			});
			setFormLength(
				formInfo?.reduce((a, c) => (a += Number(c?.subTitle?.length || 0)), 0)
			);
		}
	}, [formInfo]);

	useEffect(() => {
		if (mainTotal) {
			let dd = mainTotal,
				gradeScore = 0;
			if (dd?.weighted_score) {
				gradeScore = (dd?.weighted_score / 500) * 100;

				let finder = gradeData?.find(
					item =>
						Math.floor(gradeScore) >= Math.floor(item?.minimumScore) &&
						Math.floor(gradeScore) <= Math.floor(item?.maximumScore)
				);
				if (finder) setGrader(finder?.grade);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mainTotal]);

	// console.log({ mainTotal });

	const handleFormTitle = (event, formIndex) => {
		const newFormInput = [...formInfo];
		let { name, value } = event.target;
		newFormInput[formIndex][name] = value;
	};
	let { performance, auth, performanceReview, staff } = useSelector(s => s),
		[loading, setLoading] = useState(null),
		dispatch = useDispatch(),
		[remarks, setRemark] = useState(""),
		[manager1Remark, setManager1Remark] = useState(""),
		[staffRemarkForManager1, setstaffRemarkForManager1] = useState(""),
		[lineManager1Recommendation, setlineManager1Recommendation] = useState(""),
		[staffRemarkForManager2, setstaffRemarkForManager2] = useState(""),
		[lineManager2Recommendation, setlineManager2Recommendation] = useState(""),
		[manager2Remark, setManager2Remark] = useState("");

	useEffect(() => {
		dispatch(managePerformance("get", null));
		dispatch(managePerformanceReview("get", null));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (staff?.all || staff?.data) {
			let mainArr = staff?.all?.docs || staff?.data?.docs;
			let mainPerfArr = performance?.all?.docs || performance?.data?.docs;
			// console.log({ isEvaluate, user });
			let findDept = mainArr
				?.filter(it => it?.gradeForPosition1?.length > 0)
				?.filter(it => {
					let posi = null;
					if (isEvaluate) posi = isEvaluate?.performance?.position;
					else {
						let findPosi = mainPerfArr?.find(it => {
							let dept =
								auth?.user?.profile?.department?._id ||
								auth?.user?.department?._id;
							if (isEvaluate) dept = isEvaluate?.department;
							let posi =
								auth?.user?.profile?.position?._id || auth?.user?.position?._id;
							if (isEvaluate) dept = isEvaluate?.department;
							if (isEvaluate) posi = isEvaluate?.position;
							let dd = it?.department?._id === dept;
							let pp = it?.position?._id === posi;
							// console.log({ dd, dept, isEvaluate }, "performance");
							return dd && pp;
						});
						if (findPosi) {
							// console.log({ findPosi });
							posi = findPosi?.position?._id;
						}
					}
					let pp = it?.gradeForPosition1?.includes(posi);
					console.log(
						{
							posi,
							gradeForPosition1: it?.gradeForPosition1,
							pp,
						},
						"staff"
					);
					return it?.gradeForPosition1?.includes(posi);
				});
			console.log({ findDept });

			if (findDept?.length > 0) {
				setManagerLength(1);
				let findDept2 = mainArr
					?.filter(it => it?.gradeForPosition2?.length > 0)
					?.filter(it => {
						let posi = null;
						if (isEvaluate) posi = isEvaluate?.performance?.position;
						else {
							let findPosi = mainPerfArr?.find(it => {
								let dept =
									auth?.user?.profile?.department?._id ||
									auth?.user?.department?._id;
								if (isEvaluate) dept = isEvaluate?.department;
								let posi =
									auth?.user?.profile?.position?._id ||
									auth?.user?.position?._id;
								if (isEvaluate) dept = isEvaluate?.department;
								if (isEvaluate) posi = isEvaluate?.position;
								let dd = it?.department?._id === dept;
								let pp = it?.position?._id === posi;
								// console.log({ dd, dept, isEvaluate }, "performance");
								return dd && pp;
							});
							if (findPosi) {
								// console.log({ findPosi });
								posi = findPosi?.position?._id;
							}
						}
						let pp2 = it?.gradeForPosition2?.includes(posi);
						console.log(
							{
								posi,
								pp2,
								gradeForPosition2: it?.gradeForPosition2,
							},
							"staff"
						);
						return it?.gradeForPosition2?.includes(posi);
					});
				console.log({ findDept2 });
				if (findDept2?.length > 0) setManagerLength(2);
			}
		}
	}, [
		staff?.all,
		auth?.user,
		isEvaluate,
		performance?.all,
		staff?.data,
		performance?.data,
	]);
	// console.log({ managerLength });

	useEffect(() => {
		if (performance?.all || performance?.data) {
			let mainPerfArr = performance?.all?.docs || performance?.data?.docs;
			let mainPerfReviewArr =
				performanceReview?.all?.docs || performanceReview?.data?.docs;

			// console.log({ isEvaluate, user });
			let findDept = mainPerfArr?.find(it => {
				let dept =
					auth?.user?.profile?.department?._id || auth?.user?.department?._id;
				if (isEvaluate) dept = isEvaluate?.department;
				let posi =
					auth?.user?.profile?.position?._id || auth?.user?.position?._id;
				if (isEvaluate) dept = isEvaluate?.department;
				if (isEvaluate) posi = isEvaluate?.position;
				let dd = it?.department?._id === dept;
				let pp = it?.position?._id === posi;
				// console.log({ dd, dept, isEvaluate }, "performance");
				return dd && pp;
			});
			if (findDept) {
				setData(findDept);
				setFormInfo(findDept?.sections);
				let findRef = mainPerfReviewArr?.find(it => {
					let dept =
						auth?.user?.profile?.department?._id || auth?.user?.department?._id;
					if (isEvaluate) dept = isEvaluate?.department;
					let posi =
						auth?.user?.profile?.position?._id || auth?.user?.position?._id;
					if (isEvaluate) dept = isEvaluate?.department;
					if (isEvaluate) posi = isEvaluate?.position;
					let dd = it?.department === dept;
					let pp = it?.position === posi,
						ff = it?.createdBy?._id === auth?.user?._id;
					// console.log({ ff, dd, dept, isEvaluate }, " performanceReview");
					return user ? it?._id === user : dd && ff && pp;
				});
				if (findRef) {
					setUpdater(findRef);

					let mappedSection = [];

					for (let s = 0; s < findDept?.sections.length; s++) {
						const element = findDept?.sections[s];
						let findOther = findRef?.sections?.find(
							it => it?.queId === element?.queId
						);
						if (findOther) {
							let newSubTitle = [];
							for (let ts = 0; ts < element?.subTitle.length; ts++) {
								const elementSub = element?.subTitle[ts];
								let findOtherSub = findOther?.subTitle?.find(
									it => it?.kpiId === elementSub?.kpiId
								);
								if (findOtherSub) {
									newSubTitle?.push({
										...findOtherSub,
										kpiname: elementSub?.kpiname,
										weight: elementSub?.weight,
									});
								} else {
									newSubTitle?.push(elementSub);
								}
							}
							mappedSection?.push({
								...findOther,
								subTitle: newSubTitle,
								title: element?.title,
								weight: element?.weight,
							});
						} else {
							mappedSection?.push(element);
						}
					}
					// console.log({
					// 	mappedSection,
					// 	main: findDept?.sections,
					// 	review: findRef?.sections,
					// });
					setFormInfo(mappedSection);
					setRemark(findRef?.remarks);
					setManager1Remark(findRef?.manager1Remark);
					setstaffRemarkForManager1(findRef?.staffRemarkForManager1);
					setlineManager1Recommendation(findRef?.lineManager1Recommendation);
					setManager2Remark(findRef?.manager2Remark);
					setstaffRemarkForManager2(findRef?.staffRemarkForManager2);
					setlineManager2Recommendation(findRef?.lineManager2Recommendation);
				}
			}
		}
	}, [
		performance?.all,
		auth?.user,
		user,
		performanceReview?.all,
		isEvaluate,
		performance?.data,
		performanceReview?.data,
	]);

	const handleRemark = (event, editor, seti) => {
		let remark1 = editor.getData();
		if (seti) seti(remark1);
		else setRemark(remark1);
	};

	const handleSubmit = async event => {
		event.preventDefault();

		let errArr = [];

		for (let e = 0; e < formInfo.length; e++) {
			let element = formInfo?.[e];

			// console.log({ element });
			for (let o = 0; o < element?.subTitle.length; o++) {
				let elementOption = element?.subTitle?.[o];
				if (!elementOption?.[type])
					errArr.push({
						message: `Question ${
							element?.title || e + 1 || ""
						} Sub Evaluation (${
							elementOption?.kpiname || o + 1 || ""
						}) ${type?.replace("_", " ")} is required`,
						path: type,
					});
				if (elementOption?.[type]) {
					if (Number(elementOption?.[type]) < Number(1))
						errArr.push({
							message: `Question ${
								element?.title || e + 1 || ""
							} Sub Evaluation (${
								elementOption?.kpiname || o + 1 || ""
							}) ${type?.replace(
								"_",
								" "
							)} value is less than the required weight(${1})`,
							path: type,
						});
					if (Number(elementOption?.[type]) > Number(5))
						errArr.push({
							message: `Question ${
								element?.title || e + 1 || ""
							} Sub Evaluation (${
								elementOption?.kpiname || o + 1 || ""
							}) ${type?.replace(
								"_",
								" "
							)} value is greater than the required weight(${5})`,
							path: type,
						});
				}
			}
		}

		// console.log({ returnedData });
		if (errArr?.length > 0) return dispatch(returnErrors({ error: errArr }));

		setLoading(true);
		let datum = {
			sections: formInfo,
			department: data?.department?._id,
			performance: data?._id,
			remarks: remarks || "",
			position: data?.position?._id,
		};
		if (updater) {
			datum = {
				...datum,
				lineManager2Recommendation: lineManager2Recommendation || "",
				lineManager1Recommendation: lineManager1Recommendation || "",
				staffRemarkForManager2: staffRemarkForManager2 || "",
				staffRemarkForManager1: staffRemarkForManager1 || "",
				manager1Remark: manager1Remark || "",
				manager2Remark: manager2Remark || "",
			};
		}
		console.log({ datum });
		await dispatch(
			managePerformanceReview(updater ? "put" : "post", datum, updater?._id)
		);
		setLoading(false);
	};
	// console.log({ type }, "eval");
	let ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		documentTitle: `${data?.name || ""}-${moment(
			data?.reviewPeriod || ""
		).format("DD/MM/YYYY")}`,
		bodyClass: "px-4 py-10",
	});

	if (!performance?.data) return <PageLoader />;
	console.log({ type });
	return (
		<div>
			{data ? (
				<form onSubmit={handleSubmit} className="bg-white py-3 px-5" ref={ref}>
					<div className="mt-2 flex justify-between items-center">
						<img
							className="w-[200px] h-[115px]"
							src={
								process.env.REACT_APP_NAME
									? Logo2
									: require("../../assets/Logo FA 1.png")
							}
							alt=""
						/>
						<p className="font-bold text-xl">ICS OUTSOURCING</p>
					</div>
					<div
						className="pt-1 pb-3"
						style={{
							borderBottomColor: "#CCCCCC",
							borderBottomWidth: "2px",
							borderTopColor: "#CCCCCC",
							borderTopWidth: "2px",
						}}>
						<div className="flex justify-between">
							<p className="font-bold text-xl uppercase">{data?.name}</p>
							{/* <p className="text-xl font-semibold">ICS 0013C</p> */}
						</div>
						<p className="mt-5 text-xl">
							Review Period:{" "}
							<span className="text-xl font-bold uppercase">
								{data?.reviewPeriod}
							</span>
						</p>
						{updater && (
							<p className="text-xl">
								Staff:{" "}
								<span className="text-xl font-bold">
									{updater?.createdBy?.profile?.lastName ||
										updater?.createdBy?.lastName}{" "}
									{updater?.createdBy?.profile?.firstName ||
										updater?.createdBy?.firstName}
								</span>
							</p>
						)}
						<div className="flex justify-between">
							<p className="text-xl">DEPT - {data?.department?.name}</p>

							<p className="text-xl font-bold text-[#0681CD]">
								ROLE:{" "}
								<span className="text-xl font-bold">
									{updater?.createdBy?.profile?.position?.name ||
										updater?.createdBy?.position?.name ||
										data?.position?.name}{" "}
								</span>
							</p>
						</div>
					</div>
					{formInfo?.map((each, formIndex) => (
						<div
							key={formIndex}
							className="mt-8 shadow-md pl-4 pb-4 page-break">
							<div className=" flex justify-between">
								<div className="w-[45%] print:w-[40%]"></div>
								<div className="flex justify-around w-[50%] print:w-[58%]">
									<p className="font-bold text-xs">Weight(%)</p>
									<p className="font-bold text-xs">
										Self
										<span className="print:hidden"> score</span>
									</p>
									<p
										className={`font-bold text-xs ${
											managerLength > 0 ? "" : "hidden"
										}`}>
										Manager <span className="print:hidden"> score</span>
										{managerLength > 1 ? " 1" : ""}
									</p>
									<p
										className={`font-bold text-xs ${
											managerLength > 1 ? "" : "hidden"
										}`}>
										Manager <span className="print:hidden"> score</span> 2
									</p>
									<p className="font-bold text-xs">
										Total <span className="print:hidden"> score</span>
									</p>
								</div>
							</div>
							<div className="flex justify-between items-center">
								<div className="w-[45%] print:w-[40%]">
									<div className="flex px-3 py-1 bg-[#F9FFFF] w-full font-bold items-center">
										<p className="mr-1">{formIndex + 1}.</p>
										{/* <input
											type="text"
											name="title"
											onChange={event => handleFormTitle(event, formIndex)}
											className="border-none outline-none w-full"
											readOnly
											value={each?.title}
										/> */}
										<p className="py-3">{each?.title}</p>
									</div>
								</div>
								<div className="flex justify-around w-[50%] print:w-[58%]">
									<input
										type="tel"
										name="weight"
										onChange={event => handleFormTitle(event, formIndex)}
										className="w-[75px] mt-1 print:w-[60px]  border-[#CCCCCC] rounded-xl text-center"
										readOnly
										value={each?.weight}
									/>
									<input
										type="tel"
										name="self_score"
										onChange={event => handleFormTitle(event, formIndex)}
										className="w-[75px] mt-1 print:w-[60px]  border-[#CCCCCC] rounded-xl text-center"
										readOnly
										value={each?.self_score}
									/>
									<input
										type="tel"
										name="manager_score"
										onChange={event => handleFormTitle(event, formIndex)}
										className={`w-[75px] mt-1 print:w-[60px]  border-[#CCCCCC] rounded-xl text-center ${
											managerLength > 0 ? "" : "hidden"
										}`}
										readOnly
										value={each?.manager_score}
									/>
									<input
										type="tel"
										name="manager_score2"
										onChange={event => handleFormTitle(event, formIndex)}
										className={`w-[75px] mt-1 print:w-[60px]  border-[#CCCCCC] rounded-xl text-center ${
											managerLength > 1 ? "" : "hidden"
										}`}
										readOnly
										value={each?.manager_score2}
									/>
									<input
										type="tel"
										name="weighted_score"
										onChange={event => handleFormTitle(event, formIndex)}
										className="w-[75px] mt-1 print:w-[60px]  border-[#CCCCCC] rounded-xl text-center"
										readOnly
										value={each?.weighted_score}
									/>
								</div>
							</div>
							<div className="pl-5">
								{/* <p className="text-sm my-2">
										KEY PERFORMANCE INDICATOR (KPI)
									</p> */}
								<>
									{each?.subTitle?.map((item, kpiIndex) => (
										<div key={kpiIndex} className="w-full my-2">
											<div className="flex justify-between items-center">
												<div className="w-[45%] border rounded-xl print:w-[40%]">
													<div className="flex px-3 py-1 w-full font-bold items-center">
														<p className="mr-1">{kpiIndex + 1}.</p>
														{/* <input
															type="text"
															name="kpiname" // Unique name attribute
															onChange={event =>
																handleKpi(event, formIndex, kpiIndex)
															}
															className="border-none outline-none w-full"
															readOnly
															value={item?.kpiname}
														/> */}
														<p className="border-none outline-none w-full">
															{item?.kpiname}
														</p>
													</div>
												</div>
												<div className="flex justify-around w-[50%] print:w-[58%]">
													<input
														type="tel"
														name="weight" // Unique name attribute
														onChange={event =>
															handleKpi(event, formIndex, kpiIndex)
														} // Call handleKpi when input changes
														className="w-[75px] mt-1 print:w-[60px]  border-[#CCCCCC] rounded-xl text-center"
														readOnly
														value={item?.weight}
													/>
													<input
														value={item?.self_score}
														min={1}
														max={5}
														type="number"
														name="self_score" // Unique name attribute
														onChange={event =>
															handleKpi(event, formIndex, kpiIndex)
														} // Call handleKpi when input changes
														className="w-[75px] mt-1 print:w-[60px]  border-[#CCCCCC] rounded-xl text-center"
														readOnly={[
															"manager_score",
															"manager_score2",
														]?.includes(type)}
													/>
													<input
														min={1}
														max={5}
														value={item?.manager_score}
														type="number"
														name="manager_score" // Unique name attribute
														onChange={event =>
															handleKpi(event, formIndex, kpiIndex)
														} // Call handleKpi when input changes
														className={`w-[75px] mt-1 print:w-[60px]  border-[#CCCCCC] rounded-xl text-center ${
															managerLength > 0 ? "" : "hidden"
														}`}
														readOnly={[
															"self_score",
															"manager_score2",
														]?.includes(type)}
													/>
													<input
														value={item?.manager_score2}
														min={1}
														max={5}
														type="number"
														name="manager_score2" // Unique name attribute
														onChange={event =>
															handleKpi(event, formIndex, kpiIndex)
														} // Call handleKpi when input changes
														className={`w-[75px] mt-1 print:w-[60px]  border-[#CCCCCC] rounded-xl text-center ${
															managerLength > 1 ? "" : "hidden"
														}`}
														readOnly={["self_score", "manager_score"]?.includes(
															type
														)}
													/>
													<input
														value={item?.weighted_score}
														max={Number(item?.weight)}
														type="number"
														readOnly
														name="weighted_score" // Unique name attribute
														onChange={event =>
															handleKpi(event, formIndex, kpiIndex)
														} // Call handleKpi when input changes
														className="w-[75px] mt-1 print:w-[60px]  border-[#CCCCCC] rounded-xl text-center"
													/>
												</div>
											</div>
										</div>
									))}
								</>
							</div>
						</div>
					))}
					{mainTotal && (
						<div className="mt-8 shadow-md pl-4 pb-4 page-break">
							<div className="flex justify-between py-5">
								<div className="w-[45%] print:w-[40%]">
									<div className="flex px-3 py-1 bg-[#F9FFFF] w-full font-bold items-center">
										<input
											type="text"
											name="total"
											// onChange={event => handleFormTitle(event, formIndex)}
											className="border-none outline-none w-full"
											readOnly
											value={"Total"}
										/>
									</div>
								</div>
								<div className="flex justify-around w-[50%] print:w-[58%]">
									{Object.keys(mainTotal)?.map((it, i) => (
										// <div className="font-bold text-xl" key={i}>
										// 	{/* {`${it?.replace("_", " ")}`}:  */}
										// 	{mainTotal?.[it]}
										// </div>
										<input
											type="tel"
											name={it}
											key={i}
											// onChange={event => handleFormTitle(event, formIndex)}
											className={`w-[75px] print:w-[60px]  mt-1 border-[#CCCCCC] rounded-xl text-center text-xl font-bold print:text-md ${
												["manager_score2"]?.includes(it)
													? it === "manager_score2" && managerLength > 1
														? ""
														: "hidden"
													: ""
											} ${
												["manager_score"]?.includes(it)
													? it === "manager_score" && managerLength > 0
														? ""
														: "hidden"
													: ""
											}
											`}
											readOnly
											value={mainTotal?.[it]}
										/>
									))}
								</div>
							</div>
							{/* {grader && (
								<h2 className="text-2xl manrope text-[#013468] font-semibold text-right py-5">
									{grader}
								</h2>
							)} */}
						</div>
					)}

					<div className="flex flex-col lg:flex-row w-full gap-6">
						<div className="lg:w-[70%] order-last lg:order-first ">
							<div className="page-break">
								<p className="text-md mt-5">Staff Remarks</p>
								<div className="print:hidden">
									{["self_score"]?.includes(type) && (
										<CKEditor
											editor={ClassicEditor}
											data={remarks}
											onReady={editor => {
												// You can store the "editor" and use when it is needed.
												console.log("Editor is ready to use!", editor);
											}}
											onChange={(event, editor) => handleRemark(event, editor)}
											onBlur={(event, editor) => {
												console.log("Blur.", editor);
											}}
											onFocus={(event, editor) => {
												console.log("Focus.", editor);
											}}
										/>
									)}
								</div>
								<div
									className={`${
										["self_score"]?.includes(type)
											? "hidden"
											: "block border border-[#CCCCCC] p-4 rounded-xl"
									} print:block print:border print:border-[#CCCCCC] print:p-4 print:rounded-xl`}
									dangerouslySetInnerHTML={createMarkup(remarks)}
								/>
							</div>
							<div
								className={`page-break ${managerLength > 0 ? "" : "hidden"}`}>
								<p className="text-md mt-5">Manager 1 Remarks</p>
								<div className="print:hidden">
									{["manager_score"]?.includes(type) && (
										<>
											<CKEditor
												editor={ClassicEditor}
												data={manager1Remark}
												onReady={editor => {
													// You can store the "editor" and use when it is needed.
													console.log("Editor is ready to use!", editor);
												}}
												onChange={(event, editor) =>
													handleRemark(event, editor, setManager1Remark)
												}
												onBlur={(event, editor) => {
													console.log("Blur.", editor);
												}}
												onFocus={(event, editor) => {
													console.log("Focus.", editor);
												}}
											/>
											<Input
												label={"Recommendation"}
												type={"select"}
												name="lineManager1Recommendation"
												onChange={e =>
													setlineManager1Recommendation(e?.target?.value)
												}
												value={lineManager1Recommendation}
												options={recommendationData}
											/>
										</>
									)}
								</div>
								<div
									className={`${
										["manager_score"]?.includes(type)
											? "hidden"
											: "block border border-[#CCCCCC] p-4 rounded-xl"
									} print:block print:border print:border-[#CCCCCC] print:p-4 print:rounded-xl`}
									dangerouslySetInnerHTML={createMarkup(manager1Remark)}
								/>
								{lineManager1Recommendation && (
									<div
										className={`${
											["manager_score"]?.includes(type)
												? "hidden"
												: "block border border-[#CCCCCC] p-4 rounded-xl my-3"
										} print:block print:border print:border-[#CCCCCC] print:p-4 print:rounded-xl`}>
										Recommendation: {lineManager1Recommendation}
									</div>
								)}
							</div>
							{manager1Remark && (
								<div
									className={`page-break ${managerLength > 0 ? "" : "hidden"}`}>
									<p className="text-md mt-5">
										Staff Remark To Manager 1 Remarks
									</p>
									<div className="print:hidden">
										{["self_score"]?.includes(type) && (
											<>
												<AcceptReject
													value={staffRemarkForManager1}
													setValue={setstaffRemarkForManager1}
												/>
												{staffRemarkForManager1 !== "Accepted" && (
													<CKEditor
														editor={ClassicEditor}
														data={staffRemarkForManager1}
														onReady={editor => {
															// You can store the "editor" and use when it is needed.
															console.log("Editor is ready to use!", editor);
														}}
														onChange={(event, editor) =>
															handleRemark(
																event,
																editor,
																setstaffRemarkForManager1
															)
														}
														onBlur={(event, editor) => {
															console.log("Blur.", editor);
														}}
														onFocus={(event, editor) => {
															console.log("Focus.", editor);
														}}
													/>
												)}
											</>
										)}
									</div>
									<div
										className={`${
											["self_score"]?.includes(type)
												? "hidden"
												: "block border border-[#CCCCCC] p-4 rounded-xl"
										} print:block print:border print:border-[#CCCCCC] print:p-4 print:rounded-xl`}
										dangerouslySetInnerHTML={createMarkup(
											staffRemarkForManager1
										)}
									/>
								</div>
							)}
							<div
								className={`page-break ${managerLength > 1 ? "" : "hidden"}`}>
								<p className="text-md mt-5">Manager 2 Remarks</p>
								<div className="print:hidden">
									{["manager_score2"]?.includes(type) && (
										<>
											<CKEditor
												editor={ClassicEditor}
												data={manager2Remark}
												onReady={editor => {
													// You can store the "editor" and use when it is needed.
													console.log("Editor is ready to use!", editor);
												}}
												onChange={(event, editor) =>
													handleRemark(event, editor, setManager2Remark)
												}
												onBlur={(event, editor) => {
													console.log("Blur.", editor);
												}}
												onFocus={(event, editor) => {
													console.log("Focus.", editor);
												}}
											/>
											<Input
												label={"Recommendation"}
												type={"select"}
												name="lineManager2Recommendation"
												onChange={e =>
													setlineManager2Recommendation(e?.target?.value)
												}
												value={lineManager2Recommendation}
												options={recommendationData}
											/>
										</>
									)}
								</div>
								<div
									className={`${
										["manager_score2"]?.includes(type)
											? "hidden"
											: "block border border-[#CCCCCC] p-4 rounded-xl"
									} print:block print:border print:border-[#CCCCCC] print:p-4 print:rounded-xl`}
									dangerouslySetInnerHTML={createMarkup(manager2Remark)}
								/>
								{lineManager2Recommendation && (
									<div
										className={`${
											["manager_score2"]?.includes(type)
												? "hidden"
												: "block border border-[#CCCCCC] p-4 rounded-xl my-3"
										} print:block print:border print:border-[#CCCCCC] print:p-4 print:rounded-xl`}>
										Recommendation: {lineManager2Recommendation}
									</div>
								)}
							</div>
							{manager2Remark && (
								<div
									className={`page-break ${managerLength > 1 ? "" : "hidden"}`}>
									<p className="text-md mt-5">
										Staff Remark To Manager 2 Remarks
									</p>
									<div className="print:hidden">
										{["self_score"]?.includes(type) && (
											<>
												<AcceptReject
													value={staffRemarkForManager2}
													setValue={setstaffRemarkForManager2}
												/>
												{staffRemarkForManager2 !== "Accepted" && (
													<CKEditor
														editor={ClassicEditor}
														data={staffRemarkForManager2}
														onReady={editor => {
															// You can store the "editor" and use when it is needed.
															console.log("Editor is ready to use!", editor);
														}}
														onChange={(event, editor) =>
															handleRemark(
																event,
																editor,
																setstaffRemarkForManager2
															)
														}
														onBlur={(event, editor) => {
															console.log("Blur.", editor);
														}}
														onFocus={(event, editor) => {
															console.log("Focus.", editor);
														}}
													/>
												)}
											</>
										)}
									</div>
									<div
										className={`${
											["self_score"]?.includes(type)
												? "hidden"
												: "block border border-[#CCCCCC] p-4 rounded-xl"
										} print:block print:border print:border-[#CCCCCC] print:p-4 print:rounded-xl`}
										dangerouslySetInnerHTML={createMarkup(
											staffRemarkForManager2
										)}
									/>
								</div>
							)}
						</div>
						<div className="order-first lg:order-last lg:w-[30%] mt-5">
							<div className="py-2">
								<span>Self Score</span>
								<div className="border rounded-xl">
									<div className="flex px-3 py-1 w-full font-bold items-center">
										<p className="border-none outline-none w-full">
											{Number(
												((mainTotal?.self_score || 0) /
													((formLength || 0) * 5)) *
													100
											).toFixed(2)}
											%
										</p>
									</div>
								</div>
							</div>
							<div className="py-2">
								<span>Manager Score</span>
								<div className="border rounded-xl">
									<div className="flex px-3 py-1 w-full font-bold items-center">
										<p className="border-none outline-none w-full">
											{Number(
												((mainTotal?.manager_score || 0) /
													((formLength || 0) * 5)) *
													100
											).toFixed(2)}
											%
										</p>
									</div>
								</div>
							</div>
							{managerLength > 1 && (
								<div className="py-2">
									<span>Manager 2 Score</span>
									<div className="border rounded-xl">
										<div className="flex px-3 py-1 w-full font-bold items-center">
											<p className="border-none outline-none w-full">
												{Number(
													((mainTotal?.manager_score2 || 0) /
														((formLength || 0) * 5)) *
														100
												).toFixed(2)}
												%
											</p>
										</div>
									</div>
								</div>
							)}
							<div className="py-2">
								<span>Final Score</span>
								<div className="border rounded-xl">
									<div className="flex px-3 py-1 w-full font-bold items-center">
										<p className="border-none outline-none w-full">
											{Number(
												((mainTotal?.weighted_score || 0) / 500) * 100
											).toFixed(2)}
											%
										</p>
									</div>
								</div>
							</div>
							{grader && (
								<div className="py-2">
									<span>Grade</span>
									<div className="border rounded-xl">
										<div className="flex px-3 py-1 w-full font-bold items-center">
											<p className="border-none outline-none w-full">
												{gradeData?.find(it => it?.grade === grader)?.short} -{" "}
												{grader}
											</p>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
					<div className="flex justify-center items-center mt-5 printOnlyNone gap-3">
						<Button
							// buttonType={"primary"}
							title={updater ? "Update" : "Create"}
							width={
								"text-white bg-[#2A72A8] border-none rounded py-2 px-4 font-bold"
							}
							type="submit"
							loading={loading}
							onClick={handleSubmit}
						/>
						{updater && (
							<Button
								type="button"
								title="Download"
								onClick={handlePrint}
								width="text-white bg-[#2A72A8] border-none rounded py-2 px-4 font-bold"
							/>
						)}
					</div>
				</form>
			) : (
				<>
					<h2 className="text-2xl md:text-5xl manrope text-[#013468] font-semibold text-center py-5">
						No evaluation data found
					</h2>
				</>
			)}
		</div>
	);
};

export const MyModal = ({ handleClose }) => {
	const Arr = [
		{
			info: [
				{
					title: "Task Given",
					description: "Create Onboarding Screens",
				},
				{
					title: "date given",
					description: "03/04/2023",
				},
				{
					title: "date submitted",
					description: "04/04/2023",
				},
				{
					title: "date evaluated",
					description: "05/04/2023",
				},
				{
					title: "remarks",
					description: "A good job done,there is room for improvement",
				},
			],
			ratings: [
				{
					title: "efficeincy",
					description: "5",
				},
				{
					title: "timeliness",
					description: "5",
				},
				{
					title: "accuracy",
					description: "5",
				},
				{
					title: "excellence",
					description: "5",
				},
				{
					title: "performance average",
					description: "100",
				},
			],
		},
	];
	return (
		<div>
			<div className="absolute bg-main bg-opacity-20 backdrop-blur-lg flex justify-center items-center inset-0">
				<div className="w-1/2 bg-white rounded-sm p-8">
					{" "}
					<div className="flex justify-between border-b-main border-b pb-4 items-center">
						<p className="text-main text-sm manrope font-medium">
							My Evaluation Details
						</p>
						<div className="cursor-pointer">
							<IconContext.Provider value={{ color: "2A72A8" }}>
								<AiOutlineClose onClick={handleClose} size={20} />
							</IconContext.Provider>
						</div>
					</div>
					<div className="flex justify-between mt-8">
						<div>
							{Arr.map((item, i) => (
								<div key={i} className="">
									<div className="flex gap-4 items-center">
										<div>
											<h6 className="text-xs font-semibold text-black nunito uppercase">
												Evaluator's name
											</h6>
											<p className="text-[11px] text-[#1b1b1b] capitalize text-opacity-80 nunito font-normal">
												George Williams
											</p>
										</div>
										<img
											class="w-16 h-16  rounded-full"
											src={require("../../assets/photo-2.png")}
											alt=""
										/>
									</div>
									<div className="space-y-4">
										{item.info.map((item, i) => (
											<div key={i}>
												<h6 className="text-xs font-semibold text-black nunito uppercase">
													{item.title}
												</h6>
												<p className="text-[11px] w-40 text-[#1b1b1b] capitalize text-opacity-80 nunito font-normal">
													{item.description}
												</p>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
						<div className="">
							<h5 className="text-xs font-semibold text-[#393F93] uppercase">
								ratings
							</h5>
							<div className="mt-6">
								{Arr.map((item, i) => (
									<div key={i} className="space-y-4">
										{item.ratings.map((item, i) => (
											<div key={i} className="">
												<h6 className="text-xs font-semibold text-black nunito uppercase">
													{item.title}
												</h6>
												<p className="text-[11px] w-40 text-[#1b1b1b] capitalize text-opacity-80 nunito font-normal">
													{item.description}
												</p>
											</div>
										))}
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="flex justify-center mt-10">
						<button
							onClick={handleClose}
							className="w-32 rounded-md h-10 manrope text-sm font-normal bg-main text-white">
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const DeleteModal = ({ handleClose }) => {
	return (
		<div>
			<div className="absolute bg-main bg-opacity-30 backdrop-blur-lg flex justify-center items-center inset-0">
				<div className=" bg-white rounded-sm p-8">
					<div className="flex justify-end cursor-pointer">
						<IconContext.Provider value={{ color: "2A72A8" }}>
							<AiOutlineClose size={20} onClick={handleClose} />
						</IconContext.Provider>
					</div>
					<div className="flex justify-center mt-8">
						<div className="">
							<img src={DeleteGif} alt="" className="mx-auto" />
							<p className="text-[#1b1b1b] font-normal segoe text-base text-center w-56">
								Are you sure you want to delete evaluation? Action cannot be
								undone.
							</p>
							<div className="mt-8 w-5/6 mx-auto grid grid-cols-2 gap-4">
								<button
									style={{
										background:
											"linear-gradient(90deg, #0966AB 0%, #2F80ED 50%, #2A72A8 100%)",
									}}
									className="rounded-xl h-10 text-base text-white">
									No
								</button>
								<button className="rounded-xl h-10 bg-white border border-main text-base text-main">
									Yes
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Performance;

// export const KeepHere = () => {
// 	const [performanceTab, setPerformanceTab] = useState("my");
// 	const navigate = useNavigate();
// 	let init = {
// 		weight: "",
// 		self_score: "",
// 		manager_score: "",
// 		weighted_score: "",
// 		kpiname: "",
// 	};
// 	const [kpi, setKpi] = useState([init]);
// 	const [formInfo, setFormInfo] = useState([{ title: "", subTitle: kpi }]);
// 	let [remark, setRemark] = useState(""),
// 		dispatch = useDispatch();

// 	const addKpi = formIndex => {
// 		// setKpi([...kpi, {weight: "", self_score: "" , manager_score:'', weighted_score:''}]);
// 		const newForm = [...formInfo];
// 		newForm[formIndex].subTitle.push({
// 			weight: "",
// 			self_score: "",
// 			manager_score: "",
// 			weighted_score: "",
// 			kpiname: "",
// 		});
// 		setFormInfo(newForm);
// 	};

// 	const removeKpi = (formIndex, kpiIndex) => {
// 		// const newKpi = [...kpi];
// 		// newKpi.splice(index, 1);
// 		// setKpi(newKpi);
// 		console.log(formIndex, kpiIndex);
// 		const newForm = [...formInfo];
// 		newForm[formIndex].subTitle.splice(kpiIndex, 1);
// 		setFormInfo(newForm);
// 	};

// 	const handleKpi = (event, formIndex, kpiIndex) => {
// 		const newInputs = [...formInfo];
// 		let { name, value } = event.target;
// 		// if (formIndex >= 0 && formIndex < newInputs?.length && kpiIndex >= 0 && kpiIndex < newInputs[formIndex].subTitle?.length) {
// 		// Check if the subTitle array exists, and if not, initialize it
// 		// if (!newInputs[formIndex].subTitle) {
// 		//   newInputs[formIndex].subTitle = [];
// 		// }

// 		// // Check if the kpiname property exists, and if not, initialize it
// 		// if (!newInputs[formIndex].subTitle[kpiIndex]) {
// 		//   newInputs[formIndex].subTitle[kpiIndex] = {};
// 		// }

// 		// Set the value for the kpiname property
// 		newInputs[formIndex].subTitle[kpiIndex][name] = value;

// 		// Update the state with the modified newInputs
// 		setKpi(newInputs);
// 		// }
// 	};
// 	const handleFormTitle = (event, formIndex) => {
// 		const newFormInput = [...formInfo];
// 		let { name, value } = event.target;
// 		newFormInput[formIndex][name] = value;
// 	};

// 	const handleRemark = (event, editor) => {
// 		let remark1 = editor.getData();
// 		console.log({ event, editor, remark: remark1 });
// 		setRemark(remark1);
// 	};

// 	const addForm = () => {
// 		setFormInfo([...formInfo, { title: "", subTitle: [init] }]);
// 	};
// 	const removeForm = formIndex => {
// 		console.log(formIndex);
// 		const newFormTitle = [...formInfo];
// 		newFormTitle.splice(formIndex, 1);
// 		setFormInfo(newFormTitle);
// 	};

// 	const handleSubmit = event => {
// 		event.preventDefault();
// 		console.log(formInfo, remark);
// 	};
// 	// const handleTicketPrice = (value1, index) => {
// 	//   const newPrice = [...ticket];
// 	//   newPrice[index].value = value1;
// 	//   setTicket(newPrice);
// 	// };

// 	let { performance, auth } = useSelector(s => s),
// 		{ canApprove } = useContext(GlobalState);

// 	useEffect(() => {
// 		dispatch(managePerformance("get", null));
// 		dispatch(managePerformanceReview("get", null));
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, []);

// 	if (!performance?.data) return <PageLoader />;

// 	return (
// 		<div className="relative bg-[#EFF6FC] min-h-[100vh]">
// 			<div className="flex items-center font-bold  p-3">
// 				<p className="text-[#667085]">Performance</p>
// 				<p className="text-[#667085] mx-4">
// 					<LiaGreaterThanSolid />
// 				</p>
// 				<p>Performance Appraisal</p>
// 			</div>
// 			<div className="flex justify-between items-center px-3">
// 				{auth?.user?.isAdmin || canApprove  ? (
// 					<div className="my-10 lg:w-1/2 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// 						<button
// 							onClick={() => setPerformanceTab("my")}
// 							className={`${
// 								performanceTab === "my"
// 									? "bg-black shadow-xl text-white"
// 									: "bg-white shadow-xl text-black"
// 							} h-10 inter text-base capitalize font-semibold`}>
// 							My Evaluation
// 						</button>
// 						<button
// 							onClick={() => setPerformanceTab("employee")}
// 							className={`${
// 								performanceTab === "employee"
// 									? "bg-black shadow-xl text-white"
// 									: "bg-white shadow-xl text-black"
// 							} h-10  inter text-base font-semibold`}>
// 							Employees Evaluation
// 						</button>
// 						{auth?.user?.isAdmin ? (
// 							<button
// 								onClick={() => setPerformanceTab("list")}
// 								className={`${
// 									performanceTab === "list"
// 										? "bg-black shadow-xl text-white"
// 										: "bg-white shadow-xl text-black"
// 								} h-10  inter text-base font-semibold`}>
// 								Evaluation List
// 							</button>
// 						) : null}
// 					</div>
// 				) : null}
// 				{auth?.user?.isAdmin ? (
// 					<Addbutton
// 						background={"bg-secondary"}
// 						onClick={() => navigate("/performance/add-evaluation")}
// 						text={"Add New Evaluation"}
// 						add={true}
// 					/>
// 				) : null}
// 			</div>

// 			{performanceTab === "employee" && <Employees />}
// 			{performanceTab === "my" && <MyEvaluation type={"self_score"} />}
// 			{performanceTab === "list" && <EvaluationList />}
// 		</div>
// 	);
// };

export const EvaluationGuide = () => {
	return (
		<>
			<div className="bg-white p-5">
				<div className="grid md:grid-cols-2 gap-6">
					<div className="">
						<span className="uppercase font-bold my-3">Scoring FOrmat</span>
						<div className="grid md:grid-cols-2 gap-4">
							<div className="">
								<p>
									Lower Band: <span className="font-bold">1</span>
								</p>
								<p>
									Upper Band: <span className="font-bold">5</span>
								</p>
							</div>
							<div className="">
								All score entries must be between the lower and upper band
							</div>
						</div>
						<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
							<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead className="text-xs manrope text-[#667085] font-medium uppercase bg-[#F9FAFB] border-b border-b-[#EAECF0]">
									<tr>
										<th scope="col" className="p-3">
											Score
										</th>
										<th scope="col" className="px-4 py-3">
											Description
										</th>
									</tr>
								</thead>
								<tbody>
									{scoreData?.map((item, i) => (
										<tr
											key={i}
											className="text-sm inter font-normal text-[#667085] inter border-b border-b-[#EAECF0] uppercase">
											<td className="p-4">{item?.score}</td>
											<td className="p-4">{item?.grade}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<div className="">
						<span className="uppercase font-bold my-3">
							FInal Grade Summary
						</span>
						<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
							<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead className="text-xs manrope text-[#667085] font-medium uppercase bg-[#F9FAFB] border-b border-b-[#EAECF0]">
									<tr>
										<th scope="col" className="p-3">
											Score
										</th>
										<th scope="col" className="px-4 py-3">
											Description
										</th>
										<th scope="col" className="px-4 py-3">
											Grade
										</th>
									</tr>
								</thead>
								<tbody>
									{gradeData?.map((item, i) => (
										<tr
											key={i}
											className="text-sm inter font-normal text-[#667085] inter border-b border-b-[#EAECF0] uppercase">
											<td className="p-4">
												{item?.minimumScore} - {item?.maximumScore}
											</td>
											<td className="p-4">{item?.grade}</td>
											<td className="p-4">{item?.short}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export const AcceptReject = ({ type, setValue, value }) => {
	return (
		<>
			<div className="my-10 md:w-3/4 xl:w-1/2 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
				<button
					type="button"
					onClick={() => setValue("Accepted")}
					className={`hover:bg-black shadow-xl hover:text-white h-12 inter text-sm capitalize font-semibold rounded-lg px-2 ${
						value === "Accepted"
							? "bg-black shadow-xl text-white"
							: "bg-white text-black"
					}`}>
					{value === "Accepted" ? "Accepted" : "Accept"}
				</button>
				<button
					type="button"
					onClick={() => {
						toast.info("Please provide more insight below");
						if (value === "Accepted") setValue("");
					}}
					className={`hover:bg-black shadow-xl hover:text-white bg-white text-black h-12 inter text-sm capitalize font-semibold rounded-lg px-2`}>
					Reject
				</button>
			</div>
		</>
	);
};