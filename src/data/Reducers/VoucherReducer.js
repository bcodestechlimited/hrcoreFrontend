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

export const voucherSlice = createSlice({
	name: "voucher",
	initialState,
	reducers: {
		getSearchVoucher: (state, { payload }) => {
			state.mainSearch = payload?.data || payload || state?.mainSearch;
			state.isFound = true;
		},
		getSearch: (state, { payload }) => {
			state.search = payload?.search || payload;
		},
		resetVoucherSearch: state => {
			state.search = "";
			state.mainSearch = null;
			state.isFound = false;
		},
		getVoucher: (state, { payload }) => {
			state.data = payload?.data || payload;
		},
		getVoucherApproved: (state, { payload }) => {
			state.approved = payload?.data || payload;
		},
		getVoucherEndorsed: (state, { payload }) => {
			state.endorsed = payload?.data || payload;
		},
		getAllVoucher: (state, { payload }) => {
			state.all = payload?.data || payload;
		},
		addVoucher: (state, { payload }) => {
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
		deleteVoucher: (state, { payload }) => {
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
		updateVoucher: (state, { payload }) => {
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
		updateVoucherAll: state => {
			state.isUpdated = true;
		},
		voucherFail: state => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isFound = false;
		},
		logoutVoucher: state => {
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
	voucherFail,
	getOrg,
	getVoucher,
	deleteVoucher,
	addVoucher,
	getSearchVoucher,
	getSearch,
	resetVoucherSearch,
	updateVoucher,
	logoutVoucher,
	getAllVoucher,
	getVoucherApproved,
	getVoucherEndorsed,
	updateVoucherAll,
} = voucherSlice.actions;

export const manageVoucher = (type, data, id) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res;
		if (type === "get") {
			res = await axios.get(
				`/api/v1/voucher?_populate=payingBank&_populate=receipient&_populate=createdBy&_populate=endorsedBy&_populate=approvedBy&_populate=endorsedBy&_populate=approvedBy&_populate=updatedBy&_populate=updatedBy${
					data?.limit ? `&_limit=${data?.limit}` : ""
				}${data?.approved ? `&approved=true` : ""}${
					data?.endorsed ? `&endorsed=true` : ""
				}`
			);
			dispatch(
				data?.approved
					? getVoucherApproved(res?.data)
					: data?.endorsed
					? getVoucherEndorsed(res?.data)
					: getVoucher(res?.data)
			);
			if (!data) {
				let res2 = await axios.get(
					`/api/v1/voucher?_populate=payingBank&_populate=receipient&_populate=createdBy&_populate=endorsedBy&_populate=approvedBy&_populate=endorsedBy&_populate=approvedBy&_populate=updatedBy&_populate=updatedBy
						&_limit=0`
				);
				dispatch(getAllVoucher(res2?.data));
			}
		}
		if (type === "post") {
			delete data?._id;
			delete data?.id;
			res = await axios.post(`/api/v1/voucher`, {
				...data,
			});
			let res2 = await axios.get(
				`/api/v1/voucher/${res?.data?.data?._id}?_populate=payingBank&_populate=receipient&_populate=createdBy&_populate=endorsedBy&_populate=approvedBy&_populate=endorsedBy&_populate=approvedBy&_populate=updatedBy&_populate=updatedBy`
			);
			dispatch(addVoucher(res2?.data));
		}
		if (type === "put") {
			delete data?._id;
			delete data?.id;
			delete data?.createdBy;
			delete data?.createdAt;
			delete data?.updatedAt;
			delete data?.updatedBy;
			delete data?.__v;
			delete data?.company;
			res = await axios.put(`/api/v1/voucher/${data?._id || data?.id || id}`, {
				...data,
			});
			let res2 = await axios.get(
				`/api/v1/voucher/${res?.data?.data?._id}?_populate=payingBank&_populate=receipient&_populate=createdBy&_populate=endorsedBy&_populate=approvedBy&_populate=endorsedBy&_populate=approvedBy&_populate=updatedBy&_populate=updatedBy`
			);
			dispatch(updateVoucher(res2?.data));
		}
		if (["approve", "endorse"]?.includes(type)) {
			res = await axios.put(
				`/api/v1/voucher/${data?._id || data?.id || id}/${type}`
			);
			let res2 = await axios.get(
				`/api/v1/voucher/${res?.data?.data?._id}?_populate=payingBank&_populate=receipient&_populate=createdBy&_populate=endorsedBy&_populate=approvedBy&_populate=endorsedBy&_populate=approvedBy&_populate=updatedBy&_populate=updatedBy`
			);
			dispatch(updateVoucher(res2?.data));
		}
		if (["approve/all", "endorse/all"]?.includes(type)) {
			res = await axios.put(`/api/v1/voucher/${type}`);
			dispatch(updateVoucherAll(res?.data));
			dispatch(manageVoucher("get", null));
			dispatch(manageVoucher("get", { approved: "true" }));
			dispatch(manageVoucher("get", { endorsed: "true" }));
		}
		if (type === "delete") {
			res = await axios.delete(`/api/v1/voucher/${data?._id | data?.id || id}`);
			dispatch(deleteVoucher(data));
		}
		if (type !== "get") toast.success(res?.data?.message);
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(voucherFail());
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
