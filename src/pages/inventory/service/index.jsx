import React from "react";
import SearchItems from "../../../components/inventory/search-items";
import InventoryHeader from "../../../components/inventory/InventoryHeader";
import ServicesTable from "../../../components/inventory/services-table";
import { Link } from "react-router-dom";

const Services = () => {
  const lists = [
    {
      id: 1,
      rendered: "Trianing",
      bought: "Plumering",
    },
    {
      id: 2,
      rendered: "Mobile App Design",
      bought: "Painting",
    },
    {
      id: 3,
      rendered: "Content Creator",
      bought: "Carpentary",
    },
    {
      id: 4,
      rendered: "Trianing",
      bought: "Plumering",
    },
    {
      id: 5,
      rendered: "Designs",
      bought: "Welding",
    },
    {
      id: 6,
      rendered: "UI/UX",
      bought: "",
    },
    {
      id: 1,
      rendered: "Data Anaysis",
      bought: "",
    },
  ];
  return (
    <div className="bg-[#F0F1F3] pb-5">
      <InventoryHeader />
      <div className=" flex justify-between pt-5 gap-5 pl-2 pr-10">
        <div className=" bg-white rounded-md p-3">
          <p className=" text-[#1C1C1C] font-bold pt-2 pb-3 text-[20px] inter">
            Services Categories
          </p>
          <div className=" flex items-end gap-5">
            {/*  */}
            <div className=" grid gap-3 items-end justify-center">
              <p className=" text-center font-bold text-[#16191F] text-[14px] inter">
                6
              </p>
              <p className=" text-center font-bold text-[#16191F] text-[14px] inter">
                Service rendered
              </p>
            </div>
            <div className=" pb-2">
              <img
                className="h-[35px]"
                src={require("../../../assets/Line1.png")}
                alt=""
              />
            </div>
            {/*  */}
            <div className=" grid gap-3 items-end justify-center">
              <p className=" text-center font-bold text-[#16191F] text-[14px] inter">
                4
              </p>
              <p className=" text-center font-bold text-[#16191F] text-[14px] inter">
                Service Bought
              </p>
            </div>
          </div>
        </div>

        {/*sec  */}
        <div className=" bg-white rounded-md p-5">
          <div className=" flex items-end gap-3">
            {/*  */}
            <div className=" grid gap-3 items-end justify-center">
              <p className="  font-bold text-[#1570EF] text-[14px] inter">
                Total Services Rendered
              </p>
              <p className="  font-bold text-[#16191F] text-[14px] inter">
                $50,000
              </p>
              <p className="  font-light text-[#16191F] text-[14px] inter">
                Last 7 days
              </p>
            </div>
            {/*  */}
            <div className=" ">
              <img
                className="h-[100px]"
                src={require("../../../assets/Line2.png")}
                alt=""
              />
            </div>
            {/*  */}
            <div className=" grid gap-3 items-end justify-center">
              <p className="  font-bold text-[#1570EF] text-[14px] inter">
                Total Service Bought
              </p>
              <p className="  font-bold text-[#16191F] text-[14px] inter">
                $50,000
              </p>
              <p className="  font-light text-[#16191F] text-[14px] inter">
                Last 7 days
              </p>
            </div>
            {/*  */}
            <div className=" ">
              <img
                className="h-[100px]"
                src={require("../../../assets/Line2.png")}
                alt=""
              />
            </div>
            {/*  */}
            <div className=" space-y-3">
              <div className=" flex justify-center items-center">
                <img
                  className=" w-[30px] h-[31px]"
                  src={require("../../../assets/Group482.png")}
                  alt=""
                />
              </div>

              <div className=" flex items-center gap-5">
                <p className="manrope text-[14px] text-[#1C1C1C] font-bold">
                  $40,000
                </p>
                <p className=" text-[#1C1C1C] text-[14px] font-light">Profit</p>
              </div>
            </div>
          </div>
        </div>
        {/* 3rd */}
        <div>
          <Link
            to="/inventory/services-inventory"
            className=" bn53 hover:bg-[#4f78b1] rounded-md bg-[#1366D9] text-[#fff] flex justify-center items-center w-[138px] h-[48px]"
          >
            View Service
          </Link>
        </div>
      </div>

      <div className=" flex pl-2 pt-5 gap-5 pr-20">
        <div className=" bg-white rounded-md w-[584px] p-5">
          <div className=" flex items-center justify-between">
            <p className=" text-[16px] w-[217px] manrope font-bold text-[#000]">
              Services Categories Percentage Report
            </p>

            <div className=" flex items-center gap-3">
              <div className=" flex items-center gap-2">
                <div className=" bg-[#D355FF] rounded-full w-[15.43px] h-[15.43px]"></div>
                <p className=" text-[#D355FF] font-light">Services Rendered</p>
              </div>
              <div className=" flex items-center gap-2">
                <div className=" bg-[#771EF9] rounded-full w-[15.43px] h-[15.43px]"></div>
                <p className=" text-[#771EF9] font-light">Services Bought</p>
              </div>
            </div>
          </div>
          <div className=" p-10">
            <img src={require("../../../assets/serviceimg.png")} alt="" />
          </div>
        </div>
        <div className=" w-[354px] h-[421px] overflow-y-scroll  bg-white rounded-md px-5 py-8">
          <p className=" text-[#771EF9] text-[20px] manrope pb-5">
            List Of Services Categories
          </p>
          <div className="">
            <div className=" flex items-center pb-2 justify-between border-b-[0.5px] border-b-[#D0D3D9] gap-10">
              <div className="w-[124px] font-bold flex items-center justify-start text-left">
                <p>Service Rendered</p>
              </div>
              <div className="w-[124px] text-left font-bold flex items-center justify-start">
                <p>Service Bought</p>
              </div>
            </div>
            {/* Map */}
            {lists.map((i) => (
              <div className=" flex items-center py-2 justify-between border-b-[0.5px] border-b-[#D0D3D9] gap-10">
                <div className=" w-[124px] text-[14px] text-left flex items-center justify-start">
                  <p>{i.rendered}</p>
                </div>
                <div className="w-[124px] text-[14px] text-start  flex items-center ">
                  <p>{i.bought}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
