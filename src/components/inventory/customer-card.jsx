import React, { useState } from "react";
import { Link } from "react-router-dom";

const CustomerCard = () => {
  const [addOrder, setAddOrder] = useState(false);
  const [addFilters, setAddFilters] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [policy, setPolicy] = useState(false);
  const [isCategory, setIsCategory] = useState(false);

  const handleIsCategory = () => {
    setIsCategory(!isCategory);
  };

  const handleAddOrder = () => {
    setAddOrder(!addOrder);
  };
  const closeHandleAddOrder = () => {
    setAddOrder(false);
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
  const handlePolicy = () => {
    setPolicy(!policy);
  };
  const closehandlePolicy = () => {
    setPolicy(false);
  };

  return (
    <div>
      <div className=" flex items-end gap-5">
        <div className=" flex items-center gap-5">
          <div className=" flex justify-center gap-3 px-6 items-center rounded-md text-white w-[220px] h-[128px] bg-gradient-to-b from-[#9A55FF] via-[#9A55FF] to-[#D355FF]">
            <img
              className=" w-[42px] h-[42px]"
              src={require("../../assets/Totalicon.png")}
              alt=""
            />
            <div className="grid">
              <p>Total Customers For the Month</p>
              <p className=" albertSans font-bold text-[24px]">10,678</p>
            </div>
          </div>
          <div className=" flex justify-center gap-3 px-6 items-center rounded-md text-black w-[220px] h-[128px] bg-white">
            <img
              className=" w-[42px] h-[42px]"
              src={require("../../assets/blueicon.png")}
              alt=""
            />
            <div className="grid">
              <p>Total Customers For the Month</p>
              <p className="albertSans font-bold text-[24px]">10,678</p>
            </div>
          </div>
          <div className=" flex justify-center gap-3 px-6 items-center rounded-md text-black w-[220px] h-[128px] bg-white">
            <img
              className=" w-[42px] h-[42px]"
              src={require("../../assets/greenicon.png")}
              alt=""
            />
            <div className="grid">
              <p>Total Customers For the Month</p>
              <p className="albertSans font-bold text-[24px]">10,678</p>
            </div>
          </div>
        </div>

        <div className=" grid justify-center items-center gap-5">
          <div
            onClick={handleAddOrder}
            className=" bg-[#1366D9] w-[157px] gap-1  h-[40px] hover:bg-[#a0bde7] cursor-pointer inter text-white flex justify-center items-center rounded-md "
          >
            <img
              className=" w-[22px] h-[22px]"
              src={require("../../assets/icon-wrapper-h.png")}
              alt=""
            />
            <p>Add Customer</p>
          </div>
          {addOrder && (
            <div className="  absolute top-0 left-0 bottom-0 right-0  bg-black bg-opacity-60 lg:pl-14 justify-center grid items-center">
              <div className="  p-10 bg-white text-black rounded-md lg:w-[530px] md:w-[400px] w-full overflow-y-scroll lg:h-[500px] ">
                <p className="py-5 text-[20px] inter">New Supplier</p>

                <div className=" grid gap-5">
                  <div className=" flex items-center justify-between">
                    <label className=" text-[#48505E] text-[16px]" htmlFor="">
                      Supplier Name
                    </label>
                    <input
                      className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
                      placeholder="Enter Item name"
                      type="text"
                    />
                  </div>
                  <div className=" flex items-center justify-between">
                    <label className=" text-[#48505E] text-[16px]" htmlFor="">
                      Item
                    </label>
                    <input
                      className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
                      placeholder="Enter Item ID"
                      type="text"
                    />
                  </div>

                  <div className=" flex items-center justify-between">
                    <label className=" text-[#48505E] text-[16px]" htmlFor="">
                      Category
                    </label>

                    <div className="relative">
                      <input
                        className="w-[273px] h-[44px] pr-10 rounded-md border-[0.5px] border-[#D0D5DD]"
                        placeholder="Enter supplier Policy Type"
                        type="text"
                      />
                      <svg
                        onClick={handleIsCategory}
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
                    {isCategory && (
                      <div className=" absolute right-20 ">
                        <div className=" bg-white text-black w-[286px] grid gap-5 rounded-md pl-4 py-5">
                          <p className=" w-[190px] h-[34px] border-[0.5px] border-[#A5A5A5] grid items-center pl-3 rounded-md">
                            Provisions
                          </p>
                          <p className=" w-[190px] h-[34px] border-[0.5px] border-[#A5A5A5] grid items-center pl-3 rounded-md">
                            Body Soap
                          </p>
                          <p className=" w-[190px] h-[34px] border-[0.5px] border-[#A5A5A5] grid items-center pl-3 rounded-md">
                            Deterfent
                          </p>
                          <p className=" w-[190px] h-[34px] border-[0.5px] border-[#A5A5A5] grid items-center pl-3 rounded-md">
                            Food Stuff
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className=" flex items-center justify-between">
                    <label className=" text-[#48505E] text-[16px]" htmlFor="">
                      Buying Price
                    </label>
                    <input
                      className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
                      placeholder="Enter buying price"
                      type="text"
                    />
                  </div>
                  <div className=" flex items-center justify-between">
                    <label className=" text-[#48505E] text-[16px]" htmlFor="">
                      Contact Number
                    </label>
                    <input
                      className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
                      placeholder="Enter supplier contact number"
                      type="text"
                    />
                  </div>
                  <div className=" flex items-center justify-between">
                    <label className=" text-[#48505E] text-[16px]" htmlFor="">
                      Selling Price
                    </label>
                    <input
                      className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
                      placeholder="Enter Selling Price"
                      type="text"
                    />
                  </div>
                  <div className=" relative  flex items-center justify-between">
                    <p className="inter text-[#383E49] text-[16px]">
                      Policy Type
                    </p>
                    <div className="relative">
                      <input
                        className="w-[273px] h-[44px] pr-10 rounded-md border-[0.5px] border-[#D0D5DD]"
                        placeholder="Enter supplier Policy Type"
                        type="text"
                      />
                      <svg
                        onClick={handlePolicy}
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
                    {policy && (
                      <div className=" absolute right-0  mt-40 gap-1 pl-2 py-4 bg-white grid items-center text-black w-[226px] h-[110px] rounded-md">
                        <p className=" w-[190px] h-[34px] cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2">
                          No return
                        </p>
                        <p className=" w-[190px] h-[34px] cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2">
                          Taking return
                        </p>
                      </div>
                    )}
                  </div>
                  <div className=" flex items-center justify-between">
                    <label className=" text-[#48505E] text-[16px]" htmlFor="">
                      Date of Entry
                    </label>
                    <input
                      className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
                      placeholder="March 11, 2023"
                      type="text"
                    />
                  </div>
                </div>
                <div className=" flex items-center gap-3 py-5">
                  <input type="checkbox" />
                  <p className=" text-[16px] text-[#858D9D] inter">
                    Notify on the date of delivery
                  </p>
                </div>

                <div className=" flex justify-end items-center gap-5 pt-5">
                  <button
                    onClick={closeHandleAddOrder}
                    className=" w-[110px] h-[40px] border-[0.50px] hover:border-[#1366D9] hover:text-[#1366D9] border-[#1C1C1C] inter rounded-md"
                  >
                    Discard
                  </button>
                  <div className=" bg-[#1366D9] w-[157px] gap-1  h-[40px] hover:bg-[#a0bde7] cursor-pointer inter text-white flex justify-center items-center rounded-md ">
                    <img
                      className=" w-[22px] h-[22px]"
                      src={require("../../assets/icon-wrapper-h.png")}
                      alt=""
                    />
                    <p>Add Customer</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="  flex items-center gap-3">
            <Link className="bn53 flex border-[0.5px] border-[#D0D3D9] justify-center items-center w-[120px] h-[40px] rounded-md manrope text-[14px]">
              Order History
            </Link>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
