import React, { useState } from "react";
import { Link } from "react-router-dom";

const OrderCard = () => {
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
  return (
    <div>
      <div className="  absolute top-0 left-0 bottom-0 right-0 z-30  bg-black bg-opacity-60 lg:pl-14 justify-center grid items-center">
        <div className=" p-10 bg-white text-black rounded-md lg:w-[530px] md:w-[400px] w-full overflow-y-scroll lg:h-[500px] ">
          <p className=" text-[20px] pb-5 inter">New Purchase order</p>
          <div className=" grid gap-5">
            <div className=" flex items-center justify-between">
              <label className=" text-[#48505E] text-[16px]" htmlFor="">
                Products
              </label>
              <input
                className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
                placeholder="Fructose Sugar"
                type="text"
              />
            </div>
            <div className=" flex items-center justify-between">
              <label className=" text-[#48505E] text-[16px]" htmlFor="">
                Order ID
              </label>
              <input
                className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
                placeholder="456567"
                type="text"
              />
            </div>

            <div className=" flex items-center justify-between">
              <label className=" text-[#48505E] text-[16px]" htmlFor="">
                Category
              </label>

              <div className="relative">
                <input
                  className="w-[273px] h-[44px] pr-10 rounded-md border-[0.5px] border-[#D0D5DD]"
                  placeholder="Enter supplier Policy Type"
                  type="text"
                />
                <svg
                  onClick={handleIsCategory}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {isCategory && (
                <div className=" absolute right-20 ">
                  <div className=" bg-white text-black w-[286px] grid gap-5 rounded-md pl-4 py-5">
                    <p className=" w-[190px] h-[34px] border-[0.5px] border-[#A5A5A5] grid items-center pl-3 rounded-md">
                      Provisions
                    </p>
                    <p className=" w-[190px] h-[34px] border-[0.5px] border-[#A5A5A5] grid items-center pl-3 rounded-md">
                      Body Soap
                    </p>
                    <p className=" w-[190px] h-[34px] border-[0.5px] border-[#A5A5A5] grid items-center pl-3 rounded-md">
                      Deterfent
                    </p>
                    <p className=" w-[190px] h-[34px] border-[0.5px] border-[#A5A5A5] grid items-center pl-3 rounded-md">
                      Food Stuff
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className=" flex items-center justify-between">
              <label className=" text-[#48505E] text-[16px]" htmlFor="">
                Quantity
              </label>
              <input
                className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
                placeholder="43 Packets"
                type="text"
              />
            </div>
            <div className=" flex items-center justify-between">
              <label className=" text-[#48505E] text-[16px]" htmlFor="">
                Unit Price
              </label>
              <input
                className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
                placeholder="$20"
                type="text"
              />
            </div>
            <div className=" flex items-center justify-between">
              <label className=" text-[#48505E] text-[16px]" htmlFor="">
                purchase price
              </label>
              <input
                className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
                placeholder="$4306"
                type="text"
              />
            </div>
            <div className=" flex items-center justify-between">
              <label className=" text-[#48505E] text-[16px]" htmlFor="">
                Date of delivery
              </label>
              <input
                className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
                placeholder="12/12/2023"
                type="text"
              />
            </div>
          </div>

          <div className=" flex items-center gap-2 py-4">
            <input type="checkbox" />
            <p className=" text-[16px] inter text-[#858D9D]">
              Notify on the date of delivery
            </p>
          </div>
          <div className=" flex justify-end items-center gap-5 pt-5">
            <Link
              to="/inventory/purchase-order"
              className=" w-[110px] h-[40px] flex justify-center items-center border-[0.50px] hover:border-[#1366D9] hover:text-[#1366D9] border-[#1C1C1C] inter rounded-md"
            >
              Cancel
            </Link>
            <div className=" bg-[#1366D9] w-[168px] h-[40px] hover:bg-[#a0bde7] cursor-pointer inter text-white flex justify-center items-center rounded-md ">
              Add Purchase Order
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
