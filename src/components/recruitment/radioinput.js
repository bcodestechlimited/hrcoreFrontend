const RadioButton = ({ value, selectedValue, onChange, type }) => {
	return (
		<label className="flex items-center space-x-2 cursor-pointer">
			<input
				type="radio"
				value={value}
				checked={selectedValue === value}
				onChange={() => onChange(value, type)}
				className="form-radio h-4 w-4 text-indigo-600"
			/>
			<span className="text-gray-800">{value}</span>
		</label>
	);
};

export const RadioGroup = ({ options, selected, onChange, type }) => {
	return (
		<div className="flex gap-4">
			{options.map(option => (
				<RadioButton
					key={option}
					value={option}
					selectedValue={selected}
					onChange={onChange}
					type={type}
				/>
			))}
		</div>
	);
};
