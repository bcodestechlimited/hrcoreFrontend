import React, { useState } from "react";

const Download = () => {
  const [isDownload, setIsDownload] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [service, setService] = useState(false);
  const [activeButton, setActiveButton] = useState("overview");

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleService = () => {
    setService(!service);
  };
  const closehandleService = () => {
    setService(false);
  };
  const handleIsDownload = () => {
    setIsDownload(!isDownload);
  };
  const closehandleIsDownload = () => {
    setIsDownload(false);
  };
  const handleIsDone = () => {
    setIsDone(!isDone);
  };
  const closehandleIsDone = () => {
    setIsDone(false);
  };
  return (
    <div className=" ">
      <button
        onClick={handleIsDownload}
        className="bn53 flex items-center justify-center  bg-[#04B4FC] text-white hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer w-[118px] h-[40px] rounded-md"
      >
        <p className=" text-[14px] inter "> Download</p>
      </button>
      {isDownload && (
        <div className=" absolute right-10  bg-white text-base grid items-center justify-center w-[138px] h-[100px]">
          <p
            onClick={handleIsDone}
            className=" w-[109px] h-[35px] cursor-pointer pl-2 rounded-lg flex manrope items-center border-[0.5px] border-[#494949]"
          >
            As PDF
          </p>

          <p
            onClick={handleIsDone}
            className="w-[109px] h-[35px] pl-2 cursor-pointer rounded-lg flex manrope items-center border-[0.5px] border-[#494949]"
          >
            As Image
          </p>
        </div>
      )}

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
  );
};

export default Download;
