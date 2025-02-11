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
	admin: null,
	allAdmin: null,
	manager: null,
	allManager: null,
	manager1: null,
	allManager1: null,
	manager2: null,
	allManager2: null,
	executive: null,
	allExecutive: null,
};

export const staffSlice = createSlice({
	name: "staff",
	initialState,
	reducers: {
		getSearchStaff: (state, { payload }) => {
			state.mainSearch = payload?.data || payload || state?.mainSearch;
			state.isFound = true;
		},
		getSearch: (state, { payload }) => {
			state.search = payload?.search || payload;
		},
		resetStaffSearch: state => {
			state.search = "";
			state.mainSearch = null;
			state.isFound = false;
		},
		getStaff: (state, { payload }) => {
			state.data = payload?.data || payload;
		},
		getAllStaff: (state, { payload }) => {
			state.all = payload?.data || payload;
		},
		getAdminStaff: (state, { payload }) => {
			state.admin = payload?.data || payload;
		},
		getAllAdminStaff: (state, { payload }) => {
			state.allAdmin = payload?.data || payload;
		},
		getManagerStaff: (state, { payload }) => {
			state.manager = payload?.data || payload;
		},
		getAllManagerStaff: (state, { payload }) => {
			state.allManager = payload?.data || payload;
		},
		getManager1Staff: (state, { payload }) => {
			state.manager1 = payload?.data || payload;
		},
		getAllManager1Staff: (state, { payload }) => {
			state.allManager1 = payload?.data || payload;
		},
		getManager2Staff: (state, { payload }) => {
			state.manager2 = payload?.data || payload;
		},
		getAllManager2Staff: (state, { payload }) => {
			state.allManager2 = payload?.data || payload;
		},
		getExecutiveStaff: (state, { payload }) => {
			state.executive = payload?.data || payload;
		},
		getAllExecutiveStaff: (state, { payload }) => {
			state.allExecutive = payload?.data || payload;
		},
		addStaff: (state, { payload }) => {
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
		deleteStaff: (state, { payload }) => {
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
			state.admin = {
				...state?.admin,
				docs: DeleteData(state?.admin?.docs, data),
				totalDocs: state?.admin?.totalDocs ? state?.admin?.totalDocs - 1 : 0,
			};
			state.allAdmin = {
				...state?.allAdmin,
				docs: DeleteData(state?.allAdmin?.docs, data),
				totalDocs: state?.allAdmin?.totalDocs
					? state?.allAdmin?.totalDocs - 1
					: 0,
			};
			state.manager = {
				...state?.manager,
				docs: DeleteData(state?.manager?.docs, data),
				totalDocs: state?.manager?.totalDocs
					? state?.manager?.totalDocs - 1
					: 0,
			};
			state.allManager = {
				...state?.allManager,
				docs: DeleteData(state?.allManager?.docs, data),
				totalDocs: state?.allManager?.totalDocs
					? state?.allManager?.totalDocs - 1
					: 0,
			};
			state.manager1 = {
				...state?.manager1,
				docs: DeleteData(state?.manager1?.docs, data),
				totalDocs: state?.manager1?.totalDocs
					? state?.manager1?.totalDocs - 1
					: 0,
			};
			state.allManager1 = {
				...state?.allManager1,
				docs: DeleteData(state?.allManager1?.docs, data),
				totalDocs: state?.allManager1?.totalDocs
					? state?.allManager1?.totalDocs - 1
					: 0,
			};
			state.manager2 = {
				...state?.manager2,
				docs: DeleteData(state?.manager2?.docs, data),
				totalDocs: state?.manager2?.totalDocs
					? state?.manager2?.totalDocs - 1
					: 0,
			};
			state.allManager2 = {
				...state?.allManager2,
				docs: DeleteData(state?.allManager2?.docs, data),
				totalDocs: state?.allManager2?.totalDocs
					? state?.allManager2?.totalDocs - 1
					: 0,
			};
			state.executive = {
				...state?.executive,
				docs: DeleteData(state?.executive?.docs, data),
				totalDocs: state?.executive?.totalDocs
					? state?.executive?.totalDocs - 1
					: 0,
			};
			state.allExecutive = {
				...state?.allExecutive,
				docs: DeleteData(state?.allExecutive?.docs, data),
				totalDocs: state?.allExecutive?.totalDocs
					? state?.allExecutive?.totalDocs - 1
					: 0,
			};
		},
		deleteAdmins: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isDeleted = true;
			state.admin = {
				...state?.admin,
				docs: DeleteData(state?.admin?.docs, data),
				totalDocs: state?.admin?.totalDocs ? state?.admin?.totalDocs - 1 : 0,
			};
			state.allAdmin = {
				...state?.allAdmin,
				docs: DeleteData(state?.allAdmin?.docs, data),
				totalDocs: state?.allAdmin?.totalDocs
					? state?.allAdmin?.totalDocs - 1
					: 0,
			};
		},
		deleteManagers: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isDeleted = true;
			state.manager = {
				...state?.manager,
				docs: DeleteData(state?.manager?.docs, data),
				totalDocs: state?.manager?.totalDocs
					? state?.manager?.totalDocs - 1
					: 0,
			};
			state.allManager = {
				...state?.allManager,
				docs: DeleteData(state?.allManager?.docs, data),
				totalDocs: state?.allManager?.totalDocs
					? state?.allManager?.totalDocs - 1
					: 0,
			};
		},
		deleteExecutives: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isDeleted = true;
			state.executive = {
				...state?.executive,
				docs: DeleteData(state?.executive?.docs, data),
				totalDocs: state?.executive?.totalDocs
					? state?.executive?.totalDocs - 1
					: 0,
			};
			state.allExecutive = {
				...state?.allExecutive,
				docs: DeleteData(state?.allExecutive?.docs, data),
				totalDocs: state?.allExecutive?.totalDocs
					? state?.allExecutive?.totalDocs - 1
					: 0,
			};
		},
		updateStaff: (state, { payload }) => {
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
		staffFail: state => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isFound = false;
		},
		logoutStaff: state => {
			state.data = null;
			state.isAdded = false;
			state.isDeleted = null;
			state.search = "";
			state.mainSearch = null;
			state.isFound = null;
			state.isUpdated = null;
			state.all = null;
			state.manager = null;
			state.manager1 = null;
			state.manager2 = null;
			state.allAdmin = null;
			state.allManager = null;
			state.allManager1 = null;
			state.allManager2 = null;
			state.admin = null;
		},
	},
});
export const {
	staffFail,
	getOrg,
	getStaff,
	deleteStaff,
	addStaff,
	getSearchStaff,
	getSearch,
	resetStaffSearch,
	updateStaff,
	logoutStaff,
	getAllStaff,
	getAdminStaff,
	getAllAdminStaff,
	deleteAdmins,
	getAllManagerStaff,
	getManagerStaff,
	deleteManagers,
	getAllExecutiveStaff,
	getExecutiveStaff,
	deleteExecutives,
	getAllManager1Staff,
	getAllManager2Staff,
	getManager1Staff,
	getManager2Staff,
} = staffSlice.actions;

export const manageStaff = (type, data, company) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res;
		if (type === "get") {
			if (data?.search) dispatch(getSearch({ search: data?.search }));
			if (data?.admin)
				res = await axios.get(
					`/api/v1/user/users/${company || ""}${
						data?.admin ? `?_id===${data?.admin}` : ""
					}${data?.limit ? `&_limit=${data?.limit}` : ""}
				${
					data?.search
						? `&_searchBy=lastName&_searchBy=firstName&_searchBy=email&_searchBy=employeeId&_keyword=${data?.search}`
						: ""
				}`
				);
			else if (data?.managers)
				res = await axios.get(
					`/api/v1/user/users/${company || ""}${
						data?.managers ? `?_id===${data?.managers}` : ""
					}${data?.limit ? `&_limit=${data?.limit}` : ""}
				${
					data?.search
						? `&_searchBy=lastName&_searchBy=firstName&_searchBy=email&_searchBy=employeeId&_keyword=${data?.search}`
						: ""
				}`
				);
			else if (data?.manager1)
				res = await axios.get(
					`/api/v1/user/users/${company || ""}${
						data?.manager1
							? `?gradeForPosition1===${data?.manager1}&_populate=gradeForPosition1&_populate=gradeForPosition2`
							: ""
					}${data?.limit ? `&_limit=${data?.limit}` : ""}
				${
					data?.search
						? `&_searchBy=lastName&_searchBy=firstName&_searchBy=email&_searchBy=employeeId&_keyword=${data?.search}`
						: ""
				}`
				);
			else if (data?.manager2)
				res = await axios.get(
					`/api/v1/user/users/${company || ""}${
						data?.manager2
							? `?gradeForPosition2===${data?.manager2}&_populate=gradeForPosition1&_populate=gradeForPosition2`
							: ""
					}${data?.limit ? `&_limit=${data?.limit}` : ""}
				${
					data?.search
						? `&_searchBy=lastName&_searchBy=firstName&_searchBy=email&_searchBy=employeeId&_keyword=${data?.search}`
						: ""
				}`
				);
			else if (data?.executive)
				res = await axios.get(
					`/api/v1/user/users/${company || ""}${
						data?.executive ? `?_id===${data?.executive}` : ""
					}${data?.limit ? `&_limit=${data?.limit}` : ""}
				${
					data?.search
						? `&_searchBy=lastName&_searchBy=firstName&_searchBy=email&_searchBy=employeeId&_keyword=${data?.search}`
						: ""
				}`
				);
			else
				res = await axios.get(
					`/api/v1/user/users/${
						company || ""
					}?_populate=position&_populate=department&_populate=level&_populate=grade${
						data?.limit ? `&_limit=${data?.limit}` : ""
					}
				${
					data?.search
						? `&_searchBy=lastName&_searchBy=firstName&_searchBy=email&_searchBy=employeeId&_keyword=${data?.search}`
						: ""
				}`
				);
			dispatch(
				data?.search
					? getSearchStaff(res?.data)
					: data?.admin
					? getAdminStaff(res?.data)
					: data?.managers
					? getManagerStaff(res?.data)
					: data?.manager1
					? getManager1Staff(res?.data)
					: data?.manager2
					? getManager2Staff(res?.data)
					: data?.executive
					? getExecutiveStaff(res?.data)
					: getStaff(res?.data)
			);
			if (!data) {
				let res2 = await axios.get(
					`/api/v1/user/users/${
						company || ""
					}?_populate=position&_populate=department&_populate=level
						&_populate=grade&_limit=0`
				);
				dispatch(getAllStaff(res2?.data));
			}
			if (data?.admin && !data?.search) {
				let res2 = await axios.get(
					`/api/v1/user/users/${company || ""}${
						data?.admin ? `?_id===${data?.admin}` : ""
					}
						&_limit=0`
				);
				dispatch(getAllAdminStaff(res2?.data));
			}
			if (data?.managers && !data?.search) {
				let res2 = await axios.get(
					`/api/v1/user/users/${company || ""}${
						data?.managers ? `?_id===${data?.managers}` : ""
					}
						&_limit=0`
				);
				dispatch(getAllManagerStaff(res2?.data));
			}
			if (data?.manager1 && !data?.search) {
				let res2 = await axios.get(
					`/api/v1/user/users/${company || ""}${
						data?.manager1 ? `?gradeForPosition1===${data?.manager1}` : ""
					}
						&_limit=0`
				);
				dispatch(getAllManager1Staff(res2?.data));
			}
			if (data?.manager2 && !data?.search) {
				let res2 = await axios.get(
					`/api/v1/user/users/${company || ""}${
						data?.manager2 ? `?gradeForPosition2===${data?.manager2}` : ""
					}
						&_limit=0`
				);
				dispatch(getAllManager2Staff(res2?.data));
			}
			if (data?.executive && !data?.search) {
				let res2 = await axios.get(
					`/api/v1/user/users/${company || ""}${
						data?.executive ? `?_id===${data?.executive}` : ""
					}
						&_limit=0`
				);
				dispatch(getAllExecutiveStaff(res2?.data));
			}
		}
		if (type === "post") {
			res = await axios.post(`/api/v1/company/${company || ""}/add-staff`, {
				...data,
			});
			dispatch(addStaff(res?.data));
		}
		if (type === "put") {
			res = await axios.put(
				`/api/v1/user${company ? `/${company}` : ""}/${data?._id}`,
				{
					...data,
				}
			);
			dispatch(updateStaff(res?.data));
		}
		if (type === "delete") {
			res = await axios.delete(
				`/api/v1/user/${company ? `/${company}` : ""}/${data?._id}`
			);
			dispatch(deleteStaff(data));
		}
		if (type !== "get") toast.success(res?.data?.message);
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(staffFail());
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
