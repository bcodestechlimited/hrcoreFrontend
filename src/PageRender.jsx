/* eslint-disable no-undef */
import { createElement, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
// import { ErrorPage } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "./data/Reducers/ErrorReducer";
import { manageDepartment } from "./data/Reducers/DepartmentReducer";
import { managePosition } from "./data/Reducers/PositionReducer";
import { manageLevel } from "./data/Reducers/LevelReducer";
import { PageLoader } from "./components/modal-container/modal-container";
import { manageGrade } from "./data/Reducers/GradeReducer";

const generatePage = (pageName, folder) => {
  const component = () => require(`./${folder}/${pageName}`).default;
  try {
    return createElement(component());
  } catch (error) {
    // return <ErrorPage />;
  }
};

const PageRender = () => {
  const { auth, error } = useSelector((state) => state);
  let { page, id, step } = useParams(),
    [getSearch] = useSearchParams(),
    dispatch = useDispatch();

  useEffect(() => {
    if (page === "register" && getSearch?.get("company")) {
      dispatch(manageDepartment("get", null, getSearch?.get("company")));
      dispatch(managePosition("get", null, getSearch?.get("company")));
      dispatch(manageLevel("get", null, getSearch?.get("company")));
      dispatch(manageGrade("get", null, getSearch?.get("company")));
    }
  }, [dispatch, page, getSearch]);

  let escape2 = [
		"directory",
		"all-employee",
		"offboarding",
		"add-evaluation",
		"edit-evaluation",
		"assets-management",
		"add-staff",
		"manage_settings",
		"leave-types",
		"approval-flow",
		"file-management",
		"update-profile",
		"announcements",
		"feedback",
		"manage-admins",
		"permissions",
		"survey",
		"manage",
		"my-request",
		"create-leave",
		"add-tools",
		"levels",
		"departments",
		"grades",
		"positions",
		"company",
		"medias",
		"profile",
		"job-description",
		"application-form",
		"all-jobs",
		"candidates",
		"ceatejobs",
		"allcandidates",
		"create-new-job",
		"invoice",
		"invoice-setting",
		"create-invoice",
		"update-invoice",
		"invoices",
		"invoices-setting",
		"create-invoices",
		"update-invoices",
		"voucher",
		"company-voucher",
		"bank-voucher",
		"unilever",
		"recruitment",
		"fleet",
		"legal",
		"training",
	];

	if (process.env.REACT_APP_NAME === "Cephas HR Core") {
		escape2 = [
			...escape2,
			"inventory",
			"items",
			"service",
			"supplier",
			"order",
			"customer",
			"sales",
			"purchase",
			"items-history",
			"items-details",
			"service-details",
			"suppliers-details",
			"overall-order",
			"order-details",
			"invoice",
			"customer-details",
			"manage-customer",
			"purchase-report",
			"sales-report",
			"purchase-order",
			"puchase-details",
			"services-inventory",
			"items-inventory",
			"categories",
			"client",
		];
	}

  const escape1 = [
      "assets-management",
      "file-management",
      "leave-approval-flows",
      "cash-approval-flows",
      "appraisal-approval-flows",
      "requisition-approval-flows",
      "id-card-approval-flows",
      "create-admin",
      "add-permission",
      "update-profile",
    ],
    navigate = useNavigate();

  useEffect(() => {
    if (!auth?.isAuth) {
      if (error?.errorText) {
        if (
          ![
            "register",
            "login",
            "forgotpassword",
            "recruitment",
            "account-verification",
            "emailsent",
            "resetpassword",
            "resetsuccess",
          ]?.includes(page)
        ) {
          navigate("/");
        }
        dispatch(clearErrors());
      }
    }
    if (auth?.isAuth) {
      if (["register", "login", "create-account"]?.includes(page)) {
        navigate("/");
      }
    }
    // 	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, auth?.isAuth, navigate, error?.errorText, dispatch]);

  if (auth.token && auth.loading) return <PageLoader />;
  // if (general?.isLoading && users.isLoading) return <Loader />;

  let pageName = "";
  if (step) {
    if (
      (id === "onboarding" && escape1.includes(step)) ||
      (id === "offboarding" &&
        ["create-request", "preview-request"].includes(step)) ||
      (id === "approval-flow" && escape1.includes(step)) ||
      (id === "all-jobs" && escape1.includes(step)) ||
      (id === "invoice" && escape1.includes(step)) ||
      (id === "candidates" && escape1.includes(step)) ||
      (id === "manage-admins" && escape1.includes(step)) ||
      (id === "students" && escape1.includes(step)) ||
      (id === "levels" && escape1.includes(step)) ||
      (id === "manage-data" && escape1.includes(step)) ||
      (id === "departments" && escape1.includes(step)) ||
      (id === "positions" && escape1.includes(step)) ||
      (id === "profile" && escape1.includes(step)) ||
      (page === "finance" && ["update"].includes(step)) ||
      (id === "permissions" && escape1.includes(step))
    ) {
      pageName = `${page}/${id}/${step}`;
    } else {
      pageName = `${page}/${id}/${"[step]"}`;
    }
  } else if (id) {
    if (
      (page === "employee" && escape2.includes(id)) ||
      (page === "performance" && escape2.includes(id)) ||
      (page === "engagements" && escape2.includes(id)) ||
      (page === "settings" && escape2.includes(id)) ||
      (page === "recruitment" && escape2.includes(id)) ||
      (page === "profile" && escape2.includes(id)) ||
      (page === "leave" && escape2.includes(id)) ||
      (page === "inventory" && escape2.includes(id)) ||
      (page === "finance" && escape2.includes(id)) ||
      (page === "request" && escape2.includes(id)) ||
      (page === "birthday" && escape2.includes(id)) ||
      (page === "anniversary" && escape2.includes(id)) ||
      (page === "account-verification" && ["token", "success"]?.includes(id))
    ) {
      pageName = `${page}/${id}`;
    } else {
      pageName = `${page}/${"[id]"}`;
    }
  } else {
    pageName = `${page}`;
  }
  return generatePage(pageName, auth?.isAuth ? "pages" : "screens");
};

export default PageRender;
