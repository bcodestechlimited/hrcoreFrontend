import React, { useState } from "react";
import ChangeCurrency from "../../../components/inventory/change-currency";
import SuperAdmin from "../../../components/inventory/super-admin";
import DownloadAll from "../../../components/inventory/DownloadAll";
import CategoriesItemsTable from "../../../components/inventory/categories-items-table";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("items");
  return (
    <div className=" bg-[#F0F1F3]">
      <div className=" bg-white pb-4 lg:flex md:flex grid justify-between items-center  lg:px-5 md:px-5 px-5 rounded-bl-xl ml-1 ">
        <div>
          <p className=" text-[24px] text-[#101828] font-bold manrope">
            Inventory
          </p>
        </div>
        <div className=" lg:flex md:flex grid lg:pt-0 md:pt-0 pt-5 items-center gap-5">
          <ChangeCurrency />
          <SuperAdmin />
        </div>
      </div>

      <div className=" flex items-center justify-between pl-5 pr-20 pt-5">
        <p className=" text-[24px] text-[#1C1C1C] manrope ">Categories</p>
        <div className=" flex items-center gap-5">
          <div>
            {selectedCategory === "items" && (
              <div className="">
                <button className="w-[230px] h-[44px] bg-[#1366D9] text-white rounded-md text-[16px]">
                  Add Items Categories
                </button>
              </div>
            )}

            {selectedCategory === "services" && (
              <div className="">
                <button className="w-[230px] h-[44px] bg-[#1366D9] text-white rounded-md text-[16px]">
                  Add Service Categories
                </button>
              </div>
            )}
          </div>
          {/* <button className=" w-[230px] h-[44px] bg-[#1366D9] text-white rounded-md text-[16px]">
            Add Items Categories
          </button> */}
          <div>
            <DownloadAll />
          </div>
        </div>
      </div>

      <div className=" flex items-center border-b-[0.7px] border-b-[#E6E6E8] pl-5 pt-5 gap-32">
        <p
          className={`text-[16px] manrope text-[#667085] cursor-pointer ${
            selectedCategory === "items" ? "font-bold" : ""
          }`}
          onClick={() => setSelectedCategory("items")}
        >
          Items Categories
        </p>
        <p
          className={`text-[16px] manrope text-[#667085] cursor-pointer ${
            selectedCategory === "services" ? "font-bold" : ""
          }`}
          onClick={() => setSelectedCategory("services")}
        >
          Service Categories
        </p>
      </div>

      <div className=" flex items-center gap-10 pl-5 pt-5">
        <p className=" text-[14px] manrope text-[#1B1B1B]">
          Total Item Categories
        </p>
        <p className=" text-[14px] manrope text-[#1B1B1B] font-bold">10</p>
      </div>

      <div className=" pl-5 pt-5">
        {selectedCategory === "items" && (
          <div className="bg-white w-[427px] h-auto pl-5 pt-5 rounded-md">
            <p className="text-[16px] manrope text-[#F4B459]">
              List Of Items Categories
            </p>
            <div>
              <CategoriesItemsTable />
            </div>
          </div>
        )}

        {selectedCategory === "services" && (
          <div className="bg-white w-[427px] h-auto pl-5 pt-5 rounded-md">
            <p className="text-[16px] manrope text-[#F4B459]">
              List Of Items Categories
            </p>
            <div>
              <CategoriesItemsTable />
            </div>
          </div>
        )}
      </div>

      {/* <div className=" bg-white w-[427px] h-auto pl-5 pt-5">
        <p className=" text-[16px] manrope text-[#F4B459]">
          List Of Items Categories
        </p>
        <div>
          <CategoriesItemsTable />
        </div>
      </div> */}
    </div>
  );
};

export default Categories;
