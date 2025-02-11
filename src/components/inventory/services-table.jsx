import React, { useState } from "react";
import Edit from "../../assets/Edit.png";
import Delete from "../../assets/Delete.png";
import { Link } from "react-router-dom";
import Done from "./Done";

const ServicesTable = () => {
  const [addItem, setAddItem] = useState(false);
  const [addFilters, setAddFilters] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [category, setCategory] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleAddItem = () => {
    setAddItem(!addItem);
  };
  const closeHandleAddItem = () => {
    setAddItem(false);
  };

  const handleAddFilters = () => {
    setAddFilters(!addFilters);
  };
  const handleIsDownload = () => {
    setIsDownload(!isDownload);
  };
  const closeHandleIsDownload = () => {
    setIsDownload(!isDownload);
  };

  const handleCategory = () => {
    setCategory(!category);
  };

  const handleIsDone = () => {
    setIsDone(!isDone);
  };

  const closehandleIsDone = () => {
    setIsDone(false);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isDeletedSuccessfully, setIsDeletedSuccessfully] = useState(false);

  const handleDeletedSuccessfully = () => {
    setIsDeletedSuccessfully(!isDeletedSuccessfully);
  };
  const closehandleDeletedSuccessfully = () => {
    setIsDeletedSuccessfully(false);
  };

  const handleCloseCard = () => {
    setIsDone(false);
  };

  const handleEdit = () => {
    window.scrollTo(0, 0);
    setIsEdit(!isEdit);
  };
  const handleDelete = () => {
    window.scrollTo(0, 0);
    setIsDelete(!isDelete);
  };

  const closehandleEdit = () => {
    setIsEdit(false);
  };
  const closehandleDelete = () => {
    setIsDelete(false);
  };

  const tableHead = [
      "Service",
      "Price",
      "Description",
      "Category",
      "Date",

      "Action",
    ],
    tableData = [
      {
        Service: "Trianing",
        Price: "₹205",
        Description: "$500",
        Category: "43 Packets",
        Date: "March 11, 2023",
        Edit: Edit,
        Delete: Delete,
        to: "/inventory/service-details",
      },
      {
        Service: "Trianing",
        Price: "₹205",
        Description: "$500",
        Category: "43 Packets",
        Date: "March 11, 2023",
        Edit: Edit,
        Delete: Delete,
      },
      {
        Service: "Trianing",
        Price: "₹205",
        Description: "$500",
        Category: "43 Packets",
        Date: "March 11, 2023",
        Edit: Edit,
        Delete: Delete,
      },
      {
        Service: "Trianing",
        Price: "₹205",
        Description: "$500",
        Category: "43 Packets",
        Date: "March 11, 2023",
        Edit: Edit,
        Delete: Delete,
      },
      {
        Service: "Trianing",
        Price: "₹205",
        Description: "$500",
        Category: "43 Packets",
        Date: "March 11, 2023",
        Edit: Edit,
        Delete: Delete,
      },
      {
        Service: "Trianing",
        Price: "₹205",
        Description: "$500",
        Category: "43 Packets",
        Date: "March 11, 2023",
        Edit: Edit,
        Delete: Delete,
      },
    ];
  return (
    <div className=" bg-white rounded-md py-5  ">
      <div className=" flex items-center justify-between lg:pr-24">
        <p className=" text-[#383E49] inter font-bold text-[20px] pl-4">
          Services
        </p>
        <div className=" flex justify-center items-center gap-5">
          <div
            onClick={handleAddItem}
            className=" bg-[#1366D9] w-[152px] gap-2  h-[40px] hover:bg-[#a0bde7] cursor-pointer inter text-white flex justify-center items-center rounded-md "
          >
            <img
              className=" w-[22px] h-[22px]"
              src={require("../../assets/icon-wrapper-h.png")}
              alt=""
            />
            <p>Add Service</p>
          </div>
          {/* <div
            onClick={handleAddItem}
            className=" bg-[#1366D9] w-[110px] h-[40px] hover:bg-[#a0bde7] cursor-pointer inter text-white flex justify-center items-center rounded-md "
          >
            Add Service
          </div> */}

          {addItem && (
            <div className="  absolute z-30 top-0 left-0 bottom-0 right-0  bg-black bg-opacity-60 lg:pl-14 justify-center grid items-center">
              <div className=" p-10 grid gap-5 bg-white text-black rounded-md lg:w-[530px] md:w-[400px] w-full overflow-y-scroll lg:h-[500px] ">
                <p className=" font-bold  inter text-[20px] text-[#383E49]">
                  New Service
                </p>
                <div className=" flex items-center justify-between">
                  <p className=" inter text-[#383E49] text-[16px]">Service</p>
                  <input
                    className=" w-[273px] h-[44px] rounded-md border-[0.5px] border-[#D0D5DD]"
                    placeholder="Enter Service name"
                    type="text"
                  />
                </div>

                <div className="  flex items-center justify-between">
                  <p className="inter text-[#383E49] text-[16px]">Category</p>
                  <div className="relative">
                    <input
                      className="w-[273px] h-[44px] pr-10 rounded-md border-[0.5px] border-[#D0D5DD]"
                      placeholder="Select Service category"
                      type="text"
                    />
                    <svg
                      onClick={handleCategory}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  {category && (
                    <div className=" absolute right-40 mt-4 gap-1 pl-2 py-4 bg-white grid items-center text-black w-[226px] h-[110px] rounded-md">
                      <p className=" w-[190px] h-[34px] cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2">
                        Service Rendered
                      </p>
                      <p className=" w-[190px] h-[34px] cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2">
                        Service Rendered
                      </p>
                    </div>
                  )}
                </div>

                <div className=" flex items-center justify-between">
                  <p className=" inter text-[#383E49] text-[16px]">Price</p>
                  <input
                    className=" w-[273px] h-[44px] rounded-md border-[0.5px] border-[#D0D5DD]"
                    placeholder="Enter price"
                    type="text"
                  />
                </div>
                <div className=" flex items-center justify-between">
                  <p className=" inter text-[#383E49] text-[16px]">
                    Description
                  </p>
                  <input
                    className=" w-[273px] h-[44px] rounded-md border-[0.5px] border-[#D0D5DD]"
                    placeholder="Enter description"
                    type="text"
                  />
                </div>

                <div className=" flex justify-end items-center gap-5 pt-5">
                  <button
                    onClick={closeHandleAddItem}
                    className=" w-[110px] h-[40px] border-[0.50px] hover:border-[#1366D9] hover:text-[#1366D9] border-[#1C1C1C] inter rounded-md"
                  >
                    Cancel
                  </button>
                  <div
                    onClick={handleIsDone}
                    className=" bn53 bg-[#1366D9] w-[152px] gap-2  h-[40px] hover:bg-[#a0bde7] cursor-pointer inter text-white flex justify-center items-center rounded-md "
                  >
                    <img
                      className=" w-[22px] h-[22px]"
                      src={require("../../assets/icon-wrapper-h.png")}
                      alt=""
                    />
                    <p>Add Service</p>
                  </div>

                  {isDone && <Done onDoneClose={handleCloseCard} />}
                </div>
              </div>
            </div>
          )}
          <div className=" flex items-center justify-center gap-3">
            <div
              onClick={handleAddFilters}
              className="bn53 flex items-center justify-center border-[0.5px] border-[#D0D3D9] hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer gap-2  w-[102px] h-[40px] rounded-md"
            >
              <img
                className=" w-[20px] h-[20px]"
                src={require("../../assets/Filters.png")}
                alt=""
              />
              <p className=" text-[14px] inter "> Filters</p>
            </div>
            {addFilters && (
              <div className="absolute z-30 py-3 rounded-md bg-white w-[103px] pl-2 mt-10 h-auto">
                <div className=" gap-5  grid  text-black">
                  <div className="hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer  rounded-md pr-3 w-[74px] h-[27px] border-[0.5px]  flex justify-center items-center border-[#494949]">
                    Name
                  </div>
                  <div className="hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer  rounded-md pr-3 w-[74px] h-[27px] border-[0.5px]  flex justify-center items-center border-[#494949]">
                    Date
                  </div>
                  <div className="hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer  rounded-md pr-3 w-[74px] h-[27px] border-[0.5px]  flex justify-center items-center border-[#494949]">
                    Price
                  </div>
                </div>
              </div>
            )}
            <div
              onClick={handleIsDownload}
              className="bn53 flex items-center justify-center border-[0.5px] border-[#D0D3D9] hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer w-[118px] h-[40px] rounded-md"
            >
              <p className=" text-[14px] inter "> Download all</p>
            </div>
            {isDownload && (
              <div className="absolute right-0 left-0 top-0 bottom-0 pl-20 bg-plain bg-opacity-60 flex justify-center items-center  ">
                <div className=" w-[438px] h-[auto] bg-white text-black py-5">
                  <div className=" flex items-center justify-end">
                    <p
                      onClick={closeHandleIsDownload}
                      className=" cursor-pointer text-[24px] inter font-bold pr-10 "
                    >
                      X
                    </p>
                  </div>
                  <div className=" grid justify-center items-center">
                    <img
                      className=" w-[196px] h-[196px]"
                      src={require("../../assets/Doneimg.png")}
                      alt=""
                    />
                  </div>
                  <p className=" text-center text-[24px] inter font-bold">
                    File Successfully{" "}
                  </p>
                  <p className=" text-center text-[24px] inter font-bold pb-5">
                    Downloaded
                  </p>
                </div>
              </div>
            )}
            <Link
              to="/inventory/items-history"
              className="bn53 flex items-center justify-center border-[0.5px] border-[#D0D3D9] hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer w-[81px] h-[40px] rounded-md"
            >
              <p className=" text-[14px] inter ">History</p>
            </Link>
          </div>
        </div>
      </div>
      <div className=" w-full py-4 overflow-x-scroll overflow-y-hidden ">
        <table className="min-w-full table divide-y-2 divide-yellow-[#7E3AF2] rounded-xl ">
          <thead className="h-16 w-full  ">
            <tr className="bg-[#fff] text-black ">
              {tableHead?.map((it, index) => (
                <th
                  className=" text-left font-roboto px-4 text-[14px] text-[#667085]  font-light"
                  key={index}
                >
                  {it}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {tableData?.map((it, i) => (
              <tr
                key={i}
                className=" bg-white py-4 h-16 justify-center font-roboto   "
              >
                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer  ">
                  <Link to={it?.to}>{it?.Service}</Link>
                </td>
                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer  ">
                  <Link to={it?.to}>{it?.Price}</Link>
                </td>
                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                  <Link to={it?.to}>{it?.Description}</Link>
                </td>
                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                  <Link to={it?.to}>{it?.Category}</Link>
                </td>

                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer  ">
                  <Link to={it?.to}>{it?.Date}</Link>
                </td>

                <td className=" font-roboto  font-light px-4   ">
                  <div className="flex items-center gap-2">
                    <img
                      onClick={handleEdit}
                      className="w-[30px] h-[31px] hover:scale-110 hover:duration-300 hover:ease-in"
                      src={it?.Edit}
                      alt=""
                    />
                    <img
                      onClick={handleDelete}
                      className="w-[30px] h-[31px] hover:scale-110 hover:duration-300 hover:ease-in"
                      src={it?.Delete}
                      alt=""
                    />
                  </div>

                  <div>
                    {isDelete && (
                      <div className="absolute right-0 left-0 top-0 bottom-0 pl-20 bg-plain bg-opacity-60 flex justify-center items-center  ">
                        <div className=" w-[438px] h-[auto] bg-white text-black py-5">
                          <div className=" flex items-center justify-end">
                            <p
                              onClick={closehandleDelete}
                              className=" cursor-pointer text-[24px] inter font-bold pr-10 "
                            >
                              X
                            </p>
                          </div>
                          <div className=" grid justify-center items-center">
                            <img
                              className=" w-[150px] h-[150px]"
                              src={require("../../assets/deleteimg.png")}
                              alt=""
                            />
                          </div>
                          <p className=" text-center text-[16px] inter font-bold py-5">
                            Are you sure you want to delete? Action cannot be
                            undone.
                          </p>
                          <div className=" flex items-center justify-center gap-5">
                            <button
                              onClick={closehandleDelete}
                              className=" w-[110px] h-[35px] bg-[#1D48E1] text-white rounded-md inter text-[16px]"
                            >
                              No
                            </button>
                            <button
                              onClick={handleDeletedSuccessfully}
                              className=" w-[110px] h-[35px] border-[0.5px] border-[#1D48E1] rounded-md text-[#1D48E1] inter text-[16px]"
                            >
                              Yes
                            </button>
                            {isDeletedSuccessfully && (
                              <div className="absolute right-0 left-0 top-0 bottom-0 pl-20 bg-plain bg-opacity-60 flex justify-center items-center  ">
                                <div className=" w-[438px] h-[auto] bg-white text-black py-5">
                                  <div className=" flex items-center justify-end">
                                    <p
                                      onClick={closehandleDeletedSuccessfully}
                                      className=" cursor-pointer text-[24px] inter font-bold pr-10 "
                                    >
                                      X
                                    </p>
                                  </div>
                                  <div className=" grid justify-center items-center">
                                    <img
                                      className=" w-[196px] h-[196px]"
                                      src={require("../../assets/Doneimg.png")}
                                      alt=""
                                    />
                                  </div>
                                  <p className=" text-center text-[24px] inter font-bold">
                                    Deleted Successfully!{" "}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    {isEdit && (
                      <div className="  absolute z-30 top-0 left-0 bottom-0 right-0  bg-black bg-opacity-60 lg:pl-14 justify-center grid items-center">
                        <div className=" p-10 grid gap-5 bg-white text-black rounded-md lg:w-[530px] md:w-[400px] w-full overflow-y-scroll lg:h-[500px] ">
                          <p className=" font-bold  inter text-[20px] text-[#383E49]">
                            New Services
                          </p>
                          <div className=" flex items-center justify-between">
                            <p className=" inter text-[#383E49] text-[16px]">
                              Service
                            </p>
                            <input
                              className=" w-[273px] h-[44px] rounded-md border-[0.5px] border-[#D0D5DD]"
                              placeholder="Enter Service name"
                              type="text"
                            />
                          </div>

                          <div className="  flex items-center justify-between">
                            <p className="inter text-[#383E49] text-[16px]">
                              Category
                            </p>
                            <div className="relative">
                              <input
                                className="w-[273px] h-[44px] pr-10 rounded-md border-[0.5px] border-[#D0D5DD]"
                                placeholder="Select Service category"
                                type="text"
                              />
                              <svg
                                onClick={handleCategory}
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                            {category && (
                              <div className=" absolute right-40 mt-4 gap-1 pl-2 py-4 bg-white grid items-center text-black w-[226px] h-[110px] rounded-md">
                                <p className=" w-[190px] h-[34px] cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2">
                                  Service Rendered
                                </p>
                                <p className=" w-[190px] h-[34px] cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2">
                                  Service Rendered
                                </p>
                              </div>
                            )}
                          </div>
                          <div className=" flex items-center justify-between">
                            <p className=" inter text-[#383E49] text-[16px]">
                              Price
                            </p>
                            <input
                              className=" w-[273px] h-[44px] rounded-md border-[0.5px] border-[#D0D5DD]"
                              placeholder="Enter price"
                              type="text"
                            />
                          </div>
                          <div className=" flex items-center justify-between">
                            <p className=" inter text-[#383E49] text-[16px]">
                              Description
                            </p>
                            <input
                              className=" w-[273px] h-[44px] rounded-md border-[0.5px] border-[#D0D5DD]"
                              placeholder="Enter description"
                              type="text"
                            />
                          </div>

                          <div className=" flex justify-end items-center gap-5 pt-5">
                            <button
                              onClick={closehandleEdit}
                              className=" w-[110px] h-[40px] border-[0.50px] hover:border-[#1366D9] hover:text-[#1366D9] border-[#1C1C1C] inter rounded-md"
                            >
                              Cancel
                            </button>
                            <div
                              onClick={handleIsDone}
                              className=" bg-[#1366D9] w-[110px] h-[40px] hover:bg-[#a0bde7] cursor-pointer inter text-white flex justify-center items-center rounded-md "
                            >
                              Edit
                            </div>
                            {isDone && (
                              <div className="absolute right-0 left-0 top-0 bottom-0 pl-20 bg-plain bg-opacity-60 flex justify-center items-center  ">
                                <div className=" w-[438px] h-[auto] bg-white text-black py-5">
                                  <div className=" flex items-center justify-end">
                                    <p
                                      onClick={closehandleIsDone}
                                      className=" cursor-pointer text-[24px] inter font-bold pr-10 "
                                    >
                                      X
                                    </p>
                                  </div>
                                  <div className=" grid justify-center items-center">
                                    <img
                                      className=" w-[196px] h-[196px]"
                                      src={require("../../assets/Doneimg.png")}
                                      alt=""
                                    />
                                  </div>
                                  <p className=" text-center text-[24px] inter font-bold">
                                    File Successfully{" "}
                                  </p>
                                  <p className=" text-center text-[24px] inter font-bold pb-5">
                                    Downloaded
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <img
                      className="w-[30px] h-[31px] hover:scale-110 hover:duration-300 hover:ease-in"
                      src={it?.Edit}
                      alt=""
                    />
                    <img
                      className="w-[30px] h-[31px] hover:scale-110 hover:duration-300 hover:ease-in"
                      src={it?.Delete}
                      alt=""
                    />
                  </div> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesTable;
