import { createSlice } from "@reduxjs/toolkit";
import { clearErrors, returnErrors } from "./ErrorReducer";
import axios from "axios";
import { toast } from "react-toastify";

let initialState = {
	data: null,
	qr: null,
	search: "",
	mainSearch: null,
	isFound: null,
	isUpdated: null,
	all: null,
};

export const attendanceSlice = createSlice({
	name: "attendance",
	initialState,
	reducers: {
		getSearchAttendance: (state, { payload }) => {
			state.mainSearch = payload?.data || payload || state?.mainSearch;
			state.isFound = true;
		},
		getSearch: (state, { payload }) => {
			state.search = payload?.search || payload;
		},
		resetAttendanceSearch: state => {
			state.search = "";
			state.mainSearch = null;
			state.isFound = false;
		},
		getAttendance: (state, { payload }) => {
			state.data = payload?.data || payload;
		},
		getAllAttendance: (state, { payload }) => {
			state.all = payload?.data || payload;
		},
		getAttendanceQr: (state, { payload }) => {
			state.qr = payload?.data || payload;
		},
		attendanceFail: state => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isFound = false;
		},
		logoutAttendance: state => {
			state.data = null;
			state.isAdded = false;
			state.isDeleted = null;
			state.search = "";
			state.mainSearch = null;
			state.isFound = null;
			state.isUpdated = null;
			state.all = null;
			state.qr = null;
		},
	},
});
export const {
	attendanceFail,
	getAttendance,
	getSearchAttendance,
	getSearch,
	resetAttendanceSearch,
	getAttendanceQr,
	logoutAttendance,
	getAllAttendance,
} = attendanceSlice.actions;

export const manageAttendance = (type, data, company) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res;

		if (type === "get") {
			if (data?.qr)
				res = await axios.post(
					`/api/v1/qr/${company || ""}?_populate=user${
						data?.limit ? `&_limit=${data?.limit}` : ""
					}`
				);
			else
				res = await axios.get(
					`/api/v1/qr/${company || ""}?_populate=user${
						data?.limit ? `&_limit=${data?.limit}` : ""
					}`
				);
			dispatch(
				data?.qr ? getAttendanceQr(res?.data) : getAttendance(res?.data)
			);
			if (!data) {
				let res2 = await axios.get(
					`/api/v1/qr/${company || ""}?_populate=user&_limit=${
						res?.data?.data?.totalDocs + 10
					}`
				);
				dispatch(getAllAttendance(res2?.data));
			}
		}

		if (type !== "get") toast.success(res?.data?.message);
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(attendanceFail());
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
