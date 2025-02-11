import React, { useState } from "react";
import InventoryHeader from "../../../components/inventory/InventoryHeader";
import { Link } from "react-router-dom";

const Orderdetails = () => {
  const [activeButton, setActiveButton] = useState("overview");
  const [isDownload, setIsDownload] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const tableHead = [
      "Supplier Name",
      "Item",
      "Contact Number",
      "Email",
      "Policy",
    ],
    tableData = [
      {
        SupplierName: "Richard Martin",
        Item: "Kit Kat",
        ContactNumber: "7687764556",
        Email: "richard@gmail.com",
        Policy: "Taking Return",

        to: "/inventory/order-details",
      },
      {
        SupplierName: "Richard Martin",
        Item: "Kit Kat",
        ContactNumber: "7687764556",
        Email: "richard@gmail.com",
        Policy: "Taking Return",
      },
      {
        SupplierName: "Richard Martin",
        Item: "Kit Kat",
        ContactNumber: "7687764556",
        Email: "richard@gmail.com",
        Policy: "Taking Return",
      },
      {
        SupplierName: "Richard Martin",
        Item: "Kit Kat",
        ContactNumber: "7687764556",
        Email: "richard@gmail.com",
        Policy: "Taking Return",
      },
      {
        SupplierName: "Richard Martin",
        Item: "Kit Kat",
        ContactNumber: "7687764556",
        Email: "richard@gmail.com",
        Policy: "Taking Return",
      },
      {
        SupplierName: "Richard Martin",
        Item: "Kit Kat",
        ContactNumber: "7687764556",
        Email: "richard@gmail.com",
        Policy: "Taking Return",
      },
    ];

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleIsDownload = () => {
    setIsDownload(!isDownload);
  };

  const handleIsDone = () => {
    setIsDone(!isDone);
  };

  const closehandleIsDone = () => {
    setIsDone(false);
  };

  const details = [
    {
      id: 1,
      item: "Order name",
      text: "Frutose Sugar",
    },
    {
      id: 2,
      item: "Order ID ",
      text: "456567",
    },
    {
      id: 3,
      item: "Buying Price",
      text: "&4306",
    },
    {
      id: 4,
      item: "Unit Price",
      text: "20",
    },
    {
      id: 5,
      item: "Quantity",
      text: "43 Packets",
    },
    {
      id: 6,
      item: "Expected delivery",
      text: "12/12/2023",
    },
  ];

  const supplier = [
    {
      id: 1,
      supply: "Supplier name",
      supplyDesc: "Martin",
    },
    {
      id: 2,
      supply: "Contact Number",
      supplyDesc: "080 778 378 29",
    },
  ];

  return (
    <div className="bg-[#F0F1F3]">
      <InventoryHeader />
      <div className="bg-white rounded-md lg:ml-2 lg:mr-10 md:ml-5 md:mr-8 mx-5 pt-5 mt-5">
        <div className=" flex  justify-between items-center px-5">
          <p className=" inter text-[#1C1C1C] text-[20px] font-bold">
            Frutose Sugar
          </p>
          <div
            onClick={handleIsDownload}
            className="bn53 flex items-center justify-center border-[0.5px] border-[#D0D3D9] hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer w-[100px] h-[40px] rounded-md"
          >
            <p className=" text-[14px] inter "> Download</p>
          </div>
          {isDownload && (
            <div className=" absolute right-10 mt-36 bg-white text-base grid items-center justify-center w-[138px] h-[100px]">
              <p
                onClick={handleIsDone}
                className=" w-[109px] h-[35px] cursor-pointer pl-2 rounded-lg flex manrope items-center border-[0.5px] border-[#494949]"
              >
                As PDF
              </p>

              <p
                onClick={handleIsDone}
                className="w-[109px] h-[35px] pl-2 cursor-pointer rounded-lg flex manrope items-center border-[0.5px] border-[#494949]"
              >
                As Image
              </p>
            </div>
          )}
        </div>
        {isDone && (
          <div className="absolute right-0 left-0 top-0 bottom-0 pl-20 bg-plain bg-opacity-60 flex justify-center items-center  ">
            <div className=" w-[438px] h-[auto] bg-white text-black py-5">
              <div className=" flex items-center justify-end">
                <p
                  onClick={closehandleIsDone}
                  className=" cursor-pointer text-[24px] inter font-bold pr-10 "
                >
                  X
                </p>
              </div>
              <div className=" grid justify-center items-center">
                <img
                  className=" w-[196px] h-[196px]"
                  src={require("../../../assets/Doneimg.png")}
                  alt=""
                />
              </div>
              <p className=" text-center text-[24px] inter font-bold">
                File Successfully{" "}
              </p>
              <p className=" text-center text-[24px] inter font-bold pb-5">
                Downloaded
              </p>
            </div>
          </div>
        )}

        <div className=" pt-5">
          <div className="border-b-[0.5px] border-b-[#F0F1F3] px-5 flex items-center gap-10">
            <button
              className={`text-[#48505E] text-[16px] inter ${
                activeButton === "overview"
                  ? "border-b-[#1366D9] border-b-[1px] font-bold"
                  : ""
              }`}
              onClick={() => handleButtonClick("overview")}
            >
              Overview
            </button>
            <button
              className={`text-[#667085] text-[16px] inter ${
                activeButton === "history"
                  ? "border-b-[#1366D9] border-b-[1px] font-bold"
                  : ""
              }`}
              onClick={() => handleButtonClick("history")}
            >
              History
            </button>
            <Link
              to="/inventory/invoice"
              className={`text-[#667085] text-[16px] inter ${
                activeButton === "invoice"
                  ? "border-b-[#1366D9] border-b-[1px] font-bold"
                  : ""
              }`}
            >
              View Invoice
            </Link>
          </div>
          {activeButton === "overview" && (
            <div className="px-5">
              {/* Content for Overview */}
              <div className="card flex items-center justify-between py-5 px-5">
                <div className=" w-[35%]">
                  <p className=" font-bold inter text-[20px] text-[#1C1C1C] py-5">
                    Primary Details
                  </p>

                  <div className=" grid gap-6">
                    {details.map((items) => (
                      <div key={items.id} className=" flex justify-center">
                        <div className=" w-[200px] text-[14px]  inter text-[#1c1c1c]">
                          {items.item}
                        </div>
                        <div className=" w-[200px] text-[14px]  inter text-[#1c1c1c]">
                          {items.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className=" font-bold inter text-[20px] text-[#1C1C1C] pt-10 pb-5">
                    Supplier Details
                  </p>
                  <div className=" grid gap-6">
                    {supplier.map((i) => (
                      <div key={i.id} className=" flex justify-center">
                        <div className=" w-[200px] text-[14px]  inter text-[#1c1c1c]">
                          {i.supply}
                        </div>
                        <div className=" w-[200px] text-[14px]  inter text-[#1c1c1c]">
                          {i.supplyDesc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className=" w-[35%]">
                  <div className=" justify-center grid pb-10">
                    <img
                      className=" w-[170px] h-[170px]"
                      src={require("../../../assets/Group66.png")}
                      alt=""
                    />
                  </div>
                  <div className=" flex justify-between items-center">
                    <p className="text-[#858D9D] inter text-[16px]">Status</p>
                    <p className=" text-[16px] text-[#F79009] inter">Pending</p>
                  </div>
                </div>
              </div>
              <div className=" flex justify-end items-center py-5">
                <button className="w-[97px] h-[38px] border-[#D4D4D4] border-[0.5px] rounded-md">
                  Close
                </button>
              </div>
            </div>
          )}
          {activeButton === "history" && (
            <div className="px-5">
              {/* Content for History */}
              <div className="card">
                <div className=" w-full py-4 overflow-x-scroll overflow-y-hidden ">
                  <table className="min-w-full table divide-y-2 divide-yellow-[#7E3AF2] rounded-xl ">
                    <thead className="h-16 w-full  ">
                      <tr className="bg-[#fff] text-black ">
                        {tableHead?.map((it, index) => (
                          <th
                            className=" text-left font-roboto px-4 text-[14px] text-[#667085]  font-light"
                            key={index}
                          >
                            {it}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="divide-y">
                      {tableData?.map((it, i) => (
                        <tr
                          key={i}
                          className=" bg-white py-4 h-16 justify-center font-roboto   "
                        >
                          <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                            <Link to={it?.to}> {it?.SupplierName}</Link>
                          </td>
                          <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                            <Link to={it?.to}>{it?.Item}</Link>
                          </td>
                          <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                            <Link to={it?.to}>{it?.ContactNumber}</Link>
                          </td>
                          <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                            <Link to={it?.to}> {it?.Email}</Link>
                          </td>
                          <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                            <Link to={it?.to}>{it?.Policy}</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orderdetails;
