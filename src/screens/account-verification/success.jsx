import React from "react";
import { SuccessComponent } from "../resetsuccess";

const VerifySuccess = () => (
	<SuccessComponent
		header={`Verification Successful`}
		subtext={`Congratulations! Your account has been successfully verified. You can now log in to your account. Simply click the 'Login' button below to be redirected to the login page.`}
	/>
);

export default VerifySuccess;
