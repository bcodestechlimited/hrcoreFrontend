import React, { useState } from "react";
import Done from "./Done";

const DownloadAll = () => {
  const [isDownload, setIsDownload] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleCloseCard = () => {
    setIsDone(false);
  };

  const handleIsDownload = () => {
    setIsDownload(!isDownload);
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
        className="bn53 shadow-md flex items-center justify-center border-[0.5px] border-[#D0D3D9] hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer w-[118px] h-[40px] rounded-md"
      >
        <p className=" text-[14px] inter "> Download all</p>
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

      {isDone && <Done onDoneClose={handleCloseCard} />}
    </div>
  );
};

export default DownloadAll;
