import React from "react";

const Done = ({ onDoneClose }) => {
  return (
    <div>
      <div className="absolute right-0 left-0 top-0 bottom-0 pl-20 bg-plain bg-opacity-60 flex justify-center items-center  ">
        <div className=" w-[438px] h-[auto] bg-white text-black py-5">
          <div className=" flex items-center justify-end">
            <p
              onClick={onDoneClose}
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
          <p className=" text-center text-[24px] inter font-bold">Done</p>
        </div>
      </div>
    </div>
  );
};

export default Done;
