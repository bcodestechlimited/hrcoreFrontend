import { useState, useEffect } from "react";
import Button from "../../../components/button/button";
import Input from "../../../components/input/input";
import ManageSettingsTab from "../../../components/settings/manage_settings/manage_settings_tab";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { returnErrors } from "../../../data/Reducers/ErrorReducer";
import { manageStaff } from "../../../data/Reducers/StaffReducer";
import { manageCompany } from "../../../data/Reducers/CompanyReducer";
import { useLocation } from "react-router-dom";

const CreateAdmin = () => {
	let [userId, setUser] = useState(""),
		[gradeForPosition, setgradeForPosition] = useState("");

	const navigate = useNavigate(),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		{ auth, staff, company, position } = useSelector(state => state),
		dispatch = useDispatch(),
		{ state } = useLocation();

	useEffect(() => {
		if (submit) {
			navigate(-1);
			setSubmit(false);
		}
	}, [auth, submit, navigate]);

	const handleSubmit = type => async e => {
		e?.preventDefault();
		if (!userId) return;
		setLoading(type);
		try {
			let body = {};
			if (["manager2", "manager1"]?.includes(state))
				body.gradeForPosition = [gradeForPosition];
			let res = await axios.put(
				`/api/v1/company/add/${type}/${company?.currentSelected}/${userId}`,
				body
			);

			toast.success(res?.data?.message);
			setSubmit(true);
			dispatch(manageStaff("get", null, company?.currentSelected));
			dispatch(manageCompany("get"));
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
		}
		setLoading(false);
	};

	let relieverArr = staff?.all?.docs ? [...staff?.all?.docs] : [],
		relieverArr2 = position?.all?.docs
			? [...position?.all?.docs?.filter(it => it?.name)]
			: [];

	return (
		<div className="max-w-4xl mx-auto">
			<ManageSettingsTab name="Manage Admins" />
			<div class="block mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow">
				<div className="mx-20">
					<h5 class="mb-2 text-2xl tracking-tight text-gray-900">
						Create Admin
					</h5>
					<p class="font-normal text-gray-700 max-w-2xl text-sm">
						An Admin is created from an employee account. The Employee would use
						their already existing password to login to their Admin account
					</p>
					<form className="mt-4">
						<Input
							label={"Select Employee"}
							placeholder={"Employee Name"}
							type={"select"}
							onChange={e => setUser(e.target.value)}
							name="reliever"
							value={userId}
							options={relieverArr
								?.sort((a, b) => {
									let nameA = a?.profile?.lastName || a?.lastName,
										nameB = b?.profile?.lastName || b?.lastName;
									var textA = nameA?.toUpperCase();
									var textB = nameB?.toUpperCase();
									return textA < textB ? -1 : textA > textB ? 1 : 0;
								})
								?.filter(item => item?._id && item?._id !== auth?.user?._id)}
						/>
						{["manager2", "manager1"]?.includes(state) && (
							<div className="py-4">
								<Input
									label={"Select Position"}
									placeholder={"Employee Name"}
									type={"select"}
									onChange={e => setgradeForPosition(e.target.value)}
									value={gradeForPosition}
									options={relieverArr2?.sort((a, b) => {
										let nameA = a?.name,
											nameB = b?.name;
										var textA = nameA.toUpperCase();
										var textB = nameB.toUpperCase();
										return textA < textB ? -1 : textA > textB ? 1 : 0;
									})}
								/>
							</div>
						)}

						{/* <br />
            <Input label={"Select Role"} type={"select"} placeholder={"None"} /> */}

						<div className=" font-light text-xs mt-5">
							<p className="text-lg font-semibold">Highlights of Permissions</p>
							<p>This admin has the following Permissions</p>
							<ul>
								<li>
									Would be able to approve Leave, Cash Request from his
									department
								</li>
								<li>Would be able to View Salary Structure of Employee</li>

								<li>Would be able to update an Employee Profile</li>

								<li>Would be able to View Salary Structure of Employee</li>
							</ul>
						</div>

						<div className="flex items-center justify-center gap-12 mt-8">
							{["manager1"]?.includes(state) && (
								<Button
									buttonType={"primary"}
									title={"Make Department Manager"}
									width={"w-fit mx-2"}
									type="submit"
									loading={loading === "manager1"}
									onClick={handleSubmit("manager1")}
								/>
							)}
							{["manager2"]?.includes(state) && (
								<Button
									buttonType={"primary"}
									title={"Make Department Manager 2"}
									width={"w-fit mx-2"}
									type="submit"
									loading={loading === "manager2"}
									onClick={handleSubmit("manager2")}
								/>
							)}
						</div>
						<div className="flex items-center justify-center gap-12 mt-8">
							{["admin"]?.includes(state) && (
								<Button
									buttonType={"primary"}
									title={"Make Admin"}
									width={"w-fit me-2"}
									type="submit"
									loading={loading === "admin"}
									onClick={handleSubmit("admin")}
								/>
							)}
							{["manager"]?.includes(state) && (
								<Button
									buttonType={"primary"}
									title={"Make MD"}
									width={"w-fit mx-2"}
									type="submit"
									loading={loading === "manager"}
									onClick={handleSubmit("manager")}
								/>
							)}
							{["executive"]?.includes(state) && (
								<Button
									buttonType={"primary"}
									title={"Make Executive"}
									width={"w-fit ms-2"}
									type="submit"
									loading={loading === "executive"}
									onClick={handleSubmit("executive")}
								/>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateAdmin;
