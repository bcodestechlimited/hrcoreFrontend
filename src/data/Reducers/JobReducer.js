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
	candidates: null,
	paginate_candidates: null,
};

export const jobSlice = createSlice({
	name: "job",
	initialState,
	reducers: {
		getSearchJob: (state, { payload }) => {
			state.mainSearch = payload?.data || payload || state?.mainSearch;
			state.isFound = true;
		},
		getSearch: (state, { payload }) => {
			state.search = payload?.search || payload;
		},
		resetJobSearch: state => {
			state.search = "";
			state.mainSearch = null;
			state.isFound = false;
		},
		getJob: (state, { payload }) => {
			state.data = payload?.data || payload;
			state.paginate = payload?.paginate;
		},
		getCandidates: (state, { payload }) => {
			state.candidates = payload?.data || payload;
			state.paginate_candidates = payload?.paginate;
		},
		addJob: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isAdded = true;
			state.data = {
				...state?.data,
				docs: state?.data?.docs ? [data, ...state?.data?.docs] : [data],
				totalDocs: state?.data?.totalDocs ? 1 + state?.data?.totalDocs : 1,
			};
		},
		deleteJob: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isDeleted = true;
			state.data = {
				...state?.data,
				docs: DeleteData(state?.data?.docs, data),
				totalDocs: state?.data?.totalDocs ? state?.data?.totalDocs - 1 : 0,
			};
		},
		updateJob: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isUpdated = true;
			state.data = { ...state?.data, docs: EditData(state?.data?.docs, data) };
		},
		updateCandidate: (state, { payload }) => {
			let data = payload?.data || payload;
			state.isUpdated = true;
			state.candidates = {
				...state?.candidates,
				docs: EditData(state?.candidates?.docs, data),
			};
		},
		jobFail: state => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isFound = false;
		},
		logoutJob: state => {
			state.data = null;
			state.isAdded = false;
			state.isDeleted = null;
			state.search = "";
			state.mainSearch = null;
			state.isFound = null;
			state.isUpdated = null;
			state.all = null;
			state.candidates = null;
		},
	},
});

export const {
	jobFail,
	getOrg,
	getJob,
	deleteJob,
	addJob,
	getSearchJob,
	getSearch,
	resetJobSearch,
	updateJob,
	logoutJob,
	getCandidates,
	updateCandidate,
} = jobSlice.actions;

export const manageJob =
	(type, data, company, candidates) => async dispatch => {
		dispatch(clearErrors());
		try {
			let res;

			if (type === "get") {
				if (data?.search) dispatch(getSearch({ search: data?.search }));
				if (candidates)
					res = await axios.get(
						`/api/v1/job-application/${company || ""}?_populate=job${
							data?.limit ? `&_limit=${data?.limit}` : ""
						}
						${data?.search ? `&_searchBy=name&_keyword=${data?.search}` : ""}`
					);
				else
					res = await axios.get(
						`/api/v1/job/${company || ""}?_populate=form${
							data?.limit ? `&_limit=${data?.limit}` : ""
						}${data?.search ? `&_searchBy=name&_keyword=${data?.search}` : ""}`
					);
				if (data?.search) dispatch(getSearchJob(res?.data));
				else
					dispatch(candidates ? getCandidates(res?.data) : getJob(res?.data));

					if (!candidates) {
						let newData = res?.data?.data?.docs,
							updatedData = [];
						for (let s = 0; s < newData.length; s++) {
							let res1 = await axios.get(
								`/api/v1/job-application/${company || ""}?job=${
									newData?.[s]?._id
								}`
							);
							updatedData?.push({
								...newData?.[s],
								total: res1?.data?.data?.totalDocs,
							});
						}
						if (data?.search)
							dispatch(
								getSearchJob({
									...res?.data,
									data: {
										...res?.data?.data,
										docs: updatedData,
									},
								})
							);
						else
							dispatch(
								getJob({
									...res?.data,
									data: {
										...res?.data?.data,
										docs: updatedData,
									},
								})
							);
					}
			}
			if (type === "post") {
				res = await axios.post(`/api/v1/job/${company || ""}`, {
					...data,
				});
				dispatch(addJob(res?.data));
			}
			if (type === "put") {
				if (candidates) {
					res = await axios.put(
						`/api/v1/job-application/${company || ""}/${data?._id}`,
						{
							...data,
						}
					);
				} else
					res = await axios.put(
						`/api/v1/job${company ? `/${company}` : ""}/${data?._id}`,
						{
							...data,
						}
					);
				dispatch(
					candidates ? updateCandidate(res?.data) : updateJob(res?.data)
				);
			}
			if (type === "delete") {
				res = await axios.delete(
					`/api/v1/job${company ? `/${company}` : ""}/${data?._id}`
				);
				dispatch(deleteJob(data));
			}
			if (type !== "get") toast.success(res?.data?.message);
		} catch (err) {
			if (err) console.log({ error: err.response?.data, err });
			if (err?.response?.status === 429) toast.error(err?.response?.data);
			dispatch(jobFail());
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
