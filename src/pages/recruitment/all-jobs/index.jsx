import React, { useState, useContext } from "react";
import { AiOutlineRight } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
// import AllJobCard from "../../components/recruitment/all_job_card";
// import { manageJob } from "../../data/Reducers/JobReducer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// import { manageJob } from "../../../data/Reducers/JobReducer";
import AllJobCard from "../../../components/recruitment/all_job_card";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../../components/pagination/pagination";
import Addbutton from "../../../components/button/addbutton";
import { manageJob } from "../../../data/Reducers/JobReducer";
import { GlobalState } from "../../../data/Context";
import { PageLoader } from "../../../components/modal-container/modal-container";

function AllJobs() {
	let navigate = useNavigate(),
		[loading, setLoading] = useState(false),
		{ job, company, auth } = useSelector(state => state),
		dispatch = useDispatch();
	let CardData = [
		{
			theme: "DESIGN",
			title: "Product Design",
			total: 10,
			new: 5,
			active: true,
			link: "product-design",
		},

		{
			theme: "DESIGN",
			title: "Product Design",
			total: 10,
			new: 5,
			active: true,
			link: "product-design",
		},

		{
			theme: "DESIGN",
			title: "Product Design",
			total: 10,
			new: 5,
			active: true,
			link: "product-design",
		},

		{
			theme: "DESIGN",
			title: "Product Design",
			total: 10,
			new: 5,
			active: true,
			link: "product-design",
		},

		{
			theme: "DEVELOPMENT",
			title: "Mobile App Dev.",
			total: 10,
			new: 5,
			active: true,
			link: "product-design",
		},
		{
			theme: "DEVELOPMENT",
			title: "Web  App Dev.",
			total: 10,
			new: 5,
			active: false,
			link: "product-design",
		},
	];
	useEffect(() => {
		dispatch(manageJob("get", null, company?.currentSelected));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [data, setData] = useState(null),
	{canAdmin, canApprove}=useContext(GlobalState),
		[page, setPage] = useState(1);

	useEffect(() => {
		setData(job?.data);
	}, [job?.data]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	const [activeJob, setActiveJob] = useState(true);

	if (!job?.data && !data) return <PageLoader />;
	if (!data) return;

	const currentItems = data?.docs?.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data?.docs?.length / range);

	<div>
		<p className="flex items-center gap-2 font-medium">
			<Link to={"/alljobs/create-new-job"}>
				<Addbutton
					background={"bg-secondary"}
					create={true}
					text={"Post New Job"}
					// onClick={() => navigate("/all-jobs/create-new-job")}
				/>
			</Link>
		</p>

		<div className="jobs_card_div">
			<div className="flex gap-3 mb-8">
				<span
					onClick={() => setActiveJob(true)}
					className={`font-medium text-[15px]  cursor-pointer ${
						activeJob
							? "text-[#2A72A8] font-semibold underline"
							: "text-[#44444486]"
					}
             `}>
					Active Jobs
				</span>
				<span
					onClick={() => setActiveJob(false)}
					className={`font-medium text-[15px] cursor-pointer  ${
						!activeJob
							? "text-[#2A72A8] font-semibold underline"
							: "text-[#44444486]"
					}
             `}>
					Inactive Jobs
				</span>
			</div>
			<div className="grid grid-cols-5 gap-5">
				{activeJob ? (
					<>
						{CardData.filter(item => item.active).map((item, index) => (
							<AllJobCard key={index} CardData={item} />
						))}
					</>
				) : (
					<>
						{CardData.filter(item => !item.active).map((item, index) => (
							<AllJobCard key={index} CardData={item} />
						))}
					</>
				)}
			</div>
		</div>
	</div>;

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
					{ limit: data?.limit * data?.nextPage },
					company?.currentSelected
				)
			);
			setLoading(false);
		};

	return (
		<div>
			<div className="  flex justify-between mb-8">
				<div className="flex  items-center gap-2">
					<div className=" font-semibold text-base">Recruitment</div>

					<AiOutlineRight size={15} />

					<div className=" font-semibold text-base">All Jobs</div>
				</div>

				<p className="flex items-center gap-2 font-medium">
					{auth?.user?.isAdmin || canAdmin || canApprove ? (
						<Addbutton
							background={"bg-secondary"}
							create={true}
							text={"Post New Job"}
							onClick={() => navigate("/recruitment/ceatejobs")}
						/>
					):null}
				</p>
			</div>
			<div className="jobs_card_div">
				<div className="flex gap-3 mb-8">
					<span
						onClick={() => setActiveJob(true)}
						className={`font-medium text-[15px]  cursor-pointer ${
							activeJob
								? "text-[#2A72A8] font-semibold underline"
								: "text-[#44444486]"
						}
             `}>
						Active Jobs
					</span>
					<span
						onClick={() => setActiveJob(false)}
						className={`font-medium text-[15px] cursor-pointer  ${
							!activeJob
								? "text-[#2A72A8] font-semibold underline"
								: "text-[#44444486]"
						}
             `}>
						Inactive Jobs
					</span>
				</div>
				{/* <MainRanger range={range} setRange={setRange} /> */}

				<div className="flex flex-wrap gap-10">
					{activeJob ? (
						<>
							{currentItems?.map((item, index) => (
								<AllJobCard key={index} CardData={item} />
							))}
						</>
					) : (
						<>
							{CardData.filter(item => item.active).map((item, index) => (
								<AllJobCard key={index} CardData={item} />
							))}
						</>
					)}
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
	);
}

export default AllJobs;
