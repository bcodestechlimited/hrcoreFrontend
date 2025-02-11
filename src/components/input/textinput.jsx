import React from "react";

const TextInput = ({
	label,
	name,
	onChange,
	placeholder,
	value,
	type,
	...rest
}) => {
	return (
		<div>
			<div>
				<p className="text-sm font-mormal manrope text-black">{label}</p>
				<input
					type={type || "text"}
					name={name}
					onChange={onChange}
					placeholder={placeholder}
					value={value}
					className="h-10 mt-2 w-full rounded-md border-[0.5px] border-black border-opacity-30 text-sm manrope font-medium text-black"
					{...rest}
				/>
			</div>
		</div>
	);
};

export default TextInput;
