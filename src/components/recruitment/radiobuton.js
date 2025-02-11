import React from "react";

function Radiobuton({ value, selectedValue, onChange }) {
  return (
    <div>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          value={value}
          checked={selectedValue === value}
          onChange={() => onChange(value)}
          className="form-radio h-4 w-4 text-indigo-600"
        />
        <span className="text-gray-800">{value}</span>
      </label>
    </div>
  );
}

export default Radiobuton;
