import React, { useState } from "react";
import { NonAuthHeader } from "./login";
import Img from "../assets/sent.svg";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { returnErrors } from "../data/Reducers/ErrorReducer";
import Button from "../components/button/button";

const Emailsent = () => {
	let location = useLocation(),
		[loading, setLoading] = useState(""),
		navigate = useNavigate(),
		dispatch = useDispatch();
	let handleSubmit = async e => {
		e.preventDefault();
		if (!location?.state?.email) return;
		setLoading(true);
		try {
			var res = await axios.post(`/api/v1/auth/request-reset-password`, {
				email: location?.state?.email,
			});
			toast.success(res.data.message, { autoClose: false });
			navigate("/resetpassword", { state: { email: location?.state?.email } });
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
				<div className="lg:w-3/4 mx-auto flex flex-col lg:flex-row bg-white justify-center rounded-xl items-center p-10">
					<div className="lg:w-[50%] flex  justify-center">
						<img src={Img} alt="" className="" />
					</div>
					<div className="lg:w-[50%] h-full flex items-center justify-center">
						<div>
							<h3 className="text-3xl manrope text-black font-bold">
								Recovery Email Sent to {location?.state?.email}
							</h3>
							<p className="text-base manrope text-[#757575] w-80 pt-4 font-normal">
								Didn't receive the email? <br /> Please check the email address
								you used to make sure it maches the address on your account,
								look in your spam email, or request another email below
							</p>
							<p className="text-sm font-normal manrope text-[#757575] pt-8">
								Wait for: 20s before clicking{" "}
							</p>
							{/* <button className="bg-[#F72585] h-12 w-56 rounded text-white mt-3 font-bold manrope text-base me-1">
								Send Again
							</button> */}
							<div className="flex items-center">
								<Button
									title={"Send Again"}
									// buttonType={"primary"}
									width={"w-56"}
									// eslint-disable-next-line react/style-prop-object
									style={
										"bg-[#F72585] h-12 w-56 rounded text-white mt-3 font-bold manrope text-base me-1 capitalize text-center justify-center"
									}
									loading={loading}
									onClick={
										location?.state?.email ? handleSubmit : () => navigate(-1)
									}
									type="submit"
								/>
								<button
									onClick={() =>
										navigate("/resetpassword", {
											state: { email: location?.state?.email },
										})
									}
									type="button"
									className="bg-main h-12 w-56 rounded text-white mt-3 font-bold manrope text-base ms-1">
									Verify
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Emailsent;
