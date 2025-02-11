import { useEffect, useState, useContext } from "react";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import Input from "../../components/input/input";
import {
	BsArrowRightShort,
	BsArrowLeftShort,
	BsPlusCircleFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { Education, Experience } from ".";
import { v4 } from "uuid";
import Button from "../../components/button/button";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { returnErrors } from "../../data/Reducers/ErrorReducer";
import { setUserFail } from "../../data/Reducers/UserReducer";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { GlobalState } from "../../data/Context";

const UpdateProfile = () => {
	let { auth } = useSelector(state => state),
		[state, setState] = useState(auth?.user),
		textChange = e => {
			let { value, name } = e.target;
			setState({ ...state, [name]: value });
		},
		dispatch = useDispatch(),
		navigate = useNavigate(),
		[loading, setLoading] = useState(false),
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading(true);
			try {
				console.log({ state });
				let newState = state;
				if (state?.dateOfBirth) {
					newState = {
						...newState,
						birthMonth: moment(state?.dateOfBirth)?.format("MM"),
						birthDay: moment(state?.dateOfBirth)?.format("DD"),
					};
				}
				if (state?.weddingAnniversary && state?.maritalStatus === "married") {
					newState = {
						...newState,
						weddingAnniversaryMonth: moment(state?.weddingAnniversary)?.format(
							"MM"
						),
						weddingAnniversaryDay: moment(state?.weddingAnniversary)?.format(
							"DD"
						),
					};
				}
				console.log({ newState });
				let res = await axios.put(`/api/v1/user`, { ...newState });
				console.log({ resp: res?.data });
				toast.success(res?.data?.message);
				// dispatch(setUser(res?.data?.data));
				navigate("/profile");
			} catch (err) {
				if (err?.response?.status === 429 || err?.response?.status === 405)
					toast.error(err?.response?.data ? err?.response?.data : err?.message);
				console.log({ err });
				let error = err.response?.data?.error;
				if (error) {
					dispatch(returnErrors({ error, status: err?.response?.status }));
				} else {
					toast.error(err?.response?.data?.message);
				}
				dispatch(setUserFail());
			}
			setLoading(false);
		};

	return (
		<UpdateProfileBasic
			state={state}
			textChange={textChange}
			setState={setState}
			handleSubmit={handleSubmit}
			loading={loading}
		/>
	);
};

export const UpdateProfileBasic = ({
	state,
	textChange,
	setState,
	handleSubmit,
	loading,
}) => {
	let [stage, setStage] = useState("basic information");
	const nextStage = stg => {
		setStage(stg);
	};
	return (
		<div>
			<div className="max-w-4xl mx-auto">
				<Breadcrumb />
				<div class="block mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow">
					<p className="text-center font-semibold text-xl">Update Profile</p>
					<div className="flex whitespace-wrap md:whitespace-nowrap items-center justify-between max-w-2xl mx-auto mt-8">
						<div className="flex items-center gap-2 flex-wrap md:flex-nowrap justify-center text-center">
							<div
								className={`w-8 h-8 rounded-full border flex items-center justify-center ${
									stage === "organization" ||
									stage === "education" ||
									stage === "experience"
										? "bg-secondary text-white"
										: stage === "basic information" &&
										  "bg-pink-300 text-secondary"
								}`}>
								1
							</div>
							<p
								className={`${
									(stage === "basic information" ||
										stage === "organization" ||
										stage === "education" ||
										stage === "experience") &&
									"font-semibold"
								}`}>
								Basic Information
							</p>
						</div>
						<div className="flex items-center gap-2 flex-wrap md:flex-nowrap justify-center text-center">
							<div
								className={`w-8 h-8 rounded-full border flex items-center justify-center ${
									// stage === "organization" ||
									stage === "education" || stage === "experience"
										? "bg-secondary text-white"
										: stage === "organization" && "bg-pink-300 text-secondary"
								}`}>
								2
							</div>
							<p
								className={`${
									(stage === "organization" ||
										stage === "education" ||
										stage === "experience") &&
									"font-semibold"
								}`}>
								Organization
							</p>
						</div>
						<div className="flex items-center gap-2 flex-wrap md:flex-nowrap justify-center text-center">
							<div
								className={`w-8 h-8 rounded-full border flex items-center justify-center ${
									stage === "experience"
										? "bg-secondary text-white"
										: stage === "education" && "bg-pink-300 text-secondary"
								}`}>
								3
							</div>
							<p
								className={`${
									(stage === "education" || stage === "experience") &&
									"font-semibold"
								}`}>
								Education
							</p>
						</div>
						<div className="flex items-center gap-2 flex-wrap md:flex-nowrap justify-center text-center">
							<div
								className={`w-8 h-8 rounded-full border flex items-center justify-center ${
									stage === "experience" && "bg-pink-300 text-secondary"
								}`}>
								4
							</div>
							<p className={`${stage === "experience" && "font-semibold"}`}>
								Experience
							</p>
						</div>
					</div>
					<div className="mt-8">
						{stage === "basic information" && (
							<BasicInformation
								nextStage={() => nextStage("organization")}
								// stage={stage}
								state={state}
								textChange={textChange}
							/>
						)}
						{stage === "organization" && (
							<Organization
								nextStage={() => nextStage("education")}
								prevStage={() => nextStage("basic information")}
								// stage={stage}
								state={state}
								textChange={textChange}
							/>
						)}
						{stage === "education" && (
							<EducationUpdate
								nextStage={() => nextStage("experience")}
								prevStage={() => nextStage("organization")}
								// stage={stage}
								state={state}
								textChange={textChange}
								setState={setState}
							/>
						)}
						{stage === "experience" && (
							<ExperienceUpdate
								prevStage={() => nextStage("education")}
								// stage={stage}
								state={state}
								textChange={textChange}
								setState={setState}
								handleSubmit={handleSubmit}
								loading={loading}
							/>
						)}
						{/* <Education /> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateProfile;

const BasicInformation = ({ nextStage, state, textChange }) => {
	let { countryState } = useContext(GlobalState);
	return (
		<div>
			<form>
				<div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
					<div>
						<Input
							label={"First name"}
							placeholder={"First name"}
							value={state?.firstName || state?.profile?.firstName}
							name={"firstName"}
							onChange={textChange}
						/>
					</div>
					<div>
						<Input
							label={"Last name"}
							placeholder={"Last name"}
							value={state?.lastName || state?.profile?.lastName}
							name={"lastName"}
							onChange={textChange}
						/>
					</div>
					<div className="col-span-2">
						<Input
							label={"Gender"}
							type={"select"}
							options={[{ value: "male" }, { value: "female" }]}
							value={state?.gender || state?.profile?.gender}
							name={"gender"}
							onChange={textChange}
						/>
					</div>
					<div className="col-span-2">
						<Input
							label={"Date of Birth"}
							type={"date"}
							value={
								state?.dateOfBirth || state?.profile?.dateOfBirth
									? moment(
											state?.dateOfBirth || state?.profile?.dateOfBirth
									  ).format("YYYY-MM-DD")
									: ""
							}
							name={"dateOfBirth"}
							onChange={textChange}
							max={moment().format("YYYY-MM-DD")}
						/>
					</div>
					<div className="col-span-2">
						<Input
							label={"Work Email"}
							type={"you@company.com"}
							value={state?.email || state?.profile?.email}
							name={"email"}
							onChange={textChange}
						/>
					</div>
					<div className="col-span-2">
						<Input
							label={"Personal Email"}
							type={"you@company.com"}
							value={state?.personalEmail || state?.profile?.personalEmail}
							name={"personalEmail"}
							onChange={textChange}
						/>
					</div>
					<div className="col-span-2">
						<Input
							label={"Phone number"}
							type={"tel"}
							value={state?.phone || state?.profile?.phone}
							name={"phone"}
							onChange={textChange}
						/>
					</div>
					<div className="col-span-2">
						<Input
							value={state?.maritalStatus || state?.profile?.maritalStatus}
							name={"maritalStatus"}
							onChange={textChange}
							label={"Marital Status"}
							type={"select"}
							options={[{ value: "married" }, { value: "single" }]}
						/>
					</div>
					{state?.maritalStatus === "married" ||
					state?.profile?.maritalStatus === "married" ? (
						<div className="col-span-2">
							<Input
								onChange={textChange}
								name="weddingAnniversary"
								value={
									state?.weddingAnniversary ||
									state?.profile?.weddingAnniversary
								}
								label={"Wedding Anniversary"}
								placeholder={"Wedding Anniversary"}
								type="date"
								max={moment().format("YYYY-MM-DD")}
							/>
						</div>
					) : null}
					<div className="col-span-2">
						<Input
							label={"LGA of origin"}
							value={state?.lgaOfOrigin || state?.profile?.lgaOfOrigin}
							name={"lgaOfOrigin"}
							onChange={textChange}
						/>
					</div>
					<div className="col-span-2">
						<Input
							label={"State of origin"}
							value={state?.stateOfOrigin || state?.profile?.stateOfOrigin}
							name={"stateOfOrigin"}
							onChange={textChange}
							type={"select"}
							options={countryState}
						/>
					</div>
					<div className="col-span-2">
						<Input
							label={"State of Residence"}
							value={
								state?.stateOfResidence || state?.profile?.stateOfResidence
							}
							name={"stateOfResidence"}
							onChange={textChange}
							type={"select"}
							options={countryState}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between mt-8 max-w-2xl mx-auto">
					<button
						type="button"
						className="h-10 px-4 border border-gray-500 rounded-md text-md capitalize flex items-center gap-2"
						onClick={nextStage}>
						next{" "}
						<span>
							<BsArrowRightShort />
						</span>
					</button>
				</div>
			</form>
		</div>
	);
};

const Organization = ({ nextStage, prevStage, state, textChange }) => {
	let { position, level, department, grade } = useSelector(st => st);
	return (
		<div>
			<form>
				<div className="grid gap-4 max-w-2xl mx-auto">
					<div>
						<Input
							label={"Employee ID"}
							placeholder={"0000"}
							value={state?.employeeId || state?.profile?.employeeId}
							name={"employeeId"}
							onChange={textChange}
						/>
					</div>
					{/* <div className="">
						<Input label={"Role"} type={"select"} />
					</div> */}
					<Input
						// onChange={textChange}
						name="level"
						label={"Level"}
						type={"select"}
						options={level?.all?.docs?.filter(item => item?.name)}
						value={
							state?.level?._id ||
							state?.level ||
							state?.profile?.level?._id ||
							state?.profile?.level
						}
						onChange={textChange}
					/>
					<Input
						// onChange={textChange}
						name="grade"
						label={"Grade"}
						type={"select"}
						options={grade?.all?.docs?.filter(item => item?.name)}
						value={
							state?.grade?._id ||
							state?.grade ||
							state?.profile?.grade?._id ||
							state?.profile?.grade
						}
						onChange={textChange}
					/>
					<Input
						// onChange={textChange}
						name="department"
						label={"Department"}
						type={"select"}
						options={department?.all?.docs?.filter(item => item?.name)}
						value={
							state?.department?._id ||
							state?.department ||
							state?.profile?.department?._id ||
							state?.profile?.department
						}
						onChange={textChange}
					/>
					{state?.department?._id ||
					state?.department ||
					state?.profile?.department?._id ||
					state?.profile?.department ? (
						<Input
							// onChange={textChange}
							name="position"
							label={"Position"}
							type={"select"}
							options={position?.all?.docs?.filter(item => {
								let dept =
									state?.department?._id ||
									state?.department ||
									state?.profile?.department?._id ||
									state?.profile?.department;

								return item?.name && dept === item?.department?._id;
							})}
							value={
								state?.position?._id ||
								state?.position ||
								state?.profile?.position?._id ||
								state?.profile?.position
							}
							onChange={textChange}
						/>
					) : null}
					<div className="">
						<Input label={"Branch"} type={"select"} />
					</div>
					<hr className="my-8 border-spacing-2" />
					<div className="">
						<Input
							label={"Pension"}
							type={"text"}
							value={state?.pension || state?.profile?.pension}
							name={"pension"}
							onChange={textChange}
						/>
					</div>
					<div className="">
						<Input
							label={"Pension Number"}
							type={"text"}
							value={state?.pensionNumber || state?.profile?.pensionNumber}
							name={"pensionNumber"}
							onChange={textChange}
						/>
					</div>
					<hr className="my-8 border-spacing-2" />
					<div className="">
						<Input
							label={"on HMO?"}
							type={"select"}
							value={state?.onHMOScheme || state?.profile?.onHMOScheme}
							name={"onHMOScheme"}
							onChange={textChange}
							options={[
								{ name: "True", value: true },
								{ name: "False", value: false },
							]}
						/>
					</div>
					<div className="">
						<Input
							label={"HMO Provider"}
							type={"text"}
							value={state?.provider || state?.profile?.provider}
							name={"provider"}
							onChange={textChange}
						/>
					</div>
					<div className="">
						<Input
							label={"HMO ID"}
							type={"text"}
							value={state?.hmoId || state?.profile?.hmoId}
							name={"hmoId"}
							onChange={textChange}
						/>
					</div>
					<div className="">
						<Input
							label={"HMO Number"}
							type={"text"}
							value={state?.hmoNumber || state?.profile?.hmoNumber}
							name={"hmoNumber"}
							onChange={textChange}
						/>
					</div>
					<div className="">
						<Input
							label={"HMO Plan"}
							type={"text"}
							value={state?.hmoPlan || state?.profile?.hmoPlan}
							name={"hmoPlan"}
							onChange={textChange}
						/>
					</div>
					<div className="">
						<Input
							label={"HMO Status"}
							type={"text"}
							value={state?.hmoStatus || state?.profile?.hmoStatus}
							name={"hmoStatus"}
							onChange={textChange}
						/>
					</div>
					<div className="">
						<Input
							label={"HMO Hospital"}
							type={"text"}
							value={state?.hmoHospital || state?.profile?.hmoHospital}
							name={"hmoHospital"}
							onChange={textChange}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between mt-8 max-w-2xl mx-auto">
					<button
						type="button"
						className="h-10 px-4 border border-gray-500 rounded-md text-md capitalize flex items-center gap-2"
						onClick={prevStage}>
						<span>
							<BsArrowLeftShort />
						</span>
						Previous{" "}
					</button>
					<button
						type="button"
						className="h-10 px-4 border border-gray-500 rounded-md text-md capitalize flex items-center gap-2"
						onClick={nextStage}>
						next{" "}
						<span>
							<BsArrowRightShort />
						</span>
					</button>
				</div>
			</form>
		</div>
	);
};

const EducationUpdate = ({ nextStage, prevStage, state, setState }) => {
	let [data, setData] = useState([]),
		init = {
			institution: "",
			courseOfStudy: "",
			endDate: "",
			startDate: "",
			qualification: "",
		},
		[da, setDa] = useState(init),
		[isEdit, setIsEdit] = useState(false),
		handleChange = e => {
			let { name, value } = e.target;
			setDa({ ...da, [name]: value });
		},
		handleEdit = e => {
			setDa({ ...da, ...e });
			setIsEdit(e);
		},
		handleDelete = e => {
			let newFil = data?.filter(it => it?.id !== e?.id);
			console.log({ newFil, e, data });
			setData(newFil);
		},
		handleAdd = () => {
			if (
				!da?.courseOfStudy ||
				!da?.endDate ||
				!da?.institution ||
				!da?.qualification ||
				!da?.startDate
			)
				return;

			setData(
				!isEdit
					? [...data, { ...da, id: v4() }]
					: [...data?.map(it => (it?.id === isEdit?.id ? da : it))]
			);
			setDa(init);
			setIsEdit(false);
		};

	useEffect(() => {
		if (state?.education || state?.profile?.education) {
			setData(state?.education || state?.profile?.education);
			setDa(state?.education?.[0] || state?.profile?.education?.[0]);
		}
	}, [state]);

	return (
		<div>
			{data?.length > 0 && (
				<Education
					state={data}
					setIsDelete={handleDelete}
					setIsEdit={handleEdit}
				/>
			)}
			<form className={data?.length > 0 ? "pt-5" : ""}>
				<div className="p-2 bg-gray-200 max-w-2xl mx-auto mb-8 text-semibold rounded-md px-4 w-full font-bold text-xl">
					Education History
				</div>
				<div className="grid gap-4 max-w-2xl mx-auto">
					<div className="col-span-2">
						<Input
							label={"School"}
							type={"text"}
							placeholder={"ICS Academy"}
							value={da?.institution}
							name={"institution"}
							onChange={handleChange}
						/>
					</div>
					<div className="col-span-2">
						<Input
							value={da?.qualification}
							name={"qualification"}
							onChange={handleChange}
							label={"Degree"}
							type={"text"}
						/>
					</div>
					<div className="col-span-2">
						<Input
							label={"Course"}
							type={"text"}
							value={da?.courseOfStudy}
							name={"courseOfStudy"}
							onChange={handleChange}
						/>
					</div>
					<div className="col-span-2">
						<Input
							label={"Start Year"}
							type={"text"}
							value={da?.startDate}
							name={"startDate"}
							onChange={handleChange}
						/>
					</div>
					<div className="col-span-2">
						<Input
							label={"End Year"}
							type={"text"}
							value={da?.endDate}
							name={"endDate"}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="flex justify-end max-w-2xl py-4">
					<span onClick={handleAdd} className="flex cursor-pointer">
						<BsPlusCircleFill size={24} />
						<span>Add New</span>
					</span>
				</div>
				<div className="flex items-center justify-between mt-8 max-w-2xl mx-auto">
					<button
						type="button"
						className="h-10 px-4 border border-gray-500 rounded-md text-md capitalize flex items-center gap-2"
						onClick={prevStage}>
						<span>
							<BsArrowLeftShort />
						</span>
						Previous{" "}
					</button>
					<button
						type="button"
						className="h-10 px-4 border border-gray-500 rounded-md text-md capitalize flex items-center gap-2"
						onClick={() => {
							let newData = data;
							if (
								da?.courseOfStudy ||
								da?.endDate ||
								da?.institution ||
								da?.qualification ||
								da?.startDate
							)
								newData = [...data, { ...da, id: v4() }];
							setDa(init);
							setState({ ...state, education: newData });
							nextStage();
						}}>
						next{" "}
						<span>
							<BsArrowRightShort />
						</span>
					</button>
				</div>
			</form>
		</div>
	);
};

const ExperienceUpdate = ({
	prevStage,
	state,
	textChange,
	setState,
	handleSubmit,
	loading,
}) => {
	let [data, setData] = useState([]),
		init = {
			company: "",
			position: "",
			endDate: "",
			startDate: "",
		},
		[da, setDa] = useState(init),
		[isEdit, setIsEdit] = useState(false),
		handleChange = e => {
			let { name, value } = e.target;
			setDa({ ...da, [name]: value });
		},
		handleEdit = e => {
			setDa({ ...da, ...e });
			setIsEdit(e);
		},
		[isSubmit, setIsSubmit] = useState(false),
		handleDelete = e => {
			let newFil = data?.filter(it => it?.id !== e?.id);
			console.log({ newFil, e, data });
			setData(newFil);
		},
		handleAdd = () => {
			if (!da?.position || !da?.endDate || !da?.company || !da?.startDate)
				return;

			setData(
				!isEdit
					? [...data, { ...da, id: v4() }]
					: [...data?.map(it => (it?.id === isEdit?.id ? da : it))]
			);
			setDa(init);
			setIsEdit(false);
		};

	useEffect(() => {
		if (state?.experience || state?.profile?.experience) {
			setData(state?.experience || state?.profile?.experience);
			setDa(state?.experience?.[0] || state?.profile?.experience?.[0]);
		}
	}, [state]);
	return (
		<div>
			{data?.length > 0 && (
				<Experience
					state={data}
					setIsDelete={handleDelete}
					setIsEdit={handleEdit}
				/>
			)}
			<form className={data?.length > 0 ? "pt-5" : ""}>
				<div className="grid gap-4 max-w-2xl mx-auto">
					<div className="col-span-2">
						<Input
							label={"Company"}
							type={"text"}
							placeholder={"ICS Academy"}
							value={da?.company}
							name={"company"}
							onChange={handleChange}
						/>
					</div>
					<div className="col-span-2">
						<Input
							value={da?.position}
							name={"position"}
							onChange={handleChange}
							label={"Position"}
							type={"text"}
						/>
					</div>
					<div className="col-span-2">
						<Input
							label={"Start Year"}
							type={"tel"}
							value={da?.startDate}
							name={"startDate"}
							onChange={handleChange}
						/>
					</div>
					<div className="col-span-2">
						<Input
							label={"End Year"}
							type={"tel"}
							value={da?.endDate}
							name={"endDate"}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="flex justify-end max-w-2xl py-4">
					<span onClick={handleAdd} className="flex cursor-pointer">
						<BsPlusCircleFill size={24} />
						<span>Add New</span>
					</span>
				</div>
				<div className="flex items-center justify-between mt-8 max-w-2xl mx-auto">
					<button
						type="button"
						className="h-10 px-4 border border-gray-500 rounded-md text-md capitalize flex items-center gap-2"
						onClick={() => {
							prevStage();
							setIsSubmit(false);
						}}>
						<span>
							<BsArrowLeftShort />
						</span>
						Previous{" "}
					</button>
					{isSubmit ? (
						<Button
							buttonType={"primary"}
							title={"Submit"}
							width={
								"w-fit h-10 px-4 bg-main text-white rounded-md text-md capitalize flex items-center gap-2"
							}
							type="button"
							loading={loading}
							onClick={handleSubmit}
						/>
					) : (
						<button
							type="button"
							className="h-10 px-4 border border-gray-500 rounded-md text-md capitalize flex items-center gap-2"
							onClick={() => {
								let newData = data;
								if (da?.company || da?.endDate || da?.position || da?.startDate)
									newData = [...data, { ...da, id: v4() }];
								setDa(init);
								setState({ ...state, experience: newData });
								setIsSubmit(true);
							}}>
							next{" "}
							<span>
								<BsArrowRightShort />
							</span>
						</button>
					)}
				</div>
			</form>
		</div>
	);
};
