import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import Button from "../../components/button/button";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IconContext } from "react-icons";
import Input from "../../components/input/input";
// import ModalContainer from "../../components/modal-container/modal-container";
import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { manageStaff } from "../../data/Reducers/StaffReducer";
import { GlobalState } from "../../data/Context";
// import Addbutton from "../../components/button/addbutton";
import { toast } from "react-toastify";

const AddStaff = () => {
	const [show, setShow] = useState(false);
	// const close = () => {
	// 	setShow(false);
	// };
	const init = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			employeeId: "",
			level: "",
			department: "",
			position: "",
			grade: "",
		},
		[state, setState] = useState(init),
		textChange = e => {
			let { name, value } = e.target;
			setState({ ...state, [name]: value });
		},
		{ position, department, level, company, staff, grade } = useSelector(
			state => state
		),
		{ countryState } = useContext(GlobalState),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		dispatch = useDispatch();
	const handleSubmit = async e => {
		e?.preventDefault();
		if (!state?.lastName) return;
		let err = "";
		for (var prop in state) {
			if (state?.hasOwnProperty(prop)) {
				if (!state?.[prop]) err = "error";
			} else {
			}
		}
		if (err) return toast.info("Please fill all fields");
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
				weddingAnniversaryDay: moment(state?.weddingAnniversary)?.format("DD"),
			};
		}
		console.log({ newState });
		setLoading(true);
		await dispatch(manageStaff("post", newState, company?.currentSelected));
		setLoading(false);
		setSubmit(true);
	};

	let resetState = () => {
		setState(init);
		setSubmit(false);
	};

	useEffect(() => {
		if (submit && staff?.isAdded) resetState();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, staff?.isAdded]);

	return (
		<div className="max-w-4xl mx-auto">
			<div className="flex items-center justify-between">
				<Breadcrumb />
				{/* <Addbutton
					bulk={true}
					background={"bg-secondary"}
					text={"Bulk Invite"}
					onClick={toggleShow}
				/> */}
				{/* <Button
					buttonType={"secondary"}
					title={"Bulk invite"}
					icon={<AiOutlineUsergroupAdd size={20} />}
					width={"w-fit"}
					onClick={toggleShow}
				/> */}
			</div>

			<div class="block mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow">
				<h5 class="mb-2 text-2xl tracking-tight text-gray-900">
					Add Your Staff
				</h5>
				<p class="font-normal text-gray-700 max-w-2xl text-sm">
					Please kindly fill out all information to add your staff. if some drop
					down filled are empty please go to settings and create the data there.
					E.g if Grade drop down is empty click on setting and select grade,
					then click on add Grade
				</p>
				<form className="mt-4">
					<div className="grid grid-cols-2 gap-8">
						<Input
							label={"First Name"}
							onChange={textChange}
							name="firstName"
							value={state?.firstName}
							placeholder={"First Name"}
						/>
						<Input
							label={"Last Name"}
							onChange={textChange}
							name="lastName"
							value={state?.lastName}
							placeholder={"Last Name"}
						/>
						<Input
							onChange={textChange}
							name="email"
							value={state?.email}
							label={"Work Email Address"}
							placeholder={"abc@hcore.ng"}
							type={"email"}
						/>
						<Input
							onChange={textChange}
							name="personalEmail"
							value={state?.personalEmail}
							label={"Personal Email Address"}
							placeholder={"abc@hcore.ng"}
							type={"email"}
						/>
						<Input
							onChange={textChange}
							name="employeeId"
							value={state?.employeeId}
							label={"Employee ID"}
							placeholder={"abc/000"}
						/>
						<Input
							onChange={textChange}
							name="level"
							value={state?.level}
							label={"Level"}
							type={"select"}
							options={level?.all?.docs?.filter(item => item?.name)}
						/>
						<Input
							onChange={textChange}
							name="grade"
							value={state?.grade}
							label={"Grade"}
							type={"select"}
							options={grade?.all?.docs?.filter(item => item?.name)}
						/>
						<Input
							onChange={textChange}
							name="department"
							value={state?.department}
							label={"Department"}
							type={"select"}
							options={department?.all?.docs?.filter(item => item?.name)}
						/>
						{state?.department && (
							<Input
								onChange={textChange}
								name="position"
								value={state?.position}
								label={"Position"}
								type={"select"}
								options={position?.all?.docs?.filter(
									item =>
										item?.name && item?.department?._id === state?.department
								)}
							/>
						)}
						<Input
							onChange={textChange}
							name="gender"
							value={state?.gender}
							label={"Gender"}
							type={"select"}
							options={[{ value: "male" }, { value: "female" }]}
						/>
						<Input
							onChange={textChange}
							name="maritalStatus"
							value={state?.maritalStatus}
							label={"Marital Status"}
							type={"select"}
							options={[{ value: "married" }, { value: "single" }]}
						/>
						{state?.maritalStatus === "married" && (
							<Input
								onChange={textChange}
								name="weddingAnniversary"
								value={state?.weddingAnniversary}
								label={"Wedding Anniversary"}
								placeholder={"Wedding Anniversary"}
								type="date"
								max={moment().format("YYYY-MM-DD")}
							/>
						)}
						<Input
							onChange={textChange}
							name="dateOfBirth"
							value={state?.dateOfBirth}
							label={"Date of Birth"}
							placeholder={"Date of Birth"}
							type="date"
							max={moment().format("YYYY-MM-DD")}
						/>
						<Input
							onChange={textChange}
							name="lgaOfOrigin"
							value={state?.lgaOfOrigin}
							label={"Local Government"}
							placeholder={"Local Government"}
						/>
						<Input
							onChange={textChange}
							name="stateOfOrigin"
							value={state?.stateOfOrigin}
							label={"State of Origin"}
							type={"select"}
							options={countryState}
						/>
						<Input
							onChange={textChange}
							name="stateOfResidence"
							value={state?.stateOfResidence}
							label={"State of Residence"}
							type={"select"}
							options={countryState}
						/>
						{/* <Input
							onChange={textChange}
							name="password"
							value={state?.password}
							label={"Password"}
							placeholder={"*********"}
							type="password"
						/> */}
						<div>
							<p className="text-sm mb-2">Password</p>
							<div className="lg:w-full w-96 h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5 relative flex justify-between items-center">
								<input
									type={show ? "text" : "password"}
									value={state?.password}
									onChange={textChange}
									name="password"
									placeholder="*********"
									className="h-full lg:w-full w-full noborder focus:border border-[#CBD5E1] bg-transparent"
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
						</div>
						{/* <Input
							onChange={textChange}
							name="probationPeriod"
							value={state?.probationPeriod}
							label={"Probation Period (Optional)"}
							type={"date"}
							min={moment().format("YYYY-MM-DD")}
						/> */}
					</div>
					<div className="flex items-center justify-end gap-12 mt-8">
						<Button
							title="Cancel"
							width={"w-fit"}
							onClick={() => setState(init)}
						/>
						<Button
							buttonType={"primary"}
							title="Submit"
							width={"w-fit"}
							onClick={handleSubmit}
							loading={loading}
							type={"submit"}
						/>
					</div>
				</form>
			</div>
			{/* <ModalContainer close={close} show={show} title={"Upload Bulk List"}>
				<div>
					<div className="space-y-2">
						<p className="text-lg font-semibold">Step 1: Sample Template</p>
						<Button buttonType={"primary"} title={"Download"} width={"w-fit"} />
					</div>

					<div className="space-y-2 mt-12">
						<p className="text-lg font-semibold">Step 2: Upload Document</p>
						<input
							class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
							type="file"
							title={"browse"}
						/>
					</div>
					<div className="flex items-center justify-end gap-12 mt-8">
						<Button title="Cancel" width={"w-fit"} onClick={() => {}} />
						<Button
							buttonType={"primary"}
							title="Submit"
							width={"w-fit"}
							onClick={() => {}}
						/>
					</div>
				</div>
			</ModalContainer> */}
		</div>
	);
};

export default AddStaff;
