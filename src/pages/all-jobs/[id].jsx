import React, { useState } from "react";
import { AiFillEye, AiOutlineRight } from "react-icons/ai";
// import Addbutton from "../../../../ components/button/addbutton";
import Addbutton from "../../components/button/addbutton";

import { Link, useNavigate } from "react-router-dom";
import AllJobCard from "../../components/recruitment/all_job_card";
import { MainRanger } from "../../components/pagination/pagination";
import FormName from "../../components/form-name/form-name";
import Option from "../../components/oprion/option";
import { IconContext } from "react-icons";
// import Recruitment_Stage_Head from "../../components/alljobs/stage-head";
// import Recruitment_Stage_Body from "../../components/alljobs/stage-body";
import { jobdata } from "../../components/alljobs/all_data";
import Stage from "../../components/alljobs/stage";
import { AiFillCopy } from "react-icons/ai";
import { toast } from "react-toastify";

function AllJobsDetails() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("candidates");

  return (
    <div>
      <div className="   mb-8">
        <div className="flex  items-center gap-2">
          <div className=" font-semibold text-base">Recruitment</div>

          <AiOutlineRight size={15} />

          <div className=" font-semibold text-base">Product Designer</div>
        </div>

        <div className="">
          <span className="font-semibold  text-base mr-5">
            Senior Product Designer
          </span>
          <div className="flex gap-2 items-center">
            <Link
              to="/recruitment/job-description"
              className="text-main text-base font-medium lato"
            >
              Link to Apply
            </Link>
            <div className="cursor-pointer">
              <IconContext.Provider value={{ color: "#000" }}>
                <AiFillCopy
                  size={20}
                  onClick={() =>
                    navigator.clipboard
                      .writeText("https://www.jobapplication.com")
                      .then(() => toast.info("Copied", { autoClose: 2000 }))
                  }
                />
              </IconContext.Provider>
            </div>
          </div>

          {/* <Link
            to="/all-jobs/job-description"
            className="font-semibold   text-xs"
          >
            Link to apply{" "}
          </Link> */}
        </div>
      </div>
      <div className="jobs_card_div">
        <div className="flex justify-between items-center  mb-4">
          <div className="flex gap-3 ">
            <span
              onClick={() => setTab("candidates")}
              className={
                tab === "candidates"
                  ? "text-[15px]  cursor-pointer text-[#2A72A8] font-semibold underline"
                  : "font-medium text-[15px] cursor-pointer text-[#44444486] "
              }
            >
              Candidates
            </span>
            <span
              onClick={() => setTab("details")}
              className={
                tab === "details"
                  ? "text-[15px]  cursor-pointer text-[#2A72A8] font-semibold underline"
                  : "font-medium text-[15px] cursor-pointer text-[#44444486] "
              }
            >
              Job details
            </span>
          </div>

          <p className="flex items-center gap-2 font-medium">
            <Addbutton
              background={"bg-secondary"}
              create={true}
              text={"Update"}
              onClick={() => navigate("/all-jobs/create-new-job")}
            />
          </p>
        </div>
        {tab === "candidates" && <CandidatesTab />}
        {tab === "details" && <DetailsTab />}
      </div>
    </div>
  );
}

const CandidatesTab = () => {
  return (
    <div>
      <div className="relative overflow-x-auto overflow-y-visible min-h-screen">
        {/* <MainRanger range={range} setRange={setRange} /> */}

        <div className="flex justify-between  gap-5">
          {jobdata.map((item) => {
            return (
              <div className="" key={item.id}>
                <Stage datas={item} />
                <div className="mb-5">
                  {/* <Recruitment_Stage_Head
                      name="Product Designer"
                      amount="10"
                    /> */}
                </div>
                <div>{/* <Recruitment_Stage_Body item_datas={item} /> */}</div>
              </div>
            );
          })}
        </div>
        {/* <div className="">
            <div className="">
              <div className="mb-5">
                <Recruitment_Stage_Head name="Product Designer" amount="10" />
              </div>
              <div>
                <Recruitment_Stage_Body item={CardData} />
              </div>
            </div>
          </div> */}
      </div>
    </div>
  );
};
const DetailsTab = () => {
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
    ],
    Arr3 = [
      {
        name: "Resume Screening",
        value: "debbie Adeoye, Adeoti Adeoye, Adeoye Ella",
      },
      {
        name: "Screening Call",
        value: "debbie Adeoye, Adeoti Adeoye, Adeoye Ella",
      },
      {
        name: "In-Person Interview",
        value: "debbie Adeoye, Adeoti Adeoye, Adeoye Ella",
      },
      {
        name: "Background Check",
        value: "debbie Adeoye, Adeoti Adeoye, Adeoye Ella",
      },
      {
        name: "Offer",
        value: "debbie Adeoye, Adeoti Adeoye, Adeoye Ella",
      },
    ];
  return (
    <div>
      <div>
        <div className="mt-10 mb-16 w-3/4 mx-auto">
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
          <div className="mt-10">
            <h2 className="lato text-base text-[#1E2126] font-medium pt-6">
              Appplication Form
            </h2>
            <button className="bg-black mt-6 text-white h-10 w-32 text-xs lato font-medium">
              Preview form
            </button>
          </div>
          <div className="mt-6">
            <h2 className="lato text-base text-[#1E2126] font-medium pt-6">
              Stages
            </h2>
            <div className="space-y-4 mt-8">
              {Arr3.map((item, i) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJobsDetails;
