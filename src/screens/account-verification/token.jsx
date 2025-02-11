import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import { returnErrors } from "../../data/Reducers/ErrorReducer";
import { useDispatch } from "react-redux";
import { VerifyMail } from "../resetpassword";
import { NonAuthHeader } from "../login";

const Resetpassword = () => {
	const [code, setCode] = useState(""),
		[loading, setLoading] = useState(""),
		location = useLocation(),
		navigate = useNavigate(),
		dispatch = useDispatch();
	let handleSubmit = async e => {
		e.preventDefault();
		console.log({ code });
		if (!code) return;
		setLoading(true);
		try {
			let body = {
				token: code,
			};
			let res = await axios.post(`/api/v1/auth/verify-email-account`, body);
			toast.success(res.data.message);
			navigate("/account-verification/success", {
				state: { email: location?.state?.email },
			});
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
						Verify Your account
					</h2>
					{/* <p className="manrope text-black font-normal pt-2 text-base w-96">
						You are expected to input a strong password that has at least 8
						characters long.
					</p> */}
					<form action="" className="mt-6 space-y-4">
						<VerifyMail
							code={code}
							setCode={setCode}
							text="confirm OTP"
							numInputs={5}
							loading2={loading}
						/>
						<div className="">
							<Button
								title={"Verify"}
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
