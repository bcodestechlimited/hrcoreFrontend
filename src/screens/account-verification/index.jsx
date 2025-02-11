import React, { useEffect, useState } from "react";
import Brand from "../../components/brand/brand";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "../../components/button/button";
import { useDispatch } from "react-redux";
import { returnErrors } from "../../data/Reducers/ErrorReducer";

const AccountVerification = () => {
	const navigate = useNavigate(),
		[email, setEmail] = useState(""),
		dispatch = useDispatch(),
		[loading, setLoading] = useState(""),
		location = useLocation();

	let handleSubmit = async e => {
		e.preventDefault();
		if (!email) return;
		setLoading(true);
		try {
			var res = await axios.post(`/api/v1/auth/request-email-verification`, {
				email,
			});
			toast.success(res.data.message, { autoClose: false });
			navigate("/account-verification/token", { state: { email } });
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

	useEffect(() => {
		if (location?.state?.email) setEmail(location?.state?.email);
	}, [location?.state]);

	return (
		<div className="h-screen">
			<div className="flex bg-white justify-center items-center h-20 w-full">
				<Brand />
			</div>
			<div className="w-full bg-[#EFF6FC] h-full flex justify-center items-center">
				<div className="py-12 px-10 bg-white">
					<h1 className="text-2xl font-bold text-black inter">
						Verify Account?
					</h1>
					<p className="text-base inter text-black w-96 pt-2 font-normal">
						Enter your email address below to verify your account.
					</p>
					<form action="" className="mt-6">
						<p className="text-base font-normal text-black inter">Email</p>
						<input
							type="text"
							name="email"
							className="bg-[#F0F0F0] h-14 mt-4 md:w-[450px] w-72 rounded-md border-none text-base font-medium inter text-black"
							id=""
							valur={email}
							onChange={e => setEmail(e.target?.value)}
						/>
						<div className="">
							{/* <button
								onClick={() => navigate("/emailsent")}
								className="md:w-[450px] w-72 h-12 bg-main rounded inter text-white text-base font-semibold mt-6">
								Submit
							</button> */}
							<Button
								title={"submit"}
								// buttonType={"primary"}
								width={"md:w-[450px] w-72"}
								// eslint-disable-next-line react/style-prop-object
								style={
									"h-12 bg-main rounded inter text-white text-base font-semibold mt-6 capitalize text-center justify-center"
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

export default AccountVerification;
