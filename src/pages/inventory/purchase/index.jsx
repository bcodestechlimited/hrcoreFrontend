import React, { useState } from "react";
import InventoryHeader from "../../../components/inventory/InventoryHeader";
import RecentActivity from "../../../components/inventory/recent-activity";
import { Link } from "react-router-dom";

const Purchase = () => {
  const [addFilters, setAddFilters] = useState(false);

  const handleAddFilters = () => {
    setAddFilters(!addFilters);
  };
  return (
    <div className="bg-[#F0F1F3]">
      <InventoryHeader />
      <div className=" flex gap-x-10 pl-5">
        <div className="">
          <div className=" bg-white rounded-md w-[631px] h-[387px] p-5 mt-5">
            <p className="text-[16px] text-[#212529] manrope font-bold py-5">
              Overall Purchase Order
            </p>
            <div className=" flex items-end justify-between border-b-[0.7px] border-b-[#212529] pb-3">
              <div className=" flex items-center gap-5">
                <p className=" text-[24px] manrope text-[#212529]">
                  $ 58,986.00
                </p>
                <div className=" relative w-[60px] gap-1 px-2 py-1 h-[22px] text-[12px] flex  items-center font-bold bg-[#E1F4CB] rounded-full text-[#62912C]">
                  <img
                    className=" w-[18px] h-[18px]"
                    src={require("../../../assets/upicon.png")}
                    alt=""
                  />
                  <p className="  ">5.6%</p>
                </div>
              </div>
              <div className=" flex items-end gap-5">
                <div
                  onClick={handleAddFilters}
                  className="bn53 flex items-center justify-center border-[0.5px] border-[#D0D3D9] hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer gap-2  w-[102px] h-[40px] rounded-md"
                >
                  <img
                    className=" w-[20px] h-[20px]"
                    src={require("../../../assets/Filters.png")}
                    alt=""
                  />
                  <p className=" text-[14px] inter "> Filters</p>
                </div>
                {addFilters && (
                  <div className="absolute z-30 py-3 ml-32 rounded-md bg-white w-[103px] pl-2 mt-10 h-auto">
                    <div className=" gap-5  grid  text-black">
                      <Link
                        to="/inventory/purchase-report"
                        className="hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer  rounded-md pr-3 w-[74px] h-[27px] border-[0.5px]  flex justify-center items-center border-[#494949]"
                      >
                        Week
                      </Link>
                      <Link
                        to="/inventory/purchase-report"
                        className="hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer  rounded-md pr-3 w-[74px] h-[27px] border-[0.5px]  flex justify-center items-center border-[#494949]"
                      >
                        Month
                      </Link>
                      <Link
                        to="/inventory/purchase-report"
                        className="hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer  rounded-md pr-3 w-[74px] h-[27px] border-[0.5px]  flex justify-center items-center border-[#494949]"
                      >
                        Year
                      </Link>
                    </div>
                  </div>
                )}

                <div className=" flex items-center gap-3">
                  <div className="bg-[#9A55FF] rounded-full h-[10px] w-[10px]"></div>
                  <p className=" text-[12px] manrope text-[#6C757D]">
                    Current Year
                  </p>
                </div>
                <div className=" flex items-center gap-3">
                  <div className="bg-[#41A5FF] rounded-full h-[10px] w-[10px]"></div>
                  <p className=" text-[12px] manrope text-[#6C757D]">
                    Current Year
                  </p>
                </div>
              </div>
            </div>
            <div className=" pt-3">
              <img src={require("../../../assets/Graph.png")} alt="" />
            </div>
          </div>

          <div className=" bg-white rounded-md w-[607px] h-[324px] p-5 mt-5 ">
            <p className=" manrope text-[16px] text-[#212529] font-bold border-b-[0.7px] border-b-[#212529] pb-3">
              Purchase Order per Categories{" "}
              <span className=" text-[16px] font-light text-[#D0D3D9]">
                (9,234 Purchase)
              </span>{" "}
            </p>
            <div className=" pt-3">
              <img src={require("../../../assets/Graph2.png")} alt="" />
            </div>
          </div>
        </div>
        <div className=" grid w-full ">
          <div className="bg-white w-full">
            <RecentActivity />
          </div>
          <div className=" flex justify-end items-center py-5 ml-5">
            <Link
              to="/inventory/purchase-order"
              className=" w-[190px] h-[37px] cursor-pointer hover:bg-blue-600 bg-[#04B4FC] text-white manrope flex items-center justify-center gap-3"
            >
              <img
                className=" w-[16px] h-[16px]"
                src={require("../../../assets/icon-wrapper-h.png")}
                alt=""
              />
              <p className=" text-[12px] text-white manrope">View Purchase</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
