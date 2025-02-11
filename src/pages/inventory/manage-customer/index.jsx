import React from "react";
import SuperAdmin from "../../../components/inventory/super-admin";
import CustomerCard from "../../../components/inventory/customer-card";

const ManageCustomer = () => {
  return (
    <div className=" bg-[#F0F1F3]">
      <div className=" bg-white pb-4 lg:flex md:flex grid justify-between items-center  lg:px-5 md:px-5 px-5 rounded-bl-xl ml-1 ">
        <div className=" flex items-center gap-5">
          <p className=" text-[24px] text-[#101828] font-bold manrope">
            Inventory
          </p>
          <div className=" flex items-center">
            <div className=" absolute pl-5">
              <img
                className=" w-[24px] h-[24px]"
                src={require("../../../assets/Searchcustomer.png")}
                alt=""
              />
            </div>

            <input
              className=" w-[425px] h-[58px] bg-white text-black pl-14 border-none"
              placeholder="Search Customer"
              type="text"
            />
          </div>
        </div>
        <div className=" lg:flex md:flex grid lg:pt-0 md:pt-0 pt-5 items-center gap-5">
          <SuperAdmin />
        </div>
      </div>

      {/*  */}
      <div className="lg:ml-5 lg:mr-10 md:ml-5 md:mr-8 mx-5 py-5">
        <CustomerCard />
      </div>
      <div className="lg:ml-5 lg:mr-10 md:ml-5 md:mr-8 mx-5 pb-5">
        <div className=" bg-white flex items-center rounded-md py-5 px-3 gap-5 justify-between">
          <div className=" grid gap-1 ">
            <p className="text-[15px] text-[#6C757D] manrope">
              {" "}
              Online Customer
            </p>
            <p className="text-[24px] font-bold text-[#6C757D] manrope">60%</p>
            <div className=" bg-[#41A5FF] h-[31px] w-[332px]"></div>
          </div>
          <div className=" grid gap-1 ">
            <p className="text-[15px] text-[#6C757D] manrope">
              {" "}
              Direct Customer
            </p>
            <p className="text-[24px] font-bold text-[#6C757D] manrope">30%</p>
            <div className=" bg-[#62912C] h-[31px] w-[263px]"></div>
          </div>
          <div className=" grid gap-1 ">
            <p className="text-[15px] text-[#6C757D] manrope"> Others</p>
            <p className="text-[24px] font-bold text-[#6C757D] manrope">10%</p>
            <div className=" bg-[#9A55FF] h-[31px] w-[78px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCustomer;
