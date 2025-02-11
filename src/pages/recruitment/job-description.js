import React, { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
// import { FiCopy } from "react-icons/fi";
import {
	Link,
	useNavigate,
	useSearchParams,
	useLocation,
} from "react-router-dom";
// import BG from "../../assets/jobbg.png";
import Require from "../../assets/require.png";
// import News from "../../assets/news.png";
import Hiring from "../../assets/hiring.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { returnErrors } from "../../data/Reducers/ErrorReducer";
import { PropagateLoader } from "react-spinners";

const Jobdescription = () => {
	return <JobDescriptionMain />;
};

export default Jobdescription;

export const JobDescriptionMain = () => {
	const navigate = useNavigate();
	let { auth } = useSelector(state => state),
		[loading, setLoading] = useState(false),
		[data, setData] = useState(null),
		[getSearch] = useSearchParams(),
		dispatch = useDispatch(),
		location = useLocation();

	const manageJobApplication = async (type, datum, company) => {
		try {
			let res;

			if (type === "get") {
				res = await axios.get(
					`/api/v1/job/${company || ""}/${getSearch?.get("job")}?_populate=form`
				);
				setData(res?.data?.data || res?.data);
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
		setData(location?.state || null);
		if (getSearch?.get("job") && getSearch?.get("company")) {
			let getData = async () => {
				setLoading("getting");
				await manageJobApplication("get", null, getSearch?.get("company"));
				setLoading(null);
			};
			getData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getSearch]);

	if (loading === "getting")
		return (
			<>
				<div className="flex justify-center items-center min-h-52 pt-16">
					<PropagateLoader size={24} color="#2A72A8" />
				</div>
			</>
		);
	// console.log({ data });
	if (!data) return;

	return (
		<div>
			{auth?.isAuth ? (
				<div className="   mb-8">
					<div className="flex  items-center gap-2 justify-center font font-semibold text-[15px]">
						<p
							onClick={auth?.isAuth ? () => navigate(-1) : null}
							className="text-[#667085] cursor-pointer">
							Recruitment
						</p>

						<AiOutlineRight size={15} />

						<p className="  cursor-pointer">
							{data?.name || "Product Designer"}
						</p>
					</div>
				</div>
			) : null}
			<div className="bg-white shadow-lg rounded-lg p-3 border-2  cursor-pointer mb-2">
				<div className=" ">
					<img src={Require} alt="" className="w-full" />
					<div className="mb-5 flex p-8 gap-8 w-full">
						<div className="w-[60%] space-y-5">
							<div>
								<h2 className=" font-semibold text-sm ">JOB TITLE</h2>
								<p className=" font-normal text-[13px]">{data?.name} </p>
							</div>
							<div>
								<h2 className=" font-semibold text-sm ">ABOUT THE JOB</h2>
								<p className=" font-normal text-[13px]">
									{data?.description ||
										`Lorem ipsum dolor sit amet consectetur. Amet sit amet rutrum
									viverra euismod at ultrices. Id bibendum mattis egestas ac.
									Neque arcu volutpat lacus urna.`}{" "}
								</p>
							</div>
							<div>
								<h2 className=" font-semibold text-sm ">TYPE</h2>
								<p className=" font-normal text-[13px] capitalize">
									{data?.type?.replace(/-/g, " ")}{" "}
								</p>
							</div>
							<div>
								<h2 className=" font-semibold text-sm ">LEVEL</h2>
								<p className=" font-normal text-[13px] capitalize">
									{data?.level}{" "}
								</p>
							</div>
							<div>
								<h2 className=" font-semibold text-sm ">LOCATION</h2>
								<p className=" font-normal text-[13px] capitalize">
									{data?.location}{" "}
								</p>
							</div>
							{/* <div className="mb-5">
								<h2 className=" font-semibold text-sm">
									REQUIREMENTS/QUALIFICATIONS
								</h2>
								<ul className="">
									<li className=" font-normal text-[13px]  list-disc mb-1">
										Lorem ipsum dolor, sit amet consectetur adipisicing elit.
										Voluptate, quam?
									</li>
									<li className=" font-normal text-[13px]  list-disc mb-1">
										Lorem ipsum dolor, sit amet consectetur adipisicing elit.
										Voluptate, quam?
									</li>{" "}
									<li className=" font-normal text-[13px]  list-disc mb-1">
										Lorem ipsum dolor, sit amet consectetur adipisicing elit.
										Voluptate, quam?
									</li>
								</ul>
							</div>
							<div className="mb-5">
								<h2 className=" font-semibold text-sm">BENEFITS </h2>
								<ul>
									<li className=" font-normal text-[13px]  list-disc mb-1">
										Lorem ipsum dolor, sit amet consectetur adipisicing elit.
										Voluptate, quam?
									</li>
									<li className=" font-normal text-[13px]  list-disc mb-1">
										Lorem ipsum dolor, sit amet consectetur adipisicing elit.
										Voluptate, quam?
									</li>{" "}
									<li className=" font-normal text-[13px]  list-disc mb-1">
										Lorem ipsum dolor, sit amet consectetur adipisicing elit.
										Voluptate, quam?
									</li>
								</ul>
							</div> */}
						</div>
						<div className="w-[35%]">
							<h2 className="font-semibold whitespace-nowrap text-black text-xl source">
								LATEST FEEDS FROM THE COMPANY
							</h2>
							<div className="mt-8">
								<img src={Hiring} alt="" className="w-full" />
							</div>
						</div>
					</div>
					<div className="flex justify-center items-center gap-1 font-semibold text-[13px]">
						<Link
							to={`/recruitment/application-form${location?.search || ""}`}
							state={data}
							className="text-[#2F1693] uppercase poppins  font-bold text-xl cursor-pointer">
							Apply Here
						</Link>
						{/* <a
              target="_blank"
              href="https://www.jobapplicationform.com"
              className="text-[#2A72A8]"
            >
              https://www.jobapplicationform.com
            </a>
            <span>
              <FiCopy onClick={copyToClipboard} style={{ cursor: "pointer" }} />
            </span>
            {copied && (
              <span style={{ marginLeft: "0.5rem", color: "green" }}>
                Copied!
              </span>
            )} */}
					</div>
				</div>
			</div>
		</div>
	);
};
