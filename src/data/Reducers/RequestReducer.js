import { createSlice } from "@reduxjs/toolkit";
import { DeleteData, EditData } from "./UserReducer";
import { clearErrors, returnErrors } from "./ErrorReducer";
import axios from "axios";
import { toast } from "react-toastify";

let initialState = {
	data: null,
	isAdded: false,
	isDeleted: null,
	search: "",
	mainSearch: null,
	isFound: null,
	isUpdated: null,
};

export const requestSlice = createSlice({
	name: "request",
	initialState,
	reducers: {
		getSearchRequest: (state, { payload }) => {
			state.mainSearch = payload?.data || payload || state?.mainSearch;
			state.isFound = true;
		},
		getSearch: (state, { payload }) => {
			state.search = payload?.search || payload;
		},
		resetRequestSearch: state => {
			state.search = "";
			state.mainSearch = null;
			state.isFound = false;
		},
		getRequest: (state, { payload }) => {
			state.data = payload?.data || payload;
		},
		addRequest: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isAdded = true;
			state.data = {
				...state?.data,
				docs: state?.data?.docs ? [data, ...state?.data?.docs] : [data],
				totalDocs: state?.data?.totalDocs ? 1 + state?.data?.totalDocs : 1,
			};
		},
		deleteRequest: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isDeleted = true;
			state.data = {
				...state?.data,
				docs: DeleteData(state?.data?.docs, data),
				totalDocs: state?.data?.totalDocs ? state?.data?.totalDocs - 1 : 0,
			};
		},
		updateRequest: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isUpdated = true;
			state.data = { ...state?.data, docs: EditData(state?.data?.docs, data) };
		},
		requestFail: state => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isFound = false;
		},
		logoutRequest: state => {
			state.data = null;
			state.isAdded = false;
			state.isDeleted = null;
			state.search = "";
			state.mainSearch = null;
			state.isFound = null;
			state.isUpdated = null;
			state.all = null;
		},
	},
});

export const {
	requestFail,
	getOrg,
	getRequest,
	deleteRequest,
	addRequest,
	getSearchRequest,
	getSearch,
	resetRequestSearch,
	updateRequest,
	logoutRequest,
} = requestSlice.actions;

export const manageRequest = (type, data) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res;

		if (type === "get") {
			res = await axios.get(
				`/api/v1/request?type=all${
					data?.limit ? `&_limit=${data?.limit}` : ""
				}`
			);
			dispatch(getRequest(res?.data));
		}
		if (type === "post") {
			res = await axios.post(`/api/v1/request`, {
				...data,
			});
			dispatch(addRequest(res?.data));
		}
		if (type === "put") {
			res = await axios.put(
				`/api/v1/request/${data?._id}`,
				{
					...data,
				}
			);
			dispatch(updateRequest(res?.data));
		}
		if (type === "delete") {
			res = await axios.delete(
				`/api/v1/request/${data?._id}`
			);
			dispatch(deleteRequest(data));
		}
		if (type !== "get") toast.success(res?.data?.message);
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(requestFail());
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
