import React from "react";
import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

let InvoiceTemplateArray = [
	{
		name: "unilever",
		template: "unilever",
	},
	{
		name: "recruitments",
		template: "recruitment",
	},
	{
		name: "fleet management",
		template: "fleet",
	},
	{
		name: "legal & Law",
		template: "legal",
	},
	{
		name: "training",
		template: "training",
	},
];

if (process.env.REACT_APP_NAME === "Cephas HR Core")
	InvoiceTemplateArray = [
		...InvoiceTemplateArray,
		{ name: "Software Development", template: "client" },
	];

export { InvoiceTemplateArray };

const CreateInvoice = () => {
	const navigate = useNavigate(),
		[template, setTemplate] = useState("unilever");
	return (
		<div>
			<div className="bg-[#EFF6FC] w-full h-full py-8 px-4">
				<div className="flex items-center cursor-pointer ml-2">
					<span onClick={() => navigate(-1)}>Invoices</span>
					<MdOutlineKeyboardArrowRight />
					<span>Create Invoice </span>
				</div>
				<h2 className="text-base pt-7 manrope text-black font-bold">
					Templates
				</h2>
				<div className="w-5/6 mt-6">
					<div className="w-full bg-white rounded-3xl p-6">
						<div className="grid grid-cols-5 gap-4">
							{InvoiceTemplateArray.map((item, i) => (
								<div
									onClick={() => setTemplate(item.template)}
									key={i}
									className={
										template === item.template
											? "h-20 bg-white border cursor-pointer border-[#0080C4] flex justify-center items-center rounded-2xl"
											: "border border-[#EAECF0] cursor-pointer bg-[#F9FAFB] flex justify-center items-center rounded-2xl h-20"
									}>
									<h5 className="manrope text-xs text-center capitalize text-black font-semibold">
										{item.name} <br />
										Templates
									</h5>
								</div>
							))}
						</div>
						{/* <button className="bg-[#2C78C6] h-8 mt-6 w-24 rounded-full font-semibold text-xs segoe text-white">
              Customize
            </button> */}
						{template && (
							<button
								onClick={() => navigate(`/finance/${template}`)}
								className="bg-[#2C78C6] h-8 mt-12 w-32 rounded-full font-semibold text-xs segoe text-white">
								Create Invoice
							</button>
						)}
					</div>
				</div>
				<div className="hidden">
					{template === "unilever" && <UnileverTemplate />}
					{template === "recruitment" && <RecruitmentsTemplate />}
					{template === "fleet" && <FleetTemplate />}
					{template === "legal" && <LegalTemplate />}
					{template === "training" && <TrainingTemplate />}
				</div>
			</div>
		</div>
	);
};

const UnileverTemplate = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="text-base pt-7 manrope text-black font-bold">
        Unilever Templates
      </h2>
      <div className="w-5/6 bg-white mt-8 rounded ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                S/N
              </th>
              {/* <th scope="col" className="px-6 py-3">
							Unique ID
						</th> */}
              <th scope="col" className="px-6 py-3">
                VRN
              </th>
              <th scope="col" className="px-6 py-3">
                Model
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b text-xs">
              <td className="px-6 py-4">25</td>

              {/* <td className="px-6 py-4">{item?.invoiceId}</td> */}
              <td className="px-6 py-4">Lorem</td>
              <td className="px-6 py-4">Lorem</td>
              <td className="px-6 py-4">Lorem</td>
              <td className={`px-6 py-4`}>Lorem</td>
              <td className="px-6 py-4 underline">View</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end px-6 pb-6">
          <button
            onClick={() => navigate("/finance/unilever")}
            className="bg-[#2C78C6] h-8 mt-12 w-32 rounded-full font-semibold text-xs segoe text-white"
          >
            Create Invoice
          </button>
        </div>
      </div>
    </>
  );
};

const RecruitmentsTemplate = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="text-base pt-7 manrope text-black font-bold">
        Recruitments Templates
      </h2>
      <div className="w-5/6 bg-white mt-8 rounded ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                S/N
              </th>
              {/* <th scope="col" className="px-6 py-3">
            Unique ID
          </th> */}
              <th scope="col" className="px-6 py-3">
                Services
              </th>
              <th scope="col" className="px-6 py-3">
                Salary
              </th>
              <th scope="col" className="px-6 py-3">
                Units
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b text-xs">
              <td className="px-6 py-4">25</td>
              <td className="px-6 py-4">Lorem</td>
              <td className="px-6 py-4">Lorem</td>
              <td className="px-6 py-4">Lorem</td>
              <td className={`px-6 py-4`}>Lorem</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end px-6 pb-6">
          <button
            onClick={() => navigate("/finance/recruitment")}
            className="bg-[#2C78C6] h-8 mt-12 w-32 rounded-full font-semibold text-xs segoe text-white"
          >
            Create Invoice
          </button>
        </div>
      </div>
    </>
  );
};
const FleetTemplate = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="text-base pt-7 manrope text-black font-bold">
        Fleet Templates
      </h2>
      <div className="w-5/6 bg-white mt-8 rounded ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                S/N
              </th>

              <th scope="col" className="px-6 py-3">
                Services
              </th>
              <th scope="col" className="px-6 py-3">
                Units
              </th>
              <th scope="col" className="px-6 py-3">
                Days
              </th>
              <th scope="col" className="px-6 py-3">
                Cost/Day
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b text-xs">
              <td className="px-6 py-4">25</td>
              <td className="px-6 py-4">Lorem</td>
              <td className="px-6 py-4">Lorem</td>
              <td className="px-6 py-4">Lorem</td>
              <td className={`px-6 py-4`}>Lorem</td>
              <td className={`px-6 py-4`}>Lorem</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end px-6 pb-6">
          <button
            onClick={() => navigate("/finance/fleet")}
            className="bg-[#2C78C6] h-8 mt-12 w-32 rounded-full font-semibold text-xs segoe text-white"
          >
            Create Invoice
          </button>
        </div>
      </div>
    </>
  );
};
const LegalTemplate = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="text-base pt-7 manrope text-black font-bold">
        Legal & Law Templates
      </h2>
      <div className="w-5/6 bg-white mt-8 rounded ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                S/N
              </th>

              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Cost
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>

              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b text-xs">
              <td className="px-6 py-4">25</td>
              <td className="px-6 py-4">Lorem</td>
              <td className="px-6 py-4">Lorem</td>
              <td className="px-6 py-4">Lorem</td>
              <td className={`px-6 py-4`}>Lorem</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end px-6 pb-6">
          <button
            onClick={() => navigate("/finance/legal")}
            className="bg-[#2C78C6] h-8 mt-12 w-32 rounded-full font-semibold text-xs segoe text-white"
          >
            Create Invoice
          </button>
        </div>
      </div>
    </>
  );
};
const TrainingTemplate = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="text-base pt-7 manrope text-black font-bold">
        Training Templates
      </h2>
      <div className="w-5/6 bg-white mt-8 rounded ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                S/N
              </th>

              <th scope="col" className="px-6 py-3">
                Services
              </th>
              <th scope="col" className="px-6 py-3">
                Cost
              </th>
              <th scope="col" className="px-6 py-3">
                No of participants
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b text-xs">
              <td className="px-6 py-4">25</td>
              <td className="px-6 py-4">Lorem</td>
              <td className="px-6 py-4">Lorem</td>
              <td className="px-6 py-4">Lorem</td>
              <td className={`px-6 py-4`}>Lorem</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end px-6 pb-6">
          <button
            onClick={() => navigate("/finance/training")}
            className="bg-[#2C78C6] h-8 mt-12 w-32 rounded-full font-semibold text-xs segoe text-white"
          >
            Create Invoice
          </button>
        </div>
      </div>
    </>
  );
};
export default CreateInvoice;