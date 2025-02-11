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

export const invoiceContactSlice = createSlice({
	name: "invoiceContact",
	initialState,
	reducers: {
		getSearchInvoiceContact: (state, { payload }) => {
			state.mainSearch = payload?.data || payload || state?.mainSearch;
			state.isFound = true;
		},
		getSearch: (state, { payload }) => {
			state.search = payload?.search || payload;
		},
		resetInvoiceContactSearch: state => {
			state.search = "";
			state.mainSearch = null;
			state.isFound = false;
		},
		getInvoiceContact: (state, { payload }) => {
			state.data = payload?.data || payload;
		},
		getAllInvoiceContact: (state, { payload }) => {
			state.all = payload?.data || payload;
		},
		addInvoiceContact: (state, { payload }) => {
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
		deleteInvoiceContact: (state, { payload }) => {
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
		updateInvoiceContact: (state, { payload }) => {
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
		invoiceContactFail: state => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isFound = false;
		},
		logoutInvoiceContact: state => {
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
	invoiceContactFail,
	getOrg,
	getInvoiceContact,
	deleteInvoiceContact,
	addInvoiceContact,
	getSearchInvoiceContact,
	getSearch,
	resetInvoiceContactSearch,
	updateInvoiceContact,
	logoutInvoiceContact,
	getAllInvoiceContact,
} = invoiceContactSlice.actions;

export const manageInvoiceContact = (type, data, id) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res;
		if (type === "get") {
			res = await axios.get(
				`/api/v1/invoiceContact?type=all${
					data?.limit ? `&_limit=${data?.limit}` : ""
				}`
			);
			dispatch(getInvoiceContact(res?.data));
			if (!data) {
				let res2 = await axios.get(
					`/api/v1/invoiceContact?type=all
						&_limit=${res?.data?.data?.totalDocs}`
				);
				dispatch(getAllInvoiceContact(res2?.data));
			}
		}
		if (type === "post") {
			delete data?._id;
			res = await axios.post(`/api/v1/invoiceContact`, {
				...data,
			});
			dispatch(addInvoiceContact(res?.data));
		}
		if (type === "put") {
			let newData = data;
			delete newData?._id;
			res = await axios.put(`/api/v1/invoiceContact/${data?._id || id}`, {
				...newData,
			});
			dispatch(updateInvoiceContact(res?.data));
		}
		if (type === "delete") {
			res = await axios.delete(`/api/v1/invoiceContact/${data?._id || id}`);
			dispatch(deleteInvoiceContact(data));
		}
		if (type !== "get") toast.success(res?.data?.message);
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(invoiceContactFail());
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
