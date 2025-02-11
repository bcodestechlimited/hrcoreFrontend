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
	fleet: null,
	recruitment: null,
	unilever: null,
	legal: null,
	training: null,
};

export const invoiceSlice = createSlice({
	name: "invoice",
	initialState,
	reducers: {
		getSearchInvoice: (state, { payload }) => {
			state.mainSearch = payload?.data || payload || state?.mainSearch;
			state.isFound = true;
		},
		getSearch: (state, { payload }) => {
			state.search = payload?.search || payload;
		},
		resetInvoiceSearch: state => {
			state.search = "";
			state.mainSearch = null;
			state.isFound = false;
		},
		getInvoice: (state, { payload }) => {
			state.data = payload?.data || payload;
		},
		getInvoiceFleet: (state, { payload }) => {
			state.fleet = payload?.data || payload;
		},
		getInvoiceUnilever: (state, { payload }) => {
			state.unilever = payload?.data || payload;
		},
		getInvoiceRecruitment: (state, { payload }) => {
			state.recruitment = payload?.data || payload;
		},
		getInvoiceLegal: (state, { payload }) => {
			state.legal = payload?.data || payload;
		},
		getInvoiceTraining: (state, { payload }) => {
			state.training = payload?.data || payload;
		},
		getInvoiceClient: (state, { payload }) => {
			state.client = payload?.data || payload;
		},
		getAllInvoice: (state, { payload }) => {
			state.all = payload?.data || payload;
		},
		addInvoice: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isAdded = true;
			state.data = {
				...state?.data,
				docs: state?.data?.docs ? [data, ...state?.data?.docs] : [data],
				totalDocs: state?.data?.totalDocs ? 1 + state?.data?.totalDocs : 1,
			};
			if (data?.template === "fleet")
				state.fleet = {
					...state?.fleet,
					docs: state?.fleet?.docs ? [data, ...state?.fleet?.docs] : [data],
					totalDocs: state?.fleet?.totalDocs ? 1 + state?.fleet?.totalDocs : 1,
				};
			if (data?.template === "legal")
				state.legal = {
					...state?.legal,
					docs: state?.legal?.docs ? [data, ...state?.legal?.docs] : [data],
					totalDocs: state?.legal?.totalDocs ? 1 + state?.legal?.totalDocs : 1,
				};
			if (data?.template === "training")
				state.training = {
					...state?.training,
					docs: state?.training?.docs
						? [data, ...state?.training?.docs]
						: [data],
					totalDocs: state?.training?.totalDocs
						? 1 + state?.training?.totalDocs
						: 1,
				};
			if (data?.template === "unilever")
				state.unilever = {
					...state?.unilever,
					docs: state?.unilever?.docs
						? [data, ...state?.unilever?.docs]
						: [data],
					totalDocs: state?.unilever?.totalDocs
						? 1 + state?.unilever?.totalDocs
						: 1,
				};
			if (data?.template === "recruitment")
				state.recruitment = {
					...state?.recruitment,
					docs: state?.recruitment?.docs
						? [data, ...state?.recruitment?.docs]
						: [data],
					totalDocs: state?.recruitment?.totalDocs
						? 1 + state?.recruitment?.totalDocs
						: 1,
				};
			if (data?.template === "client")
				state.client = {
					...state?.client,
					docs: state?.client?.docs ? [data, ...state?.client?.docs] : [data],
					totalDocs: state?.client?.totalDocs
						? 1 + state?.client?.totalDocs
						: 1,
				};
			state.all = {
				...state?.all,
				docs: state?.all?.docs ? [data, ...state?.all?.docs] : [data],
				totalDocs: state?.all?.totalDocs ? 1 + state?.all?.totalDocs : 1,
			};
		},
		deleteInvoice: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isDeleted = true;
			state.data = {
				...state?.data,
				docs: DeleteData(state?.data?.docs, data),
				totalDocs: state?.data?.totalDocs ? state?.data?.totalDocs - 1 : 0,
			};
			if (data?.template === "client")
				state.client = {
					...state?.client,
					docs: DeleteData(state?.client?.docs, data),
					totalDocs: state?.client?.totalDocs
						? state?.client?.totalDocs - 1
						: 0,
				};
			if (data?.template === "recruitment")
				state.recruitment = {
					...state?.recruitment,
					docs: DeleteData(state?.recruitment?.docs, data),
					totalDocs: state?.recruitment?.totalDocs
						? state?.recruitment?.totalDocs - 1
						: 0,
				};
			if (data?.template === "fleet")
				state.fleet = {
					...state?.fleet,
					docs: DeleteData(state?.fleet?.docs, data),
					totalDocs: state?.fleet?.totalDocs ? state?.fleet?.totalDocs - 1 : 0,
				};
			if (data?.template === "unilever")
				state.unilever = {
					...state?.unilever,
					docs: DeleteData(state?.unilever?.docs, data),
					totalDocs: state?.unilever?.totalDocs
						? state?.unilever?.totalDocs - 1
						: 0,
				};
			if (data?.template === "legal")
				state.legal = {
					...state?.legal,
					docs: DeleteData(state?.legal?.docs, data),
					totalDocs: state?.legal?.totalDocs ? state?.legal?.totalDocs - 1 : 0,
				};
			if (data?.template === "training")
				state.training = {
					...state?.training,
					docs: DeleteData(state?.training?.docs, data),
					totalDocs: state?.training?.totalDocs
						? state?.training?.totalDocs - 1
						: 0,
				};
			state.all = {
				...state?.all,
				docs: DeleteData(state?.all?.docs, data),
				totalDocs: state?.all?.totalDocs ? state?.all?.totalDocs - 1 : 0,
			};
		},
		updateInvoice: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isUpdated = true;
			state.data = {
				...state?.data,
				docs: EditData(state?.data?.docs, data),
			};
			state.fleet = {
				...state?.fleet,
				docs: EditData(state?.fleet?.docs, data),
			};
			state.unilever = {
				...state?.unilever,
				docs: EditData(state?.unilever?.docs, data),
			};
			state.recruitment = {
				...state?.recruitment,
				docs: EditData(state?.recruitment?.docs, data),
			};
			state.legal = {
				...state?.legal,
				docs: EditData(state?.legal?.docs, data),
			};
			state.training = {
				...state?.training,
				docs: EditData(state?.training?.docs, data),
			};
			state.client = {
				...state?.client,
				docs: EditData(state?.client?.docs, data),
			};
			state.all = {
				...state?.all,
				docs: EditData(state?.all?.docs, data),
			};
		},
		invoiceFail: state => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isFound = false;
		},
		logoutInvoice: state => {
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
	invoiceFail,
	getOrg,
	getInvoice,
	deleteInvoice,
	addInvoice,
	getSearchInvoice,
	getSearch,
	resetInvoiceSearch,
	updateInvoice,
	logoutInvoice,
	getAllInvoice,
	getInvoiceFleet,
	getInvoiceLegal,
	getInvoiceRecruitment,
	getInvoiceTraining,
	getInvoiceUnilever,
	getInvoiceClient,
} = invoiceSlice.actions;

export const manageInvoice = (type, data) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res;
		if (type === "get") {
			if (data?.search) dispatch(getSearch({ search: data?.search }));
			res = await axios.get(
				`/api/v1/invoice?type=all&_populate=contacts&_populate=items&_populate=tags&_populate=accounts&_populate=email${
					data?.limit ? `&_limit=${data?.limit}` : ""
				}${data?.template ? `&template=${data?.template}` : ""}
				`,
				// ${
				// 	data?.search
				// 		? `&_searchBy=contacts.name&_searchBy=items.name&_searchBy=tags.name&_searchBy=accounts.name&_keyword=${data?.search}&_filterOnPopulate=true`
				// 		: ""
				// }
				{
					params: data?.search
						? {
								"contacts.name": `#${data?.search}`,
								"_filterOnPopulate": true,
						  }
						: null,
				}
			);
			// ${
			// 	data?.search
			// 		? `&_searchBy=contacts.name&_searchBy=tags.name&_searchBy=items.name&_searchBy=accounts.name&_keyword=${data?.search}&_filterOnPopulate=true`
			// 		: ""
			// }
			dispatch(
				data?.search
					? getSearchInvoice(res?.data)
					: data?.template
					? data?.template === "fleet"
						? getInvoiceFleet(res?.data)
						: data?.template === "recruitment"
						? getInvoiceRecruitment(res?.data)
						: data?.template === "unilever"
						? getInvoiceUnilever(res?.data)
						: data?.template === "legal"
						? getInvoiceLegal(res?.data)
						: data?.template === "training"
						? getInvoiceTraining(res?.data)
						: data?.template === "client"
						? getInvoiceClient(res?.data)
						: getInvoice(res?.data)
					: getInvoice(res?.data)
			);
			if (!data) {
				let res2 = await axios.get(
					`/api/v1/invoice?type=all&_populate=contacts&_populate=items&_populate=tags&_populate=accounts
						&_populate=email&_limit=0`
				);
				dispatch(getAllInvoice(res2?.data));
			}
		}
		if (type === "post") {
			res = await axios.post(`/api/v1/invoice`, {
				...data,
			});
			dispatch(addInvoice(res?.data));
		}
		if (type === "put") {
			res = await axios.put(`/api/v1/invoice/${data?._id}`, {
				...data,
			});
			dispatch(updateInvoice(res?.data));
		}
		if (type === "delete") {
			res = await axios.delete(`/api/v1/invoice/${data?._id}`);
			dispatch(deleteInvoice(data));
		}
		if (type !== "get") toast.success(res?.data?.message);
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		if (type === "post") {
			for (let n = 0; n < data?.items.length; n++) {
				await axios.delete(`/api/v1/invoiceItem/${data?.items?.[n]}`);
			}
		}
		dispatch(invoiceFail());
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
