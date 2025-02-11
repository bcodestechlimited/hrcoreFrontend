import { useEffect } from "react";
import Button from "../button/button";
import { useDispatch } from "react-redux";
import { resetLeaveTypeSearch } from "../../data/Reducers/LeaveTypeReducer";
import { resetStaffSearch } from "../../data/Reducers/StaffReducer";
import { resetLeaveRequestSearch } from "../../data/Reducers/LeaveReducer";
import { resetJobSearch } from "../../data/Reducers/JobReducer";
import { resetInvoiceSearch } from "../../data/Reducers/InvoiceReducer";

const Search = ({ placeholder, value, onChange, loading, handleSubmit }) => {
	let dispatch = useDispatch();

	useEffect(() => {
		if (value) {
			document.getElementById("search").addEventListener("search", () => {
				dispatch(resetLeaveTypeSearch());
				dispatch(resetLeaveRequestSearch());
				dispatch(resetStaffSearch());
				dispatch(resetJobSearch());
				dispatch(resetInvoiceSearch());
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);
	return (
		<form className="w-full" onSubmit={handleSubmit || null}>
			<label
				for="default-search"
				className="mb-2 text-sm font-medium text-gray-900 sr-only">
				Search
			</label>
			<div className="relative max-w-full">
				{/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div> */}
				<input
					type="search"
					className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
					placeholder={placeholder || "Search by Name or ID"}
					required
					value={value || ""}
					onChange={onChange ? e => onChange(e.target.value) : null}
					name="search"
					id="search"
				/>
				{/* <button
					type="submit"
					className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 font-medium rounded-lg text-sm px-4 py-2">
					Search
				</button> */}
				<Button
					title={"Search"}
					type="submit"
					width={
						"text-white absolute right-2.5 bottom-2.5 bg-black font-medium rounded-lg text-sm px-4 py-2"
					}
					loading={loading}
				/>
			</div>
		</form>
	);
};

export default Search;
