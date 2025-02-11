import React from "react";
import InventoryHeader from "../../../components/inventory/InventoryHeader";
import { Link } from "react-router-dom";

const Invoice = () => {
  const tableHead = ["Description", "Price", "Quantity", "Total"],
    tableData = [
      {
        Description: "Maggi",
        Price: "$1241",

        Quantity: "1",
        Total: "$1241",
      },
      {
        Description: "Morning Fresh",
        Price: "$1241",

        Quantity: "1",
        Total: "$1241",
      },
    ];
  return (
    <div className="bg-[#F0F1F3] h-[850px]">
      <InventoryHeader />
      <div className=" flex items-center gap-5 pl-5 py-5">
        <Link to="/inventory">
          <img
            className=" w-[29px] h-[29px]"
            src={require("../../../assets/blackArrow.png")}
            alt=""
          />
        </Link>

        <p>Invoice</p>
        <img
          className=" w-[9px] h-[9px]"
          src={require("../../../assets/Vectorright.png")}
          alt=""
        />
        <p>Details</p>
      </div>

      <div className=" bg-white lg:ml-20 lg:mr-20 md:ml-5 md:mr-8 mx-5 px-5 pt-5">
        <div className=" flex justify-between items-center">
          <p className="poppins text-[#000] text-[48px] font-extrabold">
            INVOICE
          </p>

          <div className="grid justify-end">
            <div className=" flex justify-end">
              <img
                className=" w-[94px] h-[53px]"
                src={require("../../../assets/Logo FA 1.png")}
                alt=""
              />
            </div>

            <p className="poppins text-[32px] text-end text-[#000] font-bold">
              ICS OUTSOURCING
            </p>
            <p className=" poppins text-[16px] text-end text-[#000] font-bold">
              6, Olusoji Idowu Street, Ilupeju, Lagos
            </p>
            <p className=" poppins text-[16px] text-end text-[#000] font-bold">
              enquiries@icsoutsourcing.com
            </p>
            <p className=" poppins text-[16px] text-end text-[#000] font-bold">
              09087222874, 01-2801547
            </p>
          </div>
        </div>

        <div className=" flex items-center justify-between mt-5 pt-5 pb-8 border-t-[1px] border-b-[1.7px] border-t-[#271972] border-b-[#271972]">
          <div className="lg:w-[50%]">
            <p className=" text-[#28166F] text-[15px] poppins font-bold">
              Billed To:
            </p>
            <p className="poppins text-[12px] text-[#0F0F0F]">Ronald Martins</p>
            <p className="poppins text-[12px] text-[#0F0F0F]">
              E-mail: jay@gmail.com
            </p>
            <p className="poppins text-[12px] text-[#0F0F0F]">
              Address: 6 Olusoji Idowu St, Ilupeju 100261, Lagos
            </p>
          </div>
          <div className="flex flex-wrap gap-x-14 gap-y-5 lg:w-[50%]">
            <div className="grid">
              <p className="poppins font-bold text-[14px] text-[#28166F]">
                Date Issued
              </p>
              <p className="poppins text-[12px]">26/10/2023</p>
            </div>
            <div className="grid">
              <p className="poppins font-bold text-[14px] text-[#28166F]">
                Invoice Number
              </p>
              <p className="poppins text-[12px]">INV-10012</p>
            </div>
            <div className="grid">
              <p className="poppins font-bold text-[14px] text-[#28166F]">
                Amount Due
              </p>
              <p className="poppins text-[12px] text-end">$30000</p>
            </div>
            <div className="grid">
              <p className="poppins font-bold text-[14px] text-[#28166F]">
                Due Date
              </p>
              <p className="poppins text-[12px]">26/10/2023</p>
            </div>
          </div>
        </div>

        {/* table */}

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
                  <td className=" w-[450px] font-roboto font-light px-4 text-[14px] cursor-pointer  ">
                    <Link to={it?.to}>{it?.Description}</Link>
                  </td>
                  <td className="w-[150px] font-roboto font-light px-4 text-[14px] cursor-pointer  ">
                    <Link to={it?.to}>{it?.Price}</Link>
                  </td>

                  <td className="w-[150px]  font-roboto font-light px-4 text-[14px] cursor-pointer ">
                    <Link className=" pl-5" to={it?.to}>
                      {it?.Quantity}
                    </Link>
                  </td>

                  <td className=" font-roboto font-light px-4 text-[14px] cursor-pointer  ">
                    <Link to={it?.to}>{it?.Total}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className=" border-t-[0.5px] border-t-[#CCCCCC]">
            <div className="grid justify-end">
              <div className="grid gap-y-7 border-b-[0.5px] border-b-[#CCCCCC] py-4">
                <div className="flex items-center justify-end gap-24">
                  <div className=" poppins text-[15px]">Subtotal</div>
                  <div className="poppins ">$1241</div>
                </div>
                <div className="flex items-center justify-end gap-24">
                  <div className=" poppins text-[15px]">VAT (7.5%)</div>
                  <div className=" poppins text-[15px]">+$10</div>
                </div>
              </div>
              {/*  */}
              <div className="grid gap-y-3 border-b-[1.5px] border-b-[#271972] py-4">
                <div className="flex items-center justify-end gap-24">
                  <div className="poppins text-[15px] ">Total</div>
                  <div className=" poppins text-[26px] font-bold">$1251</div>
                </div>
                <div className="flex items-center justify-end gap-24">
                  <div className="poppins text-[15px] ">Deposite Requested</div>
                  <div className="poppins text-[26px] font-bold ">$100</div>
                </div>
              </div>

              {/*  */}
              <div className="flex items-center justify-end gap-24 pt-3">
                <div className="poppins text-[15px] ">Deposite Due</div>
                <div className="poppins text-[26px] font-bold ">$100</div>
              </div>
            </div>
          </div>

          {/*  */}
          <div className=" grid gap-1 text-[#2A72A8] text-[12px] bg-[#F9F9F9] w-full rounded-3xl my-5 p-5">
            <p>Account Details:</p>
            <p>Bank: Gaurantee</p>
            <p>Account Number: 1203938377777777363</p>
            <p>Account Name:Clement</p>
            <p>Sort Code:11128</p>
            <p>TIN: 828282</p>
          </div>

          <div>
            <p className="text-[#0F0F0F] pt-5 pb-2 text-[14px] poppins">
              Payment Status:
            </p>
            <div className=" flex items-center justify-between">
              <div className=" text-white rounded-md bg-[#222222] manrope items-center flex w-[231px] h-[34px] pl-4">
                Open(Not Paid)
              </div>
              <div className=" flex items-center gap-5">
                <div className=" cursor-pointer shadow-md rounded-md grid justify-center text-[16px] items-center text-[#2A72A8] manrope w-[109px] h-[35px] bg-[#F8F8F8]">
                  Download
                </div>
                <button className=" bg-[#2A72A8] text-white text-[16px] inter rounded-md w-[130px] h-[35px]">
                  Send Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
