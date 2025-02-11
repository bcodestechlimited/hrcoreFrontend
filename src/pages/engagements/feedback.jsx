import { useNavigate } from "react-router-dom";
import FormName from "../../components/form-name/form-name";

const Feedback = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="p-4">
                S/N
              </th>
              <th scope="col" className="px-6 py-3">
                Sent By
              </th>
              <th scope="col" className="px-6 py-3">
                Date Sent
              </th>
              <th scope="col" className="px-6 py-3">
                Topic
              </th>
              <th scope="col" className="px-6 py-3">
                Urgency
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              className="bg-white border-b cursor-pointer"
              onClick={() => navigate("/employee/offboarding/details")}
            >
              <td className="w-4 p-4">1</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <FormName />
              </th>
              <td className="px-6 py-4">Monday 22nd Oct</td>
              <td className="px-6 py-4">Returned</td>
              <td className="px-6 py-4">Medium</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center justify-center px-2 ml-3 text-xs whitespace-nowrap p-1 font-medium text-gray-800 bg-gray-100 rounded-md">
                  View Details
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedback;
