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
	all: null,
};

export const performanceSlice = createSlice({
	name: "performance",
	initialState,
	reducers: {
		getSearchPerformance: (state, { payload }) => {
			state.mainSearch = payload?.data || payload || state?.mainSearch;
			state.isFound = true;
		},
		getSearch: (state, { payload }) => {
			state.search = payload?.search || payload;
		},
		resetPerformanceSearch: state => {
			state.search = "";
			state.mainSearch = null;
			state.isFound = false;
		},
		getPerformance: (state, { payload }) => {
			state.data = payload?.data || payload;
		},
		getAllPerformance: (state, { payload }) => {
			state.all = payload?.data || payload;
		},
		addPerformance: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isAdded = true;
			state.data = {
				...state?.data,
				docs: state?.data?.docs ? [data, ...state?.data?.docs] : [data],
				totalDocs: state?.data?.totalDocs ? 1 + state?.data?.totalDocs : 1,
			};
			state.all = {
				...state?.all,
				docs: state?.all?.docs ? [data, ...state?.all?.docs] : [data],
				totalDocs: state?.all?.totalDocs ? 1 + state?.all?.totalDocs : 1,
			};
		},
		deletePerformance: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isDeleted = true;
			state.data = {
				...state?.data,
				docs: DeleteData(state?.data?.docs, data),
				totalDocs: state?.data?.totalDocs ? state?.data?.totalDocs - 1 : 0,
			};
			state.all = {
				...state?.all,
				docs: DeleteData(state?.all?.docs, data),
				totalDocs: state?.all?.totalDocs ? state?.all?.totalDocs - 1 : 0,
			};
		},
		updatePerformance: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isUpdated = true;
			state.data = {
				...state?.data,
				docs: EditData(state?.data?.docs, data),
			};
			state.all = {
				...state?.all,
				docs: EditData(state?.all?.docs, data),
			};
		},
		performanceFail: state => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isFound = false;
		},
		logoutPerformance: state => {
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
	performanceFail,
	getOrg,
	getPerformance,
	deletePerformance,
	addPerformance,
	getSearchPerformance,
	getSearch,
	resetPerformanceSearch,
	updatePerformance,
	logoutPerformance,
	getAllPerformance,
} = performanceSlice.actions;

export const managePerformance = (type, data, id) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res;
		if (type === "get") {
			if (data?.search) dispatch(getSearch({ search: data?.search }));
			res = await axios.get(
				`/api/v1/performance?type=all&_populate=department&_populate=position${
					data?.limit ? `&_limit=${data?.limit}` : ""
				}${
					data?.search
						? `&_searchBy=name&_searchBy=reviewPeriod&_searchBy=department.name&_searchBy=position.name&_keyword=${data?.search}`
						: ""
				}
				`
			);
			dispatch(
				data?.search
					? getSearchPerformance(res?.data)
					: getPerformance(res?.data)
			);
			if (!data) {
				let res2 = await axios.get(
					`/api/v1/performance?type=all&_populate=department&_populate=position&_limit=0`
				);
				dispatch(getAllPerformance(res2?.data));
			}
		}
		if (type === "post") {
			res = await axios.post(`/api/v1/performance`, {
				...data,
			});
			let res2 = await axios.get(
				`/api/v1/performance/${res?.data?.data?._id}?_populate=department&_populate=position`
			);
			dispatch(addPerformance(res2?.data));
		}
		if (type === "put") {
			res = await axios.put(`/api/v1/performance/${data?._id || id || ""}`, {
				...data,
			});
			let res2 = await axios.get(
				`/api/v1/performance/${res?.data?.data?._id}?_populate=department&_populate=position`
			);
			dispatch(updatePerformance(res2?.data));
		}
		if (type === "delete") {
			res = await axios.delete(`/api/v1/performance/${data?._id || id || ""}`);
			dispatch(deletePerformance(data));
		}
		if (type !== "get") toast.success(res?.data?.message);
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(performanceFail());
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
