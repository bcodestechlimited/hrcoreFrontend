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

export const toolSlice = createSlice({
	name: "tool",
	initialState,
	reducers: {
		getSearchTool: (state, { payload }) => {
			state.mainSearch = payload?.data || payload || state?.mainSearch;
			state.isFound = true;
		},
		getSearch: (state, { payload }) => {
			state.search = payload?.search || payload;
		},
		resetToolSearch: state => {
			state.search = "";
			state.mainSearch = null;
			state.isFound = false;
		},
		getTool: (state, { payload }) => {
			state.data = payload?.data || payload;
		},
		getAllTool: (state, { payload }) => {
			state.all = payload?.data || payload;
		},
		addTool: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isAdded = true;
			state.data = {
				...state?.data,
				docs: state?.data?.docs ? [data, ...state?.data?.docs] : [data],
				totalDocs: state?.data?.totalDocs ? 1 + state?.data?.totalDocs : 1,
			};
		},
		deleteTool: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isDeleted = true;
			state.data = {
				...state?.data,
				docs: DeleteData(state?.data?.docs, data),
				totalDocs: state?.data?.totalDocs ? state?.data?.totalDocs - 1 : 0,
			};
		},
		updateTool: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isUpdated = true;
			state.data = { ...state?.data, docs: EditData(state?.data?.docs, data) };
		},
		toolFail: state => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isFound = false;
		},
		logoutTool: state => {
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
	toolFail,
	getOrg,
	getTool,
	deleteTool,
	addTool,
	getSearchTool,
	getSearch,
	resetToolSearch,
	updateTool,
	getAllTool,
	logoutTool,
} = toolSlice.actions;

export const manageTool = (type, data, company) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res;

		if (type === "get") {
			res = await axios.get(
				`/api/v1/tool/${company || ""}?type=all${
					data?.limit ? `&_limit=${data?.limit}` : ""
				}`
			);
			dispatch(getTool(res?.data));
			if (!data){
				let res2 = await axios.get(
					`/api/v1/tool/${company || ""}?type=all&_limit=${res?.data?.data?.totalDocs}`
				);
dispatch(getAllTool(res2?.data))
			}
		}
		if (type === "post") {
			res = await axios.post(`/api/v1/tool/${company || ""}`, {
				...data,
			});
			dispatch(addTool(res?.data));
		}
		if (type === "put") {
			res = await axios.put(
				`/api/v1/tool${company ? `/${company}` : ""}/${data?._id}`,
				{
					...data,
				}
			);
			dispatch(updateTool(res?.data));
		}
		if (type === "delete") {
			res = await axios.delete(
				`/api/v1/tool${company ? `/${company}` : ""}/${data?._id}`
			);
			dispatch(deleteTool(data));
		}
		if (type !== "get") toast.success(res?.data?.message);
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(toolFail());
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
