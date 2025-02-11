import React, { useState } from "react";
import InventoryHeader from "../../../components/inventory/InventoryHeader";
import ViewItemsSold from "../../../components/inventory/items-sold-table";
import DownloadAll from "../../../components/inventory/DownloadAll";
import Download from "../../../components/inventory/Download";

const SalesReport = () => {
  const [items, setItems] = useState(false);

  const [service, setService] = useState(false);

  const handleService = () => {
    window.scroll(0, 0);
    setService(!service);
  };
  const closehandleService = () => {
    setService(false);
  };

  const handleItems = () => {
    setItems(!items);
  };

  return (
    <div className="bg-[#F0F1F3]">
      <InventoryHeader />
      <div className=" bg-white lg:ml-1 lg:mr-5 md:ml-3 ml-0 mb-5 p-5 mt-1">
        <div className=" bg-white flex items-center justify-between  ">
          <p className=" text-[20px] manrope text-[#000000] font-bold">
            Sales Report For the Week
          </p>
          <button className=" w-[118px] hover:border-[#04B4FC] hover:text-[#04b4fc] h-[38px] text-[12px]  border-[0.5px] border-[#1C1C1C] rounded-md manrope">
            Daily Report
          </button>
          <button className=" w-[118px] hover:border-[#04B4FC] hover:text-[#04b4fc] h-[38px] text-[12px] border-[0.5px] border-[#1C1C1C] rounded-md manrope">
            Weekly Report
          </button>
          <button className=" w-[118px] hover:border-[#04B4FC] hover:text-[#04b4fc] h-[38px] text-[12px] border-[0.5px] border-[#1C1C1C] rounded-md manrope">
            Monthly Report
          </button>
          <button className=" w-[118px] hover:border-[#04B4FC] hover:text-[#04b4fc] h-[38px] text-[12px] border-[0.5px] border-[#1C1C1C] rounded-md manrope">
            Yearly Report
          </button>
          <div>
            <Download />
          </div>
          {/* <button
            onClick={handleDownload}
            className=" w-[118px] h-[38px] text-[12px]  bg-[#04B4FC] rounded-md manrope text-white"
          >
            Download
          </button> */}
          {/* {addDownload && <Download />} */}
        </div>

        <div className="w-full pb-4 overflow-x-scroll overflow-y-hidden pl-1 pr-5 pt-5">
          <table className="min-w-full table divide-y-2 divide-x-2 divide-yellow-[#7E3AF2] rounded-xl">
            <tbody className="divide-y ">
              {/* Row 1 */}
              <tr className="bg-white py-4 h-16 justify-center font-roboto">
                {/* First column (larger) */}

                <td className=" manrope text-[16px] font-bold  text-[#212529] px-4 cursor-pointer  border-r-[1px] border-yellow-[#7E3AF2]">
                  Income
                </td>

                <td className="manrope text-[16px] text-[#212529] font-bold px-4   cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                  Purchase Price
                </td>
                <td className="manrope text-[16px] text-[#212529] font-bold px-4   cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                  {" "}
                  Selling Price
                </td>
                <td className="manrope text-[16px] font-bold text-[#212529]  px-4   cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                  Profit
                </td>
                <td className="manrope text-[20px] text-[#212529] font-light px-4 w-[20%]  cursor-pointer "></td>
              </tr>

              {/* Row 2 */}
              <tr className="bg-white py-4 h-16 justify-center font-roboto">
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px] cursor-pointer w-[30%] border-r-[1px] border-yellow-[#7E3AF2]">
                  Sales
                </td>

                <td className="manrope text-[#6C757D] font-light px-4 text-[14px]   cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                  2,701
                </td>
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                  3,980
                </td>
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                  279
                </td>
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px] w-[20%] cursor-pointer ">
                  <button
                    onClick={handleItems}
                    className="bg-[#04B4FC] text-white W-[143px] px-3 h-[40px] rounded-md"
                  >
                    View Items Sold
                  </button>
                </td>
                {items && (
                  <div className="absolute right-0 left-0 top-0 bottom-0 pl-20 bg-plain bg-opacity-60 flex justify-center items-center  ">
                    <div className=" w-[870px] h-[auto] bg-white text-black p-5 rounded-md">
                      <div className=" flex items-center justify-between">
                        <p className=" text-[#383E49] text-[20px] inter font-bold">
                          Items
                        </p>
                        <div className=" ">
                          <DownloadAll />
                        </div>
                        {/* <div
                          onClick={handleIsDownload}
                          className="bn53 flex w-[118px] items-center justify-center border-[0.5px] border-[#D0D3D9] hover:border-[#1366D9]  hover:text-[#1366D9] cursor-pointer  h-[40px] rounded-md"
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
                        )} */}
                      </div>

                      <div>
                        <ViewItemsSold />
                      </div>
                    </div>
                  </div>
                )}
              </tr>
              {/* Row 3 */}
              <tr className="bg-white py-4 h-16 justify-center font-roboto">
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px] cursor-pointer w-[30%] border-r-[1px] border-yellow-[#7E3AF2]">
                  Services
                </td>

                <td className="manrope text-[#6C757D] font-light px-4 text-[14px]   cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]"></td>
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                  20,000
                </td>
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                  279
                </td>
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px] w-[20%] cursor-pointer ">
                  <button
                    onClick={handleService}
                    className="bg-[#04B4FC] text-white W-[143px] px-3 h-[40px] rounded-md"
                  >
                    View Services
                  </button>
                </td>
                {service && (
                  <div className="absolute right-0 left-0 top-0 bottom-0 pl-20 bg-plain bg-opacity-60 flex justify-center items-center  ">
                    <div className=" w-[870px] h-[auto] bg-white text-black p-5 rounded-md">
                      <div className=" flex items-center justify-between">
                        <p className="text-[20px] inter text-[#383E49]">
                          Services
                        </p>
                        <div>
                          <DownloadAll />
                        </div>
                        {/* <button
                          onClick={handleIsDownload}
                          className=" w-[118px] h-[44px] outline-none text-[#5D6679] inter rounded-md border-[0.5px] border-[#D0D3D9]"
                        >
                          Download all
                        </button>
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
                        )} */}
                      </div>
                      <div className="w-full pb-4 overflow-x-scroll overflow-y-hidden pl-1 pr-5 pt-5">
                        <table className="min-w-full table divide-y-2 divide-x-2 divide-yellow-[#7E3AF2] rounded-xl">
                          <tbody className="divide-y">
                            {/* Row 1 */}
                            <tr className="bg-white py-4 h-16 justify-center font-roboto">
                              <td className=" manrope text-[14px]  text-[#667085] px-4  cursor-pointer w-[25%] ">
                                Items
                              </td>

                              <td className="manrope text-[14px] text-[#667085] font-light px-4  w-[25%] cursor-pointer ">
                                Price
                              </td>
                              <td className="manrope text-[14px] text-[#667085] font-light px-4  w-[25%] cursor-pointer ">
                                Description
                              </td>
                              <td className="manrope text-[14px] text-[#667085] font-light px-4  w-[25%] cursor-pointer ">
                                Date of Entry
                              </td>
                            </tr>

                            {/* Row 2 */}
                            <tr className="bg-white py-4 h-16 justify-center font-roboto">
                              <td className=" manrope text-[14px]  text-[#667085] px-4  cursor-pointer w-[25%]  ">
                                Training
                              </td>

                              <td className="manrope text-[14px] text-[#667085] font-light px-4  w-[25%] cursor-pointer  ">
                                $205
                              </td>
                              <td className="manrope text-[14px] text-[#667085] font-light px-4  w-[25%] cursor-pointer ">
                                UI/UX
                              </td>
                              <td className="manrope text-[14px] text-[#667085] font-light px-4  w-[25%] cursor-pointer ">
                                March 16, 2023
                              </td>
                            </tr>

                            {/* Row 3 */}
                            <tr className="bg-white py-4 h-16 justify-center font-roboto">
                              <td className=" manrope text-[14px]  text-[#667085] px-4  cursor-pointer w-[25%]  ">
                                Web Design
                              </td>

                              <td className="manrope text-[14px] text-[#667085] font-light px-4  w-[25%] cursor-pointer  ">
                                ₹257
                              </td>
                              <td className="manrope text-[14px] text-[#667085] font-light px-4  w-[25%] cursor-pointer ">
                                Landing page
                              </td>
                              <td className="manrope text-[14px] text-[#667085] font-light px-4  w-[25%] cursor-pointer ">
                                March 16, 2023
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className=" flex justify-between ">
                        <div className="flex items-center gap-44">
                          <p className=" text-[20px] text-[#48505E] manrope font-bold">
                            Total
                          </p>
                          <p className=" text-[20px] text-[#48505E] manrope font-bold">
                            $20,000
                          </p>
                        </div>
                        <button
                          onClick={closehandleService}
                          className=" w-[72px] h-[38px] border-[#D0D3D9] border-[0.5px] rounded-md text-[#858D9D]"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </tr>
              {/* Row 4 */}
              <tr className="bg-white py-4 h-16 justify-center font-roboto">
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px] cursor-pointer w-[30%] border-r-[1px] border-yellow-[#7E3AF2]"></td>

                <td className="manrope text-[#6C757D] font-light px-4 text-[14px]   cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]"></td>
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]"></td>
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]"></td>
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px] w-[20%] cursor-pointer "></td>
              </tr>
              {/* Row 5 */}
              <tr className="bg-white py-4 h-16 justify-center font-roboto">
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px] cursor-pointer w-[30%] border-r-[1px] border-yellow-[#7E3AF2]"></td>

                <td className="manrope text-[#6C757D] font-light px-4 text-[14px]   cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]"></td>
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]"></td>
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]"></td>
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px] w-[20%] cursor-pointer "></td>
              </tr>
              {/* Row 7 */}
              <tr className="bg-white py-4 h-16 justify-center font-roboto">
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px] cursor-pointer w-[30%] border-r-[1px] border-yellow-[#7E3AF2]">
                  Total Income
                </td>

                <td className="manrope text-[#6C757D] font-light px-4 text-[14px]   cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]"></td>
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]"></td>
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px]  cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                  279
                </td>
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px] w-[20%] cursor-pointer "></td>
              </tr>
            </tbody>
          </table>

          <table className="min-w-full table divide-y-2 divide-x-2 divide-yellow-[#7E3AF2] rounded-xl">
            <tbody className="divide-y ">
              {/* Row 1 */}
              <tr className="bg-white py-4 h-16 justify-center font-roboto">
                {/* First column (larger) */}

                <td className=" manrope text-[16px] font-bold w-[50%] text-[#212529] px-4 cursor-pointer  border-r-[1px] border-yellow-[#7E3AF2]">
                  Net Profit/Loss
                </td>

                <td className="manrope text-[16px] text-[#6C757D]  font-light px-4   cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                  Profit
                </td>
                <td className="manrope text-[16px] text-[#6C757D]  font-light px-4   cursor-pointer ">
                  {" "}
                  Loss
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="bg-white py-4 h-16 justify-center font-roboto">
                <td className="manrope text-[#6C757D] font-light px-4 text-[14px] cursor-pointer w-[50%] border-r-[1px] border-yellow-[#7E3AF2]"></td>

                <td className="manrope text-[#191D23] font-bold px-4 text-[14px]   cursor-pointer border-r-[1px] border-yellow-[#7E3AF2]">
                  2,701
                </td>
                <td className="manrope text-[#191D23] font-bold px-4 text-[14px]  cursor-pointer ">
                  00000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
