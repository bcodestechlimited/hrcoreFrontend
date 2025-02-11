import React from "react";
import ChangeCurrency from "../../../components/inventory/change-currency";
import SuperAdmin from "../../../components/inventory/super-admin";
import { Link } from "react-router-dom";
import SalesPurchaseGraph from "../../../components/inventory/sales-and-purchase-graph";
import ItemsSummary from "../../../components/inventory/items-summary";

const ItemsInventory = () => {
  return (
    <div className=" bg-[#F0F1F3] pb-1">
      <div className=" bg-white  pb-4 lg:flex md:flex grid justify-between items-center  lg:px-5 md:px-5 px-5 rounded-bl-xl ml-1 ">
        <div className=" ">
          <p className=" text-[24px] text-[#101828] font-bold manrope">
            Inventory
          </p>
        </div>
        <div className=" lg:flex md:flex grid lg:pt-0 md:pt-0 pt-5 items-center gap-5">
          <ChangeCurrency />
          <SuperAdmin />
        </div>
      </div>

      <div className="lg:ml-3 lg:mr-3 md:ml-5 md:mr-8 mx-5 bg-white text-[#1C1C1C] rounded-md grid mt-5 px-5 py-3 relative shadow-md">
        <div className=" flex items-center justify-between">
          <p className="manrope text-[20px] ">Items Inventory</p>
          <div>
            <Link
              to="/inventory/items-inventory"
              className=" bn53 hover:bg-[#4f78b1] rounded-md bg-[#1366D9] text-[#fff] flex justify-center items-center w-[138px] h-[48px]"
            >
              View Items
            </Link>
          </div>
        </div>

        {/* Item Categories */}
        <div className="  flex-wrap flex items-center justify-between  pt-5">
          <div className=" flex items-center gap-3">
            <div className="grid w-[85px] h-[auto] manrope">
              <p className=" text-[16px] text-[#1570EF]">Item Categories</p>
              <p className=" text-[16px] font-bold py-3">10</p>
              <p className=" text-[#16191F] text-[14px] font-light">
                Last 7 days
              </p>
            </div>

            <div className=" lg:grid items-end md:hidden hidden ">
              <img
                className=" h-[100px] pb-4 absolute bottom-0 lg"
                src={require("../../../assets/Line13.png")}
                alt=""
              />
            </div>
          </div>

          {/* Total Products*/}

          <div className=" flex items-center lg:pl-2 gap-3 lg:pr-4">
            <div className="grid pt-6">
              <p className=" text-[#E19133] inter text-[16px] ">Total Items</p>

              <div className=" flex items-center gap-6 ">
                <div className="grid  ">
                  <p className="py-3  inter text-[16px] font-bold text-[#1C1C1C]">
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

            <div className=" lg:grid items-end md:hidden hidden ">
              <img
                className=" h-[100px] pb-4 absolute bottom-0"
                src={require("../../../assets/Line13.png")}
                alt=""
              />
            </div>
          </div>
          {/* Total Products*/}

          <div className=" flex items-center gap-5 lg:pr-4">
            <div className="grid pt-6">
              <p className=" text-[#845EBC] inter text-[16px] ">
                Total Sold Items
              </p>

              <div className=" flex items-center gap-6 ">
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

            <div className=" lg:grid items-end md:hidden hidden ">
              <img
                className=" h-[100px] pb-4 absolute bottom-0"
                src={require("../../../assets/Line13.png")}
                alt=""
              />
            </div>
          </div>

          {/* Top Selling*/}

          <div className=" flex items-center gap-2">
            <div className="grid pt-6">
              <p className=" text-[#845EBC] inter text-[16px]">Top Selling</p>

              <div className=" flex items-center gap-10 ">
                <div className="grid  ">
                  <p className="py-3  inter text-[16px] font-bold text-[#1C1C1C]">
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

            <div className=" lg:grid items-end md:hidden hidden ">
              <img
                className=" h-[100px] pb-4 absolute bottom-0"
                src={require("../../../assets/Line13.png")}
                alt=""
              />
            </div>
          </div>

          {/* Low Stocks*/}

          <div className=" flex items-center gap-3 pl-2">
            <div className="grid pt-6">
              <p className=" text-[#F36960] inter text-[16px]">Low Stocks</p>

              <div className=" flex items-center justify-between gap-6 ">
                <div className="grid  ">
                  <p className="py-3  inter text-[16px] text-[#1C1C1C] font-bold">
                    12
                  </p>
                  <p className=" text-[#16191F] text-[14px] ">In Stock</p>
                </div>
                <div className="grid  ">
                  <p className="py-3  inter text-[16px] text-[#1C1C1C] text-center font-bold">
                    2
                  </p>
                  <p className=" text-[#16191F] text-[14px] ">Low In Stock</p>
                </div>
                <div className="grid">
                  <p className=" py-3 text-right manrope text-[16px] text-[#1C1C1C] font-bold">
                    3
                  </p>
                  <p className=" text-right">Out of Stock</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex gap-5 pl-3 pr-20 my-5">
        <div className=" bg-white rounded-md w-[499px] shadow-md h-auto p-5">
          <SalesPurchaseGraph />
        </div>
        <div className=" bg-white rounded-md w-[551px] h-[270px] shadow-md overflow-y-scroll ">
          <ItemsSummary />
        </div>
      </div>
    </div>
  );
};

export default ItemsInventory;
