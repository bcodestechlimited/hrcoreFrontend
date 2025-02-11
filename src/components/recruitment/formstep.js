import React from "react";
import { TiTick } from "react-icons/ti";

function Formstep({
	steps,
	currentStep,
	setCurrentStep,
	complete,
	setComplete,
}) {
	return (
		<div className="flex pl-2 ">
			{/* <div className=" flex flex-col gap-10  "> */}
			<>
				<div className="flex-col justify-between ">
					{steps?.map((step, i) => (
						<div className="flex gap-1 ">
							<div
								key={i}
								className={`  relative flex flex-col  items-center  ${
									currentStep === i + 1 ? "active" : ""
								} ${i + 1 < currentStep || complete ? "complete" : ""} `}>
								<div
									className={`w-10  h-10 flex items-center justify-center z-10 relative rounded-full font-semibold text-white ${
										currentStep === i + 1 ? "bg-blue-600" : "bg-[#EDF0F6]"
									}`}
									onClick={() => setCurrentStep(i + 1)}>
									{i + 1 < currentStep || complete ? (
										<TiTick size={24} />
									) : (
										i + 1
									)}
								</div>
								<p
									className={`text-gray-500 py-5

                  ${
										i + 1 < currentStep || complete
											? "text-gray-500   "
											: " text-gray-500  "
									}

                  `}>
									{/* {step} */}
								</p>
								{i !== steps.length - 1 && (
									<div
										className={`content-[''] ${
											currentStep === i + 1 ? "bg-blue-600" : "bg-gray-200"
										} absolute w-[3px] h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/4`}></div>
								)}
							</div>
							<p className="f font-medium text-sm mt-2"> {step}</p>
						</div>
					))}
				</div>
			</>
			{/* </div> */}
		</div>
	);
}

export default Formstep;
