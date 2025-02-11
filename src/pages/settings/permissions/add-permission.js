import React, { useState, useEffect, useContext } from "react";
import BasicInfo, {
	PermissionInfo,
} from "../../../components/settings/permission/permission";
import ManageSettingsTab from "../../../components/settings/manage_settings/manage_settings_tab";
import { useSelector, useDispatch } from "react-redux";
import { GlobalState } from "../../../data/Context";
import { manageDepartment } from "../../../data/Reducers/DepartmentReducer";
import { useNavigate } from "react-router-dom";

function AddPermission() {
	const [shown, setShown] = useState("basic");

	const [basicInfoData, setBasicInfoData] = useState({
		department: "",
		description: "",
	});

	const handleInputChangebasicInfoData = e => {
		const { name, value } = e.target;
		setBasicInfoData(prevState => ({ ...prevState, [name]: value }));
	};

	const nextStep = () => {
		if (!basicInfoData?.department) return;
		setShown("permissions");

		console.log(basicInfoData);
	};

	const prevStep = () => {
		setShown("basic");
	};

	let { sidebarList } = useContext(GlobalState),
		per = sidebarList?.map(it => {
			return { ...it, _id: it?.name?.toLowerCase() };
		}),
		dispatch = useDispatch(),
		{ department, company } = useSelector(state => state),
		[modules, setModules] = useState([]),
		[permit, setPermit] = useState(per),
		[loading, setLoading] = useState(null),
		[submit, setSubmit] = useState(null),
		navigate = useNavigate();

	const Handle_Done = async () => {
		// setShown("basic");
		console.log({ permit });
		setLoading(true);
		await dispatch(
			manageDepartment(
				"put",
				{
					_id: basicInfoData?.department,
					modules: permit?.filter(it => it?.isChecked)?.map(it => it?.name),
				},
				company?.currentSelected
			)
		);
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (basicInfoData?.department) {
			let findIt = department?.all?.docs?.find(
				it => it?._id === basicInfoData?.department
			);
			setModules(findIt?.modules);
			setPermit(
				permit?.map(it => {
					let findOne = findIt?.modules?.find(li => it?.name === li);
					return {
						...it,
						isChecked: findOne ? true : false,
					};
				})
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [basicInfoData?.department, department?.all]);

	let reset = () => {
		setSubmit(false);
		navigate("/settings/permissions");
	};

	useEffect(() => {
		if (department?.isUpdated && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, department?.isUpdated]);

	return (
		<div>
			<div className="lg:flex lg:justify-center">
				<div className="lg:w-[90%]  ">
					<div className=" ">
						{/* <SettingsNav /> */}
						<ManageSettingsTab name=" Permissions" />
					</div>

					<div className="  md:flex md:justify-center   h-full shadow-gray-400  rounded-xl shadow-lg">
						<div className="bg-white md:w-[90%] ">
							<div className="title flex justify-center gap-3">
								<div class="flex justify-evenly mt-5 w-full mb-7 ">
									<div
										className="firststep  flex  cursor-pointer   font-normal items-center  text-[15px] gap-4"
										onClick={() => setShown("basic")}>
										<span
											className={` "border cursor-pointer inline-flex items-center justify-center h-8 w-8 text-white rounded-full font-semibold bg-gradient-to-b from-f72585 to-97dbef transition-all duration-250 "   ${
												shown === "basic" ? "   bg-secondary" : " bg-[#E4E4E4] "
											}  `}>
											1
										</span>
										<p
											className={` ${
												shown === "basic" ? "font-normal text-sm" : ""
											}
          `}>
											Basic Information
										</p>
									</div>
									<div
										className="  flex  cursor-pointer   font-normal items-center  text-[15px] gap-4"
										onClick={() => {
											if (!basicInfoData?.department) return;
											setShown("permissions");
										}}>
										<span
											className={` "border inline-flex items-center justify-center h-8 w-8 text-white rounded-full font-semibold bg-gradient-to-b from-f72585 to-97dbef transition-all duration-250 "   ${
												shown === "permissions"
													? "   bg-secondary"
													: " bg-[#E4E4E4] "
											}  `}>
											2
										</span>
										<p
											className={` ${
												shown === "permissions" ? "font-normal text-sm" : ""
											} 
        `}>
											Permissions
										</p>
									</div>
								</div>
							</div>

							<div>
								{shown === "basic" && (
									<div className="flex justify-center pb-4 ">
										<div className=" w-[90%]">
											<BasicInfo
												nextStep={nextStep}
												basicInfoData={basicInfoData}
												handleInputChangebasicInfoData={
													handleInputChangebasicInfoData
												}
											/>
										</div>
									</div>
								)}
								{shown === "permissions" && (
									<div className="pl-3">
										<PermissionInfo
											basicInfoData={basicInfoData}
											prevStep={prevStep}
											permit={permit}
											setPermit={setPermit}
											modules={modules}
											Handle_Done={Handle_Done}
											loading={loading}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddPermission;
