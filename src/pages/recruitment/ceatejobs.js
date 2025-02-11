import React, { useState, useEffect } from "react";
import HiringDetails from "../../components/recruitment/hiringdetails";
import BasicInformation from "../../components/recruitment/basicInformation";
import ReviewSubmit from "../../components/recruitment/reviewsubmit";
import Formstep from "../../components/recruitment/formstep";
import { useSelector, useDispatch } from "react-redux";
import { manageJob } from "../../data/Reducers/JobReducer";
import Button from "../../components/button/button";
import { useNavigate } from "react-router-dom";

function Ceatejob() {
	const steps = ["Basic Information", "Hiring Details", "Review & Submit"];
	const [currentStep, setCurrentStep] = useState(2);
	const [complete, setComplete] = useState(false);

	let init = {
			name: "",
			description: "",
			type: "",
			location: "",
			limit: "",
			level: "",
			hiringManager: "",
			recruiters: "",
		},
		[state, setState] = useState(init),
		textChange = e => {
			let { name, value } = e.target;
			setState({ ...state, [name]: value });
		},
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		{ job, company } = useSelector(state => state),
		dispatch = useDispatch(),
		navigate = useNavigate();

	const handleSubmit = async e => {
		e?.preventDefault();
		if (!state?.name) return;
		setLoading("load");
		await dispatch(
			manageJob(
				"post",
				{
					...state,
					level: state?.level?.toLowerCase(),
					type: state?.type?.toLowerCase(),
				},
				company?.currentSelected
			)
		);
		setLoading(false);
		setSubmit(true);
	};
	let reset = () => {
		setSubmit(false);
		setState(init);
		navigate("/recruitment/all-jobs");
	};

	useEffect(() => {
		if (job?.isAdded && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [job?.isAdded]);

	const handlePrevious = () => {
		setCurrentStep(currentStep - 1);
	};

	return (
		<div className="bg-white shadow-lg rounded-lg m-auto border-2 cursor-pointer mb-2 py-5 pr-2">
			<div className="flex gap-5">
				<div className="bg-white w-[20%]">
					<Formstep
						steps={steps}
						currentStep={currentStep}
						setCurrentStep={setCurrentStep}
						complete={complete}
						setComplete={setComplete}
					/>
				</div>

				<div className="w-full">
					{currentStep === 1 && (
						<BasicInformation
							state={state}
							textChange={textChange}
							setState={setState}
						/>
					)}
					{currentStep === 2 && (
						<HiringDetails
							state={state}
							textChange={textChange}
							setState={setState}
						/>
					)}
					{currentStep === 3 && (
						<ReviewSubmit
							currentStep={currentStep}
							setCurrentStep={setCurrentStep}
							state={state}
							textChange={textChange}
						/>
					)}
				</div>
			</div>

			<div className="flex justify-end">
				<div className="flex">
					{currentStep !== 1 && (
						<button
							className="bg-[#2A72A8] py-[3px] px-4 text-white rounded mr-2"
							onClick={handlePrevious}>
							Back
						</button>
					)}
					{!complete && (
						<Button
							title={
								currentStep === steps.length ? "Finish" : "Save and continue"
							}
							width={"w-fit bg-[#2A72A8] py-[6px] px-4 text-white rounded"}
							type="submit"
							loading={loading === "load"}
							onClick={e => {
								currentStep === steps.length
									? handleSubmit(e)
									: setCurrentStep(prev => prev + 1);
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default Ceatejob;
