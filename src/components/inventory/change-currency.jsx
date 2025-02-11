import React, { useState } from "react";

const ChangeCurrency = () => {
  const [isCurrency, setIsCurrency] = useState(false);

  const handleCurrency = () => {
    setIsCurrency(!isCurrency);
  };
  return (
    <div>
      <div className="bg-[#A0D5EB] rounded-md flex items-center gap-3 justify-center w-[194px] h-[40px]">
        <p className="inter font-bold">Change Currency</p>
        <svg
          onClick={handleCurrency}
          xmlns="http://www.w3.org/2000/svg"
          className="mt-1"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isCurrency && (
        <div className="absolute z-30 py-3 rounded-md bg-white w-[103px] pl-2  h-auto">
          <div className=" gap-5  grid  text-black">
            <div className="hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer  rounded-md pr-3 w-[74px] h-[27px] border-[0.5px]  flex justify-center items-center border-[#494949]">
              Naira
            </div>
            <div className="hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer  rounded-md pr-3 w-[74px] h-[27px] border-[0.5px]  flex justify-center items-center border-[#494949]">
              Dollar
            </div>
            <div className="hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer  rounded-md pr-3 w-[74px] h-[27px] border-[0.5px]  flex justify-center items-center border-[#494949]">
              Cedi
            </div>
            <div className="hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer  rounded-md pr-3 w-[74px] h-[27px] border-[0.5px]  flex justify-center items-center border-[#494949]">
              Euro
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeCurrency;
