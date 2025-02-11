import React from "react";
import { useNavigate } from "react-router-dom";

function Approval_flow_card({
	icon,
	title,
	handleLink,
	link,
	icon_2,
	item,
	handleDelete,
}) {
	const navigate = useNavigate();
	const handleClick = () => {
		if (handleLink === "") {
			return;
		} else {
			navigate(link, { state: item?._id });
		}
	};

	return (
		<div
			className=" bg-white w-full 2xl:w-[270px] rounded-xl py-5 h-[132px] shadow-md shadow-gray-400 p-4 cursor-pointer
    ">
			<div onClick={handleClick} className=" m-auto text-center">
				<img src={icon} alt="" srcset="" className="block m-auto" />
				<p className=" text-base font-semibold  mt-3">{title}</p>
			</div>
			<div onClick={handleDelete || null} className="flex justify-end">
				<img src={icon_2} alt="" srcset="" className="block " />
			</div>
		</div>
	);
}

export default Approval_flow_card;
