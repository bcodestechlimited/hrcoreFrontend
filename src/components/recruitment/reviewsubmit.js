import React from "react";
import { BsPencil } from "react-icons/bs";
// import { TiTick } from "react-icons/ti";

function ReviewSubmit({ setCurrentStep, state }) {
	console.log({ state });
	return (
		<div className="">
			<div className="bg-white  font-medium text-sm px-5">
				<h1 className="f font-medium text-lg ">Review</h1>
				<div className="flex justify-between">
					<h2 className=" font-medium text-[16px] ">Basic Information</h2>
					<div
						className=""
						onClick={setCurrentStep ? () => setCurrentStep(1) : null}>
						<BsPencil />
					</div>
				</div>

				<p className="text-[#2A72A8] mb-1">Job Name</p>
				<p>{state?.name}</p>
				<p className="text-[#2A72A8] mb-1">Job Description</p>

				<p>{state?.description}</p>

				<div className="mb-1">
					<p className="text-[#2A72A8] mb-1">Job Type</p>
					<p className="capitalize">{state?.type}</p>
				</div>

				<div className="mb-1">
					<p className="text-[#2A72A8] mb-1">Job Location</p>
					<p className="capitalize">{state?.location}</p>
				</div>

				<div className="mb-1">
					<p className="text-[#2A72A8] mb-1">Recuritment Limit</p>
					<p>{state?.limit || 0} Candidates</p>
				</div>

				<div className="flex justify-between mb-1">
					<h2 className=" font-medium text-[16px] ">Hiring Details</h2>
					<div
						className=""
						onClick={setCurrentStep ? () => setCurrentStep(2) : null}>
						<BsPencil />
					</div>
				</div>

				<div className="mb-1">
					<p className="text-[#2A72A8] mb-1">Job Level</p>
					<p className="capitalize">{state?.level}</p>
				</div>

				<div className="mb-1">
					<p className="text-[#2A72A8] mb-1">Hiring Managers</p>
					<p>{state?.hiringManager}</p>
				</div>
				<div className="mb-1">
					<p className="text-[#2A72A8] mb-1">Recruiters</p>
					<p>{state?.recruiters?.[0] || state?.recruiters}</p>
				</div>

				{/* <div className="mb-1">
					<p className="text-[#2A72A8] mb-1">Collaborators</p>
					<p>Debbie Adeoye, Adeoti Adeoye, Adeoye Ella</p>
				</div> */}

				{/* <div className="mt-5">
					<div className="mb-1">
						<p className=" text-base">Application Form</p>
						<button className="bg-[#2A72A8] text-white px-2 py-1  rounded-md mt-1">
							Preview Form
						</button>
					</div>

					<p>Stages</p>

					<div className="mb-1">
						<p className="text-[#2A72A8] mb-1">Resume Screening</p>
						<p>debbie Adeoye, Adeoti Adeoye, Adeoye Ella</p>
					</div>
					<div className="mb-1">
						<p className="text-[#2A72A8] mb-1">Screening Call</p>
						<p>debbie Adeoye, Adeoti Adeoye, Adeoye Ella</p>
					</div>
					<div className="mb-1">
						<p className="text-[#2A72A8] mb-1">In-Person Interview</p>
						<p>Thimothy Raj,Simran Yesukumar</p>
					</div>
					<div className="mb-1">
						<p className="text-[#2A72A8] mb-1">Background Check</p>
						<p>Design departmnet</p>
					</div>
					<div className="mb-1">
						<p className="text-[#2A72A8] mb-1">Offer</p>
						<p>Ella George</p>
					</div>
				</div> */}
			</div>
		</div>
	);
}

export default ReviewSubmit;
