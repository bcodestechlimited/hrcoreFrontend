import { createSlice } from "@reduxjs/toolkit";
import { clearErrors, getErrorText } from "./ErrorReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { SetAuthToken } from "../Config";
import { logoutDepartment, manageDepartment } from "./DepartmentReducer";
import { logoutPosition, managePosition } from "./PositionReducer";
import { logoutLevel, manageLevel } from "./LevelReducer";
import { logoutCompany, manageCompany } from "./CompanyReducer";
import { logoutStaff, manageStaff } from "./StaffReducer";
import { logoutLeaveRequest, manageLeaveRequest } from "./LeaveReducer";
import { logoutLeaveType, manageLeaveType } from "./LeaveTypeReducer";
import { logoutAttendance, manageAttendance } from "./AttendanceReducer";
import { logoutFlow, manageFlow } from "./FlowReducer";
import { logoutFolder, manageFolder } from "./FolderReducer";
import { logoutTool, manageTool } from "./ToolReducer";
import { logoutleaveFlow, manageleaveFlow } from "./LeaveFlowReducer";
import { logoutResignation, manageResignation } from "./ResignationReducer";
import { logoutJob, manageJob } from "./JobReducer";
import { logoutInvoiceTag, manageInvoiceTag } from "./InvoiceTagReducer";
import {
	logoutInvoiceContact,
	manageInvoiceContact,
} from "./InvoiceContactReducer";
import {
	logoutInvoiceAccount,
	manageInvoiceAccount,
} from "./InvoiceAccountReducer";
import { logoutInvoice, manageInvoice } from "./InvoiceReducer";
import { logoutRequest, manageRequest } from "./RequestReducer";
import { logoutMedia, manageMedia } from "./MediaReducer";
import { logoutNotification, manageNotification } from "./NotificationsReducer";
import { logoutAnnouncement, manageAnnouncement } from "./AnnoucementReducer";
import {
	logoutVoucherCompanies,
	manageVoucherCompanies,
} from "./VoucherCompanyReducer";
import { logoutVoucher, manageVoucher } from "./VoucherReducer";
import { logoutFile } from "./FileReducer";
import { logoutInvoiceCode, manageInvoiceCode } from "./InvoiceCodeReducer";
import { logoutInvoiceEmail, manageInvoiceEmail } from "./InvoiceEmailReducer";
import { logoutPerformance, managePerformance } from "./PerformanceReducer";
import {
	logoutPerformanceReview,
	managePerformanceReview,
} from "./PerformanceReviewReducer";
import { logoutGrade, manageGrade } from "./GradeReducer";

export const TOKEN = "HRCORE_LOGIN";
export const TOKEN_ID = "HRCORE_COMPANY_ID";

let initialState = {
	user: null,
	token: localStorage.getItem(TOKEN),
	isAuth: false,
	loading: false,
	isRegistered: false,
	isLoggedIn: false,
	isUpdated: false,
	isPassword: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, { payload }) => {
			localStorage.setItem(TOKEN, payload?.token);
			state.isLoggedIn = true;
			state.token = payload?.token;
			state.user = payload?.user;
		},
		register: state => {
			state.isRegistered = true;
		},
		setUser: (state, { payload }) => {
			state.isUpdated = true;
			state.user = payload?.data;
		},
		getUser: (state, { payload }) => {
			if (payload?.token) {
				localStorage.setItem(TOKEN, payload?.token);
			}
			state.user = payload?.data || payload || null;
			state.isAuth = payload?.data || payload ? true : false;
			state.loading = false;
		},
		getUserFail: state => {
			state.isAuth = false;
			state.loading = false;
		},
		getUserLoading: state => {
			state.loading = true;
		},
		setPassword: state => {
			state.isPassword = true;
		},
		setUserFail: state => {
			state.isUpdated = false;
			state.isLoggedIn = false;
			state.isRegistered = false;
			state.isPassword = false;
		},
		logout: state => {
			localStorage.removeItem(TOKEN);
			state.isAuth = false;
			state.user = null;
			state.token = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	login,
	logout,
	getUser,
	setPassword,
	setUser,
	setUserFail,
	getUserFail,
	getUserLoading,
	register,
} = userSlice.actions;

export default userSlice.reducer;

export const MergedData = (data, payload) => {
	let ids = new Set(payload.map(d => d._id));
	let updatateData = [...payload, ...data.filter(d => !ids.has(d._id))];
	return updatateData?.sort((a, b) => a?.createdAt - b?.createdAt);
};

export const EditData = (data, payload) => {
	let updatateData =
		data?.length > 0
			? data.map(item => (item._id !== payload._id ? item : payload))
			: data;
	return updatateData;
};

export const DeleteData = (data, payload) => {
	let filterItem =
		data?.length > 0 ? [...data.filter(item => item._id !== payload._id)] : [];
	return filterItem;
};

// GET USER INFO
export const loadUser = company => async dispatch => {
	let token = localStorage.getItem(TOKEN);
	if (token) SetAuthToken(token);
	if (!company) dispatch(getUserLoading());
	dispatch(clearErrors());
	try {
		let res = await axios.get(
			`/api/v1/user?_populate=position&_populate=department&_populate=level&_populate=grade&_populate=gradeForPosition1&_populate=gradeForPosition2`
		);
		if (res?.data) {
			dispatch(getUser(res.data));
			await dispatch(manageCompany("get", null));
			dispatch(manageInvoiceTag("get", null));
			dispatch(manageInvoiceEmail("get", null));
			dispatch(manageInvoiceContact("get", null));
			dispatch(manageInvoiceAccount("get", null));
			dispatch(manageInvoiceCode("get", null));
			dispatch(manageInvoice("get", null));
			dispatch(manageInvoice("get", { template: "legal" }));
			dispatch(manageInvoice("get", { template: "training" }));
			dispatch(manageInvoice("get", { template: "unilever" }));
			dispatch(manageInvoice("get", { template: "fleet" }));
			dispatch(manageInvoice("get", { template: "recruitment" }));
			if (process.env.REACT_APP_NAME === "Cephas HR Core")
				dispatch(manageInvoice("get", { template: "client" }));
			dispatch(manageMedia("get", null));
			dispatch(manageNotification("get", null));
			dispatch(manageAnnouncement("get", null));
			dispatch(manageVoucher("get", null));
			dispatch(manageVoucher("get", { approved: "true" }));
			dispatch(manageVoucher("get", { endorsed: "true" }));
			dispatch(manageVoucherCompanies("get", null));
			dispatch(managePerformance("get", null));
			dispatch(managePerformanceReview("get", null));
			dispatch(manageGrade("get", null));

			// if (company) {
			dispatch(
				manageDepartment("get", null, company || localStorage.getItem(TOKEN_ID))
			);
			dispatch(
				managePosition("get", null, company || localStorage.getItem(TOKEN_ID))
			);
			dispatch(
				manageLevel("get", null, company || localStorage.getItem(TOKEN_ID))
			);
			dispatch(
				manageStaff("get", null, company || localStorage.getItem(TOKEN_ID))
			);
			dispatch(
				manageLeaveRequest(
					"get",
					null,
					company || localStorage.getItem(TOKEN_ID)
				)
			);
			dispatch(
				manageLeaveRequest(
					"get",
					{
						createdBy: res?.data?.data?.profile?._id || res?.data?.data?._id,
					},
					company || localStorage.getItem(TOKEN_ID)
				)
			);
			dispatch(
				manageLeaveRequest(
					"get",
					{
						nextApprover: res?.data?.data?.profile?._id || res?.data?.data?._id,
					},
					company || localStorage.getItem(TOKEN_ID)
				)
			);
			dispatch(
				manageLeaveType("get", null, company || localStorage.getItem(TOKEN_ID))
			);
			dispatch(
				manageleaveFlow("get", null, company || localStorage.getItem(TOKEN_ID))
			);
			dispatch(
				manageFlow("get", null, company || localStorage.getItem(TOKEN_ID))
			);
			dispatch(
				manageAttendance(
					"get",
					{ qr: "qr" },
					company || localStorage.getItem(TOKEN_ID)
				)
			);
			dispatch(
				manageAttendance("get", null, company || localStorage.getItem(TOKEN_ID))
			);
			dispatch(
				manageFolder("get", null, company || localStorage.getItem(TOKEN_ID))
			);
			dispatch(
				manageTool("get", null, company || localStorage.getItem(TOKEN_ID))
			);
			dispatch(
				manageJob("get", null, company || localStorage.getItem(TOKEN_ID))
			);
			dispatch(
				manageJob(
					"get",
					null,
					company || localStorage.getItem(TOKEN_ID),
					"candidates"
				)
			);
			dispatch(
				manageRequest("get", null, company || localStorage.getItem(TOKEN_ID))
			);
			dispatch(
				manageResignation(
					"get",
					null,
					company || localStorage.getItem(TOKEN_ID)
				)
			);
			// }
		} else {
			dispatch(getUserFail());
		}
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(getUserFail());
		dispatch(getErrorText(err?.response?.data?.message || ""));
	}
};

export const logoutUser = skip => async dispatch => {
	if (!skip) {
		localStorage.removeItem(TOKEN);
		localStorage.removeItem(TOKEN_ID);
		dispatch(logoutCompany());
		dispatch(logout());
	}
	dispatch(logoutPerformance());
	dispatch(logoutPerformanceReview());
	dispatch(logoutPosition());
	dispatch(logoutLevel());
	dispatch(logoutStaff());
	dispatch(logoutLeaveRequest());
	dispatch(logoutLeaveType());
	dispatch(logoutFlow());
	dispatch(logoutAttendance());
	dispatch(logoutAnnouncement());
	dispatch(logoutDepartment());
	dispatch(logoutFile());
	dispatch(logoutFolder());
	dispatch(logoutInvoiceAccount());
	dispatch(logoutInvoiceCode());
	dispatch(logoutInvoiceContact());
	dispatch(logoutInvoice());
	dispatch(logoutInvoiceTag());
	dispatch(logoutInvoiceEmail());
	dispatch(logoutJob());
	dispatch(logoutleaveFlow());
	dispatch(logoutMedia());
	dispatch(logoutNotification());
	dispatch(logoutRequest());
	dispatch(logoutResignation());
	dispatch(logoutVoucher());
	dispatch(logoutVoucherCompanies());
	dispatch(logoutTool());
	dispatch(logoutGrade());
};
