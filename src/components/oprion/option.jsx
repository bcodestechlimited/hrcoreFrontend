import { useState } from "react";

const Option = ({ type, children }) => {
  const [dropdown, setDropdown] = useState(true);
  return (
    <div className="relative">
      {type === "vertical" && (
        <button
          class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100"
          type="button"
          onClick={() => setDropdown(!dropdown)}
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 4 15"
          >
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </button>
      )}
      {type === "horizontal" && (
        <button
          class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg"
          type="button"
          onClick={() => setDropdown(!dropdown)}
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
      )}

      {/* <!-- Dropdown menu --> */}
      <div
        class={`z-10 ${
          dropdown && "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow p-4 absolute right-0 top-8`}
      >
        {children}
      </div>
    </div>
  );
};

export default Option;
