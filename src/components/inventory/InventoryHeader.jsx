import React from "react";
import SuperAdmin from "./super-admin";

const InventoryHeader = () => {
  return (
    <div className=" bg-white pb-4 lg:flex md:flex grid justify-between items-center  lg:px-5 md:px-5 px-5 rounded-bl-xl ml-1 ">
      <div>
        <p className=" text-[24px] text-[#101828] font-bold manrope">
          Inventory
        </p>
      </div>
      <div className=" lg:flex md:flex grid lg:pt-0 md:pt-0 pt-5 items-center gap-5">
        <SuperAdmin />
      </div>
    </div>
  );
};

export default InventoryHeader;
