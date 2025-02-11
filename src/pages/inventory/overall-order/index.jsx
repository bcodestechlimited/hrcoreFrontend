import React from "react";
import InventoryHeader from "../../../components/inventory/InventoryHeader";
import SearchItems from "../../../components/inventory/search-items";
import OrdersTable from "../../../components/inventory/orders-table";

const OverallOrder = () => {
  return (
    <div className="bg-[#F0F1F3]">
      <InventoryHeader />
      <div className=" flex gap-3">
        <SearchItems placeholder="Search Items, supplier, order" />
      </div>

      <div className="lg:ml-5 lg:mr-24 md:ml-5 md:mr-8 mx-5 bg-white text-[#1C1C1C] rounded-md grid mt-5 px-5 py-3 relative">
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
      <div className="lg:ml-5 lg:mr-10 md:ml-5 md:mr-8 mx-5 py-5">
        <OrdersTable />
      </div>
    </div>
  );
};

export default OverallOrder;
