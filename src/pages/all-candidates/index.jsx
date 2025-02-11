import React from "react";
import Search from "../../components/search/search";
import { IconContext } from "react-icons";
import { AiFillEye } from "react-icons/ai";
import { MainPaginate } from "../../components/pagination/pagination";

const AllCandidates = () => {
  const Arr = [
    {
      name: "Olivia rhye",
      department: "design",
      date: "08/02/2023",
      stages: "Reviewed",
      email: "sample@hrcore.com",
    },
    {
      name: "Olivia rhye",
      department: "design",
      date: "08/02/2023",
      stages: "Reviewed",
      email: "sample@hrcore.com",
    },
    {
      name: "Olivia rhye",
      department: "design",
      date: "08/02/2023",
      stages: "Reviewed",
      email: "sample@hrcore.com",
    },
    {
      name: "Olivia rhye",
      department: "design",
      date: "08/02/2023",
      stages: "Reviewed",
      email: "sample@hrcore.com",
    },
    {
      name: "Olivia rhye",
      department: "design",
      date: "08/02/2023",
      stages: "Reviewed",
      email: "sample@hrcore.com",
    },
  ];
  return (
    <div>
      <div className="w-full p-10 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <select
              id="countries"
              class="bg-gray-50 w-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            >
              <option selected>Bulk Commands</option>
              <option value="reset">Reset Password</option>
              <option value="disable">Disable</option>
              <option value="audit">Audit</option>
            </select>
          </div>
          <div className="flex items-center gap-4 w-2/3">
            <Search />
          </div>
        </div>
        <div className="w-full">
          <table className="w-full mt-10">
            <thead className="text-xs manrope text-[#667085] text-left font-medium capitalize bg-[#F9FAFB] border-b border-b-[#EAECF0]">
              <tr>
                <th scope="col" className="p-3">
                  S/N
                </th>
                <th scope="col" className="px-4 py-3">
                  Name
                </th>
                <th scope="col" className="pr-4 py-3">
                  Job/Department
                </th>
                <th scope="col" className="pr-4 py-3">
                  Date Applied
                </th>
                <th scope="col" className="pr-4 py-3">
                  Stages Passed
                </th>
                <th scope="col" className="pr-4 py-3">
                  Email Address
                </th>
                <th scope="col" className="pr-4 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Arr?.map((item, i) => (
                <tr
                  key={i}
                  className="text-sm inter text-left font-normal capitalize text-[#667085] inter border-b border-b-[#EAECF0]"
                >
                  <td className="w-8 pr-4 pl-2 py-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <label for="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="flex p-4 h-full items-center gap-3 text-[#101828] inter font-medium text-sm">
                    {" "}
                    <img
                      class="w-10 h-10 border-2 border-[#F72585] rounded-full"
                      src={require("../../assets/photo-2.png")}
                      alt=""
                    />
                    <p className="">{item.name}</p>
                  </td>
                  <td className="pr-3">{item.department}</td>
                  <td className="pr-3">{item.date}</td>
                  <td className="pr-3">{item.stages}</td>
                  <td className="pr-3">{item.email}</td>
                  <td className="px-3 cursor-pointer">
                    <IconContext.Provider value={{ color: "#2A72A8" }}>
                      <AiFillEye />
                    </IconContext.Provider>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex mt-4 items-center justify-center">
          <MainPaginate />
        </div>
      </div>
    </div>
  );
};

export default AllCandidates;
