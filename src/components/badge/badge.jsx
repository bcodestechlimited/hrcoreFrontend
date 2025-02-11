const Badge = ({ icon, title, icon2, handleClick }) => {
  return (
		<span
			className={`inline-flex items-center justify-center gap-1 px-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-md ${
				handleClick && "cursor-pointer"
			}`}
			onClick={handleClick}>
			{icon}
			<span className="textTrunc">{title}</span>
			{icon2}
		</span>
	);
};

export default Badge;

export const BadgeBorder = ({ type, text }) => {
  return (
		<span
			class={`${type === 1 && "text-blue-800 bg-blue-100 border-blue-400"} ${
				type === 2 && "bg-red-100 text-red-800 border-red-400"
			} ${
				type === 3 && "bg-gray-100 text-gray-800 border-gray-500"
			} text-xs font-medium mr-2 px-2.5 ${
				!type && "text-main"
			} rounded border cursor-pointer whitespace-nowrap capitalize`}>
			{text || "Default"}
		</span>
	);
};
