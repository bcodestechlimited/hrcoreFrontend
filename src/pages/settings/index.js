import ManageSettingsCard from "../../components/settings/manage_settings/manage_settings_card";
import calender from "../../assets/calender.png";
import icon2 from "../../assets/icon2.png";
// import icon3 from "../../assets/icon3.png";
// import icon4 from "../../assets/icon4.png";

// import { HiChevronRight } from "react-icons/hi";
import ManageSettingsTab from "../../components/settings/manage_settings/manage_settings_tab";

const Settings = () => {
	return (
		<div className="xl:mx-10  ">
			<ManageSettingsTab name="Manage Settings" />

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
				<ManageSettingsCard
					icon={calender}
					title="Leave Types"
					link="leave-types"
				/>
				<ManageSettingsCard
					icon={calender}
					title="Approval Flow"
					link="approval-flow"
				/>
				<ManageSettingsCard
					icon={calender}
					title="Admins"
					link="manage-admins"
				/>
				<ManageSettingsCard
					icon={icon2}
					title="Permissions"
					link="permissions"
				/>
				<ManageSettingsCard
					icon={calender}
					title="Departments"
					link="departments"
				/>
				<ManageSettingsCard icon={calender} title="Levels" link="levels" />
				<ManageSettingsCard
					icon={calender}
					title="Positions"
					link="positions"
				/>
				<ManageSettingsCard icon={calender} title="Grades" link="grades" />
				<ManageSettingsCard icon={calender} title="Medias" link={"medias"} />
				<ManageSettingsCard icon={calender} title="Company" link="company" />
			</div>
		</div>
	);
};

export default Settings;
