import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UpdateProfileBasic } from "../../profile/update-profile";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { returnErrors } from "../../../data/Reducers/ErrorReducer";
import { staffFail } from "../../../data/Reducers/StaffReducer";
import moment from "moment";

const UpdateProfile = () => {
	let { staff, company } = useSelector(state => state),
		location = useLocation(),
		[state, setState] = useState(null),
		[loading, setLoading] = useState(false),
		dispatch = useDispatch(),
		navigate = useNavigate(),
		textChange = e => {
			let { value, name } = e.target;
			setState({ ...state, [name]: value });
		},
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading(true);
			try {
				console.log({ state });
				let newState = state;
				if (state?.dateOfBirth) {
					newState = {
						...newState,
						birthMonth: moment(state?.dateOfBirth)?.format("MM"),
						birthDay: moment(state?.dateOfBirth)?.format("DD"),
					};
				}
				if (state?.weddingAnniversary && state?.maritalStatus === "married") {
					newState = {
						...newState,
						weddingAnniversaryMonth: moment(state?.weddingAnniversary)?.format(
							"MM"
						),
						weddingAnniversaryDay: moment(state?.weddingAnniversary)?.format(
							"DD"
						),
					};
				}
				console.log({ newState });
				let res = await axios.put(
					`/api/v1/user/${company?.currentSelected}/${state?._id}`,
					{ ...newState }
				);
				console.log({ resp: res?.data });
				toast.success(res?.data?.message);
				// dispatch(updateStaff(res?.data?.data));
				navigate("/employee/all-employee");
			} catch (err) {
				if (err?.response?.status === 429 || err?.response?.status === 405)
					toast.error(err?.response?.data ? err?.response?.data : err?.message);
				console.log({ err });
				let error = err.response?.data?.error;
				if (error) {
					dispatch(returnErrors({ error, status: err?.response?.status }));
				} else {
					toast.error(err?.response?.data?.message);
				}
				dispatch(staffFail());
			}
			setLoading(false);
		};

	useEffect(() => {
		if (location?.state) {
			staff?.all?.docs?.map(it => it?._id === location?.state && setState(it));
		}
	}, [location?.state, staff?.all?.docs]);

	if (!state) return;

	return (
		<UpdateProfileBasic
			state={state}
			textChange={textChange}
			setState={setState}
			handleSubmit={handleSubmit}
			loading={loading}
		/>
	);
};

export default UpdateProfile;
