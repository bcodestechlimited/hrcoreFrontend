import React from "react";
import Input from "../../components/input/input";
import { RadioGroup } from "./radioinput";

function HiringDetails({ state, textChange, setState }) {
	const handleEmploymentChange = (value, type) => {
		setState({ ...state, [type || "type"]: value });
	};

	const joblevel = ["Graduate", "Entry level", "Mid-senior", "Senior"];

	return (
		<div>
			<div className="flex item items-center mb-3 gap-5">
				<div className="w-[30%]">
					<p className="text-[#2A72A8] ">Job level</p>
					<p>Choose multiple options if applicable</p>
				</div>

				<div className="w-full">
					<div>
						<div className="space-y-2  flex">
							<RadioGroup
								options={joblevel}
								selected={state?.level}
								onChange={handleEmploymentChange}
								type="level"
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="flex item items-center mb-3 gap-5">
				<div className="w-[30%]">
					<p className="text-[#2A72A8] ">Hiring Manager</p>
					<p>Enter hiring manager name and id</p>
				</div>

				<div className="w-full">
					<Input
						//   label={"First Name"}
						onChange={textChange}
						name="hiringManager"
						value={state?.hiringManager}
						placeholder={"Hiring Manager"}
					/>
				</div>
			</div>

			<div className="flex item items-center mb-3 gap-5">
				<div className="w-[30%]">
					<p className="text-[#2A72A8] ">Recruiters</p>
					<p>Enter hiring manager name and id</p>
				</div>

				<div className="w-full">
					<Input
						//   label={"First Name"}
						onChange={textChange}
						name="recruiters"
						value={state?.recruiters}
						placeholder={"Recruiter"}
					/>
				</div>
			</div>
		</div>
	);
}

export default HiringDetails;
