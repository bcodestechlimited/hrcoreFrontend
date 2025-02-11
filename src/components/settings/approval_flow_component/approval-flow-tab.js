import React from "react";
import { HiChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function ApprovalFlowTab({ icon, title, name, link }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center mb-10 flex-wrap">
      <span
        className=" font-semibold text-[15px] text-[#667085] cursor-pointer"
        onClick={() => navigate(-1)}
        // onClick={() => console.log("this is workijng ")}
      >
        Approval Flow
      </span>
      <HiChevronRight size={"20px"} />

      <span className=" font-semibold text-[15px]">{name}</span>
    </div>
  );
}

export default ApprovalFlowTab;
