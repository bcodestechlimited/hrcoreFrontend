import React, { useState } from "react";
import InventoryHeader from "../../../components/inventory/InventoryHeader";
import { Link } from "react-router-dom";
import RecentActivity from "../../../components/inventory/recent-activity";

const Seles = () => {
  const [sales, setSales] = useState(false);
  const [category, setCategory] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [report, setReport] = useState(false);
  const [viewreport, setViewreport] = useState(false);

  const handleViewreport = () => {
    setViewreport(!viewreport);
  };
  const handleReport = () => {
    setReport(!report);
  };
  const handleIsDone = () => {
    setIsDone(!isDone);
  };
  const closehandleIsDone = () => {
    setIsDone(false);
  };
  const handleEdit = () => {
    window.scroll(0, 0);
    setEdit(!edit);
  };
  const closehandleEdit = () => {
    setEdit(false);
  };
  const handleCategory = () => {
    setCategory(!category);
  };

  const handleSales = () => {
    window.scroll(0, 0);
    setSales(!sales);
  };
  const closeSales = () => {
    setSales(false);
  };

  const tableHead = [
      "Item Name",
      "Order ID",
      "Category",
      "Quantity",
      "Total Price",
      "Last 7 Days",
    ],
    tableData = [
      {
        Items: "Sugar",

        PurchasePrice: "$430",
        SellingPrice: "$500",
        Quantity: "43 Packets",
        DateOfEntry: "March 11, 2023",
        ExpiryDate: "11/12/22",

        to: "/inventory/customer-details",
      },
      {
        Items: "Morning fresh",

        PurchasePrice: "₹257",
        SellingPrice: "$300",
        Quantity: "22 Packets",
        DateOfEntry: "March 11, 2023",
        ExpiryDate: "11/12/22",
      },
      {
        Items: "Almond Lotion",

        PurchasePrice: "₹257",
        SellingPrice: "$300",
        Quantity: "22 Packets",
        DateOfEntry: "March 11, 2023",
        ExpiryDate: "11/12/22",
      },
      {
        Items: "Bourn Vita",

        PurchasePrice: "₹257",
        SellingPrice: "$300",
        Quantity: "22 Packets",
        DateOfEntry: "March 11, 2023",
        ExpiryDate: "11/12/22",
      },
    ];
  return (
    <div className="bg-[#F0F1F3]">
      <InventoryHeader />
      <div className=" flex gap-5 pt-5">
        <div className="w-[75%] grid">
          <div>
            <div className=" grid bg-white lg:ml-5 md:ml-3 ml-0 mb-5 p-5 ">
              <div className=" flex items-center justify-between">
                <div>
                  <p className=" font-bold text-[16px] text-[#000] manrope">
                    Seles Report
                  </p>
                </div>
                <div>
                  <div className=" relative border-[0.5px] cursor-pointer flex items-center justify-center gap-x-2 border-[#F52685] w-[150px] h-[39px] rounded-md">
                    <p className=" text-[12x] manrope text-[#F72585] ">
                      View Report
                    </p>
                    <p
                      onClick={handleViewreport}
                      className=" cursor-pointer -rotate-90 w-[20px] mb-2  text-[#F72585]"
                    >
                      {"<"}
                    </p>
                  </div>
                  {viewreport && (
                    <div className=" absolute z-30   gap-1 pl-2 py-4 bg-white grid items-center text-black w-[226px] h-[auto] rounded-md">
                      <p className=" w-[190px] h-[34px] flex items-center cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2">
                        Direct Sales
                      </p>
                      <p className=" w-[190px] h-[34px] flex items-center cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2">
                        Retail Sales
                      </p>
                      <p className=" w-[190px] h-[34px] flex items-center cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2">
                        Wholesale
                      </p>
                    </div>
                  )}
                </div>
                {/*  */}
                <div className=" flex gap-2 items-center">
                  <div className=" w-[15px] h-[15px] rounded-full bg-[#212529]"></div>
                  <p className="text-[12px] text-[#857F8C]">Direct Sales</p>
                </div>
                {/*  */}
                <div className=" flex gap-2 items-center">
                  <div className=" w-[15px] h-[15px] rounded-full bg-[#212529]"></div>
                  <p className="text-[12px] text-[#857F8C]">Retail</p>
                </div>
                {/*  */}
                <div className=" flex gap-2 items-center">
                  <div className=" w-[15px] h-[15px] rounded-full bg-[#D91189]"></div>
                  <p className="text-[12px] text-[#D91189]">Wholesale</p>
                </div>
              </div>
              <div>
                <img
                  src={require("../../../assets/salesreportimg.png")}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="bg-white lg:ml-5 md:ml-3 ml-0 mb-5 p-5 grid">
            <div className=" flex items-center justify-between">
              <p className=" text-[16px] text-[#000] font-bold manrope">
                Sales Order
              </p>
              <div className=" flex items-center">
                <div className=" absolute pl-3">
                  <img
                    className=" w-[24px] h-[24px]"
                    src={require("../../../assets/Searchcustomer.png")}
                    alt=""
                  />
                </div>

                <input
                  className=" w-[245px] h-[30px] rounded-md border-[0.3px] border-gray-200 bg-white text-black pl-10 "
                  placeholder="Search "
                  type="text"
                />
              </div>
              {/*  */}

              <div
                onClick={handleReport}
                className=" border-[0.5px] cursor-pointer flex items-center justify-center gap-x-2 border-[#000] w-[195px] h-[39px] rounded-md"
              >
                <p className=" text-[12x] manrope text-[#000] ">
                  View Sales Report
                </p>

                <p className=" cursor-pointer -rotate-90 w-[20px] mb-2  text-[#000]">
                  {"<"}
                </p>
              </div>
              {report && (
                <div className=" absolute z-30 right-[190px]  gap-1 pl-2 py-4 bg-white grid items-center text-black w-[226px] h-[auto] rounded-md">
                  <Link
                    to="/inventory/sales-report"
                    className=" w-[190px] h-[34px] flex items-center cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2"
                  >
                    Daily
                  </Link>
                  <Link
                    to="/inventory/purchase-report"
                    className=" w-[190px] h-[34px] flex items-center cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2"
                  >
                    Weekly
                  </Link>
                  <Link
                    to="/inventory/purchase-report"
                    className=" w-[190px] h-[34px] flex items-center cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2"
                  >
                    Monthly
                  </Link>
                  <Link
                    to="/inventory/purchase-report"
                    className=" w-[190px] h-[34px] flex items-center cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2"
                  >
                    Yearly
                  </Link>
                </div>
              )}

              {/*  */}
              <div
                onClick={handleSales}
                className=" bg-[#04B4FC] cursor-pointer w-[118px] h-[37px] justify-center rounded-md flex items-center gap-2"
              >
                <img
                  className=" w-[16px] h-[16px]"
                  src={require("../../../assets/icon-wrapper-h.png")}
                  alt=""
                />
                <p className=" text-[12px] text-white">Place Sales</p>
              </div>
              {sales && (
                <div className="  absolute z-30 top-0 left-0 bottom-0 right-0  bg-black bg-opacity-60 lg:pl-14 justify-center grid items-center">
                  <div className=" p-10 grid gap-5 bg-white text-black rounded-md lg:w-[530px] md:w-[400px] w-full overflow-y-scroll lg:h-[500px] ">
                    <p className=" font-bold  inter text-[20px] text-[#383E49]">
                      New Sales order
                    </p>
                    <div className=" flex items-center justify-between">
                      <p className=" inter text-[#383E49] text-[16px]">
                        Item Name
                      </p>
                      <input
                        className=" w-[273px] h-[44px] rounded-md border-[0.5px] border-[#D0D5DD]"
                        placeholder="Enter Item name"
                        type="text"
                      />
                    </div>
                    <div className=" flex items-center justify-between">
                      <p className=" inter text-[#383E49] text-[16px]">
                        Item Price
                      </p>
                      <input
                        className=" w-[273px] h-[44px] rounded-md border-[0.5px] border-[#D0D5DD]"
                        placeholder="Enter Item Price"
                        type="text"
                      />
                    </div>
                    <div className=" flex items-center justify-between">
                      <p className=" inter text-[#383E49] text-[16px]">
                        Quantity
                      </p>
                      <input
                        className=" w-[273px] h-[44px] rounded-md border-[0.5px] border-[#D0D5DD]"
                        placeholder="Enter Quantity"
                        type="text"
                      />
                    </div>
                    <div className=" flex items-center justify-between">
                      <p className=" inter text-[#383E49] text-[16px]">
                        Customer Name
                      </p>
                      <input
                        className=" w-[273px] h-[44px] rounded-md border-[0.5px] border-[#D0D5DD]"
                        placeholder="Enter customer Name"
                        type="text"
                      />
                    </div>
                    <div className=" flex items-center justify-between">
                      <p className=" inter text-[#383E49] text-[16px]">
                        Order Value
                      </p>
                      <input
                        className=" w-[273px] h-[44px] rounded-md border-[0.5px] border-[#D0D5DD]"
                        placeholder="Enter Order Value"
                        type="text"
                      />
                    </div>

                    <div className="  flex items-center justify-between">
                      <p className="inter text-[#383E49] text-[16px]">
                        Payment Option
                      </p>
                      <div className="relative">
                        <input
                          className="w-[273px] h-[44px] pr-10 rounded-md border-[0.5px] border-[#D0D5DD]"
                          placeholder="Select Payment Option"
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
                            Via Cash
                          </p>
                          <p className=" w-[190px] h-[34px] cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2">
                            Via Transfer
                          </p>
                          <p className=" w-[190px] h-[34px] cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2">
                            Via Bank Card
                          </p>
                        </div>
                      )}
                    </div>

                    <div className=" flex items-center gap-3 pt-3">
                      <input type="checkbox" />
                      <p className=" text-[16px] inter text-[#858D9D]">
                        Notify on the date of delivery
                      </p>
                    </div>

                    <div className=" flex justify-end items-center gap-5 pt-5">
                      <button
                        onClick={closeSales}
                        className=" w-[110px] h-[40px] border-[0.50px] hover:border-[#1366D9] hover:text-[#1366D9] border-[#1C1C1C] inter rounded-md"
                      >
                        Discard
                      </button>
                      <div
                        onClick={handleIsDone}
                        className=" bg-[#1366D9] w-[142px] h-[40px] hover:bg-[#a0bde7] cursor-pointer inter text-white flex justify-center items-center rounded-md "
                      >
                        Add Sales Order
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
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/*  */}
            <div>
              <div className=" bg-white rounded-md py-5   ">
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
                          <td className=" font-roboto flex pt-4  gap-2 items-center font-light px-4 text-[14px] cursor-pointer  ">
                            <input type="radio" />
                            <Link to={it?.to}>{it?.Items}</Link>
                          </td>
                          <td className=" font-roboto font-light px-4 text-[14px]  cursor-pointer ">
                            <Link to={it?.to}>{it?.PurchasePrice}</Link>
                          </td>
                          <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer  ">
                            <Link to={it?.to}>{it?.SellingPrice}</Link>
                          </td>
                          <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                            <Link to={it?.to}>{it?.Quantity}</Link>
                          </td>
                          <td className=" font-roboto font-light px-4 text-[14px]  cursor-pointer ">
                            <Link to={it?.to}>{it?.DateOfEntry}</Link>
                          </td>

                          <td className=" font-roboto font-light px-4 text-[14px] text-[#04B4FC] cursor-pointer  ">
                            <Link to={it?.to}>{it?.ExpiryDate}</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className=" flex justify-between items-center px-4">
                    <div className="flex items-center">
                      <p className="w-[30px] h-[31px] flex justify-center items-center border-[0.5px] border-[#DEE2E6]">
                        {"<"}
                      </p>
                      <p className="w-[30px] h-[31px] flex justify-center items-center border-[0.5px] border-[#DEE2E6]">
                        {"1"}
                      </p>
                      <p className="w-[30px] h-[31px] flex justify-center items-center border-[0.5px] border-[#DEE2E6]">
                        {"2"}
                      </p>
                      <p className="w-[30px] h-[31px] flex justify-center items-center border-[0.5px] border-[#DEE2E6]">
                        {">"}
                      </p>
                    </div>

                    <div className=" flex items-center gap-5">
                      <button className=" w-[110px] h-[39px] cursor-pointer rounded-md inter text-[16px] border-[0.5px] border-[#858D9D] text-[#858D9D]">
                        Delete
                      </button>
                      <button
                        onClick={handleEdit}
                        className=" w-[58px] h-[40px] cursor-pointer text-[16px] text-[white] bg-[#1366D9] rounded-md"
                      >
                        Edit
                      </button>
                      {edit && (
                        <div className="  absolute z-30 top-0 left-0 bottom-0 right-0  bg-black bg-opacity-60 lg:pl-14 justify-center grid items-center">
                          <div className=" p-10 grid gap-5 bg-white text-black rounded-md lg:w-[530px] md:w-[400px] w-full overflow-y-scroll lg:h-[500px] ">
                            <p className=" font-bold  inter text-[20px] text-[#383E49]">
                              New Sales order
                            </p>
                            <div className=" flex items-center justify-between">
                              <p className=" inter text-[#383E49] text-[16px]">
                                Item Name
                              </p>
                              <input
                                className=" w-[273px] h-[44px] rounded-md border-[0.5px] border-[#D0D5DD]"
                                placeholder="Fructose Sugar"
                                type="text"
                              />
                            </div>
                            <div className=" flex items-center justify-between">
                              <p className=" inter text-[#383E49] text-[16px]">
                                Item Price
                              </p>
                              <input
                                className=" w-[273px] h-[44px] rounded-md border-[0.5px] border-[#D0D5DD]"
                                placeholder="$3000"
                                type="text"
                              />
                            </div>
                            <div className=" flex items-center justify-between">
                              <p className=" inter text-[#383E49] text-[16px]">
                                Quantity
                              </p>
                              <input
                                className=" w-[273px] h-[44px] rounded-md border-[0.5px] border-[#D0D5DD]"
                                placeholder="Enter Quantity"
                                type="text"
                              />
                            </div>
                            <div className=" flex items-center justify-between">
                              <p className=" inter text-[#383E49] text-[16px]">
                                Customer Name
                              </p>
                              <input
                                className=" w-[273px] h-[44px] rounded-md border-[0.5px] border-[#D0D5DD]"
                                placeholder="Enter customer Name"
                                type="text"
                              />
                            </div>
                            <div className=" flex items-center justify-between">
                              <p className=" inter text-[#383E49] text-[16px]">
                                Order Value
                              </p>
                              <input
                                className=" w-[273px] h-[44px] rounded-md border-[0.5px] border-[#D0D5DD]"
                                placeholder="Enter Order Value"
                                type="text"
                              />
                            </div>

                            <div className="  flex items-center justify-between">
                              <p className="inter text-[#383E49] text-[16px]">
                                Payment Option
                              </p>
                              <div className="relative">
                                <input
                                  className="w-[273px] h-[44px] pr-10 rounded-md border-[0.5px] border-[#D0D5DD]"
                                  placeholder="Select Payment Option"
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
                                    Via Cash
                                  </p>
                                  <p className=" w-[190px] h-[34px] cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2">
                                    Via Transfer
                                  </p>
                                  <p className=" w-[190px] h-[34px] cursor-pointer border-[#D1D1D1] border-[0.5px] rounded-md pl-2">
                                    Via Bank Card
                                  </p>
                                </div>
                              )}
                            </div>

                            <div className=" flex items-center gap-3 pt-3">
                              <input type="checkbox" />
                              <p className=" text-[16px] inter text-[#858D9D]">
                                Notify on the date of delivery
                              </p>
                            </div>

                            <div className=" flex justify-end items-center gap-5 pt-5">
                              <button
                                onClick={closehandleEdit}
                                className=" w-[110px] h-[40px] border-[0.50px] hover:border-[#1366D9] hover:text-[#1366D9] border-[#1C1C1C] inter rounded-md"
                              >
                                Discard
                              </button>
                              <div
                                onClick={handleIsDone}
                                className=" bg-[#1366D9] w-[142px] h-[40px] hover:bg-[#a0bde7] cursor-pointer inter text-white flex justify-center items-center rounded-md "
                              >
                                Edit
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
                                      Done
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[25%]">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Seles;
