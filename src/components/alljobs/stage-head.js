import React from "react";

function Recruitment_Stage_Head({ datahead, setActive }) {
	return (
		<div className="w-[200px]" onClick={() => setActive(datahead?.name)}>
			<div className="bg-white shadow-lg rounded-lg px-2 py-1 border-t-[10px] border-[#2A72A8]  cursor-pointer">
				<div className="mb-2 flex justify-between items-center">
					<div>
						<span className="font-semibold text-[14px] text-[#44444480] capitalize">
							{datahead?.name}
						</span>
					</div>

					<div>
						<span className="bg-[#CCCCCCCC]  text-[8px]  p-[2px]">
							{" "}
							{datahead?.amount}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Recruitment_Stage_Head;
