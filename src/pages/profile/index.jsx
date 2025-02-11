import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/button";
import { BiDownload } from "react-icons/bi";
import Avatar from "../../components/avatar/avatar";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { RenderStatusCell } from "../../components/settings/setting_table";
import { toast } from "react-toastify";
import axios from "axios";
import { returnErrors } from "../../data/Reducers/ErrorReducer";
import { IconContext } from "react-icons";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { GlobalState } from "../../data/Context";
import { deleteStaff } from "../../data/Reducers/StaffReducer";
import ModalContainer from "../../components/modal-container/modal-container";
import { AvatarImg } from "../../components/form-name/form-name";
import { loadUser, login } from "../../data/Reducers/UserReducer";

const Profile = () => {
	let { auth } = useSelector(state => state);

	return <ProfileBasic state={auth?.user} />;
};

export default Profile;

export const ProfileBasic = ({ state }) => {
	let tabViews = [
		"Basic Information",
		"Organization",
		"Education",
		"Experience",
		// "Leave Details",
	];
	let [active, setActive] = useState("Basic Information");
	const navigate = useNavigate(),
		{ page } = useParams(),
		{ company } = useSelector(state => state),
		[logo, setLogo] = useState(null);

	let handleChangeImage = e => {
			const file = e.target.files[0];
			let err = "";

			if (!file) return (err = `File, ${file?.name} does not exist`);
			if (!file.type.includes("image"))
				return (err = `File, ${file?.name} format not supported`);

			if (err) {
				return toast.error(err);
			} else {
				setLogo(file);
			}
		},
		dispatch = useDispatch(),
		[loading, setLoading] = useState(false),
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading(true);
			try {
				console.log({ state });
				let resImg = await axios.post(
					`/api/v1/file`,
					{ mic: logo },
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				);
				console.log({ img: resImg?.data });
				let res = await axios.put(
					`/api/v1/user/${company?.currentSelected}/${state?._id}`,
					{ avatar: resImg?.data?.data?.files?.files?.[0]?.url }
				);
				console.log({ resp: res?.data });
				toast.success(res?.data?.message);
				// dispatch(setUser(res?.data?.data));
				setLogo(null);
				navigate(page === "profile" ? "/profile" : "/employee/all-employee");
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

	return (
		<div>
			<div className="max-w-4xl mx-auto">
				<div class="block mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow">
					<div className="flex justify-between items-center">
						<p className="font-semibold">Profile</p>
						<div className="flex items-center gap-8">
							<p
								onClick={() => navigate("/resume", { state: state?._id })}
								className="text-sm text-main flex items-center cursor-pointer gap-2">
								<span>
									<BiDownload />
								</span>
								Download
							</p>
							<Button
								buttonType={"primary"}
								title={"Update"}
								width={"w-fit"}
								onClick={() =>
									navigate(
										page !== "profile"
											? "/employee/profile/update-profile"
											: "/profile/update-profile",
										{ state: state?._id }
									)
								}
							/>
							<DeleteUser user={state} />
							<LoginAsUser user={state} />
						</div>
					</div>
					<div className="flex justify-between mt-8">
						<div>
							<p className="text-xl font-semibold">
								{state?.profile?.lastName || state?.lastName}{" "}
								{state?.profile?.firstName || state?.firstName}
							</p>
							<p className="text-sm">
								<span className="font-semibold mb-2">Role:</span>{" "}
								{state?.profile?.role || state?.role}
							</p>
							<p className="text-sm">
								<span className="font-semibold mb-2">Email:</span>{" "}
								{state?.profile?.email || state?.email}
							</p>
							<p className="text-sm">
								<span className="font-semibold mb-2">Employee ID:</span>{" "}
								{state?.profile?.employeeId || state?.employeeId}
							</p>
							<p className="text-sm">
								<span className="font-semibold mb-2">Probation:</span>
								{/* 1 month /
								October 20, 2023 */}
								{state?.profile?.probationPeriod || state?.probationPeriod
									? moment(
											state?.profile?.probationPeriod || state?.probationPeriod
									  ).format("DD/MM/YYYY")
									: null}
							</p>
						</div>
						<div className="w-1/4">
							<div className="w-fit mx-auto">
								<div className="self-">
									<div class="relative w-fit cursor-pointer file_upload">
										{logo || state?.profile?.avatar || state?.avatar ? (
											<Avatar
												lg
												img={
													logo
														? URL.createObjectURL(logo)
														: state?.avatar || state?.profile?.avatar
												}
											/>
										) : (
											<AvatarImg
												user={
													state?.profile?._id ? state?.profile || state : state
												}
											/>
										)}
										<input
											title="Upload file"
											type="file"
											name="file"
											id="file"
											className="myCursor"
											accept="image/*"
											onChange={handleChangeImage}
										/>
									</div>
									{logo && (
										<Button
											buttonType={"primary"}
											title={"Submit"}
											width={
												"w-fit h-10 px-4 bg-main text-white rounded-md text-md capitalize flex items-center gap-2"
											}
											type="button"
											loading={loading}
											onClick={handleSubmit}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="block mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow">
					<nav className="flex items-center gap-10 px-1 overflow-x-auto  scrollbar-hide">
						{tabViews?.map((item, i) => (
							<div
								key={i}
								onClick={() => setActive(item)}
								className={`py-2 font-medium capitalize whitespace-nowrap text-sm w-fit p-2 rounded-md cursor-pointer text-main ${
									active === item ? "s text-white bg-main" : "text-min"
								}`}>
								{item?.replace("-", " ")}
							</div>
						))}
					</nav>
					<div>
						{active === "Basic Information" && (
							<BasicInformation state={state} />
						)}
						{active === "Organization" && <Organization state={state} />}
						{active === "Education" && (
							<Education
								state={state?.education || state?.profile?.education}
							/>
						)}
						{active === "Experience" && (
							<Experience
								state={state?.experience || state?.profile?.experience}
							/>
						)}
						{active === "Leave Details" && <LeaveDetails state={state} />}
					</div>
				</div>
				{page === "profile" && <UpdatePassword />}
			</div>
		</div>
	);
};

const DeleteUser = ({ user }) => {
	let [loading, setLoading] = useState(false),
		{ canApprove } = useContext(GlobalState),
		{ auth, company } = useSelector(s => s),
		[canDelete, setCanDelete] = useState(false),
		dispatch = useDispatch(),
		navigate = useNavigate(),
		[isOpen, setIsOpen] = useState(null),
		handleDeleteMain = async () => {
			setLoading(true);
			try {
				let res = await axios.delete(`/api/v1/user/${user?._id}`);
				dispatch(deleteStaff(res?.data?.data || user));
				toast.success(res?.data?.message);
				setLoading(false);
				setIsOpen(false);
				navigate(-1);
			} catch (err) {
				if (err) console.log({ error: err.response?.data, err });
				if (err?.response?.status === 429) toast.error(err?.response?.data);
				let error = err.response?.data?.error;
				if (error) {
					setLoading(false);
					dispatch(
						returnErrors({
							error,
							status: err?.response?.status,
						})
					);
				} else {
					setLoading(false);
					toast.error(err?.response?.data?.message);
				}
			}
			setLoading(false);
		};

	useEffect(() => {
		let notExective = false,
			notMD = false;

		if (company?.currentSelected) {
			let findCompany = company?.data?.docs?.find(
				it => it?._id === company?.currentSelected
			);
			if (findCompany) {
				let findUser = findCompany?.managers?.find(it => it === user?._id);
				if (!findUser) notMD = true;

				let findUser3 = findCompany?.executive?.find(it => it === user?._id);
				if (!findUser3) notExective = true;
			}
		}
		setCanDelete(notMD || notExective);
	}, [user, company]);

	if (!user) return <></>;

	return (
		<>
			{canApprove || auth?.user?.isAdmin ? (
				<>
					{auth?.user?._id !== user?._id
						? canDelete && (
								<Button
									buttonType={"primary"}
									title={"Delete"}
									width={"w-fit"}
									onClick={async () => setIsOpen(true)}
									loading={loading}
								/>
						  )
						: null}
				</>
			) : null}
			<ModalContainer
				title={"Delete Staff"}
				width={"max-w-sm"}
				show={isOpen}
				close={() => setIsOpen(null)}>
				<div className="mx-20">
					<form className="space-y-4">
						<div className="my-auto w-100">
							<p className="text2 Lexend text-center">
								Do you want to delete this user?
							</p>
							<div className="pt-4 flex">
								<Button
									buttonType={"primary"}
									title={"Yes"}
									type="button"
									width={"w-fit me-2"}
									loading={loading}
									onClick={() => {
										setIsOpen(null);
										handleDeleteMain();
									}}
								/>
								<Button
									buttonType={"secondary"}
									title={"No"}
									type="button"
									width={"w-fit ms-2"}
									onClick={() => setIsOpen(null)}
								/>
							</div>
						</div>
					</form>
				</div>
			</ModalContainer>
		</>
	);
};

const LoginAsUser = ({ user }) => {
	let [loading, setLoading] = useState(false),
		{ canApprove } = useContext(GlobalState),
		{ auth, company } = useSelector(s => s),
		[canDelete, setCanDelete] = useState(false),
		dispatch = useDispatch(),
		navigate = useNavigate(),
		[isOpen, setIsOpen] = useState(null),
		handleDeleteMain = async () => {
			setLoading(true);
			try {
				let res = await axios.post(`/api/v1/auth/login-admin`, {
					email: user?.email,
				});
				dispatch(login(res?.data?.data || user));
				toast.success(res?.data?.message);
				setLoading(false);
				setIsOpen(false);
				navigate("/");
				dispatch(loadUser());
			} catch (err) {
				if (err) console.log({ error: err.response?.data, err });
				if (err?.response?.status === 429) toast.error(err?.response?.data);
				let error = err.response?.data?.error;
				if (error) {
					setLoading(false);
					dispatch(
						returnErrors({
							error,
							status: err?.response?.status,
						})
					);
				} else {
					setLoading(false);
					toast.error(err?.response?.data?.message);
				}
			}
			setLoading(false);
		};

	useEffect(() => {
		let notExective = false,
			notMD = false;

		if (company?.currentSelected) {
			let findCompany = company?.data?.docs?.find(
				it => it?._id === company?.currentSelected
			);
			if (findCompany) {
				let findUser = findCompany?.managers?.find(it => it === user?._id);
				if (!findUser) notMD = true;

				let findUser3 = findCompany?.executive?.find(it => it === user?._id);
				if (!findUser3) notExective = true;
			}
		}
		setCanDelete(notMD || notExective);
	}, [user, company]);

	if (!user) return <></>;

	return (
		<>
			{canApprove || auth?.user?.isAdmin ? (
				<>
					{auth?.user?._id !== user?._id
						? canDelete && (
								<Button
									buttonType={"primary"}
									title={"Login as user"}
									width={"w-fit"}
									onClick={async () => setIsOpen(true)}
									loading={loading}
								/>
						  )
						: null}
				</>
			) : null}
			<ModalContainer
				title={`Login as ${user?.lastName || ""} ${user?.firstName || ""}`}
				width={"max-w-sm"}
				show={isOpen}
				close={() => setIsOpen(null)}>
				<div className="mx-20">
					<form className="space-y-4">
						<div className="my-auto w-100">
							<p className="text2 Lexend text-center">
								Do you want to login as this user?
							</p>
							<div className="pt-4 flex">
								<Button
									buttonType={"primary"}
									title={"Yes"}
									type="button"
									width={"w-fit me-2"}
									loading={loading}
									onClick={() => {
										setIsOpen(null);
										handleDeleteMain();
									}}
								/>
								<Button
									buttonType={"secondary"}
									title={"No"}
									type="button"
									width={"w-fit ms-2"}
									onClick={() => setIsOpen(null)}
								/>
							</div>
						</div>
					</form>
				</div>
			</ModalContainer>
		</>
	);
};

const BasicInformation = ({ state }) => {
	return (
		<div class="block mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow space-y-4">
			<div className="grid md:grid-cols-3">
				<div>
					<p className="flex items-center gap-2 font-medium">
						<span></span> Date Of Birth
					</p>
				</div>
				<div className="col-span-2">
					<p>
						{state?.profile?.dateOfBirth || state?.dateOfBirth
							? moment(
									state?.profile?.dateOfBirth || state?.dateOfBirth
							  ).format("dddd Do, MMMM")
							: null}
					</p>
				</div>
			</div>
			<div className="grid md:grid-cols-3">
				<div>
					<p className="flex items-center gap-2 font-medium">
						<span></span> Gender
					</p>
				</div>
				<div className="col-span-2 capitalize">
					<p>{state?.profile?.gender || state?.gender}</p>
				</div>
			</div>
			<div className="grid md:grid-cols-3">
				<div>
					<p className="flex items-center gap-2 font-medium">
						<span></span> Marital Status
					</p>
				</div>
				<div className="col-span-2 capitalize">
					<p>{state?.profile?.maritalStatus || state?.maritalStatus}</p>
				</div>
			</div>
			<div className="grid md:grid-cols-3">
				<div>
					<p className="flex items-center gap-2 font-medium">
						<span></span> State Of Origin
					</p>
				</div>
				<div className="col-span-2 capitalize">
					<p>{state?.profile?.stateOfOrigin || state?.stateOfOrigin}</p>
				</div>
			</div>
			<div className="grid md:grid-cols-3">
				<div>
					<p className="flex items-center gap-2 font-medium">
						<span></span> LGA of Origin
					</p>
				</div>
				<div className="col-span-2 capitalize">
					<p>{state?.profile?.lgaOfOrigin || state?.lgaOfOrigin}</p>
				</div>
			</div>
			<div className="grid md:grid-cols-3">
				<div>
					<p className="flex items-center gap-2 font-medium">
						<span></span> State of Residence
					</p>
				</div>
				<div className="col-span-2 capitalize">
					<p>{state?.profile?.stateOfResidence || state?.stateOfResidence}</p>
				</div>
			</div>
		</div>
	);
};

const Organization = ({ state }) => {
	return (
		<div class="block mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow space-y-4">
			<div className="grid md:grid-cols-3">
				<div>
					<p className="flex items-center gap-2 font-medium">
						<span></span> Level
					</p>
				</div>
				<div className="col-span-2">
					<p>{state?.profile?.level?.name || state?.level?.name}</p>
				</div>
			</div>
			<div className="grid md:grid-cols-3">
				<div>
					<p className="flex items-center gap-2 font-medium">
						<span></span> Grade
					</p>
				</div>
				<div className="col-span-2">
					<p>{state?.profile?.grade?.name || state?.grade?.name}</p>
				</div>
			</div>
			<div className="grid md:grid-cols-3">
				<div>
					<p className="flex items-center gap-2 font-medium">
						<span></span> Position
					</p>
				</div>
				<div className="col-span-2">
					<p>{state?.profile?.position?.name || state?.position?.name}</p>
				</div>
			</div>
			<div className="grid md:grid-cols-3">
				<div>
					<p className="flex items-center gap-2 font-medium">
						<span></span> Salary Structure
					</p>
				</div>
				<div className="col-span-2">
					<p>{state?.profile?.level?.salary || state?.level?.salary}</p>
				</div>
			</div>
			<div className="grid md:grid-cols-3">
				<div>
					<p className="flex items-center gap-2 font-medium">
						<span></span> Department
					</p>
				</div>
				<div className="col-span-2">
					<p>{state?.profile?.department?.name || state?.department?.name}</p>
				</div>
			</div>
			<div className="grid md:grid-cols-3">
				<div>
					<p className="flex items-center gap-2 font-medium">
						<span></span> Branch
					</p>
				</div>
				<div className="col-span-2">
					<p>{state?.profile?.branch || state?.branch}</p>
				</div>
			</div>
		</div>
	);
};

export const Education = ({ state, setIsEdit, setIsDelete }) => {
	return (
		<div class="block mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow space-y-4">
			<div class="relative overflow-x-auto">
				<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead class="text-xs text-gray-700 border-b border-gray-200">
						<tr>
							<th scope="col" class="px-6 py-3 rounded-l-lg">
								School
							</th>
							<th scope="col" class="px-6 py-3">
								Degree
							</th>
							<th scope="col" class="px-6 py-3 rounded-r-lg">
								Year Completed
							</th>
							{setIsEdit || setIsDelete ? (
								<th scope="col" class="px-6 py-3 rounded-r-lg">
									Action
								</th>
							) : null}
						</tr>
					</thead>
					<tbody>
						{state?.map((it, i) => (
							<tr class="" key={i}>
								<th
									scope="row"
									class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{it?.institution}
								</th>
								<td class="px-6 py-4">{it?.courseOfStudy}</td>
								<td class="px-6 py-4">
									{moment(it?.endDate, "year").format("YYYY")}
								</td>
								{setIsEdit || setIsDelete ? (
									<td key={i} className="px-6 py-4  w-[5%]">
										<div className="px-2 py-1 rounded-lg flex gap-2">
											{setIsEdit ? (
												<RenderStatusCell
													status="Update"
													onClick={() => setIsEdit(it)}
												/>
											) : null}
											{setIsDelete ? (
												<RenderStatusCell
													status="Delete"
													onClick={() => setIsDelete(it)}
												/>
											) : null}
										</div>
									</td>
								) : null}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export const Experience = ({ state, setIsDelete, setIsEdit }) => {
	return (
		<div class="block mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow space-y-4">
			<div class="relative overflow-x-auto">
				<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead class="text-xs text-gray-700 border-b border-gray-200">
						<tr>
							<th scope="col" class="px-6 py-3 rounded-l-lg">
								Organization
							</th>
							<th scope="col" class="px-6 py-3">
								Role
							</th>
							<th scope="col" class="px-6 py-3 rounded-r-lg">
								Start Year
							</th>
							<th scope="col" class="px-6 py-3 rounded-r-lg">
								End Year
							</th>
							<th scope="col" class="px-6 py-3 rounded-r-lg">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{state?.map((it, i) => (
							<tr class="" key={i}>
								<th
									scope="row"
									class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{it?.company}
								</th>
								<td class="px-6 py-4">{it?.position}</td>
								<td class="px-6 py-4">
									{moment(it?.startDate, "year").format("YYYY")}
								</td>
								<td class="px-6 py-4">
									{moment(it?.endDate, "year").format("YYYY")}
								</td>
								{setIsEdit || setIsDelete ? (
									<td key={i} className="px-6 py-4  w-[5%]">
										<div className="px-2 py-1 rounded-lg flex gap-2">
											{setIsEdit ? (
												<RenderStatusCell
													status="Update"
													onClick={() => setIsEdit(it)}
												/>
											) : null}
											{setIsDelete ? (
												<RenderStatusCell
													status="Delete"
													onClick={() => setIsDelete(it)}
												/>
											) : null}
										</div>
									</td>
								) : null}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

const LeaveDetails = ({ state }) => {
	return (
		<div class="block mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow space-y-4">
			<div className="grid md:grid-cols-3">
				<div>
					<p className="flex items-center gap-2 font-medium">
						<span></span> Annual Leave
					</p>
				</div>
				<div className="col-span-2">
					<p>30 days</p>
				</div>
			</div>
			<div className="grid md:grid-cols-3">
				<div>
					<p className="flex items-center gap-2 font-medium">
						<span></span> Sick Leave
					</p>
				</div>
				<div className="col-span-2">
					<p>14 days</p>
				</div>
			</div>
			<div className="grid md:grid-cols-3">
				<div>
					<p className="flex items-center gap-2 font-medium">
						<span></span> Maternity Leave
					</p>
				</div>
				<div className="col-span-2">
					<p>14 days</p>
				</div>
			</div>
		</div>
	);
};

const UpdatePassword = () => {
	let [loading, setLoading] = useState(false),
		init = {
			oldPassword: "",
			newPassword: "",
		},
		[show, setShow] = useState(null),
		[state, setState] = useState(init),
		dispatch = useDispatch(),
		handleSubmit = async e => {
			e?.preventDefault();
			if (!state?.newPassword || !state?.newPassword) return;
			setLoading(true);
			try {
				let res = await axios.post(`/api/v1/auth/change-password`, {
					...state,
				});
				toast.success(res?.data?.message);
				setState(init);
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
	return (
		<div class="block mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow">
			<p className="font-semibold mb-6">Update Password</p>
			<p className="text-base font-normal text-black inter">Old password</p>
			<div className="bg-[#F0F0F0] h-14 mt-4 md:w-[450px] flex items-center w-72 rounded-md border-none text-base font-medium inter text-black relative ">
				<input
					type={show ? "text" : "password"}
					name="password"
					className="h-full w-full"
					value={state?.oldPassword}
					onChange={e => setState({ ...state, oldPassword: e.target.value })}
				/>
				<div
					onClick={() => setShow(!show)}
					className="pr-3 cursor-pointer absolute right-2">
					{show ? (
						<IconContext.Provider value={{ color: "#2A72A8" }}>
							<AiFillEyeInvisible size={20} />
						</IconContext.Provider>
					) : (
						<IconContext.Provider value={{ color: "#2A72A8" }}>
							<AiFillEye size={20} />
						</IconContext.Provider>
					)}
				</div>
			</div>
			<p className="text-base font-normal text-black inter">New password</p>
			<div className="bg-[#F0F0F0] h-14 mt-4 md:w-[450px] flex items-center w-72 rounded-md border-none text-base font-medium inter text-black relative ">
				<input
					type={show ? "text" : "password"}
					name="password"
					className="h-full w-full"
					value={state?.newPassword}
					onChange={e =>
						setState({
							...state,
							newPassword: e.target.value,
						})
					}
				/>
				<div
					onClick={() => setShow(!show)}
					className="pr-3 cursor-pointer absolute right-2">
					{show ? (
						<IconContext.Provider value={{ color: "#2A72A8" }}>
							<AiFillEyeInvisible size={20} />
						</IconContext.Provider>
					) : (
						<IconContext.Provider value={{ color: "#2A72A8" }}>
							<AiFillEye size={20} />
						</IconContext.Provider>
					)}
				</div>
			</div>
			<div className="">
				<Button
					title={"change password"}
					// buttonType={"primary"}
					width={"md:w-[450px] w-72"}
					// eslint-disable-next-line react/style-prop-object
					style={
						"md:w-[450px] w-72 h-12 bg-main rounded inter text-white text-base font-semibold mt-6 capitalize text-center justify-center"
					}
					loading={loading}
					onClick={handleSubmit}
					type="submit"
				/>
			</div>
		</div>
	);
};
