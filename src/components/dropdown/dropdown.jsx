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

const SearchFilter = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <button
        class="whitespace-nowrap bg-main hover:bg-main focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={() => setShow(!show)}
      >
        Date{" "}
        <svg
          class="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {/* <!-- Dropdown menu --> */}
      {show && (
        <div
          id="dropdown"
          class="z-10 absolute right-0 flex gap-8 mt-2 bg-gray-100 divide-y flex-wrap md:flex-nowrap divide-gray-100 p-4"
        >
          <div className="flex gap-2 items-center text-xs">
            <label>from: </label>
            <input type="date" name="" className="border-none h-8 text-xs" />
          </div>
          <div className="flex gap-2 items-center text-xs">
            <label>to: </label>
            <input type="date" name="" className="border-none h-8 text-xs" />
          </div>
        </div>
      )}
    </div>
  );
};

export const DropDown_options = ({ drop, children, item_dislay }) => {
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
        <span>{item_dislay} </span>
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
