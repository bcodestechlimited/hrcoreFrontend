import { Link } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import { PiFolderNotchFill } from "react-icons/pi";
import { BsMegaphone } from "react-icons/bs";
import AnnouncementCard from "../../components/announcement-card/announcement-card";

const Dashboard = () => {
  return (
    <div className="grid lg:grid-cols-7 gap-4">
      <div className="col-span-5">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center justify-center">
            <div className="relative block w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                1200
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-md">
                  +4%
                </span>
              </h5>
              <p className="font-normal text-gray-700 text-xs">Employees</p>
              <div className="absolute inline-flex items-center justify-center w-12 h-12 text-xs font-bold text-white bg-[#2A72A8] border-2 border-white rounded-full -top-3 right-4">
                8
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative block w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                30%
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-md">
                  View Details
                </span>
              </h5>
              <p className="font-normal text-gray-700 text-xs">Engagement</p>
              <div className="absolute inline-flex items-center justify-center w-12 h-12 text-xs font-bold text-white bg-[#2A72A8] border-2 border-white rounded-full -top-3 right-4">
                8
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative block w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                10%
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-md">
                  View Details
                </span>
              </h5>
              <p className="font-normal text-gray-700 text-xs">
                2023 Attribution Rate
              </p>
              <div className="absolute inline-flex items-center justify-center w-12 h-12 text-xs font-bold text-white bg-[#2A72A8] border-2 border-white rounded-full -top-3 right-4">
                8
              </div>
            </div>
          </div>
        </div>

        {/* 1 */}

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
          <div className="p-4 flex items-center justify-between">
            <p className="font-semibold">Leave Request</p>
            <p className="flex items-center gap-2 font-medium">
              View All{" "}
              <span>
                <MdArrowForwardIos />
              </span>
            </p>
          </div>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="p-4">
                  S/N
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Leave Type
                </th>
                <th scope="col" class="px-6 py-3">
                  From - To
                </th>
                <th scope="col" class="px-6 py-3">
                  Request
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">1</td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="flex items-center space-x-4">
                    <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden border-red-600 border bg-gray-100 rounded-full dark:bg-gray-600">
                      <span class="font-medium text-gray-600 dark:text-gray-300">
                        OA
                      </span>
                    </div>
                    <div className="font-medium">
                      <div>Ola-Akande Ayokunle</div>
                    </div>
                  </div>
                </th>
                <td class="px-6 py-4">Unpaid - Sick Day</td>
                <td class="px-6 py-4">2nd Novenber - 11th December</td>
                <td class="px-6 py-4">2</td>
                <td class="px-6 py-4">
                  <div className="cursor-pointer">
                    <SlOptionsVertical size={24} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 2 */}

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
          <div className="p-4 flex items-center justify-between">
            <p className="font-semibold">Recent Documents</p>
            <p className="flex items-center gap-2 font-medium">
              View All{" "}
              <span>
                <MdArrowForwardIos />
              </span>
            </p>
          </div>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="p-4">
                  S/N
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Sharing
                </th>
                <th scope="col" class="px-6 py-3">
                  Modified
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">1</td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-[#2A72A8]">
                      <PiFolderNotchFill size={24} />
                    </span>
                    <div className="font-medium">
                      <div>Getting Started with HR Core Softwar</div>
                    </div>
                  </div>
                </th>
                <td class="px-6 py-4">
                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-md">
                    Public
                  </span>
                </td>
                <td class="px-6 py-4">Feb 20th 2023</td>
                <td class="px-6 py-4">
                  <div className="cursor-pointer">
                    <SlOptionsVertical size={24} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* 3 */}

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
          <div className="p-4 flex items-center justify-between">
            <p className="font-semibold">Invoice</p>
            <p className="flex items-center gap-2 font-medium">
              View All{" "}
              <span>
                <MdArrowForwardIos />
              </span>
            </p>
          </div>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="p-4">
                  S/N
                </th>
                <th scope="col" class="px-6 py-3">
                  Unique ID
                </th>
                <th scope="col" class="px-6 py-3">
                  Contact
                </th>
                <th scope="col" class="px-6 py-3">
                  Issue Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Total
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">1</td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  business/0384
                </th>
                <td class="px-6 py-4">GT bank</td>
                <td class="px-6 py-4">2023-02-23</td>
                <td class="px-6 py-4">closed</td>
                <td class="px-6 py-4">$43</td>
                <td class="px-6 py-4">
                  <div className="cursor-pointer">
                    <SlOptionsVertical size={24} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-span-2 hidden sm:block space-y-4">
        <div className="flex items-center justify-center">
          <div className="relative block w-full p-6 py-4 bg-white border border-gray-200 rounded-lg shadow">
            <div className="flex items-center space-x-4">
              <div class="flex -space-x-4">
                <img
                  class="w-10 h-10 border-2 border-[#F72585] rounded-full"
                  src={require("../../assets/photo-2.png")}
                  alt=""
                />
                <img
                  class="w-10 h-10 border-2 border-[#F72585] rounded-full"
                  src={require("../../assets/photo-3.png")}
                  alt=""
                />
                <Link
                  to=""
                  class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-[#F72585] border-2 border-[#F72585] rounded-full"
                >
                  +24
                </Link>
              </div>
              <div className="">
                <div className="text-md font-medium">Birthday celebrant</div>
                <div className="text-sm text-gray-5 flex items-center gap-2">
                  click to see more{" "}
                  <span>
                    <MdArrowForwardIos />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="flex items-center justify-center">
          <div className="relative block w-full p-6 py-4 bg-white border border-gray-200 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <span>
                <MdArrowBackIosNew />
              </span>
              <p>Upcoming Holiday</p>
              <span>
                <MdArrowForwardIos />
              </span>
            </div>
            <div className="bg-gray-200 flex rounded-md border border-gray-50 p-2 px-4 font-medium mt-4 justify-between">
              <p>Easter Sunday</p>
              <span>|</span>
              <p>12th Oct</p>
            </div>
          </div>
        </div>

        {/*  */}

        <div class="block max-w-sm p-4 bg-white border border-gray-200 rounded-md shadow space-y-2">
          <p class="text-xl font-semibold tracking-tight text-gray-900 flex items-center gap-6 mb-4">
            Announcement
            <span>
              <BsMegaphone />
            </span>
          </p>

          <AnnouncementCard />
          <AnnouncementCard />
          <AnnouncementCard />
          <AnnouncementCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
