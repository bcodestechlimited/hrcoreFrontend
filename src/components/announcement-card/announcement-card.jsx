import { useNavigate } from "react-router-dom";
import { DateReturned } from "../../pages/notifications";

const AnnouncementCard = ({ item }) => {
	let navigate = useNavigate();
	return (
		<div
			className="block p-2 bg-white border border-gray-200 rounded-md shadow cursor-pointer"
			onClick={() => navigate(`/engagements/announcements`)}>
			<p className="mb-2 text-md font-medium tracking-tight text-gray-900">
				{item?.title}
			</p>
			<p className="font-normal text-gray-500 text-xs textTrunc textTrunc5">
				{item?.description}
			</p>
			<div className="flex items-center justify-between mt-2">
				<p className="text-xs text-gray-500">
					From{" "}
					{item?.createdBy?.lastName ||
						item?.createdBy?.profile?.lastName ||
						"Admin"}{" "}
					{item?.createdBy?.firstName ||
						item?.createdBy?.profile?.firstName ||
						""}
				</p>
				<p className="text-xs text-gray-500">
					<DateReturned item={item} />
				</p>
			</div>
		</div>
	);
};

export default AnnouncementCard;
