import React, { useState } from "react";
import { Link } from "react-router-dom";

const DownloadSuccessful = () => {
  const [isDownload, setIsDownload] = useState(false);

  const [isCategory, setIsCategory] = useState(false);

  const handleIsCategory = () => {
    setIsCategory(!isCategory);
  };

  const handleIsDownload = () => {
    setIsDownload(!isDownload);
  };
  const closeHandleIsDownload = () => {
    setIsDownload(!isDownload);
  };

  return (
    <div>
      <div className="absolute right-0 left-0 top-0 bottom-0 pl-20 bg-plain bg-opacity-60 flex justify-center items-center  ">
        <div className=" w-[438px] h-[auto] bg-white text-black py-5">
          <div className=" flex items-center justify-end">
            <Link
              to="/inventory"
              // onClick={closeHandleIsDownload}
              className=" cursor-pointer text-[24px] inter font-bold pr-10 "
            >
              X
            </Link>
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
    </div>
  );
};

export default DownloadSuccessful;
