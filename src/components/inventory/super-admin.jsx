import React from "react";

const SuperAdmin = () => {
  return (
    <div className="">
      <div className=" flex items-center gap-5 cursor-pointer">
        <img
          className=" w-[20px] h-[20px]"
          src={require("../../assets/icon8.png")}
          alt=""
        />
        <div className=" w-[164px] h-[48px] bg-white border-[0.5px] border-[#EAECF0] hover:border-[#1366D9] cursor-pointer rounded-md">
          <p className=" text-center text-[10px] font-light inter">
            Super Admin
          </p>
          <p className="manrope text-center text-[16px] font-bold">
            My Profile
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
