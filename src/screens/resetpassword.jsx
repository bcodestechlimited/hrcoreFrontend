import React, { useState } from "react";
import { NonAuthHeader } from "./login";
import { IconContext } from "react-icons";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react18-otp-input";
import Button from "../components/button/button";
import { returnErrors } from "../data/Reducers/ErrorReducer";
import { useDispatch } from "react-redux";

const Resetpassword = () => {
	const [show, setShow] = useState(false),
		[code, setCode] = useState(""),
		[loading, setLoading] = useState(""),
		location = useLocation(),
		navigate = useNavigate(),
		dispatch = useDispatch(),
		[stateData, setStateData] = useState({
			password: "",
			confirmPassword: "",
		});
	let handleSubmit = async e => {
		e.preventDefault();
		console.log({ stateData, code });
		if (!code) return;
		if (!stateData.password) return;
		if (stateData.password !== stateData.confirmPassword)
			return toast.error("Password do not match");

		setLoading(true);
		try {
			let body = {
				token: code,
				newPassword: stateData.password,
			};
			let res = await axios.post(`/api/v1/auth/reset-password`, body);
			toast.success(res.data.message);
			navigate("/resetsuccess", { state: { email: location?.state?.email } });
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
		}
		setLoading(false);
	};
	return (
		<div className="w-full h-screen">
			<NonAuthHeader />
			<div className="w-full h-full bg-[#EFF6FC] flex justify-center items-center">
				<div className="bg-white p-12">
					<h2 className="font-bold text-2xl manrope text-[#1d1c1c]">
						Reset your password
					</h2>
					<p className="manrope text-black font-normal pt-2 text-base w-96">
						You are expected to input a strong password that has at least 8
						characters long.
					</p>
					<form action="" className="mt-6 space-y-4">
						<VerifyMail
							code={code}
							setCode={setCode}
							text="confirm OTP"
							numInputs={5}
							loading2={loading}
						/>
						<p className="text-base font-normal text-black inter">
							New password
						</p>
						<div className="bg-[#F0F0F0] h-14 mt-4 md:w-[450px] flex items-center w-72 rounded-md border-none text-base font-medium inter text-black relative ">
							<input
								type={show ? "text" : "password"}
								name="password"
								className="h-full w-full"
								value={stateData?.password}
								onChange={e =>
									setStateData({ ...stateData, password: e.target.value })
								}
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
						<p className="text-base font-normal text-black inter">
							Confirm password
						</p>
						<div className="bg-[#F0F0F0] h-14 mt-4 md:w-[450px] flex items-center w-72 rounded-md border-none text-base font-medium inter text-black relative ">
							<input
								type={show ? "text" : "password"}
								name="password"
								className="h-full w-full"
								value={stateData?.confirmPassword}
								onChange={e =>
									setStateData({
										...stateData,
										confirmPassword: e.target.value,
									})
								}
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
						<div className="">
							<Button
								title={"reset password"}
								// buttonType={"primary"}
								width={"md:w-[450px] w-72"}
								// eslint-disable-next-line react/style-prop-object
								style={
									"md:w-[450px] w-72 h-12 bg-main rounded inter text-white text-base font-semibold mt-6 capitalize text-center justify-center"
								}
								loading={loading}
								onClick={handleSubmit}
								type="submit"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Resetpassword;

export const OtpComponent = ({
	stateData,
	textChange,
	numInputs,
	separator,
	css,
	loading,
	isInputSecure,
}) => {
	return (
		<>
			<OtpInput
				value={stateData}
				onChange={otp => textChange(otp)}
				numInputs={numInputs || 5}
				separator={separator || <span>-</span>}
				inputStyle={`${css} otp-code__input`}
				isDisabled={loading}
				shouldAutoFocus={true}
				isInputNum={true}
				isInputSecure={isInputSecure}
			/>
		</>
	);
};

export const VerifyMail = ({ code, setCode, loading2, numInputs }) => {
	return (
		<>
			<div className="flex flex-col my-5">
				<small className="mb-4 block inter">
					Enter the OTP sent to your email
				</small>
				<OtpComponent
					stateData={code}
					textChange={data => {
						setCode(data);
					}}
					css="borderColor"
					loading={loading2}
					numInputs={numInputs}
				/>
			</div>
		</>
	);
};