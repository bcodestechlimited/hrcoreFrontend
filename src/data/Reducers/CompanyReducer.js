import { createSlice } from "@reduxjs/toolkit";
import { DeleteData, EditData, TOKEN_ID } from "./UserReducer";
import { clearErrors, returnErrors } from "./ErrorReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { SetAuthCompanyID } from "../Config";

let initialState = {
	data: null,
	isAdded: false,
	isDeleted: null,
	search: "",
	mainSearch: null,
	isFound: null,
	isUpdated: null,
	currentSelected: localStorage.getItem(TOKEN_ID),
};

export const companySlice = createSlice({
	name: "company",
	initialState,
	reducers: {
		getSearchCompany: (state, { payload }) => {
			state.mainSearch = payload?.data || payload || state?.mainSearch;
			state.isFound = true;
		},
		getSearch: (state, { payload }) => {
			state.search = payload?.search || payload;
		},
		resetCompanySearch: state => {
			state.search = "";
			state.mainSearch = null;
			state.isFound = false;
		},
		getCompany: (state, { payload }) => {
			state.data = payload?.data || payload;
		},
		addCompany: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isAdded = true;
			state.data = {
				...state?.data,
				docs: state?.data?.docs ? [data, ...state?.data?.docs] : [data],
				totalDocs: state?.data?.totalDocs ? 1 + state?.data?.totalDocs : 1,
			};
		},
		setCurrentCompany: (state, { payload }) => {
			state.currentSelected = payload?._id || payload;
		},
		deleteCompany: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isDeleted = true;
			state.data = {
				...state?.data,
				docs: DeleteData(state?.data?.docs, data),
				totalDocs: state?.data?.totalDocs ? state?.data?.totalDocs - 1 : 0,
			};
		},
		updateCompany: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isUpdated = true;
			state.data = { ...state?.data, docs: EditData(state?.data?.docs, data) };
		},
		companyFail: state => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isFound = false;
		},
		logoutCompany: state => {
			localStorage.removeItem(TOKEN_ID);
			state.data = null;
			state.isAdded = false;
			state.isDeleted = null;
			state.search = "";
			state.mainSearch = null;
			state.isFound = null;
			state.isUpdated = null;
			state.all = null;
			state.currentSelected = null;
		},
	},
});
export const {
	companyFail,
	getOrg,
	getCompany,
	deleteCompany,
	addCompany,
	getSearchCompany,
	getSearch,
	resetCompanySearch,
	updateCompany,
	setCurrentCompany,
	logoutCompany,
} = companySlice.actions;

export const manageCompany = (type, data) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res;

		if (type === "get") {
			res = await axios.get(
				`/api/v1/company?type=all${data?.limit ? `&_limit=${data?.limit}` : ""}`
			);
			let getLocal;
			if (res?.data?.data?.docs?.length > 0) {
				getLocal = localStorage.getItem(TOKEN_ID);
				let dd =
					res?.data?.data?.docs?.[res?.data?.data?.docs?.length - 1]?._id;
				localStorage.setItem(TOKEN_ID, dd);
				SetAuthCompanyID(dd);
			}
			dispatch(getCompany(res?.data));
			if (!getLocal) window.reload();
		}
		if (type === "post") {
			res = await axios.post(`/api/v1/company`, { ...data });
			dispatch(addCompany(res?.data));
		}
		if (type === "put") {
			res = await axios.put(`/api/v1/company/${data?._id}`, { ...data });
			dispatch(updateCompany(res?.data));
		}
		if (type === "delete") {
			res = await axios.delete(`/api/v1/company/${data?._id}`);
			dispatch(deleteCompany(data));
		}
		if (type !== "get") toast.success(res?.data?.message);
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(companyFail());
		if (type && type !== "get") {
			let error = err.response?.data?.error;
			if (error) {
				dispatch(returnErrors({ error, status: err?.response?.status }));
			} else {
				toast.error(err?.response?.data?.message);
			}
		}
	}
};
