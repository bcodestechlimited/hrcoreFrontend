import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../data/Context";

function All_job_card({ CardData }) {
	let { numberWithCommas } = useContext(GlobalState);
	return (
		<Link
			to={`/recruitment/all-jobs/${CardData._id || CardData?.link}`}
			state={CardData?._id ? CardData : { item: "sdsdsdsd" }}
			className="">
			<div className="">
				<div className="bg-white shadow-lg rounded-lg p-6 border-t-[10px] border-[#2A72A8]  cursor-pointer">
					<div className="mb-3">
						<p className="font-semibold text-[14px] text-[#44444480]">
							{CardData?.theme}
						</p>

						<p className="d font-semibold text-[15px] text-[#07644DCC]">
							{CardData?.name || CardData?.title}
						</p>
					</div>
					<div>
						<p className="font-semibold text-sm mb-2">Candidates:</p>

						<div className="bg-[#F3F8FC] py-2 px-3  flex gap-3 mb-1">
							<div className="flex flex-col border-l-2 border-green-400 pl-2">
								<span className="font-semibold  text-[#44444480] text-sm">
									TOTAL
								</span>
								<span className="txt-center font-bold text-base">
									{" "}
									{numberWithCommas(CardData?.total || 0)}
								</span>
							</div>
							{/* <div className="flex flex-col border-l-2 border-green-400 pl-2">
								<span className="font-semibold  text-[#44444480] text-sm">
									New
								</span>
								<span className=" font-bold text-base"> {CardData?.new}</span>
							</div> */}
						</div>

						<div className="flex justify-between">
							<p className=" text-[#44444480] font-bold text-xs cursor-pointer">
								Published
							</p>

							<p className=" text-[#07644D80] font-bold text-xs cursor-pointer">
								See Details
							</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default All_job_card;
