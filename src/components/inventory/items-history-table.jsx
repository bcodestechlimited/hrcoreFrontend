import React from "react";

import { Link } from "react-router-dom";

const ItemsHistoryTable = () => {
  const tableHead = [
      "Items",
      "Buying Price",
      "Selling Price",
      "Quantity",
      "Date of Entry",
      "Expiry Date",
      "Availability",
    ],
    tableData = [
      {
        Items: "Sugar",
        BuyingPrice: "$560",
        SellingPrice: "$500",
        Quantity: "43 Packets",
        DateOfEntry: "March 11, 2023",
        ExpiryDate: "11/12/22",

        Availability: "In- stock",
        to: "/inventory/items-details",
      },
      {
        Items: "Morning fresh",
        BuyingPrice: "₹257",
        SellingPrice: "$300",
        Quantity: "22 Packets",
        DateOfEntry: "March 11, 2023",
        ExpiryDate: "11/12/22",

        Availability: "Out of stock",
      },
      {
        Items: "Almond Lotion",
        BuyingPrice: "₹257",
        SellingPrice: "$300",
        Quantity: "22 Packets",
        DateOfEntry: "March 11, 2023",
        ExpiryDate: "11/12/22",

        Availability: "Out of stock",
      },
      {
        Items: "Bourn Vita",
        BuyingPrice: "₹257",
        SellingPrice: "$300",
        Quantity: "22 Packets",
        DateOfEntry: "March 11, 2023",
        ExpiryDate: "11/12/22",

        Availability: "Out of stock",
      },
      {
        Items: "Bourn Vita",
        BuyingPrice: "₹257",
        SellingPrice: "$300",
        Quantity: "22 Packets",
        DateOfEntry: "March 11, 2023",
        ExpiryDate: "11/12/22",

        Availability: "Out of stock",
      },
      {
        Items: "Bourn Vita",
        BuyingPrice: "₹257",
        SellingPrice: "$300",
        Quantity: "22 Packets",
        DateOfEntry: "March 11, 2023",
        ExpiryDate: "11/12/22",

        Availability: "Out of stock",
      },
    ];
  return (
    <div className=" bg-white rounded-md py-5  ">
      <div className=" flex items-center justify-between pl-3">
        <p className=" text-[#383E49] inter font-bold text-[20px]">History</p>
      </div>

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
                  <Link to={it?.to}> {it?.Items}</Link>
                </td>
                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                  <Link to={it?.to}>{it?.BuyingPrice}</Link>
                </td>
                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                  <Link to={it?.to}>{it?.SellingPrice}</Link>
                </td>
                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                  <Link to={it?.to}> {it?.Quantity}</Link>
                </td>
                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                  <Link to={it?.to}>{it?.DateOfEntry}</Link>
                </td>

                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                  <Link to={it?.to}>{it?.ExpiryDate}</Link>
                </td>
                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                  <Link to={it?.to}>{it?.Availability}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" flex items-center justify-between px-4 py-5">
        <button className=" w-[92px] h-[38px] border-[0.5px] inter text-[14px] border-[#D0D3D9] rounded-md">
          Previous
        </button>
        <p className="inter text-[14px] text-[#48505E]">Page 1 of 10</p>
        <button className="w-[66px] h-[38px] inter text-[14px] border-[0.5px] border-[#D0D3D9] rounded-md">
          Next
        </button>
      </div>
    </div>
  );
};

export default ItemsHistoryTable;
