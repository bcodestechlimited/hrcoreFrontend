import React from "react";

const SuccessfullyAdded = ({ onClose }) => {
  return (
    <div>
      <div className="absolute right-0 left-0 top-0 bottom-0 pl-20 bg-plain bg-opacity-60 flex justify-center items-center  ">
        <div className=" w-[438px] h-[auto] bg-white text-black py-5">
          <div onClick={onClose} className=" flex items-center justify-end">
            <p className=" cursor-pointer text-[24px] inter font-bold pr-10 ">
              X
            </p>
          </div>
          <div className=" grid justify-center items-center">
            <img
              className=" w-[280px] h-[120px]"
              src={require("../../assets/thanks.png")}
              alt=""
            />
          </div>
          <p className=" text-center text-[24px] inter font-bold">Thank You </p>
          <p className=" text-center text-[14px] text-[#565656] inter font-light pb-5">
            Item Successfully Added
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessfullyAdded;
