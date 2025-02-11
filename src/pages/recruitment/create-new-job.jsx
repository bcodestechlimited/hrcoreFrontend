import { Input } from "postcss";
import React, { useState } from "react";
import MultiStep from "react-multistep";

const CreateJob = () => {
  const [form, setForm] = useState("1");
  const steps = [
    {
      name: "Step1",
      component: <Step1 />,
    },
    {
      name: "Step2",
      component: <Step2 />,
    },
  ];
  
  return (
    <div>
      <div className="w-5/6 mx-auto bg-white">
        <h2 className="text-base nunito text-black font-medium">
          Application Questions
        </h2>
        {form === "1" && <Step1 handleNext={() => setForm("2")} />}
        {form === "2" && (
          <Step2
            handleback={() => setForm("1")}
            handleNext={() => setForm("3")}
          />
        )}
        {form === "3" && <Step3 handleback={() => setForm("2")} />}
      </div>
    </div>
  );
};
const Step2 = ({ handleNext, handleback }) => {
  return (
    <div>
      <form action="" className="mt-10 space-y-4">
        <div className="flex gap-4">
          {" "}
          <div>
            {" "}
            <p className="lato text-sm font-medium text-main w-64">
              {"Job Level"}
            </p>
            <p className="lato text-xs font-medium text-[#7E8597]">
              Choose multiple options if applicable
            </p>
          </div>
          <div className="flex gap-4">
            <MyCheckBox label={"Graduate"} />
            <MyCheckBox label={"Entry Level"} />
            <MyCheckBox label={"Mid-senior"} />
            <MyCheckBox label={"Senor"} />
          </div>
        </div>
        <MyInput
          label={"Hiring Manager"}
          label2={true}
          info={"Enter hiring manager name and ID"}
        />
        <MyInput label={"Recruiters"} />
        <div className="float-right flex gap-8 mt-24">
          <button
            onClick={handleback}
            className="bg-white rounded border border-black text-black font-mediumh-10 w-32"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-black text-white h-10 w-32 text-xs lato font-medium"
          >
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};
const Step1 = ({ handleNext }) => {
  return (
    <div>
      <form action="" className="mt-6 space-y-4 mb-12">
        <MyInput label={"Enter Full Name"} />
        <MytextArea
          label={"Job Description"}
          placeholder={"Enter job description"}
        />
        <MytextArea
          label={"Job Requirements"}
          placeholder={"Enter job requirement"}
        />
        <div className="flex gap-4">
          {" "}
          <div>
            {" "}
            <p className="lato text-sm font-medium text-main w-64">
              {"Job Type"}
            </p>
            <p className="lato text-xs font-medium text-[#7E8597]">
              Choose multiple options if applicable
            </p>
          </div>
          <div className="flex gap-4">
            <MyCheckBox label={"Full time"} />
            <MyCheckBox label={"Part time"} />
            <MyCheckBox label={"Internship"} />
            <MyCheckBox label={"Temporary"} />
            <MyCheckBox label={"Contract"} />
          </div>
        </div>
        <MyInput
          label={"Job Location"}
          placeholder={"Choose Location"}
          label2={true}
          info={"Choose multiple options if applicable"}
        />
        <div className="flex gap-4">
          {" "}
          <div>
            {" "}
            <p className="lato text-sm font-medium text-main w-64">
              {"Recruitment Limit"}
            </p>
            <p className="lato text-xs w-64 font-medium text-[#7E8597]">
              Mention number of open positions or number of candidates going to
              be hired
            </p>
          </div>
          <div className="flex gap-4">
            <MyCheckBox label={"0 - 10"} />
            <MyCheckBox label={"10 - 50"} />
            <MyCheckBox label={"> 50"} />
          </div>
        </div>
        <div className="float-right mt-16">
          <button
            onClick={handleNext}
            className="bg-black text-white h-10 w-32 text-xs lato font-medium"
          >
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};
const Step3 = ({ handleNext, handleback }) => {
  const Arr = [
      {
        name: "Job Name",
        value: "Product Designer",
      },
      {
        name: "Job Fescription",
        value:
          "Product designers are in charge of the entire product creation process. They are ultimately responsible for discovering and defining a problem, and then empathically designing a solution. The skills that a product designer must have range from technical to human-centered design.Product designers take part in user research, prototyping, visualization, testing, analyzing, and communicating.",
      },
      {
        name: "Job Type",
        value: "Full Time",
      },
      {
        name: "Job Location",
        value: "Remote",
      },
      {
        name: "Recuritment Limit",
        value: "0 - 10 Candidates",
      },
    ],
    Arr2 = [
      {
        name: "Job Title",
        value: "Graduate/Entry Level",
      },
      {
        name: "Hiring Manager",
        value: "Debbie Adeoye, Adeoti Adeoye, Adeoye Ella",
      },
      {
        name: "Recruiters",
        value: "Debbie Adeoye, Adeoti Adeoye, Adeoye Ella",
      },
      {
        name: "Collaborators",
        value: "Debbie Adeoye, Adeoti Adeoye, Adeoye Ella",
      },
    ];
  return (
    <div>
      <div className="mt-10 mb-16">
        <h2 className="lato text-base text-[#1E2126] font-medium">Review</h2>
        <h2 className="lato text-base text-[#1E2126] font-medium pt-6">
          Basic Information
        </h2>
        <div className="mt-16 space-y-5">
          {Arr.map((item, i) => (
            <div key={i}>
              <h4 className="text-sm lato text-main font-medium">
                {item.name}
              </h4>
              <p className="text-sm lato text-[#7E8597] font-medium">
                {item.value}
              </p>
            </div>
          ))}
        </div>
        <h2 className="lato text-base text-[#1E2126] font-medium pt-6">
          Basic Information
        </h2>
        <div className="space-y-4 mt-8">
          {Arr2.map((item, i) => (
            <div key={i}>
              <h4 className="text-sm lato text-main font-medium">
                {item.name}
              </h4>
              <p className="text-sm lato text-[#7E8597] font-medium">
                {item.value}
              </p>
            </div>
          ))}
        </div>
        <div className="float-right flex gap-8 my-24">
          <button
            onClick={handleback}
            className="bg-white rounded border border-black text-black font-mediumh-10 w-32"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-black text-white h-10 w-32 text-xs lato font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export const MyInput = ({
  label,
  value,
  name,
  onChange,
  placeholder,
  label2,
  info,
}) => {
  return (
    <div className="flex gap-4 items-center">
      <div>
        {" "}
        <p className="lato text-sm font-medium text-main w-64">{label}</p>
        <p
          className={
            label2 ? "lato text-xs font-medium text-[#7E8597]" : "hidden"
          }
        >
          {info}
        </p>
      </div>
      <input
        type="text"
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="border border-[#ccc] rounded w-1/2 mt-4 h-12 text-base font-medium text-black"
      />
    </div>
  );
};
export const MytextArea = ({ label, value, name, placeholder }) => {
  return (
    <div className="flex gap-4">
      <p className="lato text-sm font-medium text-main w-64">{label}</p>
      <textarea
        name={name}
        value={value}
        id=""
        cols="30"
        rows="10"
        placeholder={placeholder}
        className="border border-[#ccc] rounded w-1/2 mt-4 h-32 text-base font-medium text-black"
      ></textarea>
    </div>
  );
};
export const MySelectInput = ({ label, name, value, onChange }) => {
  return (
    <div>
      <p className="lato text-sm font-medium text-main">{label}</p>
      <select
        onChange={onChange}
        name={name}
        id=""
        className="border border-[#ccc] rounded w-1/2 mt-4 h-12 text-base font-medium text-black"
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>
  );
};
export const MyDateInput = ({ label, name, value, onChange }) => {
  return (
    <div>
      <p className="lato text-sm font-medium text-main">{label}</p>
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        id=""
        className="border border-[#ccc] rounded w-96 mt-4 h-12 text-base font-medium text-black"
      />
    </div>
  );
};
export const MyCheckBox = ({ label, value, name, onChange }) => {
  return (
    <div className="">
      <input
        type="checkbox"
        name={name}
        id=""
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={name}
        className="text-sm text-[#3C4657] pl-4 lato font-normal"
      >
        {label}
      </label>
    </div>
  );
};
export default CreateJob;
