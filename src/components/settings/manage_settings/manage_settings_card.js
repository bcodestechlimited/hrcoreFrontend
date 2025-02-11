import React from "react";
import { useNavigate } from "react-router-dom";

function Manage_settings_card({ icon, title, handleLink, link }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(link);
  };

  return (
    <div
      onClick={handleClick}
      className="bg bg-white   flex justify-center items-center  w-full  2xl:w-[270px] rounded-xl py-5 h-[132px]
     shadow-xl p-4 cursor-pointer mb-5
    "
    >
      <div className=" text-center">
        <img src={icon} alt="" srcset="" className="block m-auto" />
        <p className=" text-base font-semibold  mt-3">{title}</p>
      </div>
    </div>
  );
}

export default Manage_settings_card;
