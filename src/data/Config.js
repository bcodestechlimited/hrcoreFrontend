import axios from "axios";

export const SetAuthToken = token => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};
export const SetAuthCompanyID = token => {
	if (token) {
		axios.defaults.headers.common["companyid"] = token;
	} else {
		delete axios.defaults.headers.common["companyid"];
	}
};

export const useURL = process.env.REACT_APP_BASE_URL;

export const SetDefaultHeaders = () => {
	axios.defaults.baseURL = useURL;
};
