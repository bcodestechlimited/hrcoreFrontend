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

export const flowSlice = createSlice({
	name: "flow",
	initialState,
	reducers: {
		getSearchFlow: (state, { payload }) => {
			state.mainSearch = payload?.data || payload || state?.mainSearch;
			state.isFound = true;
		},
		getSearch: (state, { payload }) => {
			state.search = payload?.search || payload;
		},
		resetFlowSearch: state => {
			state.search = "";
			state.mainSearch = null;
			state.isFound = false;
		},
		getFlow: (state, { payload }) => {
			state.data = payload?.data || payload;
		},
		addFlow: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isAdded = true;
			state.data = {
				...state?.data,
				docs: state?.data?.docs ? [data, ...state?.data?.docs] : [data],
				totalDocs: state?.data?.totalDocs ? 1 + state?.data?.totalDocs : 1,
			};
		},
		deleteFlow: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isDeleted = true;
			state.data = {
				...state?.data,
				docs: DeleteData(state?.data?.docs, data),
				totalDocs: state?.data?.totalDocs ? state?.data?.totalDocs - 1 : 0,
			};
		},
		updateFlow: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isUpdated = true;
			state.data = { ...state?.data, docs: EditData(state?.data?.docs, data) };
		},
		flowFail: state => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isFound = false;
		},
		logoutFlow: state => {
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
	flowFail,
	getOrg,
	getFlow,
	deleteFlow,
	addFlow,
	getSearchFlow,
	getSearch,
	resetFlowSearch,
	updateFlow,
	logoutFlow,
} = flowSlice.actions;

export const manageFlow = (type, data, company) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res;

		if (type === "get") {
			res = await axios.get(
				`/api/v1/flow/${company || ""}?type=all${
					data?.limit ? `&_limit=${data?.limit}` : ""
				}`
			);
			dispatch(getFlow(res?.data));
		}
		if (type === "post") {
			res = await axios.post(`/api/v1/flow/${company || ""}`, {
				...data,
			});
			dispatch(addFlow(res?.data));
		}
		if (type === "put") {
			res = await axios.put(
				`/api/v1/flow${company ? `/${company}` : ""}/${data?._id}`,
				{
					...data,
				}
			);
			dispatch(updateFlow(res?.data));
		}
		if (type === "delete") {
			res = await axios.delete(
				`/api/v1/flow${company ? `/${company}` : ""}/${data?._id}`
			);
			dispatch(deleteFlow(data));
		}
		if (type !== "get") toast.success(res?.data?.message);
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(flowFail());
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
