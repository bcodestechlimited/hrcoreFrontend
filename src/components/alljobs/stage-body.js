import React, { useContext, useState } from "react";
import ModalContainer from "../modal-container/modal-container";
import { BiPencil } from "react-icons/bi";
// import { AiOutlineCopy } from "react-icons/ai";
import moment from "moment";
import { GlobalState } from "../../data/Context";

function Recruitment_Stage_Body({ databody }) {
	const [detail, setDetail] = useState(false);

	return (
		<>
			{databody?.map((item, i) => (
				<div className="w-[200px] " key={i}>
					<div
						className="bg-white shadow-lg rounded-lg p-3   border-2  cursor-pointer mb-2 "
						onClick={() => setDetail(item)}>
						<div>
							<div className="flex items-center space-x-4">
								<div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden border-red-600 border bg-gray-100 rounded-full dark:bg-gray-600">
									<img
										class="w-10 h-10 border-2 border-[#F72585] rounded-full"
										src={
											item?.photo ||
											item?.profile?.avatar ||
											require("../../assets/photo-2.png")
										}
										alt=""
									/>
								</div>
								<div className="">
									<p className="t text-[13px] font-semibold">{item?.name}</p>

									<p className="font-normal  text-xs text-[#8B8080] ">
										{moment(item?.createdAt).format("DD/MM/YYYY")}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}

			<CandidateDetailModal detail={detail} setDetail={setDetail} />
		</>
	);
}

export default Recruitment_Stage_Body;

export const CandidateDetailModal = ({ detail, setDetail, children }) => {
	let { numberWithCommas } = useContext(GlobalState);

	return (
		<ModalContainer
			title={"CANDIDATE DETAILS"}
			show={detail ? true : false}
			close={() => setDetail(null)}>
			<div className="flex justify-center font-nunito">
				<div className="flex justify-center">
					<div className="">
						<p className="text-[#2A72A8] font-bold   font-nunito  text-lg">
							CANDIDATE FULL NAME
						</p>
						<div className="flex  gap-10">
							<p className=" font-medium text-lg"> {detail?.name}</p>

							{!children && (
								<div className=" font-medium text-[#DC298A] flex items-center">
									<span>
										<BiPencil />
									</span>
									<span className="capitalize"> {detail?.status}</span>
								</div>
							)}
						</div>

						<div className="flex  justify-between gap-10">
							<div className="lf flex flex-col gap-5 w-1/2">
								<div>
									<p className=" font-semibold text-xl">JOB APPLIED FOR</p>
									<p className="  font-normal text-base">{detail?.job?.name}</p>
								</div>

								<div>
									<p className=" font-semibold text-xl">DATE APPLIED</p>
									<p className="  font-normal text-base">
										{moment(detail?.createdAt).format("DD/MM/YYYY")}
									</p>
								</div>

								<div>
									<p className=" font-semibold text-xl">EMAIL ADDRESS</p>
									<p className="  font-normal text-base">{detail?.email}</p>
								</div>

								{/* <div>
										<p className=" font-semibold text-xl">
											YEARS OF EXPERIENCE
										</p>
										<p className="  font-normal text-base">5 years</p>
									</div> */}

								{/* <div>
										<p className=" font-semibold text-xl">INTERVIEW DATES</p>
										<p className="  font-normal text-base">1st August, 2023</p>
										<p className="  font-normal text-base">1st August, 2023</p>
									</div> */}

								<div>
									<p className=" font-semibold text-xl">Attachment</p>
									<p className="  font-normal text-base flex gap-2 items-center">
										<span> {detail?.resume?.name} </span>
										{/* <span>
												{" "}
												<AiOutlineCopy />
											</span> */}
									</p>
								</div>
							</div>
							<div className="lf flex flex-col gap-5 w-1/2">
								<div>
									<p className=" font-semibold text-xl">
										AVAILABLE DATE TO START
									</p>
									<p className="  font-normal text-base">
										{detail?.startDate &&
											moment(detail?.startDate).format("DD/MM/YYYY")}
									</p>
								</div>

								<div>
									<p className=" font-semibold text-xl">PLANNING TO RELOCATE</p>
									<p className="  font-normal text-base">
										{detail?.relocate ? "Yes" : "No"}
									</p>
								</div>

								<div>
									<p className=" font-semibold text-xl">NOTICE PERIOD</p>
									<p className="  font-normal text-base">
										{detail?.noticePeriod &&
											moment(detail?.noticePeriod).diff(
												moment(detail?.createdAt),
												"weeks"
											)}
										{detail?.noticePeriod && ` weeks`}
									</p>
								</div>

								<div>
									<p className=" font-semibold text-xl">EXPECTED SALARY</p>
									<p className="  font-normal text-base">
										NGN
										{numberWithCommas(
											Number(detail?.expectedSalary || 0).toFixed(2)
										)}
									</p>
								</div>

								<div>
									<p className=" font-semibold text-xl">
										CONSENT TO BACKGROUND CHECKS
									</p>
									<p className="  font-normal text-base">
										{detail?.consentBackgroundCheck ? "Yes" : "No"}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{children}
		</ModalContainer>
	);
};
