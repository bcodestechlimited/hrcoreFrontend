import { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
// import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import { IoMdSettings, IoMdNotificationsOutline } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
// import { MdNotificationsActive } from "react-icons/md";
// import NotificationIcon from "../../assets/notifications.svg";
import { GlobalState } from "../../data/Context";

const excludedPages = ["inventory"];

const DefaultHeader = () => {
  let { auth, company } = useSelector(state => state);
	const [salutation, setSalutation] = useState("");
	const navigate = useNavigate(),
		{ canApprove, canAdmin } = useContext(GlobalState);
	const path = useLocation().pathname.split("/")[1];

	useEffect(() => {
		const date = new Date();
		const hrs = date.getHours();
		if (hrs < 12) {
			setSalutation("Good Morning");
		} else if (hrs >= 12 && hrs <= 17) {
			setSalutation("Good Afternoon");
		} else if (hrs >= 17 && hrs <= 24) {
			setSalutation("Good Evening");
		}
	}, []);

	return (
		<nav class="border-gray-200 bg-gray-50 m-2">
			{!excludedPages.includes(path) && (
				<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
					<p className="text-black font-medium">
						{salutation},{" "}
						{auth?.user?.lastName || auth?.user?.profile?.lastName}
					</p>
					<div className="flex items-center gap-3">
						{company?.data?.docs?.length > 1 && (
							<div
								className="border rounded-md px-4 py-2 cursor-pointer"
								onClick={() => navigate("/switcher")}>
								<p>
									{" "}
									Switch Company{" "}
									{
										company?.data?.docs?.find(
											it => it?._id === company?.currentSelected
										)?.name
									}
								</p>
							</div>
						)}
						<div>
							<p className="text-xs font-medium text-gray-">
								<span className="capitalize">
									{auth?.user?.profile?.type || auth?.user?.type}
								</span>{" "}
								{(auth?.user?.profile?.isAdmin || auth?.user?.isAdmin) &&
									`Admin`}
							</p>
							<div className="flex gap-6 items-center">
								<div className="cursor-pointer">
									<IconContext.Provider value={{ color: "#000" }}>
										<IoMdNotificationsOutline size={30} />
									</IconContext.Provider>
								</div>
								{auth?.user?.isAdmin || canApprove || canAdmin ? (
									<div
										onClick={() => navigate("/settings")}
										className="cursor-pointer">
										<IconContext.Provider value={{ color: "#000" }}>
											<IoMdSettings size={30} />
										</IconContext.Provider>
									</div>
								) : null}
							</div>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default DefaultHeader;
