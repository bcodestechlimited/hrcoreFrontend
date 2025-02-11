import React from "react";
import { Myinput, MyselectInput } from "./add-evaluation";
import { useNavigate } from "react-router-dom";

const EditEvaluation = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-11/12 p-8 mx-auto mt-10 bg-white">
        <h1 className="text-base font-bold text-main text-center segoe uppercase">
          edit employee's evaluation
        </h1>
        <div className="">
          <form action="">
            <div className="w-11/12 mx-auto mt-12 grid grid-cols-2 gap-y-10 gap-8">
              <Myinput label={"Employee Name"} />
              <Myinput label={"given date"} />
              <Myinput label={"task given"} />
              <Myinput label={"date submitted"} />
              <Myinput label={"project"} />
              <Myinput label={"given by"} />
              <Myinput label={"department"} />
              <Myinput label={"date evaluated"} />
            </div>
            <div className="w-full mt-10">
              <h1 className="text-base font-bold text-main text-left segoe uppercase">
                ratings
              </h1>
              <div className="w-11/12 mx-auto mt-12 grid grid-cols-2 gap-y-10 gap-8">
                <MyselectInput label={"efficiency"} />
                <MyselectInput label={"Accuracy"} />
                <MyselectInput label={"Timeliness"} />
                <MyselectInput label={"excellence"} />
              </div>
              <div className="w-11/12 mx-auto mt-10">
                <p className="text-black text-sm font-normal manrope py-4 capitalize">
                  remarks
                </p>
                <textarea
                  name="remarks"
                  id=""
                  cols="30"
                  rows="10"
                  className="h-40 rounded-xl w-full border"
                ></textarea>
              </div>
            </div>
            <div className="flex gap-8 justify-center mt-10">
              <button
                onClick={() => navigate("/performance")}
                className="bg-white border-main border-2 h-12 w-24 rounded-lg text-main segoe text-base font-bold"
              >
                Cancel
              </button>
              <button className="bg-main h-12 w-24 rounded-lg text-white segoe text-base font-bold">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvaluation;
