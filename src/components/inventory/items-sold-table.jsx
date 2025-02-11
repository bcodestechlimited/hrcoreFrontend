import React, { useState } from "react";
import Edit from "../../assets/Edit.png";
import Delete from "../../assets/Delete.png";
import { Link } from "react-router-dom";

const ViewItemsSold = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [isDeletedSuccessfully, setIsDeletedSuccessfully] = useState(false);
  const [category, setCategory] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleDeletedSuccessfully = () => {
    setIsDeletedSuccessfully(!isDeletedSuccessfully);
  };
  const closehandleDeletedSuccessfully = () => {
    setIsDeletedSuccessfully(false);
  };

  const handleCategory = () => {
    setCategory(!category);
  };

  const handleIsDone = () => {
    setIsDone(!isDone);
  };

  const closehandleIsDone = () => {
    setIsDone(false);
  };

  const handleEdit = () => {
    window.scrollTo(0, 0);
    setIsEdit(!isEdit);
  };
  const handleDelete = () => {
    window.scrollTo(0, 0);
    setIsDelete(!isDelete);
  };

  const closehandleEdit = () => {
    setIsEdit(false);
  };
  const closehandleDelete = () => {
    setIsDelete(false);
  };

  const tableHead = [
      "Items",
      "Purchase Price",
      "Selling Price",
      "Quantity",
      "Date of Entry",
      "Gross Profit",
    ],
    tableData = [
      {
        Items: "Sugar",

        PurchasePrice: "$430",
        SellingPrice: "$500",
        Quantity: "43 Packets",
        DateOfEntry: "March 11, 2023",
        GrossProfit: "$23",
      },
      {
        Items: "Morning fresh",

        PurchasePrice: "₹257",
        SellingPrice: "$300",
        Quantity: "22 Packets",
        DateOfEntry: "March 11, 2023",
        GrossProfit: "$56",
      },
      {
        Items: "Almond Lotion",

        PurchasePrice: "₹257",
        SellingPrice: "$300",
        Quantity: "22 Packets",
        DateOfEntry: "March 11, 2023",
        GrossProfit: "$20",
      },
      {
        Items: "Bourn Vita",

        PurchasePrice: "₹257",
        SellingPrice: "$300",
        Quantity: "22 Packets",
        DateOfEntry: "March 11, 2023",
        GrossProfit: "$35",
      },
      {
        Items: "Total",

        PurchasePrice: "$3,701",
        SellingPrice: "$3,980",
        Quantity: "",
        DateOfEntry: "",
        GrossProfit: "$279",
      },
    ];
  return (
    <div className=" bg-white rounded-md py-5  ">
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
                <td className=" font-roboto    items-center font-light px-4 text-[14px] cursor-pointer  ">
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
                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                  <Link to={it?.to}>{it?.DateOfEntry}</Link>
                </td>

                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer  ">
                  <Link to={it?.to}>{it?.GrossProfit}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className=" flex justify-end items-center px-4">
          <Link
            to="/inventory/sales"
            className=" text-[14px] flex justify-center items-center manrope border-[#D0D3D9] w-[72px] h-[38px] rounded-md border-[0.5px] text-[#858D9D]"
          >
            Close
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewItemsSold;
