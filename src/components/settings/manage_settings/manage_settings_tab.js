import React from "react";
import { HiChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Manage_settings_tab({ icon, title, name, link }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center mb-10 flex-wrap ">
      <span
        className=" font-semibold text-[15px] text-[#667085] cursor-pointer "
        onClick={() => {
          console.log("this is workijng ");
          navigate(link || "/settings");
        }}
      >
        Company Settings
      </span>
      <HiChevronRight size={"20px"} />

      <span className=" font-semibold text-[15px]">{name}</span>
    </div>
  );
}

export default Manage_settings_tab;
