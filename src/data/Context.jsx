/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { FiSettings, FiUsers } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineLineChart } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { BsCalendarCheck } from "react-icons/bs";
import { PiUsersThreeBold } from "react-icons/pi";
// import { RxPencil2 } from "react-icons/rx";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { setCurrentCompany } from "./Reducers/CompanyReducer";
import AttendanceIcon from "../assets/attendance.svg";
import axios from "axios";
import NotificationIcon from "../assets/notificationicon.svg";
import { useDispatch } from "react-redux";
import { TOKEN_ID } from "./Reducers/UserReducer";

export const GlobalState = createContext();

const DataProvider = ({ children }) => {
  const [nav, setNav] = useState(false);
  let handleCapitalize = (word) => {
    let splitter = word.trim().split(" ");
    let firstCap = splitter[0].split("");
    let remaining = splitter.slice(1, splitter.length).join(" ");

    let firstCapOne = firstCap[0].toUpperCase();
    let firstCapTwo = firstCap.slice(1, firstCap.length).join("");

    let joinFirst = `${firstCapOne}${firstCapTwo}`;

    return `${joinFirst} ${remaining}`;
  };

  let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const toggleNav = () => {
    setNav(!nav);
  };

  let { auth, company, department } = useSelector((state) => state),
    dispatch = useDispatch(),
    [canApprove, setCanApprove] = useState(null),
    [canExecute, setCanExecute] = useState(null),
    [canManager1, setCanManager1] = useState(null),
    [canManager2, setCanManager2] = useState(null),
    [canAdmin, setCanAdmin] = useState(null),
    [canSee, setCanSee] = useState([]),
    [countryState, setCountryState] = useState(null);

  useEffect(() => {
    if (!company?.currentSelected) {
      if (company?.data?.docs?.length > 0) {
        let id = company?.data?.docs?.[company?.data?.docs?.length - 1]?._id;
        axios.defaults.headers.common["companyid"] = id;
        dispatch(setCurrentCompany(id));
        localStorage.setItem(TOKEN_ID, id);
      }
    }
  }, [company, dispatch]);

  // console.log({ st: localStorage.getItem("HRCORE_COMPANY_ID") });

  useEffect(() => {
    let getStates = async () => {
      try {
        let res = await axios.get(`https://nga-states-lga.onrender.com/fetch`, {
					headers: {
						Authorization: null,
						companyid: null,
					},
				});
				setCountryState(
					res?.data?.map(it => {
						return { name: it };
					})
				);
      } catch (error) {
        console.log({ error }, "country");
      }
    };
    getStates();
  }, []);

  useEffect(() => {
    if (auth?.user) {
      if (department?.all) {
        let findDept = department?.all?.docs?.find((it) => {
          let dept =
            auth?.user?.profile?.department?._id || auth?.user?.department?._id;

          return it?._id === dept;
        });
        if (findDept) setCanSee(findDept?.modules);
      }
    }
  }, [department?.all, auth?.user]);

  useEffect(() => {
    if (company?.currentSelected && auth?.user) {
      let findCompany = company?.data?.docs?.find(
        (it) => it?._id === company?.currentSelected
      );
      if (findCompany) {
				let findUser = findCompany?.managers?.find(
					it => it === auth?.user?._id
				);
				if (findUser) setCanApprove(true);
				else setCanApprove(false);
				// let findUser4 = findCompany?.manager1s?.find(
				//   (it) => it === auth?.user?._id
				// );
				if (auth?.user?.gradeForPosition1?.length > 0) setCanManager1(true);
				else setCanManager1(false);
				// let findUser5 = findCompany?.manager2s?.find(
				//   (it) => it === auth?.user?._id
				// );
				if (auth?.user?.gradeForPosition2?.length > 0) setCanManager2(true);
				else setCanManager2(false);
				let findUser2 = findCompany?.admins?.find(it => it === auth?.user?._id);
				if (findUser2) setCanAdmin(true);
				else setCanAdmin(false);
				let findUser3 = findCompany?.executive?.find(
					it => it === auth?.user?._id
				);
				if (findUser3) setCanExecute(true);
				else setCanExecute(false);
			}
      return () => {
        setCanApprove(false);
        setCanAdmin(false);
        setCanExecute(false);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company?.currentSelected, company?.data, auth?.user]);

  let sidebarList = [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: <BiCategoryAlt className="icon" size={24} />,
      permission: true,
    },
    {
      name: "Employee",
      url: "/",
      icon: <FiUsers className="icon" size={24} />,
      links: [
        {
          name: "All Employee",
          url: "/employee/all-employee",
          permission: true,
        },
        // { name: "Audit", url: "/employee/audit" },
        {
          name: "Onboarding",
          url: "/employee/onboarding",
          type: "button",
          margin: true,
          permission: true,
          links: [
            {
              name: "File Management",
              url: "/employee/onboarding/file-management",
              permission: true,
            },
            {
              name: "Assets Management",
              url: "/employee/onboarding/assets-management",
              permission: true,
            },
          ],
        },
        { name: "Offboarding", url: "/employee/offboarding", permission: true },
      ],
      type: "button",
      permission:
        auth?.user?.isAdmin ||
        canApprove ||
        canExecute ||
        canSee?.includes("Employee"),
    },
    {
      name: "Engagement",
      url: "/",
      icon: <AiOutlineHeart className="icon" size={24} />,
      links: [
        {
          name: "Announcements",
          url: "/engagements/announcements",
          permission: true,
        },
        // { name: "Survey", url: "/engagements/survey" },
        // { name: "Feedback", url: "/engagements/feedback" },
      ],
      type: "button",
      permission:
        auth?.user?.isAdmin ||
        canApprove ||
        canExecute ||
        canSee?.includes("Engagement"),
    },
    {
      name: "Leave",
      url: "/leave",
      icon: <BsCalendarCheck className="icon" size={24} />,
      tip: 200,
      type: "button",
      links: [
        {
          name: "Manage",
          url: "/leave/manage",
          tip: 200,
          permission: true,
        },
        {
          name: "My Request",
          url: "/leave/my-request",
          tip: 200,
          permission: true,
        },
      ],
      permission:
        auth?.user?.isAdmin ||
        canApprove ||
        canExecute ||
        canSee?.includes("Leave"),
    },
    {
      name: "Finance",
      url: "/",
      icon: <GrDocumentText className="icon" size={24} />,
      links: [
        // { name: "Payroll", url: "/payroll" },
        {
          name: "Invoice",
          url: "/finance/invoice",
          permission: true,
        },
        {
          name: "Voucher",
          url: "/finance/voucher",
          permission: true,
        },
        {
          name: "Settings",
          url: "/finance/invoice-setting",
          permission: true,
        },
      ],
      type: "button",
      permission:
        auth?.user?.isAdmin ||
        canApprove ||
        canExecute ||
        canSee?.includes("Finance"),
    },
    {
      name: "Inventory",
      url: "/inventory",
      icon: <GrDocumentText className="icon" size={24} />,
      links: [
        // { name: "Payroll", url: "/payroll" },
        {
          name: "Items",
          url: "/inventory/items",
          permission: true,
        },
        {
          name: "Categories",
          url: "/inventory/categories",
          permission: true,
        },
        {
          name: "Service",
          url: "/inventory/service",
          permission: true,
        },
        {
          name: "Supplier",
          url: "/inventory/supplier",
          permission: true,
        },
        {
          name: "Order",
          url: "/inventory/order",
          permission: true,
        },
        {
          name: "Customer",
          url: "/inventory/customer",
          permission: true,
        },
        {
          name: "Sales",
          url: "/inventory/sales",
          permission: true,
        },
        {
          name: "Purchase",
          url: "/inventory/purchase",
          permission: true,
        },
        {
          name: "Sales Report",
          url: "/inventory/sales-report",
          permission: true,
        },
        {
          name: "Purchase Report",
          url: "/inventory/purchase-report",
          permission: true,
        },
      ],
      type: "button",
      permission:
        process.env.REACT_APP_NAME === "Cephas HR Core" &&
        (auth?.user?.isAdmin ||
          canApprove ||
          canExecute ||
          canSee?.includes("Inventory")),
    },
    {
      name: "Recruitment",
      url: "/",
      icon: <PiUsersThreeBold className="icon" size={24} />,
      links: [
        { name: "All Jobs", url: "/recruitment/all-jobs", permission: true },
        {
          name: "All Candidates",
          url: "/recruitment/allcandidates",
          permission: true,
        },
      ],
      type: "button",
      permission:
        auth?.user?.isAdmin ||
        canApprove ||
        canExecute ||
        canSee?.includes("Recruitment"),
    },

    {
      name: "Request",
      url: "/request",
      icon: <VscGitPullRequestGoToChanges className="icon" size={24} />,

      permission:
        auth?.user?.isAdmin ||
        canApprove ||
        canExecute ||
        canSee?.includes("Request"),
    },
    {
      name: "Attendance",
      url: "/attendance",
      icon: <img src={AttendanceIcon} alt="" className="" />,

      permission:
        auth?.user?.isAdmin ||
        canApprove ||
        canExecute ||
        canSee?.includes("Attendance"),
    },
    {
      name: "Notifications",
      url: "/notifications",
      icon: <img src={NotificationIcon} alt="" className="" />,

      permission: true,
    },
    {
      name: "Performance",
      url: "/performance",
      icon: <AiOutlineLineChart className="icon" size={24} />,
      // links: [
      // 	{ name: "Sub Menu", url: "/sub-menu" },
      // 	{ name: "Sub Menu", url: "/sub-menu" },
      // 	{ name: "Sub Menu", url: "/sub-menu" },
      // 	{ name: "Sub Menu", url: "/sub-menu" },
      // ],
      // type: "button",
      permission: true,
    },
    {
      name: "HR Policy",
      url:
        process.env.REACT_APP_PRIVACY ||
        "https://bct-media.nyc3.cdn.digitaloceanspaces.com/ICS-OUTSOURCING-HR_Policy.pdf",
      icon: <MdOutlinePrivacyTip className="icon" size={24} />,

      permission: true,
      target: "_blank",
    },

    {
      name: "Company Settings",

      url: "/settings",
      icon: <FiSettings className="icon" size={24} />,
      permission: auth?.user?.isAdmin || canExecute || canApprove,
    },
  ];

  const state = {
    handleCapitalize,

    numberWithCommas,

    sidebarList,
    auth,
    nav,
    toggleNav,
    canApprove,
    canAdmin,
    countryState,
    canExecute,
    canManager1,
    canManager2,
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

export default DataProvider;
