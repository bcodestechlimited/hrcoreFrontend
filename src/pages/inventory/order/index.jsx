import React, { useState } from "react";
import InventoryHeader from "../../../components/inventory/InventoryHeader";
import SearchItems from "../../../components/inventory/search-items";

import { useNavigate } from "react-router-dom";

const Order = () => {
  const [addOrder, setAddOrder] = useState(false);
  const [isCategory, setIsCategory] = useState(false);

  const handleIsCategory = () => {
    setIsCategory(!isCategory);
  };

  const handleAddOrder = () => {
    setAddOrder(!addOrder);
  };
  const closehandleAddOrder = () => {
    setAddOrder(false);
  };

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/inventory/overall-order");
  };
  return (
    <div className="bg-[#F0F1F3]">
      <InventoryHeader />
      <div className=" flex gap-3">
        <SearchItems placeholder="Search Items, supplier, order" />
        <div className=" grid items-end">
          <div
            onClick={handleNavigation}
            className=" bn53 bg-[#1366D9] w-[152px] gap-2  h-[40px] hover:bg-[#a0bde7] cursor-pointer inter text-white flex justify-center items-center rounded-md "
          >
            <img
              className=" w-[22px] h-[22px]"
              src={require("../../../assets/icon-wrapper-h.png")}
              alt=""
            />
            <p>Add Order</p>
          </div>
        </div>
      </div>

      <div className="lg:ml-5 lg:mr-10 md:ml-5 md:mr-8 mx-5 bg-white text-[#1C1C1C] rounded-md grid mt-5 px-5 py-3 relative">
        <p className="manrope text-[22px] font-bold ">Overall Orders</p>
        {/* Item Categories */}
        <div className=" flex-wrap flex items-center justify-between  pt-5">
          <div className=" flex items-center gap-5">
            <div className="grid w-[85px] h-[auto] manrope">
              <p className=" text-[16px] text-[#1570EF]">Total Orders</p>
              <p className=" text-[16px] font-bold py-3">10</p>
              <p className=" text-[#16191F] text-[14px] font-light">
                Last 7 days
              </p>
            </div>
          </div>
          <div className=" lg:grid items-end md:hidden hidden ">
            <img
              className=" h-[100px] pb-4 absolute bottom-0 lg"
              src={require("../../../assets/Line13.png")}
              alt=""
            />
          </div>
          {/* Service Categories */}

          <div className=" flex items-center gap-5">
            <div className="grid w-[85px] h-[auto] manrope">
              <p className=" text-[16px] text-[#1570EF]">Total Received</p>
              <p className=" text-[16px] font-bold py-3">2</p>
              <p className=" text-[#16191F] text-[14px] font-light">
                Last 7 days
              </p>
            </div>
          </div>
          <div className=" lg:grid items-end md:hidden hidden ">
            <img
              className=" h-[100px] pb-4 absolute bottom-0"
              src={require("../../../assets/Line13.png")}
              alt=""
            />
          </div>

          {/* Total Products*/}

          <div className=" flex items-center gap-5 lg:pr-4">
            <div className="grid pt-6">
              <p className=" text-[#E19133] inter text-[16px] font-bold">
                Total Returned
              </p>

              <div className=" flex items-center gap-10 ">
                <div className="grid  ">
                  <p className="py-3  inter text-[16px] text-[#1C1C1C] font-bold">
                    868
                  </p>
                  <p className=" text-[#16191F] text-[14px] ">Last 7 days</p>
                </div>
                <div className="grid">
                  <p className=" py-3 manrope text-[16px] text-[#1C1C1C] font-bold">
                    N25000
                  </p>
                  <p>Revenue</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:grid items-end md:hidden hidden ">
            <img
              className=" h-[100px] pb-4 absolute bottom-0"
              src={require("../../../assets/Line13.png")}
              alt=""
            />
          </div>

          {/* Top Selling*/}

          <div className=" flex items-center gap-8">
            <div className="grid pt-6">
              <p className=" text-[#845EBC] inter text-[16px] font-bold">
                On the way
              </p>

              <div className=" flex items-center gap-10 ">
                <div className="grid  ">
                  <p className="py-3  inter text-[16px] text-[#1C1C1C] font-bold">
                    5
                  </p>
                  <p className=" text-[#16191F] text-[14px] ">Last 7 days</p>
                </div>
                <div className="grid">
                  <p className=" py-3 text-right manrope text-[16px] text-[#1C1C1C] font-bold">
                    N25000
                  </p>
                  <p className=" text-right">Cost</p>
                </div>
              </div>
            </div>

            <div className=" lg:hidden items-end md:hidden hidden ">
              <img
                className=" h-[100px] pb-4 absolute bottom-0"
                src={require("../../../assets/Line13.png")}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:ml-5 lg:mr-24 md:ml-5 md:mr-8 mx-5 py-5 flex items-center gap-5">
        <div className=" w-[30%] ">
          <div className="bg-white py-5 px-4 rounded-md">
            <div className=" border-b-[0.5px] border-b-[#212529] py-5 pb-2">
              <p className=" manrope text-[16px] text-[#212529]">
                Source of Order
              </p>
            </div>
            <div className=" grid justify-center">
              <img
                className=" w-[197px] h-[197px]"
                src={require("../../../assets/per100.png")}
                alt=""
              />
            </div>
            <div className=" px-4 grid gap-3">
              <div className=" flex justify-between items-center">
                <div className=" flex items-center gap-2">
                  <div className=" w-[10.5px] h-[10.5px] bg-[#41A5FF] rounded-full"></div>
                  <p className=" text-[12px] text-[#ADB5BD] manrope">
                    Online Order
                  </p>
                </div>
                <p className=" font-bold text-[14px] manrope">49%</p>
              </div>
              <div className=" flex justify-between items-center">
                <div className=" flex items-center gap-2">
                  <div className=" w-[10.5px] h-[10.5px] bg-[#62912C] rounded-full"></div>
                  <p className=" text-[12px] text-[#ADB5BD] manrope">
                    Direct Order
                  </p>
                </div>
                <p className=" font-bold text-[14px] manrope">35%</p>
              </div>
              <div className=" flex justify-between items-center">
                <div className=" flex items-center gap-2">
                  <div className=" w-[10.5px] h-[10.5px] bg-[#ED4D5C] rounded-full"></div>
                  <p className=" text-[12px] text-[#ADB5BD] manrope">Others</p>
                </div>
                <p className=" font-bold text-[14px] manrope">16%</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-[70%] ">
          <div className="bg-white px-4 rounded-md">
            <div className=" border-b-[0.5px] border-b-[#212529] py-5 pb-2">
              <p className=" manrope text-[16px] text-[#212529]">
                Orders per Week
              </p>
            </div>

            <div className="py-3">
              <img src={require("../../../assets/OrderPer.png")} alt="" />
            </div>

            <div className="border-t-[0.5px] border-t-[#212529] py-5 flex items-center gap-5">
              <p>Order</p>
              <div className=" flex items-center gap-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
