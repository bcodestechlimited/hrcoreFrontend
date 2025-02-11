import React from "react";
import { IconContext } from "react-icons";
import {
	AiFillEye,
	AiOutlineUsergroupAdd,
	// AiTwotoneCalendar,
} from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import { BsPlusSquare } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";

const Addbutton = ({
	background,
	onClick,
	create,
	add,
	text,
	view,
	bulk,
	space,
	copy
}) => {
	// const navigate = useNavigate();
	return (
		<div>
			<button
				style={{
					background: "black !important",
				}}
				className={`bg-black btn h-8 shadow-xl px-3 hover:scale-110 hover:transition hover:transform hover:ease-out hover:duration-800 hover:delay-400 flex justify-center items-center gap-3 rounded-md text-white whitespace-nowrap text-sm ${
					space ? "mx-3" : ""
				}`}
				onClick={onClick}>
				<div>
					{ copy ? (
						<IconContext.Provider value={{ color: "white" }}>
							<BiCopy size={15} />
						</IconContext.Provider>
					) : create ? (
						<IconContext.Provider value={{ color: "white" }}>
							<BsPlusSquare size={15} />
						</IconContext.Provider>
					) : add ? (
						<IconContext.Provider value={{ color: "white" }}>
							<BsPlusSquare size={15} />
						</IconContext.Provider>
					) : view ? (
						<IconContext.Provider value={{ color: "white" }}>
							<AiFillEye size={15} />
						</IconContext.Provider>
					) : bulk ? (
						<IconContext.Provider value={{ color: "white" }}>
							<AiOutlineUsergroupAdd size={15} />
						</IconContext.Provider>
					) : null}
				</div>
				<p className="text-white text-xs manrope animate-pulse">{text}</p>
			</button>
		</div>
	);
};

export default Addbutton;
