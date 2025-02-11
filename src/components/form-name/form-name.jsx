const FormName = ({ item, name }) => {
	return (
		<div className="flex items-center space-x-4">
			<div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden border-red-600 border bg-gray-100 rounded-full dark:bg-gray-600">
				{item?.avatar || item?.profile?.avatar ? (
					<img
						className="w-10 h-10 border-2 border-[#F72585] rounded-full"
						src={
							item?.avatar ||
							item?.profile?.avatar ||
							require("../../assets/photo-2.png")
						}
						alt=""
					/>
				) : (
					<AvatarImg user={item} />
				)}
			</div>
			<div className="font-medium">
				<div>
					{item?.firstName} {item?.lastName} {name}
				</div>
			</div>
		</div>
	);
};

export default FormName;

export const AvatarImg = ({ user, style, css }) => {
	return (
		<div
			class={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden border-red-600 border bg-gray-100 rounded-full dark:bg-gray-600 ${
				css || ""
			}`}
			style={style || null}>
			<span
				class={`font-medium text-gray-600 dark:text-gray-300 ${
					style ? "text-5xl font-bold" : ""
				} uppercase`}>
				{user?.firstName?.slice(0, 1) || "H"}
				{""}
				{user?.lastName?.slice(0, 1) || "R"}
			</span>
		</div>
	);
};
