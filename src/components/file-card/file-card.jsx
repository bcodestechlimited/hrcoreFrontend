import { PiFolderNotchFill,PiGlobeHemisphereWestThin } from "react-icons/pi";
import { SlOptions } from "react-icons/sl";
import Badge from "../badge/badge";
import moment from "moment";

const FileCard = ({ item, linked }) => {
	return (
		<div
			onClick={
				linked
					? () => {
							window.open(item?.url, "_blank");
					  }
					: null
			}
			className="block p-6 bg-white border border-gray-200 rounded-lg shadow cursor-pointer">
			<div className="flex items-center justify-between md:w-44 min-w-fit">
				<span className="text-[#2A72A8]">
					<PiFolderNotchFill size={24} />
				</span>
				<SlOptions />
			</div>
			<p className="text-md mt-4 font-medium">
				{item?.name || `Getting Started with HR Core Software`}
			</p>
			<div className="mt-2 flex items-center justify-between">
				<Badge
					title={item?.description || item?.format || "Public"}
					icon={<PiGlobeHemisphereWestThin />}
				/>
				<p className="text-xs font-ligh">
					{moment(item?.updatedAt).format("MMM Do, YYYY")}
				</p>
			</div>
		</div>
	);
};

export default FileCard;
