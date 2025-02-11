import axios from "axios";
import React, { useContext, useState } from "react";
// import { MyInput } from "../all-jobs/create-new-job";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { returnErrors } from "../../../data/Reducers/ErrorReducer";
import { useDispatch } from "react-redux";
import moment from "moment";
import Button from "../../../components/button/button";
import { GlobalState } from "../../../data/Context";
import { useSelector } from "react-redux";

const ApplicationForm = () => <MainApplicationForm />;

export const MainApplicationForm = () => {
	const [modal, setModal] = useState(false);
	let location = useLocation(),
		[getSearch] = useSearchParams(),
		dispatch = useDispatch(),
		[loading, setLoading] = useState(false),
		init = { name: "" },
		{ auth } = useSelector(state => state),
		navigate = useNavigate(),
		[state, setState] = useState(init),
		textChange = e => {
			let { name, value } = e?.target;
			setState({ ...state, [name]: value });
		};

	const manageJobApplication = async e => {
		e?.preventDefault();
		try {
			if (!state?.name || !state?.email) return;
			let coverLetter = state?.coverLetter;
			setLoading(true);
			if (coverLetter) {
				let resImg = await axios.post(
					`/api/v1/file`,
					{ mic: coverLetter },
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				);
				coverLetter = resImg?.data?.data?.files?.files?.[0]?.url;
			}

			let res = await axios.post(
				`/api/v1/job-application`,
				{
					...state,
					coverLetter,
					relocate: state?.relocate === "true",
					consentBackgroundCheck: state?.consentBackgroundCheck === "true",
					job: getSearch?.get("job"),
				},
				{
					headers: {
						companyid: getSearch?.get("company") || "",
						companyId: getSearch?.get("company") || "",
					},
				}
			);

			toast.success(res?.data?.message);
			setLoading(false);
			setModal(false);
			setState(init);
			if (auth?.isAuth) {
				navigate("/recruitment/all-jobs");
			}
		} catch (err) {
			setLoading(false);
			if (err) console.log({ error: err.response?.data, err });
			if (err?.response?.status === 429) toast.error(err?.response?.data);
			let error = err.response?.data?.error;
			if (error) {
				dispatch(returnErrors({ error, status: err?.response?.status }));
			} else {
				toast.error(err?.response?.data?.message);
			}
		}
	};

	let handleChangeImage = name => e => {
		const file = e.target.files[0];
		let err = "";

		if (!file) return (err = `File, ${file?.name} does not exist`);

		if (err) {
			return toast.error(err);
		} else {
			setState({ ...state, [name || "file"]: file });
		}
	};

	if (!location?.state) return;

	return (
		<div>
			<div className="w-5/6 mx-auto bg-white">
				<div className="w-5/6 mx-auto bg-white p-8 shadow-lg">
					<h2 className="work text-lg font-semibold text-[#1b1b1b]">
						Application Form for {location?.state?.name}
					</h2>
					<p className="pt-2 text-[#1b1b1bcc] text-sm font-normal">
						{location?.state?.description}
					</p>
				</div>
				<div className="w-3/4 mt-6 mx-auto p-8 shadow-md">
					<form className="">
						<div className="space-y-4">
							<Inputs
								label={"Full Name"}
								placeholder={"Full Name"}
								name={"name"}
								value={state?.name}
								onChange={textChange}
							/>
							<Inputs
								type="email"
								label={"Email Address"}
								placeholder={"example@example.com"}
								name={"email"}
								value={state?.email}
								onChange={textChange}
							/>
							<Inputs
								type="tel"
								label={"Telephone"}
								placeholder={"08080808080"}
								name={"phone"}
								value={state?.phone}
								onChange={textChange}
								maxLength={11}
							/>
							<DateInputs
								label={"Available date to start"}
								name={"startDate"}
								value={state?.startDate}
								onChange={textChange}
							/>
							<SelectInputs
								label={"Do you consent to background check ?"}
								value={state?.consentBackgroundCheck}
								onChange={textChange}
								name={"consentBackgroundCheck"}
							/>
							<SelectInputs
								onChange={textChange}
								label={
									"Are you ready to work or relocate in the location specified?"
								}
								name={"relocate"}
								value={state?.relocate}
							/>
							<Inputs
								label={"Expected Salary(NGN)"}
								placeholder={""}
								name={"expectedSalary"}
								value={state?.expectedSalary}
								onChange={textChange}
								type={"number"}
								min={0}
							/>
							<Inputs
								label={
									"If selected. how long of a notice period do you require?(in days)"
								}
								placeholder={"14"}
								name={"noticePeriod"}
								value={state?.noticePeriod}
								onChange={textChange}
								type="number"
								min={0}
							/>
							<div>
								<h6 className="text-sm font-medium text-[#344054] inter">
									{"Resume"}
								</h6>
								<input
									title="Upload file"
									type="file"
									name="file"
									id="file"
									className="border border-[#ccc] rounded w-3/4 mt-4 h-12 text-base font-medium text-black"
									accept="image/*,.pdf"
									onChange={handleChangeImage("coverLetter")}
								/>
							</div>
						</div>
					</form>
					<div className="flex justify-center mt-16">
						<button
							onClick={
								!state?.email || !state?.name ? null : () => setModal(true)
							}
							className="bg-black text-white rounded-md h-10 w-36 text-sm source font-medium">
							Review and Submit
						</button>
					</div>
				</div>
			</div>
			{modal && (
				<DetailsModal
					handleClose={() => setModal(false)}
					handleSubmit={manageJobApplication}
					loading={loading}
					state={state}
				/>
			)}
		</div>
	);
};

const Inputs = ({
	label,
	name,
	value,
	onChange,
	type,
	placeholder,
	...otherProps
}) => {
	return (
		<div className="">
			<h6 className="text-sm font-medium text-[#344054] inter">{label}</h6>
			<input
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				type={type || "text"}
				className="border border-[#ccc] rounded w-3/4 mt-4 h-12 text-base font-medium text-black"
				{...otherProps}
			/>
		</div>
	);
};

const DateInputs = ({
	label,
	name,
	value,
	onChange,
	placeholder,
	...otherProps
}) => {
	return (
		<div className="">
			<h6 className="text-sm font-medium text-[#344054] inter">{label}</h6>
			<input
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				type="date"
				className="border border-[#ccc] rounded w-3/4 mt-4 h-12 text-base font-medium text-black"
				min={moment().format("YYYY-MM-DD")}
				{...otherProps}
			/>
		</div>
	);
};

const SelectInputs = ({ label, name, value, onChange, otherProps }) => {
	return (
		<div className="">
			<h6 className="text-sm font-medium text-[#344054] inter">{label}</h6>
			<select
				name={name}
				onChange={onChange}
				className="border border-[#ccc] rounded w-3/4 mt-4 h-12 text-base font-medium text-black"
				{...otherProps}>
				<option value={""} className="">
					Select one
				</option>
				<option value={false} className="">
					No
				</option>
				<option value={true} className="">
					Yes
				</option>
			</select>
		</div>
	);
};

const DetailsModal = ({ handleClose, handleSubmit, state, loading }) => {
	let location = useLocation(),
		{ numberWithCommas } = useContext(GlobalState);

	const Arr = [
			{
				title: "job applied for",
				info: location?.state?.name,
			},
			{
				title: "date applied",
				info: moment().format("DD/MM/YYYY"),
			},
			{
				title: "email address",
				info: state?.email,
			},
			// {
			// 	title: "years of experience",
			// 	info: "5 years",
			// },
			// {
			// 	title: "interview dates",
			// 	info: "1st August 2023",
			// },
			{
				title: "Attachment",
				info: state?.coverLetter?.name,
			},
		],
		Arr2 = [
			{
				title: "AVAILABLE DATE TO START",
				info: state?.noticePeriod
					? moment().add(state?.noticePeriod, "days").format("DD/MM/YYYY")
					: "",
			},
			{
				title: "PLANNING TO RELOCATE",
				info: state?.relocate === "true" ? "Yes" : "No",
			},
			{
				title: "NOTICE PERIOD",
				info: `${state?.noticePeriod ? `${state?.noticePeriod} days` : ""}`,
			},
			{
				title: "EXPECTED SALARY",
				info: state?.expectedSalary
					? `NGN ${numberWithCommas(Number(state?.expectedSalary).toFixed(2))}`
					: "",
			},
			{
				title: "CONSENT TO BACKGROUND CHECKS",
				info: state?.consentBackgroundCheck === "true" ? "Yes" : "No",
			},
		];
	return (
		<div>
			<div className="fixed inset-0 bg-main flex justify-center items-center bg-opacity-30 backdrop-blur-md">
				<div className="bg-white w-1/2 p-6 mx-auto">
					<div className="flex justify-between border-b-2 pb-2 items-center">
						<h4 className="source text-lg font-semibold text-black uppercase">
							application details
						</h4>
						<AiOutlineClose onClick={handleClose} />
					</div>
					<div className="flex justify-between mt-6">
						<div>
							<h5 className="text-main nunito text-sm font-bold uppercase">
								full name
							</h5>
							<p className="text-xs pt-2 nunito font-medium text-[#1b1b1b]">
								{state?.name}
							</p>
							<div className="space-y-4 mt-4">
								{Arr.map((item, i) => (
									<div key={i}>
										<h5 className="text-black nunito text-sm font-bold uppercase">
											{item.title}
										</h5>
										<p className="text-xs pt-1 nunito font-medium text-[#1b1b1b]">
											{item.info}
										</p>
									</div>
								))}
							</div>
						</div>
						<div className="space-y-4">
							{Arr2.map((item, i) => (
								<div key={i}>
									<h5 className="text-black nunito text-sm font-bold uppercase">
										{item.title}
									</h5>
									<p className="text-xs pt-1 nunito font-medium text-[#1b1b1b]">
										{item.info}
									</p>
								</div>
							))}
						</div>
					</div>
					<div className="mt-6 flex justify-center">
						<Button
							buttonType={"primary"}
							title={"Submit"}
							width={
								"w-fit bg-black text-white rounded-md h-10 w-36 text-sm source font-medium"
							}
							type="submit"
							loading={loading}
							onClick={handleSubmit}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ApplicationForm;
