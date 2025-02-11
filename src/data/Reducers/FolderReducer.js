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

export const folderSlice = createSlice({
	name: "folder",
	initialState,
	reducers: {
		getSearchFolder: (state, { payload }) => {
			state.mainSearch = payload?.data || payload || state?.mainSearch;
			state.isFound = true;
		},
		getSearch: (state, { payload }) => {
			state.search = payload?.search || payload;
		},
		resetFolderSearch: state => {
			state.search = "";
			state.mainSearch = null;
			state.isFound = false;
		},
		getFolder: (state, { payload }) => {
			state.data = payload?.data || payload;
		},
		addFolder: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isAdded = true;
			state.data = {
				...state?.data,
				docs: state?.data?.docs ? [data, ...state?.data?.docs] : [data],
				totalDocs: state?.data?.totalDocs ? 1 + state?.data?.totalDocs : 1,
			};
		},
		deleteFolder: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isDeleted = true;
			state.data = {
				...state?.data,
				docs: DeleteData(state?.data?.docs, data),
				totalDocs: state?.data?.totalDocs ? state?.data?.totalDocs - 1 : 0,
			};
		},
		updateFolder: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isUpdated = true;
			state.data = { ...state?.data, docs: EditData(state?.data?.docs, data) };
		},
		folderFail: state => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isFound = false;
		},
		logoutFolder: state => {
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
	folderFail,
	getOrg,
	getFolder,
	deleteFolder,
	addFolder,
	getSearchFolder,
	getSearch,
	resetFolderSearch,
	updateFolder,
	logoutFolder,
} = folderSlice.actions;

export const manageFolder = (type, data, company) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res;

		if (type === "get") {
			res = await axios.get(
				`/api/v1/folder/${company || ""}?type=all${
					data?.limit ? `&_limit=${data?.limit}` : ""
				}`
			);
			dispatch(getFolder(res?.data));
		}
		if (type === "post") {
			res = await axios.post(`/api/v1/folder/${company || ""}`, {
				...data,
			});
			dispatch(addFolder(res?.data));
		}
		if (type === "put") {
			res = await axios.put(
				`/api/v1/folder${company ? `/${company}` : ""}/${data?._id}`,
				{
					...data,
				}
			);
			dispatch(updateFolder(res?.data));
		}
		if (type === "delete") {
			res = await axios.delete(
				`/api/v1/folder${company ? `/${company}` : ""}/${data?._id}`
			);
			dispatch(deleteFolder(data));
		}
		if (type !== "get") toast.success(res?.data?.message);
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(folderFail());
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
