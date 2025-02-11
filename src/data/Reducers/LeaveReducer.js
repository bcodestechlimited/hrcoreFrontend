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
	my: null,
	manage: null,
};

export const leaveRequestSlice = createSlice({
	name: "leaveRequest",
	initialState,
	reducers: {
		getSearchLeaveRequest: (state, { payload }) => {
			state.mainSearch = payload?.data || payload || state?.mainSearch;
			state.isFound = true;
		},
		getSearch: (state, { payload }) => {
			state.search = payload?.search || payload;
		},
		resetLeaveRequestSearch: state => {
			state.search = "";
			state.mainSearch = null;
			state.isFound = false;
		},
		getLeaveRequest: (state, { payload }) => {
			state.data = payload?.data || payload;
		},
		getMyLeaveRequest: (state, { payload }) => {
			state.my = payload?.data || payload;
		},
		getManageLeaveRequest: (state, { payload }) => {
			state.manage = payload?.data || payload;
		},
		addLeaveRequest: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isAdded = true;
			state.data = {
				...state?.data,
				docs: state?.data?.docs ? [data, ...state?.data?.docs] : [data],
				totalDocs: state?.data?.totalDocs ? 1 + state?.data?.totalDocs : 1,
			};
		},
		deleteLeaveRequest: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isDeleted = true;
			state.data = {
				...state?.data,
				docs: DeleteData(state?.data?.docs, data),
				totalDocs: state?.data?.totalDocs ? state?.data?.totalDocs - 1 : 0,
			};
		},
		updateLeaveRequest: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isUpdated = true;
			state.data = { ...state?.data, docs: EditData(state?.data?.docs, data) };
		},
		leaveRequestFail: state => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isFound = false;
		},
		logoutLeaveRequest: state => {
			state.data = null;
			state.isAdded = false;
			state.isDeleted = null;
			state.search = "";
			state.mainSearch = null;
			state.isFound = null;
			state.isUpdated = null;
			state.all = null;
			state.my = null;
			state.manage = null;
		},
	},
});
export const {
	leaveRequestFail,
	getOrg,
	getLeaveRequest,
	deleteLeaveRequest,
	addLeaveRequest,
	getSearchLeaveRequest,
	getSearch,
	resetLeaveRequestSearch,
	updateLeaveRequest,
	logoutLeaveRequest,
	getMyLeaveRequest,
	getManageLeaveRequest,
} = leaveRequestSlice.actions;

export const manageLeaveRequest = (type, data, company) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res;

		if (type === "get") {
			if (data?.search) dispatch(getSearch({ search: data?.search }));
			res = await axios.get(
				`/api/v1/leaveRequest/${company || ""}?type=all${
					data?.limit ? `&_limit=${data?.limit}` : ""
				}&_populate=createdBy&_populate=reliever&_populate=leaveType${
					data?.search
						? `&_searchBy=endDate&_searchBy=startDate&_searchBy=status&_searchBy=reliever&_searchBy=createdBy&_keyword=${data?.search}`
						: ""
				}
				${
					data?.createdBy
						? `&createdBy=${data?.createdBy}&_populate=approvers&_populate=nextApprover`
						: ""
				}
				${data?.nextApprover ? `&nextApprover=${data?.nextApprover}` : ""}
				`
			);
			dispatch(
				data?.search
					? getSearchLeaveRequest(res?.data)
					: data?.nextApprover
					? getManageLeaveRequest(res?.data)
					: data?.createdBy
					? getMyLeaveRequest(res?.data)
					: getLeaveRequest(res?.data)
			);
		}
		if (type === "post") {
			res = await axios.post(`/api/v1/leaveRequest/${company || ""}`, {
				...data,
			});
			dispatch(addLeaveRequest(res?.data));
		}
		if (["put", "patch"]?.includes(type)) {
			type === "patch"
				? (res = await axios.put(
						`/api/v1/leaveRequest${company ? `/${company}` : ""}/${
							data?._id
						}/review`,
						{
							status: data?.status,
						}
				  ))
				: (res = await axios.put(
						`/api/v1/leaveRequest${company ? `/${company}` : ""}/${data?._id}`,
						{
							...data,
						}
				  ));
			dispatch(updateLeaveRequest(res?.data));
		}
		if (type === "delete") {
			res = await axios.delete(
				`/api/v1/leaveRequest${company ? `/${company}` : ""}/${data?._id}`
			);
			dispatch(deleteLeaveRequest(data));
		}
		if (type !== "get") toast.success(res?.data?.message);
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(leaveRequestFail());
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
