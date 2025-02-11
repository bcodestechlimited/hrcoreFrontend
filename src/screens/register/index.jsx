import React, { useState, useEffect, useContext } from "react";
import Img from "../../assets/register.png";
import Logp from "../../assets/logol.svg";
// import Button from "../../components/button/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { returnErrors } from "../../data/Reducers/ErrorReducer";
import axios from "axios";
import Button from "../../components/button/button";
import moment from "moment";
import { GlobalState } from "../../data/Context";

const Register = () => {
	const formData = {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			gender: "",
			dateOfBirth: "",
			maritalStatus: "",
			lgaOfOrigin: "",
			stateOfOrigin: "",
			stateOfResidence: "",
			password: "",
			employeeId: "",
			department: "",
			level: "",
			position: "",
			grade: "",
		},
		[data, setData] = useState(formData),
		[form, setForm] = useState("form_1"),
		navigate = useNavigate(),
		dispatch = useDispatch(),
		[getSearch] = useSearchParams(),
		textChange = e => {
			let { name, value } = e.target;
			setData({ ...data, [name]: value });
		},
		[loading, setLoading] = useState(false),
		handleSubmit = async e => {
			e?.preventDefault();
			if (
				!data?.firstName ||
				!data?.lastName ||
				!data?.email ||
				!data?.password
			)
				return;

			let err = "";
			for (var prop in data) {
				if (data?.hasOwnProperty(prop)) {
					if (!data?.[prop]) err = "error";
				} else {
				}
			}
			if (err) return toast.info("Please fill all fields");
			try {
				let newState = data;
				if (data?.dateOfBirth) {
					newState = {
						...newState,
						birthMonth: moment(data?.dateOfBirth)?.format("MM"),
						birthDay: moment(data?.dateOfBirth)?.format("DD"),
					};
				}
				if (data?.weddingAnniversary && data?.maritalStatus === "married") {
					newState = {
						...newState,
						weddingAnniversaryMonth: moment(data?.weddingAnniversary)?.format(
							"MM"
						),
						weddingAnniversaryDay: moment(data?.weddingAnniversary)?.format(
							"DD"
						),
					};
				}
				setLoading(true);
				console.log({ newState });

				let res = await axios.post(`/api/v1/auth/register-staff`, {
					...newState,
					companyId: getSearch?.get("company"),
				});
				toast.success(res?.data?.message);
				setLoading(false);
				setForm("form_1");
				setData(formData);
				navigate("/login");
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
				setLoading(false);
			}
		};

	useEffect(() => {
		if (!getSearch?.get("company")) navigate("/login");
	}, [getSearch, navigate]);

	return (
		<div className="w-full h-screen lg:grid lg:grid-cols-2 overflow-visible">
			<div className="h-full relative registerBg hidden lg:block">
				<div className="mt-16">
					<h1 className="text-4xl font-extrabold text-white manrope text-center">
						Transform Your HR <br /> Management with{" "}
						{process.env.REACT_APP_NAME || "HR Core"}
					</h1>
					<h2 className="text-xl manrope text-[#cbd5e1] text-center font-normal pt-4">
						The Leading HR Software for Your Business
					</h2>
				</div>
				<div className="flex justify-center">
					<img
						src={Img}
						alt="register_img"
						className="absolute bottom-0 h-[450px]"
					/>
				</div>
			</div>
			<div className="h-full px-10">
				<div className="mt-8 pb-8">
					<img src={Logp} alt="" className="mx-auto" />
					<h1 className="text-4xl mt-3 text-[#090914]  font-bold manrope leading-[55px] uppercase text-center">
						get started
					</h1>
					<div className="flex mt-10 justify-center">
						<form className="w-full md:w-auto">
							{form === "form_1" && (
								<Form1
									state={data}
									textChange={textChange}
									handleNext={e => {
										e?.preventDefault();
										if (
											!data?.firstName ||
											!data?.lastName ||
											!data?.email ||
											!data?.phone ||
											!data?.employeeId ||
											!data?.personalEmail
										)
											return toast.info("Please fill all fields");
										setForm("form_2");
									}}
								/>
							)}
							{form === "form_2" && (
								<Form2
									state={data}
									textChange={textChange}
									handleNext={e => {
										e?.preventDefault();
										if (
											!data?.maritalStatus ||
											!data?.lgaOfOrigin ||
											!data?.stateOfOrigin ||
											!data?.stateOfResidence ||
											!data?.gender ||
											(data?.maritalStatus === "married" &&
												!data?.weddingAnniversary)
										)
											return toast.info("Please fill all fields");
										setForm("form_3");
									}}
									handlePrev={e => {
										e?.preventDefault();
										setForm("form_1");
									}}
								/>
							)}
							{form === "form_3" && (
								<Form3
									state={data}
									textChange={textChange}
									handleSubmit={handleSubmit}
									loading={loading}
									handlePrev={e => {
										e?.preventDefault();
										setForm("form_2");
									}}
								/>
							)}
							<p className="text-center manrope text-xs font-medium pt-5 text-[#64748B]">
								Have an account yet?{" "}
								<span
									onClick={() => navigate("/login")}
									className="text-center manrope text-xs font-medium text-secondary cursor-pointer">
									Login now
								</span>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

const Form1 = ({ state, textChange, handleNext }) => {
	return (
		<section className="space-y-4">
			<div>
				<p className="font-bold text-[15px] text-[#090914] poppins leading-[22px]">
					First Name
				</p>
				<input
					type="text"
					value={state?.firstName}
					onChange={textChange}
					name="firstName"
					placeholder="Chulks"
					className="mt-2 lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5"
				/>
			</div>
			<div>
				<p className="font-bold text-[15px] text-[#090914] poppins leading-[22px]">
					Last Name
				</p>
				<input
					type="text"
					value={state?.lastName}
					onChange={textChange}
					name="lastName"
					placeholder="George"
					className="mt-2 lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5"
				/>
			</div>
			<div>
				<p className="font-bold text-[15px] text-[#090914] poppins leading-[22px]">
					Work Email address
				</p>
				<input
					type="email"
					value={state?.email}
					onChange={textChange}
					name="email"
					placeholder="test@bcodestech.com"
					className="mt-2 lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5"
				/>
			</div>
			<div>
				<p className="font-bold text-[15px] text-[#090914] poppins leading-[22px]">
					Personal Email address
				</p>
				<input
					type="email"
					value={state?.personalEmail}
					onChange={textChange}
					name="personalEmail"
					placeholder="test@bcodestech.com"
					className="mt-2 lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5"
				/>
			</div>
			<div>
				<p className="font-bold text-[15px] text-[#090914] poppins leading-[22px]">
					Phone number
				</p>
				<input
					type="tel"
					value={state?.phone}
					onChange={textChange}
					name="phone"
					placeholder="+2349036228765"
					maxLength={11}
					className="mt-2 lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5"
				/>
			</div>
			<div>
				<p className="font-bold text-[15px] text-[#090914] poppins leading-[22px]">
					Employee Id
				</p>
				<input
					type="text"
					value={state?.employeeId}
					onChange={textChange}
					name="employeeId"
					placeholder=""
					className="mt-2 lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5"
				/>
			</div>
			<div className="flex justify-center mt-6">
				<button
					onClick={handleNext}
					className="h-14 mt-3 w-28 bg-secondary uppercase text-white text-sm font-semibold poppins rounded-lg text-center">
					Next
				</button>
			</div>
		</section>
	);
};

const Form2 = ({ state, textChange, handleNext, handlePrev }) => {
	let { countryState } = useContext(GlobalState);
	return (
		<section className="space-y-4">
			<div>
				<p className="font-bold text-[15px] text-[#090914] poppins leading-[22px]">
					Marital Status
				</p>
				<select
					type="text"
					value={state?.maritalStatus}
					onChange={textChange}
					name="maritalStatus"
					placeholder="Single"
					className="mt-2 lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5">
					<option value="">Select Marital Status</option>
					<option value="single">Single</option>
					<option value="married">Married</option>
				</select>
			</div>
			{state?.maritalStatus?.toLowerCase() === "married" && (
				<div>
					<p className="font-bold text-[15px] text-[#090914] poppins leading-[22px]">
						Wedding Anniversary
					</p>
					<input
						type="date"
						value={state?.weddingAnniversary}
						onChange={textChange}
						name="weddingAnniversary"
						placeholder=""
						className="mt-3 lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5"
						max={moment().format("YYYY-MM-DD")}
					/>
				</div>
			)}
			<div>
				<p className="font-bold text-[15px] text-[#090914] poppins leading-[22px]">
					LGA of Origin
				</p>
				<input
					type="text"
					value={state?.lgaOfOrigin}
					onChange={textChange}
					name="lgaOfOrigin"
					placeholder="Local Government"
					className="mt-2 lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5"
				/>
			</div>
			<div>
				<p className="font-bold text-[15px] text-[#090914] poppins leading-[22px]">
					State of Origin
				</p>
				<select
					value={state?.stateOfOrigin}
					onChange={textChange}
					name="stateOfOrigin"
					placeholder="Lagos State"
					className="mt-2 lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5">
					<option value="">Select State of Origin</option>
					{countryState?.map((it, i) => (
						<option value={it?.name} key={i}>
							{it?.name}: {it?.capital}
						</option>
					))}
				</select>
			</div>
			<div>
				<p className="font-bold text-[15px] text-[#090914] poppins leading-[22px]">
					State of Residence
				</p>
				<select
					value={state?.stateOfResidence}
					onChange={textChange}
					name="stateOfResidence"
					placeholder="Lagos State"
					className="mt-3 lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5">
					<option value="">Select State of Residence</option>
					{countryState?.map((it, i) => (
						<option value={it?.name} key={i}>
							{it?.name}: {it?.capital}
						</option>
					))}
				</select>
			</div>

			<div>
				<p className="font-bold text-[15px] text-[#090914] poppins leading-[22px]">
					Gender
				</p>
				<select
					type="text"
					value={state?.gender}
					onChange={textChange}
					name="gender"
					placeholder="Male"
					className="mt-3 lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5">
					<option value="">Select Gender</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
				</select>
			</div>

			<div className="flex justify-between items-center mt-6">
				<button
					onClick={handlePrev}
					className="h-14 mt-3 w-32 text-sm font-semibold poppins rounded-lg uppercase text-center border">
					back
				</button>
				<button
					onClick={handleNext}
					className="h-14 mt-3 w-32 bg-secondary text-white text-sm font-semibold poppins rounded-lg uppercase text-center">
					next
				</button>
			</div>
		</section>
	);
};

const Form3 = ({ state, textChange, handleSubmit, loading, handlePrev }) => {
	const [show, setShow] = useState(false);
	let { department, position, level, grade } = useSelector(s => s);

	return (
		<section className="space-y-4">
			<div>
				<p className="font-bold text-[15px] text-[#090914] poppins leading-[22px]">
					Department
				</p>
				<select
					type="text"
					value={state?.department}
					onChange={textChange}
					name="department"
					placeholder="Department"
					className="mt-3 lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5">
					<option value="">Select Department</option>
					{department?.all?.docs
						?.filter(it => it?.name)
						?.map((it, i) => (
							<option value={it?._id}>{it?.name}</option>
						))}
				</select>
			</div>
			{state?.department && (
				<div>
					<p className="font-bold text-[15px] text-[#090914] poppins leading-[22px]">
						Position
					</p>
					<select
						type="text"
						value={state?.position}
						onChange={textChange}
						name="position"
						placeholder="Position"
						className="mt-3 lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5">
						<option value="">Select Position</option>
						{position?.all?.docs
							?.filter(
								it => it?.name && it?.department?._id === state?.department
							)
							?.map((it, i) => (
								<option value={it?._id}>{it?.name}</option>
							))}
					</select>
				</div>
			)}
			<div>
				<p className="font-bold text-[15px] text-[#090914] poppins leading-[22px]">
					Level
				</p>
				<select
					type="text"
					value={state?.level}
					onChange={textChange}
					name="level"
					placeholder="Level"
					className="mt-3 lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5">
					<option value="">Select Level</option>
					{level?.all?.docs
						?.filter(it => it?.name)
						?.map((it, i) => (
							<option value={it?._id}>{it?.name}</option>
						))}
				</select>
			</div>
			<div>
				<p className="font-bold text-[15px] text-[#090914] poppins leading-[22px]">
					Grade
				</p>
				<select
					type="text"
					value={state?.grade}
					onChange={textChange}
					name="grade"
					placeholder="Grade"
					className="mt-3 lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5">
					<option value="">Select Grade</option>
					{grade?.all?.docs
						?.filter(it => it?.name)
						?.map((it, i) => (
							<option value={it?._id}>{it?.name}</option>
						))}
				</select>
			</div>
			<div>
				<p className="font-bold text-[15px] text-[#090914] poppins leading-[22px]">
					Date of Birth
				</p>
				<input
					type="date"
					value={state?.dateOfBirth}
					onChange={textChange}
					name="dateOfBirth"
					placeholder=""
					className="mt-3 lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5"
					max={moment().format("YYYY-MM-DD")}
				/>
			</div>
			<p className="font-bold text-sm text-[#090914] poppins leading-[22px]">
				Enter Password
			</p>
			<div className="lg:w-96 w-full h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5 relative flex justify-between items-center">
				<input
					type={show ? "text" : "password"}
					value={state?.password}
					onChange={textChange}
					name="password"
					placeholder="*********"
					className="h-full lg:w-full w-full noborder focus:border border-[#CBD5E1] bg-transparent"
				/>
				<div
					onClick={() => setShow(!show)}
					className="pr-3 cursor-pointer absolute right-2">
					{show ? (
						<IconContext.Provider value={{ color: "#2A72A8" }}>
							<AiFillEyeInvisible size={20} />
						</IconContext.Provider>
					) : (
						<IconContext.Provider value={{ color: "#2A72A8" }}>
							<AiFillEye size={20} />
						</IconContext.Provider>
					)}
				</div>
			</div>
			<div className="flex justify-between items-center mt-6">
				<button
					onClick={handlePrev}
					className="h-14 mt-3 w-32 text-sm font-semibold poppins rounded-lg uppercase text-center border">
					back
				</button>
				<Button
					// buttonType={"primary"}
					title={"get started"}
					type="button"
					width={
						"w-fit h-14 mt-3 w-28 bg-secondary uppercase text-white text-sm font-semibold poppins rounded-lg text-center"
					}
					loading={loading}
					onClick={handleSubmit}
				/>
			</div>
		</section>
	);
};
export default Register;
