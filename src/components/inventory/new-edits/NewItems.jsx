import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewItems = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState(false);
  const [addItem, setAddItem] = useState(false);

  const handleCategory = () => {
    setCategory(!category);
  };

  const handleAddItem = () => {
    setAddItem(!addItem);
  };

  const closeHandleAddItem = () => {
    setAddItem(false);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="  absolute top-0 left-0 bottom-0 right-0 z-30  bg-black bg-opacity-60 lg:pl-14 justify-center grid items-center">
      <div className=" p-10 bg-white text-black rounded-md lg:w-[530px] md:w-[400px] w-full overflow-y-scroll lg:h-[500px] ">
        <p className=" text-[20px] inter">New Item</p>
        <div className=" flex gap-5 py-5 justify-center items-center">
          <img
            className=" w-[81px] h-[81px]"
            src={require("../../../assets/tanta.png")}
            alt=""
          />
          <div className="grid justify-center">
            <p className=" text-center text-[#858D9D] text-[14px]">
              Drag image here
            </p>
            <p className=" text-center text-[#858D9D] text-[14px]">or</p>
            <p className=" cursor-pointer text-center text-[#448DF2] text-[14px]">
              Browse image
            </p>
          </div>
        </div>

        <div className=" grid gap-5">
          <div className=" flex items-center justify-between">
            <label className=" text-[#48505E] text-[16px]" htmlFor="">
              Item Name
            </label>
            <input
              className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
              placeholder="Enter Item name"
              type="text"
            />
          </div>
          <div className=" flex items-center justify-between">
            <label className=" text-[#48505E] text-[16px]" htmlFor="">
              Item ID
            </label>
            <input
              className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
              placeholder="Enter Item ID"
              type="text"
            />
          </div>

          <div className="  flex items-center justify-between">
            <p className="inter text-[#383E49] text-[16px]">Category</p>
            <div className="relative">
              <input
                className="w-[273px] h-[44px] pr-10 rounded-md border-[0.5px] border-[#D0D5DD]"
                placeholder="Select Service category"
                type="text"
              />
              <svg
                onClick={handleCategory}
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
            {category && (
              <div className=" absolute right-40 mt-4 gap-1 pl-2 py-4 bg-white grid items-center text-black w-[226px] h-[110px] rounded-md">
                <p className=" w-[190px] h-[34px] cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2">
                  Provisions
                </p>
                <p className=" w-[190px] h-[34px] cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2">
                  Service Rendered
                </p>
              </div>
            )}
          </div>

          <div className=" flex items-center justify-between">
            <label className=" text-[#48505E] text-[16px]" htmlFor="">
              Purchase Price
            </label>
            <input
              className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
              placeholder="Enter buying price"
              type="text"
            />
          </div>
          <div className=" flex items-center justify-between">
            <label className=" text-[#48505E] text-[16px]" htmlFor="">
              Quantity
            </label>
            <input
              className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
              placeholder="Enter product quantity"
              type="text"
            />
          </div>
          <div className=" flex items-center justify-between">
            <label className=" text-[#48505E] text-[16px]" htmlFor="">
              Selling Price
            </label>
            <input
              className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
              placeholder="Enter Selling Price"
              type="text"
            />
          </div>
          <div className=" flex items-center justify-between">
            <label className=" text-[#48505E] text-[16px]" htmlFor="">
              Expiry Date
            </label>
            <input
              className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
              placeholder="Enter expiry date"
              type="text"
            />
          </div>
          <div className=" flex items-center justify-between">
            <label className=" text-[#48505E] text-[16px]" htmlFor="">
              Date of Entry
            </label>
            <input
              className=" border-[0.5px] border-[#D0D5DD] rounded-md w-[273px] h-[44px]"
              placeholder="March 11, 2023"
              type="text"
            />
          </div>
        </div>
        <div className=" flex justify-end items-center gap-5 pt-5">
          <button
            onClick={handleCancel}
            className=" w-[110px] h-[40px] border-[0.50px] hover:border-[#1366D9] hover:text-[#1366D9] border-[#1C1C1C] inter rounded-md"
          >
            Cancel
          </button>
          <div className=" bg-[#1366D9] w-[142px] gap-2  h-[40px] hover:bg-[#a0bde7] cursor-pointer inter text-white flex justify-center items-center rounded-md ">
            <img
              className=" w-[22px] h-[22px]"
              src={require("../../../assets/icon-wrapper-h.png")}
              alt=""
            />
            <p>Add Item</p>
          </div>
          {/* <div className=" bg-[#1366D9] w-[93px] h-[40px] hover:bg-[#a0bde7] cursor-pointer inter text-white flex justify-center items-center rounded-md ">
          Add Item
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default NewItems;
