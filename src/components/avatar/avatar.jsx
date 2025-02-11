import { useState } from "react";
import { BadgeBorder } from "../badge/badge";

const Avatar = ({ sm, md, lg, indicator, img, noround }) => {
	const [active, setActive] = useState(1);

	const changeActive = () => {
		if (active === 3) {
			setActive(1);
		} else {
			setActive(active + 1);
		}
	};
	return (
		<div className="relative flex justify-center w-fit">
			<img
				class={`${
					(sm && "w-10 h-10") || (md && "w-14 h-14") || (lg && "w-20 h-20")
				} ${noround ? "w-full h-40" : `rounded-full`}`}
				src={img || require("../../assets/photo-2.png")}
				alt="Rounded avatar"
			/>
			{indicator && (
				<span class="-bottom-2 absolute" onClick={changeActive}>
					<BadgeBorder
						type={active}
						text={
							(active === 1 && "Active") ||
							(active === 2 && "On Leave") ||
							(active === 3 && "Resigned")
						}
					/>
				</span>
			)}
		</div>
	);
};

export default Avatar;
