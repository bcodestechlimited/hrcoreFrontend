import React, { useContext, useState } from "react";
import { GlobalState } from "../../data/Context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Brand from "../brand/brand";
import { BiLogIn } from "react-icons/bi";
import DefaultHeader from "../default-header/default-header";
import { logoutUser } from "../../data/Reducers/UserReducer";
import "./sidebar.css";

const Sidebar = ({ children }) => {
  const { sidebarList, nav, toggleNav, auth } = useContext(GlobalState);
  const navigate = useNavigate(),
    location = useLocation(),
    dispatch = useDispatch(),
    currentPath = location.pathname;
  return (
    <div className="">
      {auth?.isAuth && (
        <>
          <button
            type="button"
            className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none overflow-visible focus:ring-2 focus:ring-gray-200"
            onClick={toggleNav}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <div
            className={`fixed md:hidden top-0 left-0 z-40 w-full h-screen transition-transform bg-black opacity-10 ${
              nav ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
            onClick={toggleNav}
          ></div>

          <aside
            className={`fixed top-0 left-0 z-40 w-56  h-screen transition-transform ${
              nav ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
          >
            <div className="h-full px-3 py-4 bg-gray-50">
              <div className="flex justify-center mb-8 mt-4">
                <Brand />
              </div>
              <ul className="space-y-2 font-medium pb-32 h-3/4 overflow-y-auto">
                {sidebarList
                  ?.filter((it) => it?.permission)
                  ?.map((list, i) =>
                    list.type === "button" ? (
                      <DropdownNavMenu
                        url={list.url}
                        key={i}
                        name={list.name}
                        links={list.links}
                        icon={list.icon}
                        permission={list?.permission}
                        currentPath={currentPath}
                      />
                    ) : (
                      <DefaultLink
                        name={list.name}
                        url={list.url}
                        icon={list.icon}
                        tip={list.tip}
                        margin={list.margin}
                        permission={list?.permission}
                        currentPath={currentPath}
                        key={i}
                        target={list?.target}
                      />
                    )
                  )}
              </ul>
              <div>
                <div className="absolute bottom-0 inset-x-0 py-4 space-y-4 bg-gray-50 p-4">
                  <div
                    onClick={() => navigate("/profile")}
                    className="flex items-center space-x-4  mb-3 cursor-pointer"
                  >
                    <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden border-red-600 border bg-gray-100 rounded-full dark:bg-gray-600">
                      {auth?.user?.profile?.avatar || auth?.user?.avatar ? (
                        <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden border-red-600 border bg-gray-100 rounded-full dark:bg-gray-600">
                          <img
                            class="w-10 h-10 border-2 border-[#F72585] rounded-full"
                            src={
                              auth?.user?.avatar || auth?.user?.profile?.avatar
                            }
                            alt={
                              auth?.user?.profile?.lastName ||
                              auth?.user?.lastName
                            }
                          />
                        </div>
                      ) : (
                        <span class="font-medium text-gray-600 dark:text-gray-300">
                          {auth?.user?.lastName?.slice(0, 1) ||
                            auth?.user?.profile?.lastName?.slice(0, 1) ||
                            "H"}
                          {""}
                          {auth?.user?.firstName?.slice(0, 1) ||
                            auth?.user?.profile?.firstName?.slice(0, 1) ||
                            "R"}
                        </span>
                      )}
                    </div>
                    <div className="font-medium">
                      <div>
                        {auth?.user?.lastName || auth?.user?.profile?.lastName}{" "}
                        {auth?.user?.firstName ||
                          auth?.user?.profile?.firstName}
                      </div>
                      <div className="text-sm text-gray-5">
                        <span className="capitalize">
                          {auth?.user?.type || auth?.user?.profile?.type}
                        </span>{" "}
                        {(auth?.user?.isAdmin ||
                          auth?.user?.profile?.isAdmin) &&
                          `Admin`}{" "}
                        Account
                      </div>
                    </div>
                  </div>
                  <div
                    className=""
                    title="Logout"
                    onClick={async () => {
                      await dispatch(logoutUser());
                      navigate("/");
                    }}
                  >
                    <Link to="#" className="flex items-center gap-4">
                      <BiLogIn className="icon" size={24} />
                      <span className="text nav-text">Logout</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}
      <div className={`${auth?.isAuth ? "sm:ml-56 " : ""}`}>
        {auth?.isAuth && <DefaultHeader />}
        <div className={`${auth?.isAuth ? "p-4" : ""}`}>{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;

const DropdownNavMenu = ({ name, links, icon, currentPath, url, margin }) => {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <li>
      <button
        type="button"
        className="flex items-center gap-3 p-2 w-full text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100"
        onClick={() => {
          navigate(url);
          setDropdown(!dropdown);
        }}
      >
        {icon}
        <span className="flex-1 text-left whitespace-nowrap">{name}</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <ul
        className={`${
          !dropdown && "hidden"
        } py-2 space-y-2 ml-10 border-l border-l-[#D0D5DD]`}
      >
        {links
          ?.filter((it) => it?.permission)
          ?.map((link, i) =>
            link.type === "button" ? (
              <DropdownNavMenu name={link.name} links={link.links} key={i} />
            ) : (
              <li key={i}>
                <Link
                  key={link.url}
                  to={link.url}
                  className={`flex items-center w-full p-2 text-gray-900 pl-6 transition duration-75 rounded-lg hover:bg-gray-100 ${
                    currentPath === link.url ? "active" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            )
          )}
      </ul>
    </li>
  );
};

const DefaultLink = ({ name, url, icon, tip, margin, currentPath, target }) => {
  return (
    <li>
      <Link
        to={url}
        target={target}
        className={`flex items-center p-2 gap-3 text-gray-900 rounded-lg hover:bg-gray-100 ${
          margin ? "ml-8" : ""
        } ${currentPath === url ? "active" : ""}`}
      >
        {icon}
        <span className="flex-1 whitespace-nowrap">{name}</span>
        {tip && (
          <span className="inline-flex items-center justify-center px-2 text-sm font-medium bg-[#F72585] text-white">
            {tip}
          </span>
        )}
      </Link>
    </li>
  );
};

/* 
  <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  Name
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
        </div>
*/
