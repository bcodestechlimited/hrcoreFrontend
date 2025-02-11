import React from "react";

const SearchItems = ({ placeholder }) => {
  return (
    <div className="pt-5 lg:ml-5 lg:mr-10 md:ml-5 md:mr-8 mx-5 flex items-center">
      <div className="absolute pl-5">
        <img
          className="w-[24px] h-[24px]"
          src={require("../../assets/items-search.png")}
          alt=""
        />
      </div>

      <input
        placeholder={placeholder}
        className="pl-16 bg-white w-[425px] shadow-md h-[58px] border-none"
        type="text"
      />
    </div>
  );
};

export default SearchItems;
