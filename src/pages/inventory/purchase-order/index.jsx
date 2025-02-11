import React, { useState } from "react";
import InventoryHeader from "../../../components/inventory/InventoryHeader";
import RecentActivity from "../../../components/inventory/recent-activity";
import PurchaseOrdersTable from "../../../components/inventory/purchase-orders-table";
import { Link } from "react-router-dom";
import OrderCard from "../../../components/inventory/OrderCard";

const PurchaseOrder = () => {
  const [addOrder, setAddOrder] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [isExpenses, setIsExpenses] = useState(false);

  const handleisExpenses = () => {
    setIsExpenses(!isExpenses);
  };
  const handleIsCategory = () => {
    setIsCategory(!isCategory);
  };

  const handleAddOrder = () => {
    setAddOrder(!addOrder);
  };
  const closehandleAddOrder = () => {
    setAddOrder(false);
  };
  return (
    <div className="bg-[#F0F1F3]">
      <InventoryHeader />
      <div className=" flex gap-x-10 pl-5">
        <div className="">
          <div className=" bg-white rounded-md w-[680px] h-[auto] p-5 mt-5 ">
            <div className=" flex items-center justify-between">
              <div className=" flex items-center gap-5">
                <p className=" font-bold text-[16px]">Purchase Orders</p>
                <div className=" flex items-center">
                  <div className=" absolute pl-3">
                    <img
                      className=" w-[24px] h-[24px]"
                      src={require("../../../assets/Searchcustomer.png")}
                      alt=""
                    />
                  </div>

                  <input
                    className=" w-[180px] h-[30px] rounded-md border-[0.3px] border-gray-200 bg-white text-black pl-10 "
                    placeholder="Search "
                    type="text"
                  />
                </div>
              </div>
              <div className=" flex items-center gap-5">
                <button
                  onClick={handleisExpenses}
                  className=" text-[#2A72A8] rounded-md manrope text-[14px] border-[0.5px] border-[#2A72A8] w-[110px] h-[39px]"
                >
                  View Expenses
                </button>
                {isExpenses && (
                  <div>
                    <OrderCard />
                  </div>
                )}
                <div className=" flex justify-end items-center py-5">
                  <div
                    onClick={handleAddOrder}
                    className=" w-[118px] h-[37px] rounded-md cursor-pointer hover:bg-blue-600 bg-[#04B4FC] text-white manrope flex items-center justify-center gap-3"
                  >
                    <img
                      className=" w-[16px] h-[16px]"
                      src={require("../../../assets/icon-wrapper-h.png")}
                      alt=""
                    />
                    <p className=" text-[12px] text-white manrope">
                      Place Order
                    </p>
                    {addOrder && (
                      <div>
                        <OrderCard />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <PurchaseOrdersTable />
            </div>
          </div>
        </div>
        <div className=" grid w-full ">
          <div className="bg-white w-full">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrder;
