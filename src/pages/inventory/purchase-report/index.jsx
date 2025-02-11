import React, { useState } from "react";
import InventoryHeader from "../../../components/inventory/InventoryHeader";
import { Link } from "react-router-dom";
import Download from "../../../components/inventory/Download";

const PurchaseReport = () => {
  const [selectedReport, setSelectedReport] = useState("daily");
  return (
    <div className="bg-[#F0F1F3]">
      <InventoryHeader />
      <div className=" bg-white lg:ml-1 lg:mr-5 md:ml-3 ml-0 mb-5 p-5 mt-1">
        <div className=" bg-white flex items-center justify-between  ">
          <p className=" text-[20px] manrope text-[#000000] font-bold">
            Purchase Report For the Year
          </p>
          <button
            className={`w-[118px] h-[38px] text-[12px] rounded-md manrope ${
              selectedReport === "daily"
                ? "bg-[#1366D9] text-white"
                : "bg-white text-[#1C1C1C] border-[0.5px] border-[#1C1C1C] hover:border-[#04B4FC] hover:text-[#04b4fc]"
            }`}
            onClick={() => setSelectedReport("daily")}
          >
            Daily Report
          </button>
          <button
            className={`w-[118px] h-[38px] text-[12px] rounded-md manrope ${
              selectedReport === "weekly"
                ? "bg-[#1366D9] text-white"
                : "bg-white text-[#1C1C1C] border-[0.5px] border-[#1C1C1C] hover:border-[#04B4FC] hover:text-[#04b4fc]"
            }`}
            onClick={() => setSelectedReport("weekly")}
          >
            Weekly Report
          </button>
          <button
            className={`w-[118px] h-[38px] text-[12px] rounded-md manrope ${
              selectedReport === "monthly"
                ? "bg-[#1366D9] text-white"
                : "bg-white text-[#1C1C1C] border-[0.5px] border-[#1C1C1C] hover:border-[#04B4FC] hover:text-[#04b4fc]"
            }`}
            onClick={() => setSelectedReport("monthly")}
          >
            Monthly Report
          </button>
          <button
            className={`w-[118px] h-[38px] text-[12px] rounded-md manrope ${
              selectedReport === "yearly"
                ? "bg-[#1366D9] text-white"
                : "bg-white text-[#1C1C1C] border-[0.5px] border-[#1C1C1C] hover:border-[#04B4FC] hover:text-[#04b4fc]"
            }`}
            onClick={() => setSelectedReport("yearly")}
          >
            Yearly Report
          </button>

          <Download />
        </div>

        {/*  */}
        {/*  */}
        {selectedReport === "daily" && (
          <div>
            {/* daily report table */}
            <div className="w-full pb-4 overflow-x-scroll overflow-y-hidden pl-1 pr-5 pt-5">
              <table className="min-w-full table divide-y-2 divide-x-2 divide-yellow-[#7E3AF2] rounded-xl">
                <tbody className="divide-y ">
                  {/* Row 1 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className=" manrope text-[20px]  text-[#212529] px-4 cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Purchase Expenses
                    </td>

                    <td className="manrope text-[20px] text-[#212529] font-light px-4 w-[25%]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      $
                    </td>
                    <td className="manrope text-[20px] text-[#212529] font-light px-4 w-[25%]  cursor-pointer ">
                      $
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#6C757D] font-light px-4 text-[14px] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Total Purchase Price of Items
                    </td>
                    {/* Other columns */}
                    <td className="manrope text-[#6C757D] font-light px-4 text-[14px] w-[25%]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      2,701
                    </td>
                    <td className="manrope text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full table divide-y-2 divide-x-2 divide-yellow-[#7E3AF2] rounded-xl">
                <tbody className="divide-y">
                  {/* Row 1 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className=" manrope text-[20px]  text-[#212529] px-4  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Expenses
                    </td>
                    {/* Other columns */}
                    <td className="manrope text-[20px] text-[#212529] font-light px-4  w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      $
                    </td>
                    <td className="manrope text-[20px] text-[#212529] font-light px-4  w-[25%] cursor-pointer ">
                      $
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Advertising
                    </td>
                    {/* Other columns */}
                    <td className="font-roboto font-light px-4 text-[14px] w-[25%] text-[#6C757D] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      200
                    </td>
                    <td className="font-roboto font-light px-4 text-[14px] w-[25%] text-[#6C757D] cursor-pointer "></td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Bank Charges
                    </td>
                    {/* Other columns */}
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      100
                    </td>
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>
                  {/* Row 4 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Fuel
                    </td>
                    {/* Other columns */}
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      500
                    </td>
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>
                  {/* Row 5 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Utilities
                    </td>
                    {/* Other columns */}
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      100
                    </td>
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>

                  {/* Row 6 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]"></td>

                    <td className="font-roboto font-light px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]"></td>
                    <td className="font-roboto font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>

                  {/* Row 7 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#191D23]  px-4 text-[14px]  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Total Expenses
                    </td>

                    <td className="font-roboto  px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      3,601
                    </td>
                    <td className="font-roboto  px-4 text-[14px] w-[25%] cursor-pointer ">
                      <p></p>
                    </td>
                  </tr>

                  {/* Row 8 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#191D23]  px-4 text-[14px]  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Total Income
                    </td>

                    <td className="font-roboto  px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      3,601
                    </td>
                    <td className="font-roboto  px-4 text-[14px] w-[25%] cursor-pointer ">
                      <p></p>
                    </td>
                  </tr>

                  {/* Row 9 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#191D23]  px-4 text-[14px]  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]"></td>

                    <td className="font-roboto text-[#6C757D]  px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      Profit
                    </td>
                    <td className="font-roboto text-[#6C757D]  px-4 text-[14px] w-[25%] cursor-pointer ">
                      Loss
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full table divide-y-2 divide-x-2 divide-yellow-[#7E3AF2] rounded-xl">
                <tbody className="divide-y">
                  {/* Row 9 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#191D23]  px-4 text-[16px]  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Profit/Loss
                    </td>

                    <td className="manrope text-[#191D23]  px-4 text-[16px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      $379
                    </td>
                    <td className="manrope text-[#191D23]  px-4 text-[16px] w-[25%] cursor-pointer ">
                      000000
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className=" flex justify-end items-center">
                <Link
                  to="/inventory/purchase"
                  className=" border-[0.5px] flex justify-center items-center border-[#D0D3D9] mt-5 rounded-md w-[72px] h-[38px]"
                >
                  Close
                </Link>
              </div>
            </div>
          </div>
        )}

        {selectedReport === "weekly" && (
          <div>
            {/* Your weekly report table */}
            <div className="w-full pb-4 overflow-x-scroll overflow-y-hidden pl-1 pr-5 pt-5">
              <table className="min-w-full table divide-y-2 divide-x-2 divide-yellow-[#7E3AF2] rounded-xl">
                <tbody className="divide-y ">
                  {/* Row 1 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className=" manrope text-[20px]  text-[#212529] px-4 cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Purchase Expenses
                    </td>

                    <td className="manrope text-[20px] text-[#212529] font-light px-4 w-[25%]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      $
                    </td>
                    <td className="manrope text-[20px] text-[#212529] font-light px-4 w-[25%]  cursor-pointer ">
                      $
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#6C757D] font-light px-4 text-[14px] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Total Purchase Price of Items
                    </td>
                    {/* Other columns */}
                    <td className="manrope text-[#6C757D] font-light px-4 text-[14px] w-[25%]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      2,702
                    </td>
                    <td className="manrope text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full table divide-y-2 divide-x-2 divide-yellow-[#7E3AF2] rounded-xl">
                <tbody className="divide-y">
                  {/* Row 1 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className=" manrope text-[20px]  text-[#212529] px-4  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Expenses
                    </td>
                    {/* Other columns */}
                    <td className="manrope text-[20px] text-[#212529] font-light px-4  w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      $
                    </td>
                    <td className="manrope text-[20px] text-[#212529] font-light px-4  w-[25%] cursor-pointer ">
                      $
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Advertising
                    </td>
                    {/* Other columns */}
                    <td className="font-roboto font-light px-4 text-[14px] w-[25%] text-[#6C757D] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      200
                    </td>
                    <td className="font-roboto font-light px-4 text-[14px] w-[25%] text-[#6C757D] cursor-pointer "></td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Bank Charges
                    </td>
                    {/* Other columns */}
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      100
                    </td>
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>
                  {/* Row 4 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Fuel
                    </td>
                    {/* Other columns */}
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      500
                    </td>
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>
                  {/* Row 5 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Utilities
                    </td>
                    {/* Other columns */}
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      100
                    </td>
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>

                  {/* Row 6 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]"></td>

                    <td className="font-roboto font-light px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]"></td>
                    <td className="font-roboto font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>

                  {/* Row 7 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#191D23]  px-4 text-[14px]  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Total Expenses
                    </td>

                    <td className="font-roboto  px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      3,601
                    </td>
                    <td className="font-roboto  px-4 text-[14px] w-[25%] cursor-pointer ">
                      <p></p>
                    </td>
                  </tr>

                  {/* Row 8 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#191D23]  px-4 text-[14px]  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Total Income
                    </td>

                    <td className="font-roboto  px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      3,601
                    </td>
                    <td className="font-roboto  px-4 text-[14px] w-[25%] cursor-pointer ">
                      <p></p>
                    </td>
                  </tr>

                  {/* Row 9 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#191D23]  px-4 text-[14px]  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]"></td>

                    <td className="font-roboto text-[#6C757D]  px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      Profit
                    </td>
                    <td className="font-roboto text-[#6C757D]  px-4 text-[14px] w-[25%] cursor-pointer ">
                      Loss
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full table divide-y-2 divide-x-2 divide-yellow-[#7E3AF2] rounded-xl">
                <tbody className="divide-y">
                  {/* Row 9 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#191D23]  px-4 text-[16px]  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Profit/Loss
                    </td>

                    <td className="manrope text-[#191D23]  px-4 text-[16px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      $379
                    </td>
                    <td className="manrope text-[#191D23]  px-4 text-[16px] w-[25%] cursor-pointer ">
                      000000
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className=" flex justify-end items-center">
                <Link
                  to="/inventory/purchase"
                  className=" border-[0.5px] flex justify-center items-center border-[#D0D3D9] mt-5 rounded-md w-[72px] h-[38px]"
                >
                  Close
                </Link>
              </div>
            </div>
          </div>
        )}

        {selectedReport === "monthly" && (
          <div>
            {/* Your monthly report table */}
            <div className="w-full pb-4 overflow-x-scroll overflow-y-hidden pl-1 pr-5 pt-5">
              <table className="min-w-full table divide-y-2 divide-x-2 divide-yellow-[#7E3AF2] rounded-xl">
                <tbody className="divide-y ">
                  {/* Row 1 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className=" manrope text-[20px]  text-[#212529] px-4 cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Purchase Expenses
                    </td>

                    <td className="manrope text-[20px] text-[#212529] font-light px-4 w-[25%]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      $
                    </td>
                    <td className="manrope text-[20px] text-[#212529] font-light px-4 w-[25%]  cursor-pointer ">
                      $
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#6C757D] font-light px-4 text-[14px] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Total Purchase Price of Items
                    </td>
                    {/* Other columns */}
                    <td className="manrope text-[#6C757D] font-light px-4 text-[14px] w-[25%]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      2,703
                    </td>
                    <td className="manrope text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full table divide-y-2 divide-x-2 divide-yellow-[#7E3AF2] rounded-xl">
                <tbody className="divide-y">
                  {/* Row 1 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className=" manrope text-[20px]  text-[#212529] px-4  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Expenses
                    </td>
                    {/* Other columns */}
                    <td className="manrope text-[20px] text-[#212529] font-light px-4  w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      $
                    </td>
                    <td className="manrope text-[20px] text-[#212529] font-light px-4  w-[25%] cursor-pointer ">
                      $
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Advertising
                    </td>
                    {/* Other columns */}
                    <td className="font-roboto font-light px-4 text-[14px] w-[25%] text-[#6C757D] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      200
                    </td>
                    <td className="font-roboto font-light px-4 text-[14px] w-[25%] text-[#6C757D] cursor-pointer "></td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Bank Charges
                    </td>
                    {/* Other columns */}
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      100
                    </td>
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>
                  {/* Row 4 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Fuel
                    </td>
                    {/* Other columns */}
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      500
                    </td>
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>
                  {/* Row 5 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Utilities
                    </td>
                    {/* Other columns */}
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      100
                    </td>
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>

                  {/* Row 6 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]"></td>

                    <td className="font-roboto font-light px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]"></td>
                    <td className="font-roboto font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>

                  {/* Row 7 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#191D23]  px-4 text-[14px]  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Total Expenses
                    </td>

                    <td className="font-roboto  px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      3,601
                    </td>
                    <td className="font-roboto  px-4 text-[14px] w-[25%] cursor-pointer ">
                      <p></p>
                    </td>
                  </tr>

                  {/* Row 8 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#191D23]  px-4 text-[14px]  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Total Income
                    </td>

                    <td className="font-roboto  px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      3,601
                    </td>
                    <td className="font-roboto  px-4 text-[14px] w-[25%] cursor-pointer ">
                      <p></p>
                    </td>
                  </tr>

                  {/* Row 9 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#191D23]  px-4 text-[14px]  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]"></td>

                    <td className="font-roboto text-[#6C757D]  px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      Profit
                    </td>
                    <td className="font-roboto text-[#6C757D]  px-4 text-[14px] w-[25%] cursor-pointer ">
                      Loss
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full table divide-y-2 divide-x-2 divide-yellow-[#7E3AF2] rounded-xl">
                <tbody className="divide-y">
                  {/* Row 9 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#191D23]  px-4 text-[16px]  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Profit/Loss
                    </td>

                    <td className="manrope text-[#191D23]  px-4 text-[16px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      $379
                    </td>
                    <td className="manrope text-[#191D23]  px-4 text-[16px] w-[25%] cursor-pointer ">
                      000000
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className=" flex justify-end items-center">
                <Link
                  to="/inventory/purchase"
                  className=" border-[0.5px] flex justify-center items-center border-[#D0D3D9] mt-5 rounded-md w-[72px] h-[38px]"
                >
                  Close
                </Link>
              </div>
            </div>
          </div>
        )}

        {selectedReport === "yearly" && (
          <div>
            {/* Your yearly report table */}
            <div className="w-full pb-4 overflow-x-scroll overflow-y-hidden pl-1 pr-5 pt-5">
              <table className="min-w-full table divide-y-2 divide-x-2 divide-yellow-[#7E3AF2] rounded-xl">
                <tbody className="divide-y ">
                  {/* Row 1 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className=" manrope text-[20px]  text-[#212529] px-4 cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Purchase Expenses
                    </td>

                    <td className="manrope text-[20px] text-[#212529] font-light px-4 w-[25%]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      $
                    </td>
                    <td className="manrope text-[20px] text-[#212529] font-light px-4 w-[25%]  cursor-pointer ">
                      $
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#6C757D] font-light px-4 text-[14px] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Total Purchase Price of Items
                    </td>
                    {/* Other columns */}
                    <td className="manrope text-[#6C757D] font-light px-4 text-[14px] w-[25%]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      2,704
                    </td>
                    <td className="manrope text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full table divide-y-2 divide-x-2 divide-yellow-[#7E3AF2] rounded-xl">
                <tbody className="divide-y">
                  {/* Row 1 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className=" manrope text-[20px]  text-[#212529] px-4  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Expenses
                    </td>
                    {/* Other columns */}
                    <td className="manrope text-[20px] text-[#212529] font-light px-4  w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      $
                    </td>
                    <td className="manrope text-[20px] text-[#212529] font-light px-4  w-[25%] cursor-pointer ">
                      $
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Advertising
                    </td>
                    {/* Other columns */}
                    <td className="font-roboto font-light px-4 text-[14px] w-[25%] text-[#6C757D] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      200
                    </td>
                    <td className="font-roboto font-light px-4 text-[14px] w-[25%] text-[#6C757D] cursor-pointer "></td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Bank Charges
                    </td>
                    {/* Other columns */}
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      100
                    </td>
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>
                  {/* Row 4 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Fuel
                    </td>
                    {/* Other columns */}
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      500
                    </td>
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>
                  {/* Row 5 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Utilities
                    </td>
                    {/* Other columns */}
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      100
                    </td>
                    <td className="font-roboto text-[#6C757D] font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>

                  {/* Row 6 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="font-roboto font-light px-4 text-[14px] text-[#6C757D] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]"></td>

                    <td className="font-roboto font-light px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]"></td>
                    <td className="font-roboto font-light px-4 text-[14px] w-[25%] cursor-pointer "></td>
                  </tr>

                  {/* Row 7 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#191D23]  px-4 text-[14px]  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Total Expenses
                    </td>

                    <td className="font-roboto  px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      3,601
                    </td>
                    <td className="font-roboto  px-4 text-[14px] w-[25%] cursor-pointer ">
                      <p></p>
                    </td>
                  </tr>

                  {/* Row 8 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#191D23]  px-4 text-[14px]  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Total Income
                    </td>

                    <td className="font-roboto  px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      3,601
                    </td>
                    <td className="font-roboto  px-4 text-[14px] w-[25%] cursor-pointer ">
                      <p></p>
                    </td>
                  </tr>

                  {/* Row 9 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#191D23]  px-4 text-[14px]  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]"></td>

                    <td className="font-roboto text-[#6C757D]  px-4 text-[14px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      Profit
                    </td>
                    <td className="font-roboto text-[#6C757D]  px-4 text-[14px] w-[25%] cursor-pointer ">
                      Loss
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full table divide-y-2 divide-x-2 divide-yellow-[#7E3AF2] rounded-xl">
                <tbody className="divide-y">
                  {/* Row 9 */}
                  <tr className="bg-white py-4 h-16 justify-center font-roboto">
                    <td className="manrope text-[#191D23]  px-4 text-[16px]  cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]">
                      Profit/Loss
                    </td>

                    <td className="manrope text-[#191D23]  px-4 text-[16px] w-[25%] cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                      $379
                    </td>
                    <td className="manrope text-[#191D23]  px-4 text-[16px] w-[25%] cursor-pointer ">
                      000000
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className=" flex justify-end items-center">
                <Link
                  to="/inventory/purchase"
                  className=" border-[0.5px] flex justify-center items-center border-[#D0D3D9] mt-5 rounded-md w-[72px] h-[38px]"
                >
                  Close
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseReport;
