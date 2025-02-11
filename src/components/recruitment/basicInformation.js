import Input from "../../components/input/input";
import { RadioGroup } from "./radioinput";

const BasicInformation = ({ state, textChange, setState }) => {
	const handleEmploymentChange = (value, type) => {
		setState({ ...state, [type || "type"]: value });
	};

	const employmentOptions = [
		"Part-Time",
		"Full-Time",
		"Internship",
		"Contract",
		"Temporary",
	];

	const recruitment_limit = [
		"0 - 10 Candidates",
		"10 - 50 Candidates",
		"> 50 Candidates",
	];

	return (
		<div className=" mb-2 flex gap-5  w-full">
			<div className=" w-full   ">
				<div>
					<div className="bg-white  font-medium text-sm   w-full">
						<span>Indicates a required field</span>
						<div className="flex item items-center  mb-3 gap-5">
							<div className="w-[23%]">
								<p className="text-[#2A72A8] ">Job Name</p>
								<p>Enter your name</p>
							</div>

							<div className="w-full">
								<Input
									//   label={"First Name"}
									onChange={textChange}
									name="name"
									value={state?.name}
									placeholder={"Job Name"}
								/>
							</div>
						</div>
						<div className="flex item items-center mb-3 gap-5">
							<div className="w-[23%]">
								<p className="text-[#2A72A8] ">Job Description</p>
							</div>

							<div className="w-full">
								<Input
									//   label={"First Name"}
									onChange={textChange}
									name="description"
									value={state?.description}
									placeholder={"Enter Job description"}
									type={"textarea"}
								/>
							</div>
						</div>

						{/* <div className="flex item items-center mb-3 gap-5">
							<div className="w-[23%]">
								<p className="text-[#2A72A8] ">Job Requirement</p>
							</div>

							<div className="w-full">
								<Input
									//   label={"First Name"}
									onChange={textChange}
									name="firstName"
									value={state?.firstName}
									placeholder={"Job Requirement"}
								/>
							</div>
						</div>
						<div className="flex item items-center mb-3 gap-5">
							<div className="w-[23%]">
								<p className="text-[#2A72A8] ">Job Requirement</p>
							</div>

							<div className="w-full">
								<Input
									//   label={"First Name"}
									onChange={textChange}
									name="firstName"
									value={state?.firstName}
									placeholder={"Job Requirement"}
								/>
							</div>
						</div> */}
						<div className="flex item items-center mb-3 gap-5">
							<div className="w-[23%]">
								<p className="text-[#2A72A8] ">Job Type</p>
							</div>

							<div className="w-full">radio</div>
						</div>

						<div className="flex item items-center mb-3 gap-5">
							<div className="w-[23%]">
								<p className="text-[#2A72A8] ">Job Type</p>
							</div>

							<div className="w-full">
								<div>
									<div className="space-y-2  flex">
										<RadioGroup
											options={employmentOptions}
											selected={state?.type}
											onChange={handleEmploymentChange}
											type="type"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="flex item items-center mb-3 gap-5">
							<div className="w-[23%]">
								<p className="text-[#2A72A8] ">Job Location</p>
								<p>Choose multiple options if applicable</p>
							</div>

							<div className="w-full">
								<Input
									//   label={"First Name"}
									onChange={textChange}
									name="location"
									value={state?.location}
									placeholder={"Job Location"}
								/>
							</div>
						</div>

						<div className="flex item items-center mb-3 gap-5">
							<div className="w-[23%]">
								<p className="text-[#2A72A8] ">Recruitment Limit</p>
							</div>

							<div className="w-full">
								<div>
									<div className="space-y-2  flex">
										<RadioGroup
											options={recruitment_limit}
											selected={state?.limit}
											onChange={handleEmploymentChange}
											type="limit"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BasicInformation;
