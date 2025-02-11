import React, { useState } from "react";
import Edit from "../../assets/Edit.png";
import Delete from "../../assets/Delete.png";
import { Link } from "react-router-dom";
import OrderCard from "./OrderCard";

const PurchaseOrdersTable = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [addDelete, setAddDelete] = useState(false);
  const [isDeletedSuccessfully, setIsDeletedSuccessfully] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleDeletedSuccessfully = () => {
    window.scroll(0, 0);
    setIsDeletedSuccessfully(!isDeletedSuccessfully);
  };
  const closehandleDeletedSuccessfully = () => {
    setIsDeletedSuccessfully(false);
  };

  const closehandleDelete = () => {
    setIsDelete(false);
  };

  const handleEdit = () => {
    window.scroll(0, 0);
    setIsEdit(!isEdit);
  };
  const handleDelete = () => {
    window.scroll(0, 0);
    setAddDelete(!addDelete);
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
        ItemName: "Sugar",
        OrderID: "5560",
        Category: "Detergent",
        Quantity: "4",
        TotalPrice: "$ 1,241",
        Days: "View Invoice",

        to: "/inventory/puchase-details",
      },
      {
        ItemName: "Morning fresh",
        OrderID: "1257",
        Category: "Body cream",
        Quantity: "2",
        TotalPrice: "$ 1,241",
        Days: "View Invoice",
      },
      {
        ItemName: "Almond Lotion",
        OrderID: "3257",
        Category: "Provision",
        Quantity: "1",
        TotalPrice: "$ 1,241",
        Days: "View Invoice",
      },
      {
        ItemName: "Bourn Vita",
        OrderID: "2257",
        Category: "Detergent",
        Quantity: "1",
        TotalPrice: "$ 1,241",
        Days: "View Invoice",
      },
      {
        ItemName: "Bourn Vita",
        OrderID: "7257",
        Category: "Detergent",
        Quantity: "2",
        TotalPrice: "$ 1,241",
        Days: "View Invoice",
      },
      {
        ItemName: "Bourn Vita",
        OrderID: "8257",
        Category: "Provisiont",
        Quantity: "1",
        TotalPrice: "$ 1,241",
        Days: "View Invoice",
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
                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                  <Link to={it?.to}> {it?.ItemName}</Link>
                </td>
                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                  <Link to={it?.to}>{it?.OrderID}</Link>
                </td>
                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                  <Link to={it?.to}>{it?.Category}</Link>
                </td>
                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                  <Link to={it?.to}> {it?.Quantity}</Link>
                </td>
                <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer ">
                  <Link to={it?.to}>{it?.TotalPrice}</Link>
                </td>

                <td className=" font-roboto font-light px-4 text-[14px] text-[#04B4FC] cursor-pointer ">
                  <Link to="/inventory/invoice">{it?.Days}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" flex items-center justify-between px-4 py-5">
        <div className=" flex items-center gap-5">
          <button className=" w-[92px] h-[38px] border-[0.5px] inter text-[14px] border-[#D0D3D9] rounded-md">
            Previous
          </button>
          <p className="inter text-[14px] text-[#48505E]">Page 1 of 10</p>
        </div>
        <div className=" flex items-center gap-5">
          <button
            onClick={handleDelete}
            className="w-[110px] h-[39px] text-[#858D9D] inter text-[14px] border-[0.5px] border-[#A3A3A3] rounded-md"
          >
            Delete
          </button>
          {addDelete && (
            <div className="absolute right-0 left-0 top-0 bottom-0 pl-20 bg-plain bg-opacity-60 flex justify-center items-center ">
              <div className=" w-[438px] h-[auto] bg-white text-black py-5">
                <div className=" flex items-center justify-end">
                  <Link
                    to="/inventory"
                    // onClick={closehandleDelete}
                    className=" cursor-pointer text-[24px] inter font-bold pr-10 "
                  >
                    X
                  </Link>
                </div>
                <div className=" grid justify-center items-center">
                  <img
                    className=" w-[150px] h-[150px]"
                    src={require("../../assets/deleteimg.png")}
                    alt=""
                  />
                </div>
                <p className=" text-center text-[16px] inter font-bold py-5">
                  Are you sure you want to delete? Action cannot be undone.
                </p>
                <div className=" flex items-center justify-center gap-5">
                  <button
                    onClick={closehandleDelete}
                    className=" w-[110px] h-[35px] bg-[#1D48E1] text-white rounded-md inter text-[16px]"
                  >
                    No
                  </button>
                  <button
                    onClick={handleDeletedSuccessfully}
                    className=" w-[110px] h-[35px] border-[0.5px] border-[#1D48E1] rounded-md text-[#1D48E1] inter text-[16px]"
                  >
                    Yes
                  </button>
                  {isDeletedSuccessfully && (
                    <div className="absolute right-0 left-0 top-0 bottom-0 pl-20 bg-plain bg-opacity-60 flex justify-center items-center  ">
                      <div className=" w-[438px] h-[auto] bg-white text-black py-5">
                        <div className=" flex items-center justify-end">
                          <p
                            onClick={closehandleDeletedSuccessfully}
                            className=" cursor-pointer text-[24px] inter font-bold pr-10 "
                          >
                            X
                          </p>
                        </div>
                        <div className=" grid justify-center items-center">
                          <img
                            className=" w-[196px] h-[196px]"
                            src={require("../../assets/Doneimg.png")}
                            alt=""
                          />
                        </div>
                        <p className=" text-center text-[24px] inter font-bold">
                          Deleted Successfully!{" "}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleEdit}
            className=" bg-[#1366D9] text-white inter w-[58px] h-[40px] rounded-md"
          >
            Edit
          </button>
          {isEdit && (
            <div>
              <OrderCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrdersTable;
