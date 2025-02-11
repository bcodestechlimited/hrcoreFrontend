import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import { errorSlice } from "./ErrorReducer";
import { levelSlice } from "./LevelReducer";
import { positionSlice } from "./PositionReducer";
import { departmentSlice } from "./DepartmentReducer";
import { companySlice } from "./CompanyReducer";
import { staffSlice } from "./StaffReducer";
import { leaveRequestSlice } from "./LeaveReducer";
import { leaveTypeSlice } from "./LeaveTypeReducer";
import { attendanceSlice } from "./AttendanceReducer";
import { flowSlice } from "./FlowReducer";
import { fileSlice } from "./FileReducer";
import { toolSlice } from "./ToolReducer";
import { folderSlice } from "./FolderReducer";
import { leaveFlowSlice } from "./LeaveFlowReducer";
import { resignationSlice } from "./ResignationReducer";
import { jobSlice } from "./JobReducer";
import { requestSlice } from "./RequestReducer";
import { invoiceSlice } from "./InvoiceReducer";
import { invoiceTagSlice } from "./InvoiceTagReducer";
import { invoiceContactSlice } from "./InvoiceContactReducer";
import { invoiceAccountSlice } from "./InvoiceAccountReducer";
import { mediasSlice } from "./MediaReducer";
import { notificationSlice } from "./NotificationsReducer";
import { announcementSlice } from "./AnnoucementReducer";
import { voucherCompaniesSlice } from "./VoucherCompanyReducer";
import { voucherSlice } from "./VoucherReducer";
import { invoiceCodeSlice } from "./InvoiceCodeReducer";
import { invoiceEmailSlice } from "./InvoiceEmailReducer";
import { performanceSlice } from "./PerformanceReducer";
import { performanceReviewSlice } from "./PerformanceReviewReducer";
import { gradeSlice } from "./GradeReducer";
import { voucherAccountSlice } from "./VoucherAccountReducer";

const rootReducer = combineReducers({
	auth: UserReducer,
	error: errorSlice.reducer,
	level: levelSlice.reducer,
	position: positionSlice.reducer,
	department: departmentSlice.reducer,
	company: companySlice.reducer,
	staff: staffSlice.reducer,
	leaveRequest: leaveRequestSlice.reducer,
	leaveType: leaveTypeSlice.reducer,
	attendance: attendanceSlice.reducer,
	flow: flowSlice.reducer,
	file: fileSlice.reducer,
	tool: toolSlice.reducer,
	folder: folderSlice.reducer,
	leaveFlow: leaveFlowSlice.reducer,
	resignation: resignationSlice.reducer,
	job: jobSlice.reducer,
	request: requestSlice.reducer,
	invoice: invoiceSlice.reducer,
	invoiceTag: invoiceTagSlice?.reducer,
	invoiceContact: invoiceContactSlice?.reducer,
	invoiceAccount: invoiceAccountSlice?.reducer,
	invoiceCode: invoiceCodeSlice.reducer,
	media: mediasSlice.reducer,
	notification: notificationSlice.reducer,
	announcement: announcementSlice.reducer,
	voucherCompanies: voucherCompaniesSlice.reducer,
	voucherAccount: voucherAccountSlice.reducer,
	voucher: voucherSlice.reducer,
	invoiceEmail: invoiceEmailSlice.reducer,
	performance: performanceSlice.reducer,
	performanceReview: performanceReviewSlice.reducer,
	grade: gradeSlice.reducer,
});

export default rootReducer;
