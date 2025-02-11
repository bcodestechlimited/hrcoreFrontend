import React, { useState, useEffect, useContext } from "react";
import { AiFillCopy, AiOutlineRight } from "react-icons/ai";

import { GrFormAdd } from "react-icons/gr";
import { MdOutlinePublishedWithChanges } from "react-icons/md";

import { Link, useLocation } from "react-router-dom";

import Stage from "../../../components/alljobs/stage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { returnErrors } from "../../../data/Reducers/ErrorReducer";
import ReviewSubmit from "../../../components/recruitment/reviewsubmit";
import { IconContext } from "react-icons";
import { GlobalState } from "../../../data/Context";
import { PageLoader } from "../../../components/modal-container/modal-container";

function AllJobsDetails() {
	let location = useLocation(),
		[data, setData] = useState([]),
		dispatch = useDispatch(),
		{ company, auth } = useSelector(state => state),
		[loading, setLoading] = useState(false),
		[headers, setHeaders] = useState([
			{ name: "newly applied", amount: 0 },
			{ name: "shortlisted", amount: 0 },
			{ name: "interview", amount: 0 },
			{ name: "health check", amount: 0 },
			{ name: "background check", amount: 0 },
			{ name: "hired", amount: 0 },
		]),
		{ canAdmin, canApprove } = useContext(GlobalState),
		[active, setActive] = useState(""),
		[candidates, setCanditates] = useState([]);

	const [jobdetails, setJobdetails] = useState(false);

	const manageJobApplication = async (type, datum, company) => {
		try {
			let res;

			if (type === "get") {
				let res1 = await axios.get(
					`/api/v1/job-application/${company || ""}?_populate=job&job=${
						location?.state?._id
					}${datum?.limit ? `&_limit=${datum?.limit}` : ""}`
				);
				res = await axios.get(
					`/api/v1/job-application/${company || ""}?_populate=job&job=${
						location?.state?._id
					}&_limit=${res1?.data?.data?.totalDocs}
					}`
				);
				setData(res?.data?.data || res?.data);
			}
			if (type !== "get") {
				toast.success(res?.data?.message);
			}
		} catch (err) {
			if (err) console.log({ error: err.response?.data, err });
			if (err?.response?.status === 429) toast.error(err?.response?.data);
			if (type && type !== "get") {
				let error = err.response?.data?.error;
				if (error) {
					dispatch(returnErrors({ error, status: err?.response?.status }));
				} else {
					toast.error(err?.response?.data?.message);
				}
			}
		}
	};

	useEffect(() => {
		if (location?.state?._id) {
			let getData = async () => {
				setLoading("getting");
				await manageJobApplication("get", null, company?.currentSelected);
				setLoading(null);
			};
			getData();
		} else setData(null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.state, company?.currentSelected]);

	useEffect(() => {
		if (data?.docs) {
			setHeaders([
				{
					name: "newly applied",
					amount: data?.docs?.filter(
						item => item?.status?.toLowerCase() === "newly applied"
					).length,
				},
				{
					name: "shortlisted",
					amount: data?.docs?.filter(
						item => item?.status?.toLowerCase() === "shortlisted"
					).length,
				},
				{
					name: "interview",
					amount: data?.docs?.filter(
						item => item?.status?.toLowerCase() === "interview"
					).length,
				},
				{
					name: "health check",
					amount: data?.docs?.filter(
						item => item?.status?.toLowerCase() === "health check"
					).length,
				},
				{
					name: "background check",
					amount: data?.docs?.filter(
						item => item?.status?.toLowerCase() === "background check"
					).length,
				},
				{
					name: "hired",
					amount: data?.docs?.filter(
						item => item?.status?.toLowerCase() === "hired"
					).length,
				},
			]);
			setCanditates(data?.docs);
		}
	}, [data]);

	useEffect(() => {
		if (active)
			setCanditates(
				data?.docs?.filter(item => item?.status?.toLowerCase() === active)
			);
	}, [active, data?.docs]);

	if (loading === "getting") return <PageLoader />;

	if (!data) return;

	// const copyToClipboard = () => {
	// 	const linkText = `${window.origin}/recruitment/job-description?job=${location?.state?._id}&company=${company?.currentSelected}`;
	// 	navigator.clipboard
	// 		.writeText(linkText)
	// 		.then(() => {
	// 			window.open(linkText, "_blank");
	// 		})
	// 		.catch(error => {
	// 			console.error("Error copying to clipboard:", error);
	// 		});
	// };

	return (
		<div>
			<div className="mb-8">
				<div className="flex  items-center gap-2">
					<div className=" font-semibold text-base">Recruitment</div>

					<AiOutlineRight size={15} />

					<div className=" font-semibold text-base">
						{location?.state?.name}
					</div>
				</div>

				<div className="tw-flex tw-gap-4 tw-items-center">
					<h2 className="font-semibold  text-base mr-5">
						{location?.state?.name}
					</h2>
					<div className="flex gap-2 items-center">
						<Link
							to="/recruitment/job-description"
							className="text-black text-base font-medium lato">
							Link to Apply
						</Link>
						<div className="cursor-pointer">
							<IconContext.Provider value={{ color: "#000" }}>
								<AiFillCopy
									size={20}
									onClick={() =>
										navigator.clipboard
											.writeText(
												`${window.origin}/recruitment/job-description?job=${location?.state?._id}&company=${company?.currentSelected}`
											)
											.then(() => toast.info("Copied", { autoClose: 2000 }))
									}
								/>
							</IconContext.Provider>
						</div>
					</div>
				</div>
			</div>
			<div className="jobs_card_div">
				<div className="flex justify-between items-center  mb-4">
					<div className="flex gap-3 ">
						<span
							onClick={() => setJobdetails(false)}
							className={`${
								jobdetails
									? "font-medium text-[15px] cursor-pointer text-[#44444486] "
									: "text-[15px]  cursor-pointer text-[#2A72A8] mb-1 font-semibold underline "
							}   
    
             `}>
							Candidates
						</span>
						<span
							onClick={() => setJobdetails(true)}
							className={`${
								jobdetails
									? "text-[15px]  cursor-pointer text-[#2A72A8] mb-1 font-semibold underline "
									: "font-medium text-[15px] cursor-pointer text-[#44444486] "
							}`}>
							Job details
						</span>
					</div>

					<p className="flex items-center gap-2 font-medium">
						{auth?.user?.isAdmin || canAdmin || canApprove ? (
							<div className="flex gap-2">
								<Link
									to={`/recruitment/ceatejobs?update=${location?.state?.name}`}
									state={location?.state}
									className={` border-2 border-[#2A72A8CC] btn h-8 shadow-xl px-3 hover:scale-110 hover:transition hover:transform hover:ease-out hover:duration-800 hover:delay-400 flex justify-center items-center gap-3 rounded-md text-black whitespace-nowrap text-sm`}>
									<div>
										<GrFormAdd size={15} />
									</div>
									<p className="text-black text-xs manrope animate-pulse">
										Update
									</p>
								</Link>

								<button
									className={` border-2 border-[#2A72A8CC] btn h-8 shadow-xl px-3 hover:scale-110 hover:transition hover:transform hover:ease-out hover:duration-800 hover:delay-400 flex justify-center items-center gap-3 rounded-md text-black whitespace-nowrap text-sm`}>
									<div>
										<MdOutlinePublishedWithChanges size={15} />
									</div>
									<p className="text-black text-xs manrope animate-pulse">
										Published
									</p>
								</button>
							</div>
						) : null}
					</p>
				</div>

				{jobdetails ? (
					<ReviewSubmit state={location?.state} />
				) : (
					<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
						<div className="flex flex-col">
							<div className="flex justify-between  gap-5">
								{headers?.map((item, i) => {
									return (
										<div className="" key={i}>
											<Stage headers={item} setActive={setActive} />
										</div>
									);
								})}
							</div>
							<div className="flex  gap-5">
								<Stage datas={candidates} />
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default AllJobsDetails;
