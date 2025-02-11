import { useState } from "react";

import { useNavigate } from "react-router-dom";

// import { SlOptionsVertical } from "react-icons/sl";
// import { BiFilterAlt } from "react-icons/bi";
import { BsArrowDown, BsFillPlusSquareFill } from "react-icons/bs";

// import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import ManageSettingsTab from "../../../components/settings/manage_settings/manage_settings_tab";
// import Search from "../../../components/search/search";
// import Option from "../../../components/oprion/option";
import Pagination from "../../../components/pagination/pagination";
import ModalContainer from "../../../components/modal-container/modal-container";
import Input from "../../../components/input/input";
import Button from "../../../components/button/button";
// import DropDown from "../../../components/dropdown/dropdown";
import { IconContext } from "react-icons";
// import ApprovalFlowTab from "../../../components/settings/approval_flow_component/approval-flow-tab";
import SettingTable from "../../../components/settings/setting_table";
import Addbutton from "../../../components/button/addbutton";
import { useSelector } from "react-redux";

const ManageAdmins = () => {
	const navigate = useNavigate();

	const header = [
		{
			id: 1,
			name: "S/N",
			case: "number_count",
		},
		{
			id: 2,
			name: "Role Name",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: "name",
		},
		{
			id: 3,
			name: "Permission Description",
			case: "CashApprovalFlows_CASH_CATEGORY",
		},

		{
			id: 3,
			name: "Assigned",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: "modules",
		},

		// {
		// 	id: 5,
		// 	name: "ACTION",
		// 	case: "ACTION",

		// 	// name: "EditResetPasswordEnableDisable",
		// },
	];

	// const dataTable = [
	//   { id: 1, name: "Alice", age: 30, city: "New York" },
	//   { id: 2, name: "Bob", age: 25, city: "Los Angeles" },
	//   { id: 3, name: "Charlie", age: 28, city: "Chicago" },
	//   { id: 4, name: "David", age: 35, city: "Houston" },
	//   { id: 5, name: "Eve", age: 22, city: "Miami" },
	// ];
	const [createLeave, setCreateLeave] = useState(false);
	const toggleCreateLeave = () => {
		setCreateLeave(!createLeave);
	};

	let { department } = useSelector(state => state);
	return (
		<div>
			<div className="flex justify-between items-center">
				<ManageSettingsTab name="Manage Permissions" />
				<Addbutton
					background={"bg-main"}
					text={"Add Permissions"}
					add={true}
					onClick={() => navigate("/settings/permissions/add-permission")}
				/>
			</div>

			<div className=" shadow-md sm:rounded-lg mt-10">
				<div className="p-4"></div>

				<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
					<SettingTable
						data={department?.all?.docs?.filter(it => it?.modules?.length > 0)}
						header={header}
					/>
				</div>
			</div>
			<div className="mt-4 flex justify-center">
				<Pagination />
			</div>

			<ModalContainer
				title={"Approval Flows"}
				show={createLeave}
				close={toggleCreateLeave}>
				<div className="mx-20">
					<form className="space-y-4">
						<Input label={"Department"} />
						<Input label={"Select Approver (1st Approver)"} type={"select"} />
						<Input label={"Select Approver (2st Approver)"} type={"select"} />

						<div className="flex justify-center items-center">
							<div className=" ">
								<p>Adeoye Adeoti</p>

								<div className="m-auto flex justify-center ">
									<IconContext.Provider
										value={{ className: "global-class-name text-[#2A72A8CC]" }}>
										<div>
											<BsArrowDown />
										</div>
									</IconContext.Provider>
								</div>
								<p>Adeoye Adeoti</p>
							</div>
						</div>

						<Input label={"Select Approver (3st Approver)"} type={"select"} />

						<div className="flex justify-center items-center">
							<div className=" ">
								<p>Adeoye Adeoti</p>

								<div className="m-auto flex justify-center ">
									<IconContext.Provider
										value={{ className: "global-class-name text-[#2A72A8CC]" }}>
										<div>
											<BsArrowDown />
										</div>
									</IconContext.Provider>
								</div>
								<p>Adeoye Adeoti</p>

								<div className="m-auto flex justify-center ">
									<IconContext.Provider
										value={{ className: "global-class-name text-[#2A72A8CC]" }}>
										<div>
											<BsArrowDown />
										</div>
									</IconContext.Provider>
								</div>

								<p>Adeoye Adeoti</p>
							</div>
						</div>
						<div className="flex justify-end">
							<IconContext.Provider
								value={{ className: "global-class-name text-[#F97AB4]" }}>
								<div>
									<BsFillPlusSquareFill />
								</div>
							</IconContext.Provider>
						</div>
						<div className="mt-8 flex  justify-center">
							<Button buttonType={"primary"} title={"Create"} width={"w-fit"} />
						</div>
					</form>
				</div>
			</ModalContainer>
		</div>
	);
};

export default ManageAdmins;
