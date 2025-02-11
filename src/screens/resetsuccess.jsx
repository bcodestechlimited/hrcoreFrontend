import React from "react";
import { useNavigate } from "react-router";
import { NonAuthHeader } from "./login";

const Resetsuccess = () => <SuccessComponent />

export const SuccessComponent = ({header, subtext}) => {
	const navigate = useNavigate();
	return (
		<div className="w-full h-screen">
			<NonAuthHeader />
			<div className="w-full h-full bg-[#EFF6FC] flex justify-center items-center">
				<div className="lg:w-3/4 mx-auto flex flex-col lg:flex-row bg-white justify-center rounded-xl items-center p-10">
					<div className="lg:w-[50%] flex  justify-center">
						<img src={""} alt="" className="" />
					</div>
					<div className="lg:w-[50%] h-full flex items-center justify-center">
						<div>
							<h3 className="text-3xl manrope text-black font-bold">
								{header || `Reset Successful`}
							</h3>
							<p className="text-base manrope text-[#757575] w-80 pt-4 font-normal">
								{subtext || `Congratulations! Your password reset was successful. You can now
								log in to your account using your new password. Simply click the
								'Login' button below to be redirected to the login page.`}
							</p>

							<button
								onClick={() => navigate("/login")}
								className="bg-[#F72585] h-12 w-56 mt-8 rounded text-white font-bold manrope text-base">
								Go to Login
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Resetsuccess;
