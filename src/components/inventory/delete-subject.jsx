import React from "react";

const DeleteSubject = () => {
  return (
    <div>
      <div className="absolute right-0 left-0 top-0 bottom-0 pl-20 bg-plain bg-opacity-60 flex justify-center items-center  ">
        <div className=" w-[438px] h-[auto] bg-white text-black py-5">
          <div className=" flex items-center justify-end">
            <p className=" cursor-pointer text-[24px] inter font-bold pr-10 ">
              X
            </p>
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
            <button className=" w-[110px] h-[35px] bg-[#1D48E1] text-white rounded-md inter text-[16px]">
              No
            </button>
            <button className=" w-[110px] h-[35px] border-[0.5px] border-[#1D48E1] rounded-md text-[#1D48E1] inter text-[16px]">
              Yes
            </button>
            {/* {isDeletedSuccessfully && (
                  <div className="absolute right-0 left-0 top-0 bottom-0 pl-20 bg-plain bg-opacity-60 flex justify-center items-center  ">
                    <div className=" w-[438px] h-[auto] bg-white text-black py-5">
                      <div className=" flex items-center justify-end">
                        <p
                          
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
                )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteSubject;
