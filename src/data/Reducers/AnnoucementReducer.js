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

export const announcementSlice = createSlice({
	name: "announcement",
	initialState,
	reducers: {
		getSearchAnnouncement: (state, { payload }) => {
			state.mainSearch = payload?.data || payload || state?.mainSearch;
			state.isFound = true;
		},
		getSearch: (state, { payload }) => {
			state.search = payload?.search || payload;
		},
		resetAnnouncementSearch: state => {
			state.search = "";
			state.mainSearch = null;
			state.isFound = false;
		},
		getAnnouncement: (state, { payload }) => {
			state.data = payload?.data || payload;
		},
		getAllAnnouncement: (state, { payload }) => {
			state.all = payload?.data || payload;
		},
		addAnnouncement: (state, { payload }) => {
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
		deleteAnnouncement: (state, { payload }) => {
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
		updateAnnouncement: (state, { payload }) => {
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
		announcementFail: state => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isFound = false;
		},
		logoutAnnouncement: state => {
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
	announcementFail,
	getOrg,
	getAnnouncement,
	deleteAnnouncement,
	addAnnouncement,
	getSearchAnnouncement,
	getSearch,
	resetAnnouncementSearch,
	updateAnnouncement,
	logoutAnnouncement,
	getAllAnnouncement,
} = announcementSlice.actions;

export const manageAnnouncement = (type, data) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res;
		if (type === "get") {
			if (data?.search) dispatch(getSearch({ search: data?.search }));
			res = await axios.get(
				`/api/v1/announcement?_populate=files&_populate=createdBy
        ${data?.limit ? `&_limit=${data?.limit}` : ""}
				`,
				{
					params: data?.search
						? {
								title: `#${data?.search}`,
						  }
						: null,
				}
			);
			dispatch(
				data?.search
					? getSearchAnnouncement(res?.data)
					: getAnnouncement(res?.data)
			);
			if (!data) {
				let res2 = await axios.get(
					`/api/v1/announcement?_populate=files&_populate=createdBy
						&_limit=${res?.data?.data?.totalDocs}`
				);
				dispatch(getAllAnnouncement(res2?.data));
			}
		}
		if (type === "post") {
			if (data?.files?.length > 0) {
				var imgArr = [];
				for (let f = 0; f < data?.files.length; f++) {
					const element = data?.files?.[f];
					let resImg = await axios.post(
						`/api/v1/file`,
						{ mic: element },
						{
							headers: {
								"Content-Type": "multipart/form-data",
							},
						}
					);
					// console.log({ img: resImg?.data }, { number: f });
					imgArr?.push(resImg?.data?.data?.filesId?.files?.[0]);
				}
				data = { ...data, files: imgArr };
			}
			res = await axios.post(`/api/v1/announcement`, {
				...data,
			});
			let res2 = await axios.get(
				`/api/v1/announcement/${res?.data?.data?._id}?_populate=files&_populate=createdBy`
			);
			dispatch(addAnnouncement(res2?.data));
		}
		if (type === "put") {
			if (data?.files?.length > 0) {
				imgArr = [];
				var existingArr = [];
				console.log({ files: data?.files });
				for (let f = 0; f < data?.files.length; f++) {
					const element = data?.files?.[f];
					if (element?._id) {
						existingArr?.push(element?._id);
					} else {
						let resImg = await axios.post(
							`/api/v1/file`,
							{ mic: element },
							{
								headers: {
									"Content-Type": "multipart/form-data",
								},
							}
						);
						console.log({ img: resImg?.data }, { number: f });
						imgArr?.push(resImg?.data?.data?.filesId?.files?.[0]);
					}
				}
				// console.log({existingArr, imgArr});
				var newData = {
					files: [...existingArr, ...imgArr],
					title: data?.title,
					description: data?.description,
				};
				// console.log({newData,files: data?.files});
			}
			res = await axios.put(
				`/api/v1/announcement/${data?._id}?_populate=files&_populate=createdBy`,
				{
					...newData,
				}
			);
			let res2 = await axios.get(
				`/api/v1/announcement/${res?.data?.data?._id}?_populate=files&_populate=createdBy`
			);
			dispatch(updateAnnouncement(res2?.data));
		}
		if (type === "delete") {
			res = await axios.delete(`/api/v1/announcement/${data?._id}`);
			dispatch(deleteAnnouncement(data));
		}
		if (type !== "get") toast.success(res?.data?.message);
	} catch (err) {
		if (err) console.log({ error: err.response?.data, err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch(announcementFail());
		if (imgArr?.length >0) {
			for (let f = 0; f < imgArr.length; f++) {
				const element = imgArr?.[f];
				await axios.delete(`/api/v1/file/${element}`, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
			}
		}
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
