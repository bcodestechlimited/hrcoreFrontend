// import React from "react";

// const ItemsSummary = () => {
//   return (
//     <div>
//       <p></p>
//     </div>
//   );
// };

// export default ItemsSummary;
import React from "react";

import { Link } from "react-router-dom";

const ItemsSummary = () => {
  const tableHead = ["Items", "Purchase Price", "Selling Price", "Quantity"],
    tableData = [
      {
        Items: "Sugar",
        PurchasePrice: "$430",
        SellingPrice: "$500",
        Quantity: "43 Packets",

        to: "/inventory/items-details",
      },
      {
        Items: "Morning fresh",
        PurchasePrice: "$430",
        SellingPrice: "$300",
        Quantity: "22 Packets",
      },
      {
        Items: "Almond Lotion",
        PurchasePrice: "$430",
        SellingPrice: "$300",
        Quantity: "22 Packets",
      },
      {
        Items: "Bourn Vita",
        PurchasePrice: "$430",
        SellingPrice: "$300",
        Quantity: "22 Packets",
      },
      {
        Items: "Bourn Vita",
        PurchasePrice: "$430",
        SellingPrice: "$300",
        Quantity: "22 Packets",
      },
      {
        Items: "Bourn Vita",
        PurchasePrice: "$430",
        SellingPrice: "$300",
        Quantity: "22 Packets",
      },
    ];
  return (
    <div className=" bg-white rounded-md py-5  ">
      <div className=" flex items-center justify-between pl-3">
        <p className=" text-[#383E49] inter font-bold text-[20px]">
          Items Summary
        </p>
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
                  <Link to={it?.to}>{it?.PurchasePrice}</Link>
                </td>
                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                  <Link to={it?.to}>{it?.SellingPrice}</Link>
                </td>
                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                  <Link to={it?.to}> {it?.Quantity}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsSummary;
