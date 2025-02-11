import React from "react";
// import { useRef } from "react";
import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useSelector } from "react-redux";
// import { permissionsTab } from "../../../data/permissionData";
import Input from "../../input/input";
import { useEffect } from "react";
import { EditData } from "../../../data/Reducers/UserReducer";
import Button from "../../button/button";

export default function BasicInfo({
	nextStep,
	basicInfoData,
	handleInputChangebasicInfoData,
}) {
	// const [showData, setShowData] = useState(1);

	let { department } = useSelector(state => state);

	return (
		<div>
			<div className="bg-white ">
				<div className="flex justify-center pb-4 ">
					<div className=" w-[90%]">
						<p className="text-[13px] font-normal font-inter mb-6">
							Provide basic informations for the role
						</p>

						<div className="mb-3">
							<Input
								className="w-full rounded-lg border border-solid border-[#D0D5DD] px-2 py-2 shadow bg-white outline-none mt-2 mb-2 text-base text-[#667085]  font-['Manrope']"
								// onChange={textChange}
								name="department"
								label={"Role Name"}
								type={"select"}
								options={department?.all?.docs?.filter(item => item?.name)}
								value={
									basicInfoData?.department?._id ||
									basicInfoData?.department ||
									basicInfoData?.profile?.department?._id ||
									basicInfoData?.profile?.department
								}
								onChange={handleInputChangebasicInfoData}
							/>
						</div>

						{/* <RoleandPermissionForm /> */}

						{/* <div>
							<label htmlFor="" className=" font-medium text-sm">
								Role Description
							</label>
							<textarea
								onChange={handleInputChangebasicInfoData}
								value={basicInfoData.description}
								name="description"
								id=""
								cols="20"
								rows="10"
								className="w-full rounded-lg border border-solid border-[#D0D5DD]
                px-2 py-2 shadow bg-white outline-none mt-2 mb-2 text-base text-[#667085] 
                font-['Manrope']"></textarea>
						</div> */}

						<div className="flex justify-end">
							<button
								className=" px-3 rounded py-2 flex border items-center] "
								onClick={nextStep}>
								<span> Save & Continue</span>
								<AiOutlineArrowRight style={{ marginLeft: "10px" }} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// export function PermissionInfo({ nextStep, basicInfoData, prevStep }) {
//   const dispatch = useDispatch();

//   const [showData, setShowData] = useState(1);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [selectedStyle, setSelectedStyle] = useState("");

//   const scrollRef = useRef(null);

//   console.log(basicInfoData);
//   console.log(basicInfoData);

//   function handleButtonClick() {
//     console.log("this is workijng ");
//     // console.log("Dfdf");
//     // scrollRef.current.scrollTo({
//     //   top: 0,
//     //   behavior: "smooth",
//     // });
//   }

//   const [checkboxes, setCheckboxes] = useState([
//     {
//       id: "1",
//       name: "Employee Numbers, Engagement, Attrition",

//       permission: "edit",
//       checked: false,
//     },
//     {
//       id: "2",
//       name: "Employee Performance",
//       permission: "edit",
//       checked: false,
//     },
//     {
//       id: "3",
//       name: "Birthday Celebrants",
//       permission: "edit",
//       checked: false,
//     },

//     {
//       id: "4",
//       name: "Holiday",
//       permission: "edit",
//       checked: false,
//     },

//     {
//       id: "5",
//       name: "Stats: Employee/ Engagement/ Attrition ",
//       permission: "edit",
//       checked: false,
//     },
//   ]);

//   const handlePermissionChange = (id, permission) => {
//     const updatedCheckboxes = checkboxes.map((checkbox) =>
//       checkbox.id === id ? { ...checkbox, permission: permission } : checkbox
//     );
//     setCheckboxes(updatedCheckboxes);
//   };

//   const handleCheckboxChange = (e) => {
//     const id = e.target.id;
//     const checked = e.target.checked;
//     const updatedCheckboxes = checkboxes.map((checkbox) =>
//       checkbox.id === id ? { ...checkbox, checked: checked } : checkbox
//     );
//     setCheckboxes(updatedCheckboxes);
//   };

//   // this is where Admin Dashboard end

//   // Employee  start here

//   const [employeeDatas, setEmployeeDatas] = useState([
//     {
//       id: "1",
//       name: "Directory",
//       permission: "edit",
//       checked: false,
//     },
//     {
//       id: "2",
//       name: "Onboarding",
//       permission: "edit",
//       checked: false,
//     },
//   ]);

//   const handlePermissionChange_employeeData = (id, permission) => {
//     const updatedCheckboxes = employeeDatas.map((checkbox) =>
//       checkbox.id === id ? { ...checkbox, permission: permission } : checkbox
//     );
//     setEmployeeDatas(updatedCheckboxes);
//   };

//   const handleCheckboxChange_employeeDatas = (e) => {
//     const id = e.target.id;
//     const checked = e.target.checked;
//     const updatedCheckboxes = employeeDatas.map((checkbox) =>
//       checkbox.id === id ? { ...checkbox, checked: checked } : checkbox
//     );
//     setEmployeeDatas(updatedCheckboxes);
//   };

//   // console.log(employeeDatas);

//   // Engagement  start here

//   const [engagementDatas, setEngagementDatas] = useState([
//     {
//       id: "1",
//       name: "Post",
//       permission: "edit",
//       checked: false,
//     },
//     {
//       id: "2",
//       name: "Survey",
//       permission: "edit",
//       checked: false,
//     },

//     {
//       id: "3",
//       name: "Feedback",
//       permission: "edit",
//       checked: false,
//     },
//   ]);

//   const handlePermissionChange_engagementDatas = (id, permission) => {
//     const updatedCheckboxes = engagementDatas.map((checkbox) =>
//       checkbox.id === id ? { ...checkbox, permission: permission } : checkbox
//     );
//     setEngagementDatas(updatedCheckboxes);
//   };

//   const handleCheckboxChange_engagementDatas = (e) => {
//     const id = e.target.id;
//     const checked = e.target.checked;
//     const updatedCheckboxes = engagementDatas.map((checkbox) =>
//       checkbox.id === id ? { ...checkbox, checked: checked } : checkbox
//     );
//     setEngagementDatas(updatedCheckboxes);
//   };

//   // console.log(engagementDatas);

//   // Leave  start here

//   const [LeaveData, setleaveData] = useState([
//     {
//       id: "1",
//       name: "Approve Leaves",
//       permission: "No",
//       checked: false,
//     },
//   ]);

//   const handlePermissionChange_LeaveData = (id, permission) => {
//     const updatedCheckboxes = LeaveData.map((checkbox) =>
//       checkbox.id === id ? { ...checkbox, permission: permission } : checkbox
//     );
//     setleaveData(updatedCheckboxes);
//   };

//   const handleCheckboxChange_LeaveData = (e) => {
//     const id = e.target.id;
//     const checked = e.target.checked;
//     const updatedCheckboxes = LeaveData.map((checkbox) =>
//       checkbox.id === id ? { ...checkbox, checked: checked } : checkbox
//     );
//     setleaveData(updatedCheckboxes);
//   };

//   console.log(LeaveData);

//   // Recruitment start here

//   const [RecruitmentData, setRecruitmentData] = useState([
//     {
//       id: "1",
//       name: "-----------------",
//       permission: "No",
//       checked: false,
//     },
//   ]);

//   const handlePermissionChange_RecruitmentData = (id, permission) => {
//     const updatedCheckboxes = RecruitmentData.map((checkbox) =>
//       checkbox.id === id ? { ...checkbox, permission: permission } : checkbox
//     );
//     setRecruitmentData(updatedCheckboxes);
//   };

//   const handleCheckboxChange_RecruitmentData = (e) => {
//     const id = e.target.id;
//     const checked = e.target.checked;
//     const updatedCheckboxes = RecruitmentData.map((checkbox) =>
//       checkbox.id === id ? { ...checkbox, checked: checked } : checkbox
//     );
//     setRecruitmentData(updatedCheckboxes);
//   };

//   console.log(RecruitmentData);

//   // RequestData start here

//   const [RequestData, setRequestData] = useState([
//     {
//       id: "1",
//       name: "Approve Cash Request",
//       permission: "No",
//       checked: false,
//     },
//   ]);

//   const handlePermissionChange_RequestData = (id, permission) => {
//     const updatedCheckboxes = RequestData.map((checkbox) =>
//       checkbox.id === id ? { ...checkbox, permission: permission } : checkbox
//     );
//     setRequestData(updatedCheckboxes);
//   };

//   const handleCheckboxChange_RequestData = (e) => {
//     const id = e.target.id;
//     const checked = e.target.checked;
//     const updatedCheckboxes = RequestData.map((checkbox) =>
//       checkbox.id === id ? { ...checkbox, checked: checked } : checkbox
//     );
//     setRequestData(updatedCheckboxes);
//   };

//   console.log(RequestData);

//   // Performance start here

//   const [PerformanceData, setPerformanceData] = useState([
//     {
//       id: "1",

//       name: "-----------------",

//       permission: "No",
//       checked: false,
//     },
//   ]);

//   const handlePermissionChange_PerformanceData = (id, permission) => {
//     const updatedCheckboxes = PerformanceData.map((checkbox) =>
//       checkbox.id === id ? { ...checkbox, permission: permission } : checkbox
//     );
//     setPerformanceData(updatedCheckboxes);
//   };

//   const handleCheckboxChange_PerformanceData = (e) => {
//     const id = e.target.id;
//     const checked = e.target.checked;
//     const updatedCheckboxes = PerformanceData.map((checkbox) =>
//       checkbox.id === id ? { ...checkbox, checked: checked } : checkbox
//     );
//     setPerformanceData(updatedCheckboxes);
//   };

//   console.log(RequestData);

//   const Handle_Done = () => {
//     // dispatch(Create_Role_Permissions_Fun(basicInfoData));
//     // Create_Role_Permissions_Fun
//   };

//   return (
//     <div className="flex h-screen overflow-hidden ">
//       {/* Sidebar */}
//       <div className=" ">
//         {/* Sidebar content */}
//         <div className="flex flex-col items-center ">
//           {permissionsTab.map((item) => (
//             <button
//               onClick={handleButtonClick}
//               className=" block mb-2 font-medium text-[12px] lg:text-base font-inter bg-[#EAECF0] rounded  w-[120px]  lg:w-[162.84px] py-2"
//             >
//               {item.name}
//             </button>
//           ))}
//         </div>

//         <div className=" flex justify-between  w-full gap-2 items-center">
//           <div className="w-1/2">
//             <button
//               onClick={prevStep}
//               class="border-[#D0D5DD] border-2   px-4 py-2 flex justify-center items-center rounded "
//             >
//               {/* <ArrowBackIosIcon style={{ fontSize: "15px" }} /> */}
//               Back
//             </button>
//           </div>

//           <div className="w-1/2">
//             <button
//               onClick={Handle_Done}
//               className="bg-[#2A72A8]  border border-gray-300 px-4 py-2 flex justify-center items-center rounded  text-white"
//             >
//               Done
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* Main content */}

//       {/* <div className="flex-grow  lg:px-4 overflow-y-auto  "> */}

//       {/* <div
//         className="flex-grow lg:px-4 overflow-y-auto "
//         style={{
//           overflowY: 'scroll',
//           msOverflowStyle: 'none',
//           scrollbarWidth: '1px',
//         }}
//       > */}

//       <div className={` flex-grow lg:px-4 overflow-y-auto`}>
//         {/* Admin dashBoard start here */}
//         <div className="border  xl:w-[80%]  mb-3 ">
//           <div className="bg-[#EAECF0] font-medium font-inter text-base py-2 pl-6">
//             Admin Dashboard
//           </div>
//           {/* <div className="flex justify-between gap-2 "> */}
//           <div className=" lg:px-4 lg:py-4">
//             {checkboxes.map((checkbox, index) => (
//               <div
//                 key={index}
//                 className="flex items-center  md:justify-between my-2 "
//               >
//                 <div className=" w-[70%]">
//                   <input
//                     type="checkbox"
//                     id={checkbox.id}
//                     name={checkbox.name}
//                     checked={checkbox.checked}
//                     onChange={handleCheckboxChange}
//                   />
//                   <label htmlFor={checkbox.id} className="ml-2">
//                     {checkbox.name}
//                   </label>
//                 </div>

//                 <div className="30%">
//                   {checkbox.checked && (
//                     <div className="ml-4">
//                       <select
//                         value={checkbox.permission}
//                         onChange={(e) =>
//                           handlePermissionChange(checkbox.id, e.target.value)
//                         }
//                       >
//                         <option value="view">View Only</option>
//                         <option value="edit">View and Edit</option>
//                       </select>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* </div> */}
//         </div>

//         {/* Admin dashBoard End here */}

//         {/* Employee Start here */}

//         <div className="border a xl:w-[80%]  mb-3 ">
//           <div className="bg-[#EAECF0] font-medium font-inter text-base py-2 pl-6">
//             Employee
//           </div>
//           {/* <div className="flex justify-between gap-2 "> */}
//           <div className=" lg:px-4 lg:py-4">
//             {employeeDatas.map((checkbox, index) => (
//               <div
//                 key={index}
//                 className="flex items-center  md:justify-between my-2 "
//               >
//                 <div className=" w-[70%]">
//                   <input
//                     type="checkbox"
//                     id={checkbox.id}
//                     name={checkbox.name}
//                     checked={checkbox.checked}
//                     onChange={handleCheckboxChange_employeeDatas}
//                   />
//                   <label htmlFor={checkbox.id} className="ml-2">
//                     {checkbox.name}
//                   </label>
//                 </div>

//                 <div className="30%">
//                   {checkbox.checked && (
//                     <div className="ml-4">
//                       <select
//                         value={checkbox.permission}
//                         onChange={(e) =>
//                           handlePermissionChange_employeeData(
//                             checkbox.id,
//                             e.target.value
//                           )
//                         }
//                       >
//                         <option value="view">View Only</option>
//                         <option value="edit">View and Edit</option>
//                       </select>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* </div> */}
//         </div>

//         {/* Employee End here */}

//         {/* Engagement Start here */}

//         <div className="border a xl:w-[80%]  mb-3 ">
//           <div className="bg-[#EAECF0] font-medium font-inter text-base py-2 pl-6">
//             Engagement
//           </div>
//           {/* <div className="flex justify-between gap-2 "> */}
//           <div className=" lg:px-4 lg:py-4">
//             {engagementDatas.map((checkbox, index) => (
//               <div
//                 key={index}
//                 className="flex items-center  md:justify-between my-2 "
//               >
//                 <div className=" w-[70%]">
//                   <input
//                     type="checkbox"
//                     id={checkbox.id}
//                     name={checkbox.name}
//                     checked={checkbox.checked}
//                     onChange={handleCheckboxChange_engagementDatas}
//                   />
//                   <label htmlFor={checkbox.id} className="ml-2">
//                     {checkbox.name}
//                   </label>
//                 </div>

//                 <div className="30%">
//                   {checkbox.checked && (
//                     <div className="ml-4">
//                       <select
//                         value={checkbox.permission}
//                         onChange={(e) =>
//                           handlePermissionChange_engagementDatas(
//                             checkbox.id,
//                             e.target.value
//                           )
//                         }
//                       >
//                         <option value="view">View Only</option>
//                         <option value="edit">View and Edit</option>
//                       </select>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* </div> */}
//         </div>

//         {/* Engagement End here */}

//         {/* Leave Start here */}

//         <div className="border a xl:w-[80%]  mb-3 ">
//           <div className="bg-[#EAECF0] font-medium font-inter text-base py-2 pl-6">
//             Leave
//           </div>
//           {/* <div className="flex justify-between gap-2 "> */}
//           <div className=" lg:px-4 lg:py-4">
//             {LeaveData.map((checkbox, index) => (
//               <div
//                 key={index}
//                 className="flex items-center  md:justify-between my-2 "
//               >
//                 <div className=" w-[70%]">
//                   <input
//                     type="checkbox"
//                     id={checkbox.id}
//                     name={checkbox.name}
//                     checked={checkbox.checked}
//                     onChange={handleCheckboxChange_LeaveData}
//                   />
//                   <label htmlFor={checkbox.id} className="ml-2">
//                     {checkbox.name}
//                   </label>
//                 </div>

//                 <div className="30%">
//                   {checkbox.checked && (
//                     <div className="ml-4">
//                       <select
//                         value={checkbox.permission}
//                         onChange={(e) =>
//                           handlePermissionChange_LeaveData(
//                             checkbox.id,
//                             e.target.value
//                           )
//                         }
//                       >
//                         <option value="Yes">Yes</option>
//                         <option value="No">NO</option>
//                       </select>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* </div> */}
//         </div>

//         {/* Leave Start here */}

//         {/*  Recruitment here */}

//         <div className="border a xl:w-[80%]  mb-3 ">
//           <div className="bg-[#EAECF0] font-medium font-inter text-base py-2 pl-6">
//             Recruitment
//           </div>
//           {/* <div className="flex justify-between gap-2 "> */}
//           <div className=" lg:px-4 lg:py-4">
//             {RecruitmentData.map((checkbox, index) => (
//               <div
//                 key={index}
//                 className="flex items-center  md:justify-between my-2 "
//               >
//                 <div className=" w-[70%]">
//                   <input
//                     type="checkbox"
//                     id={checkbox.id}
//                     name={checkbox.name}
//                     checked={checkbox.checked}
//                     onChange={handleCheckboxChange_RecruitmentData}
//                   />
//                   <label htmlFor={checkbox.id} className="ml-2">
//                     {checkbox.name}
//                   </label>
//                 </div>

//                 <div className="30%">
//                   {checkbox.checked && (
//                     <div className="ml-4">
//                       <select
//                         value={checkbox.permission}
//                         onChange={(e) =>
//                           handlePermissionChange_RecruitmentData(
//                             checkbox.id,
//                             e.target.value
//                           )
//                         }
//                       >
//                         <option value="Yes">Yes</option>
//                         <option value="No">NO</option>
//                       </select>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* </div> */}
//         </div>

//         {/*  Recruitment  End here */}

//         {/*  Request start  here */}

//         <div className="border a xl:w-[80%]  mb-3 ">
//           <div className="bg-[#EAECF0] font-medium font-inter text-base py-2 pl-6">
//             Request
//           </div>
//           {/* <div className="flex justify-between gap-2 "> */}
//           <div className=" lg:px-4 lg:py-4">
//             {RequestData.map((checkbox, index) => (
//               <div
//                 key={index}
//                 className="flex items-center  md:justify-between my-2 "
//               >
//                 <div className=" w-[70%]">
//                   <input
//                     type="checkbox"
//                     id={checkbox.id}
//                     name={checkbox.name}
//                     checked={checkbox.checked}
//                     onChange={handleCheckboxChange_RequestData}
//                   />
//                   <label htmlFor={checkbox.id} className="ml-2">
//                     {checkbox.name}
//                   </label>
//                 </div>

//                 <div className="30%">
//                   {checkbox.checked && (
//                     <div className="ml-4">
//                       <select
//                         value={checkbox.permission}
//                         onChange={(e) =>
//                           handlePermissionChange_RequestData(
//                             checkbox.id,
//                             e.target.value
//                           )
//                         }
//                       >
//                         <option value="Yes">Yes</option>
//                         <option value="No">NO</option>
//                       </select>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* </div> */}
//         </div>

//         {/*  Request  End here */}

//         {/*  Performance start  here */}

//         <div className="border a xl:w-[80%]  mb-3 ">
//           <div className="bg-[#EAECF0] font-medium font-inter text-base py-2 pl-6">
//             Performance
//           </div>
//           {/* <div className="flex justify-between gap-2 "> */}
//           <div className=" lg:px-4 lg:py-4">
//             {PerformanceData.map((checkbox, index) => (
//               <div
//                 key={index}
//                 className="flex items-center  md:justify-between my-2 "
//               >
//                 <div className=" w-[70%]">
//                   <input
//                     type="checkbox"
//                     id={checkbox.id}
//                     name={checkbox.name}
//                     checked={checkbox.checked}
//                     onChange={handleCheckboxChange_PerformanceData}
//                   />
//                   <label htmlFor={checkbox.id} className="ml-2">
//                     {checkbox.name}
//                   </label>
//                 </div>

//                 <div className="30%">
//                   {checkbox.checked && (
//                     <div className="ml-4">
//                       <select
//                         value={checkbox.permission}
//                         onChange={(e) =>
//                           handlePermissionChange_PerformanceData(
//                             checkbox.id,
//                             e.target.value
//                           )
//                         }
//                       >
//                         <option value="Yes">Yes</option>
//                         <option value="No">NO</option>
//                       </select>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* </div> */}
//         </div>

//         {/*  Performance  End here */}

//         {/* Add more paragraphs as needed */}
//       </div>
//     </div>
//   );
// }

export const DepartmentCheck = ({ item, permit, setPermit, i, modules }) => {
	let [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		let findUser = permit?.find(it => it?.isChecked && it?._id === item?._id);
		if (findUser) setIsChecked(true);
		else if (modules?.includes(item?._id)) {
			setIsChecked(true);
			setPermit(EditData(permit, { ...item, isChecked: true }));
		} else setIsChecked(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item, permit, modules]);

	return (
		<span className="me-3">
			<input
				type="checkbox"
				name={`level${i}`}
				id={`level${i}`}
				className="form-check-input form-check form-check-inline"
				checked={isChecked}
				onChange={e => {
					let newItem = item;
					if (e.target.checked) newItem = { ...newItem, isChecked: true };
					else
						newItem = {
							...newItem,
							isChecked: false,
						};
					setPermit(EditData(permit, newItem));
				}}
			/>
		</span>
	);
};


export const PermissionInfo = ({basicInfoData, permit, setPermit, modules, prevStep, Handle_Done, loading})=> {
return (
	<>
		{permit?.map((item, i) => (
			<div className="p-2 flex items-center" key={i}>
				<DepartmentCheck
					item={item}
					setPermit={setPermit}
					permit={permit}
					i={i}
					modules={modules}
				/>
				<label htmlFor={`level${i}`} className="text-capitalize my-0">
					{item?.name}
				</label>
			</div>
		))}
		<div className=" flex justify-between  w-full gap-2 items-center">
			<div className="w-1/2">
				<button
					onClick={prevStep}
					class="border-[#D0D5DD] border-2   px-4 py-2 flex justify-center items-center rounded ">
					{/* <ArrowBackIosIcon style={{ fontSize: "15px" }} /> */}
					Back
				</button>
			</div>

			<div className="w-1/2">
				{/* <button
					onClick={Handle_Done}
					className="bg-[#2A72A8]  border border-gray-300 px-4 py-2 flex justify-center items-center rounded  text-white">
					Done
				</button> */}
				<Button
					// buttonType={"primary"}
					title={"Done"}
					type="button"
					width={
						"w-fit me-2 bg-[#2A72A8]  border border-gray-300 px-4 py-2 flex justify-center items-center rounded  text-white"
					}
					loading={loading}
					onClick={Handle_Done}
				/>
			</div>
		</div>
	</>
);
}