import { useState } from "react";

const DropDown = ({ drop, children }) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };
  return (
    <div className="relative z-20">
      <button
        class="text-black focus:ring focus:outline-none focus:ring-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={toggleShow}
      >
        <span></span> Filters
        {drop && (
          <svg
            class="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        )}
      </button>
      {/* <!-- Dropdown menu --> */}
      <div
        class={`z-40 ${
          !show && "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-60 p-4 absolute right-0 z-40`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDown;


