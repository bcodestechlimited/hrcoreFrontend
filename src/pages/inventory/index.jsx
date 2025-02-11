import React from "react";
import ChangeCurrency from "../../components/inventory/change-currency";
import SuperAdmin from "../../components/inventory/super-admin";
import SalesPurchaseGraph from "../../components/inventory/sales-and-purchase-graph";

const Inventory = () => {
  return (
    <div className=" bg-[#F0F1F3]">
      <div className=" bg-white pb-4 lg:flex md:flex grid justify-between items-center  lg:px-5 md:px-5 px-5 rounded-bl-xl ml-1 ">
        <div>
          <p className=" text-[24px] text-[#101828] font-bold manrope">
            Inventory
          </p>
        </div>
        <div className=" lg:flex md:flex grid lg:pt-0 md:pt-0 pt-5 items-center gap-5">
          <ChangeCurrency />
          <SuperAdmin />
        </div>
      </div>

      <div className="lg:ml-5 lg:mr-10 md:ml-5 md:mr-8 mx-5 bg-white text-[#1C1C1C] h-[188px] rounded-md grid mt-5 px-5 py-3 relative">
        <p className="manrope text-[20px]  ">Overall Inventory</p>
        {/* Item Categories */}
        <div className=" flex-wrap flex items-center justify-between pt-3">
          <div className=" flex items-center gap-5">
            <div className="grid w-[85px] h-[auto] manrope">
              <p className=" text-[14px] text-[#1570EF]">Item Categories</p>
              <p className=" text-[16px] font-bold py-3">10</p>
              <p className=" text-[#16191F] text-[14px] font-light">
                Last 7 days
              </p>
            </div>

            <div className=" lg:grid items-end md:hidden hidden ">
              <img
                className=" h-[100px] pb-4 absolute bottom-0 lg"
                src={require("../../assets/Line13.png")}
                alt=""
              />
            </div>
          </div>

          {/* Service Categories */}

          <div className=" flex items-center gap-5">
            <div className="grid w-[85px] h-[auto] manrope">
              <p className=" text-[14px] text-[#1570EF]">Service Categories</p>
              <p className=" text-[14px] font-bold py-3">2</p>
              <p className=" text-[#16191F] text-[14px] font-light">
                Last 7 days
              </p>
            </div>

            <div className=" lg:grid items-end md:hidden hidden ">
              <img
                className=" h-[100px] pb-4 absolute bottom-0"
                src={require("../../assets/Line13.png")}
                alt=""
              />
            </div>
          </div>

          {/* Total Products*/}

          <div className=" flex items-center gap-5 lg:pr-4">
            <div className="grid pt-6">
              <p className=" text-[#E19133] inter text-[14px] font-bold">
                Total Products
              </p>

              <div className=" flex items-center gap-10 ">
                <div className="grid  ">
                  <p className="py-3  inter text-[16px] text-[#1C1C1C] font-bold">
                    868
                  </p>
                  <p className=" text-[#16191F] text-[14px] ">Last 7 days</p>
                </div>
                <div className="grid">
                  <p className=" py-3 manrope text-[16px] text-[#1C1C1C] font-bold">
                    N25000
                  </p>
                  <p>Revenue</p>
                </div>
              </div>
            </div>

            <div className=" lg:grid items-end md:hidden hidden ">
              <img
                className=" h-[100px] pb-4 absolute bottom-0"
                src={require("../../assets/Line13.png")}
                alt=""
              />
            </div>
          </div>

          {/* Top Selling*/}

          <div className=" flex items-center gap-5">
            <div className="grid pt-6">
              <p className=" text-[#845EBC] inter text-[14px] font-bold">
                Top Selling
              </p>

              <div className=" flex items-center gap-10 ">
                <div className="grid  ">
                  <p className="py-3  inter text-[16px] text-[#1C1C1C] font-bold">
                    5
                  </p>
                  <p className=" text-[#16191F] text-[14px] ">Last 7 days</p>
                </div>
                <div className="grid">
                  <p className=" py-3 text-right manrope text-[16px] text-[#1C1C1C] font-bold">
                    N25000
                  </p>
                  <p className=" text-right">Cost</p>
                </div>
              </div>
            </div>

            <div className=" lg:grid items-end md:hidden hidden ">
              <img
                className=" h-[100px] pb-4 absolute bottom-0"
                src={require("../../assets/Line13.png")}
                alt=""
              />
            </div>
          </div>

          {/* Low Stocks*/}

          <div className=" flex items-center gap-5">
            <div className="grid pt-6">
              <p className=" text-[#F36960] inter text-[14px] font-bold">
                Low Stocks
              </p>

              <div className=" flex items-center gap-10 ">
                <div className="grid  ">
                  <p className="py-3  inter text-[16px] text-[#1C1C1C] font-bold">
                    12
                  </p>
                  <p className=" text-[#16191F] text-[14px] ">Ordered</p>
                </div>
                <div className="grid">
                  <p className=" py-3 text-right manrope text-[16px] text-[#1C1C1C] font-bold">
                    2
                  </p>
                  <p className=" text-right">Not in stock</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Overview */}
      <div className=" lg:flex md:grid grid lg:gap-5 md:gap-5 gap-5 items-center justify-between lg:ml-5 lg:mr-10 md:ml-5 md:mr-8 mx-5 pt-5">
        <div className=" lg:w-[70%] bg-white rounded-md grid px-5 lg:pt-5 md:pt-5 pt-5 pb-6">
          <p className="text-[#1C1C1C] manrope text-[20px]">Sales Overview</p>
          <div className=" flex items-center justify-between relative lg:pt-5 md:pt-5 pt-8">
            <div className=" flex flex-wrap items-center lg:gap-3 md:gap-5 gap-10 justify-between">
              {/* Sales */}
              <div className=" flex justify-center items-end gap-5">
                <div className=" grid justify-center gap-5 ">
                  <div className=" flex justify-center">
                    <img
                      className=" w-[30px] h-[30px]"
                      src={require("../../assets/Sales.png")}
                      alt=""
                    />
                  </div>
                  <div className=" flex justify-between items-center gap-5">
                    <p className=" text-[#1C1C1C] manrope text-[16px]">N 832</p>
                    <p className=" font-light manrope text-[#16191F] text-[14px]">
                      Sales
                    </p>
                  </div>
                </div>

                <div className="  lg:grid items-end md:hidden hidden ">
                  <img
                    className=" lg:h-[75px] md:h-[50px] h-[70px] "
                    src={require("../../assets/Line13.png")}
                    alt=""
                  />
                </div>
              </div>

              {/* Revenue */}
              <div className=" flex justify-center items-end gap-5">
                <div className=" grid justify-center gap-5">
                  <div className=" flex justify-center">
                    <img
                      className=" w-[30px] h-[30px]"
                      src={require("../../assets/Sales2.png")}
                      alt=""
                    />
                  </div>
                  <div className=" flex justify-between items-center gap-5">
                    <p className=" text-[#1C1C1C] manrope text-[16px]">
                      N 18,300
                    </p>
                    <p className=" font-light manrope text-[#16191F] text-[14px]">
                      Revenue
                    </p>
                  </div>
                </div>

                <div className="  lg:grid items-end md:hidden hidden ">
                  <img
                    className=" h-[75px] "
                    src={require("../../assets/Line13.png")}
                    alt=""
                  />
                </div>
              </div>

              {/* Profit*/}
              <div className=" flex justify-center items-end gap-5">
                <div className=" grid justify-center gap-5">
                  <div className=" flex justify-center">
                    <img
                      className=" w-[30px] h-[30px]"
                      src={require("../../assets/Sales3.png")}
                      alt=""
                    />
                  </div>
                  <div className=" flex justify-between items-center gap-5">
                    <p className=" text-[#1C1C1C] manrope text-[16px]">N 868</p>
                    <p className=" font-light manrope text-[#16191F] text-[14px]">
                      Profit
                    </p>
                  </div>
                </div>

                <div className="  lg:grid items-end md:hidden hidden ">
                  <img
                    className=" h-[75px] "
                    src={require("../../assets/Line13.png")}
                    alt=""
                  />
                </div>
              </div>

              {/* Cost*/}
              <div className=" flex justify-center items-end gap-5">
                <div className=" grid justify-center gap-5 ">
                  <div className=" flex justify-center">
                    <img
                      className=" w-[30px] h-[30px]"
                      src={require("../../assets/Sales4.png")}
                      alt=""
                    />
                  </div>
                  <div className=" flex justify-between items-center gap-5">
                    <p className=" text-[#1C1C1C] manrope text-[16px]">
                      N 17,432
                    </p>
                    <p className=" font-light manrope text-[#16191F] text-[14px]">
                      Cost
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" bg-white rounded-md grid lg:px-5 lg:w-[35%]">
          <p className=" lg:pl-0 md:pl-0 pl-5 inter text-[20px] text-[#1C1C1C] pt-4 pb-3">
            Inventory Summary
          </p>

          <div className=" flex flex-wrap items-end gap-5 justify-center">
            <div className=" grid justify-center pb-2">
              <div className=" flex justify-center">
                <img
                  className=" w-[30px] h-[30px]"
                  src={require("../../assets/Sales5.png")}
                  alt=""
                />
              </div>

              <p className=" text-center text-[#1C1C1C] text-[20px] manrope font-bold py-2">
                868
              </p>
              <p className=" inter text-[14px] text-center text-[#16191F]">
                Quantity in Hand
              </p>
            </div>
            <div>
              <img
                className="h-[75px]"
                src={require("../../assets/Line13.png")}
                alt=""
              />
            </div>
            <div className=" grid justify-center pb-2">
              <div className=" flex justify-center">
                <img
                  className=" w-[30px] h-[30px]"
                  src={require("../../assets/Sales6.png")}
                  alt=""
                />
              </div>

              <p className=" text-[#1C1C1C] text-center text-[20px] manrope font-bold py-2">
                200
              </p>
              <p className=" text-center inter text-[14px] text-[#16191F]">
                To be received
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Overview */}

      <div className=" lg:flex md:grid grid lg:gap-5 md:gap-5 gap-5 items-center justify-between pb-5 lg:ml-5 lg:mr-10 md:ml-5 md:mr-8 mx-5 pt-5">
        <div className=" lg:w-[70%] bg-white rounded-md grid px-5 lg:pt-5 md:pt-5 pt-5 pb-6">
          <p className="text-[#1C1C1C] manrope text-[20px]">
            Purchase Overview
          </p>
          <div className=" flex items-center justify-between relative lg:pt-5 md:pt-5 pt-8">
            <div className=" flex flex-wrap items-center lg:gap-3  md:gap-5 gap-10 justify-between">
              {/* Purchase */}
              <div className=" flex justify-center items-end gap-7">
                <div className=" grid justify-center gap-5 ">
                  <div className=" flex justify-center">
                    <img
                      className=" w-[30px] h-[30px]"
                      src={require("../../assets/Purchase1.png")}
                      alt=""
                    />
                  </div>
                  <div className=" flex justify-between items-center gap-5">
                    <p className=" text-[#1C1C1C] manrope text-[16px]">82</p>
                    <p className=" font-light manrope text-[#16191F] text-[14px]">
                      Purchase
                    </p>
                  </div>
                </div>

                <div className="  lg:grid items-end md:hidden hidden ">
                  <img
                    className=" lg:h-[75px] md:h-[50px] h-[70px] "
                    src={require("../../assets/Line13.png")}
                    alt=""
                  />
                </div>
              </div>

              {/*   Cost */}
              <div className=" flex justify-center items-end gap-7">
                <div className=" grid justify-center gap-5">
                  <div className=" flex justify-center">
                    <img
                      className=" w-[30px] h-[30px]"
                      src={require("../../assets/Purchase2.png")}
                      alt=""
                    />
                  </div>
                  <div className=" flex justify-between items-center gap-6">
                    <p className=" text-[#1C1C1C] manrope text-[16px]">
                      N 13,573
                    </p>
                    <p className=" font-light manrope text-[#16191F] text-[14px]">
                      Cost
                    </p>
                  </div>
                </div>

                <div className="  lg:grid items-end md:hidden hidden ">
                  <img
                    className=" h-[75px] "
                    src={require("../../assets/Line13.png")}
                    alt=""
                  />
                </div>
              </div>

              {/* Cancel*/}
              <div className=" flex justify-center items-end gap-6">
                <div className=" grid justify-center gap-5">
                  <div className=" flex justify-center">
                    <img
                      className=" w-[30px] h-[30px]"
                      src={require("../../assets/Purchase3.png")}
                      alt=""
                    />
                  </div>
                  <div className=" flex justify-between items-center gap-8">
                    <p className=" text-[#1C1C1C] manrope text-[16px]">5</p>
                    <p className=" font-light manrope text-[#16191F] text-[14px]">
                      Cancel
                    </p>
                  </div>
                </div>

                <div className="  lg:grid items-end md:hidden hidden ">
                  <img
                    className=" h-[75px] "
                    src={require("../../assets/Line13.png")}
                    alt=""
                  />
                </div>
              </div>

              {/*  Return*/}
              <div className=" flex justify-center items-end gap-7">
                <div className=" grid justify-center gap-5 ">
                  <div className=" flex justify-center">
                    <img
                      className=" w-[30px] h-[30px]"
                      src={require("../../assets/Purchase4.png")}
                      alt=""
                    />
                  </div>
                  <div className=" flex justify-between items-center gap-5">
                    <p className=" text-[#1C1C1C] manrope text-[16px]">
                      N17,432
                    </p>
                    <p className=" font-light manrope text-[#16191F] text-[14px]">
                      Return
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-[35%] bg-white rounded-md grid lg:px-5">
          <p className=" lg:pl-0 md:pl-0 pl-5 inter text-[20px] text-[#1C1C1C] pt-4 pb-3">
            Items Summary
          </p>

          <div className=" flex flex-wrap items-end gap-5 justify-center">
            <div className=" grid justify-center pb-2">
              <div className=" flex justify-center">
                <img
                  className=" w-[30px] h-[30px]"
                  src={require("../../assets/Purchase5.png")}
                  alt=""
                />
              </div>

              <p className=" text-center text-[#1C1C1C] text-[20px] manrope font-bold py-2">
                31
              </p>
              <p className=" inter text-[14px] text-center text-[#16191F]">
                Number of Suppliers
              </p>
            </div>
            <div>
              <img
                className="h-[75px]"
                src={require("../../assets/Line13.png")}
                alt=""
              />
            </div>
            <div className=" grid justify-center pb-2">
              <div className=" flex justify-center">
                <img
                  className=" w-[30px] h-[30px]"
                  src={require("../../assets/Purchase6.png")}
                  alt=""
                />
              </div>

              <p className=" text-[#1C1C1C] text-center text-[20px] manrope font-bold py-2">
                10
              </p>
              <p className=" text-center inter text-[14px] text-[#16191F]">
                Number
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Overview */}

      <div className=" lg:flex md:grid grid lg:gap-5 md:gap-5 gap-5 items-center justify-between pb-5 lg:ml-5 lg:mr-10 md:ml-5 md:mr-8 mx-5">
        <div className=" lg:w-[70%] bg-white rounded-md grid px-5 lg:pt-5 md:pt-5 pt-5 pb-6">
          <SalesPurchaseGraph />
        </div>
        <div className=" lg:w-[35%] lg:h-[340px] bg-white rounded-md grid lg:px-5">
          <p className=" lg:pl-0 md:pl-0 pl-5 inter text-[22px] text-[#1C1C1C] font-bold pt-4 pb-3">
            Order Summary
          </p>

          <div className="  ">
            <img src={require("../../assets/Group44.png")} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
