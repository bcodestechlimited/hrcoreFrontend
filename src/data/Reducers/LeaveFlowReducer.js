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
	all:null
};

export const leaveFlowSlice = createSlice({
	name: "leaveFlow",
	initialState,
	reducers: {
		getSearchleaveFlow: (state, { payload }) => {
			state.mainSearch = payload?.data || payload || state?.mainSearch;
			state.isFound = true;
		},
		getSearch: (state, { payload }) => {
			state.search = payload?.search || payload;
		},
		resetleaveFlowSearch: state => {
			state.search = "";
			state.mainSearch = null;
			state.isFound = false;
		},
		getleaveFlow: (state, { payload }) => {
			state.data = payload?.data || payload;
		},
		getAllLeaveFlow: (state, { payload }) => {
			state.all = payload?.data || payload;
		},
		addleaveFlow: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isAdded = true;
			state.data = {
				...state?.data,
				docs: state?.data?.docs ? [data, ...state?.data?.docs] : [data],
				totalDocs: state?.data?.totalDocs ? 1 + state?.data?.totalDocs : 1,
			};
		},
		deleteleaveFlow: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isDeleted = true;
			state.data = {
				...state?.data,
				docs: DeleteData(state?.data?.docs, data),
				totalDocs: state?.data?.totalDocs ? state?.data?.totalDocs - 1 : 0,
			};
		},
		updateleaveFlow: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isUpdated = true;
			state.data = { ...state?.data, docs: EditData(state?.data?.docs, data) };
		},
		leaveFlowFail: state => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isFound = false;
		},
		logoutleaveFlow: state => {
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
	leaveFlowFail,
	getOrg,
	getleaveFlow,
	deleteleaveFlow,
	addleaveFlow,
	getSearchleaveFlow,
	getSearch,
	resetleaveFlowSearch,
	updateleaveFlow,
	logoutleaveFlow,
	getAllLeaveFlow
} = leaveFlowSlice.actions;

export const manageleaveFlow = (type, data, company) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res;

		if (type === "get") {
			res = await axios.get(
				`/api/v1/leaveFlow/${
					company || ""
				}?_populate=level&_populate=approvers${
					data?.limit ? `&_limit=${data?.limit}` : ""
				}`
			);
			dispatch(getleaveFlow(res?.data));
			if (!data) {
				let res2 = await axios.get(
					`/api/v1/leaveFlow/${
						company || ""
					}?_populate=level&_populate=approvers&_limit=${
						data?.res?.data?.data?.totalDocs
					}`
				);
				dispatch(getAllLeaveFlow(res2?.data));
			}
		}
		if (type === "post") {
			res = await axios.post(`/api/v1/leaveFlow/${company || ""}`, {
				...data,
			});
			dispatch(addleaveFlow(res?.data));
			dispatch(manageleaveFlow("get", null, company));
		}
		if (type === "put") {
			res = await axios.put(`/api/v1/leaveFlow/${data?._id}`, {
				...data,
			});
			dispatch(updateleaveFlow(res?.data));
			dispatch(manageleaveFlow("get", null, company));
		}
		if (type === "delete") {
			res = await axios.delete(
				`/api/v1/leaveFlow/${data?._id}`
			);
			dispatch(deleteleaveFlow(data));
		}
		if (type !== "get") toast.success(res?.data?.message);
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(leaveFlowFail());
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
