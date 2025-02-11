import React from "react";

const SalesPurchaseGraph = () => {
  return (
    <div>
      <div className=" flex justify-between items-center">
        <p className="text-[#1C1C1C] manrope font-bold text-[22px]">
          Purchase Overview
        </p>
        <div className=" flex items-center justify-center w-[109px] h-[32px] border-[#D0D3D9] border-[0.5px] rounded-md gap-2">
          <img
            className=" w-[20px] h-[20px]"
            src={require("../../assets/Calendar2.png")}
            alt=""
          />
          <p className="inter text-[14px] text-[#5D6679]">Weekly</p>
        </div>
      </div>

      {/*  */}

      <div className="  lg:pt-5 md:pt-5 pt-8">
        <img src={require("../../assets/Group43.png")} alt="" />
        <div className=" flex items-center pl-16 gap-5">
          <div className=" flex items-center gap-2">
            <img
              className=" w-[15px] h-[15px]"
              src={require("../../assets/bluecircle.png")}
              alt=""
            />
            <p className=" text-[12px] inter ">Purchase</p>
          </div>
          <div className=" flex items-center gap-2">
            <img
              className=" w-[15px] h-[15px]"
              src={require("../../assets/greencircle.png")}
              alt=""
            />
            <p className=" text-[12px] inter ">Sales</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPurchaseGraph;
