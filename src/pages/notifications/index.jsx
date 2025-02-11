import React, { useEffect } from "react";
import { useState } from "react";
import Img from "../../assets/notify.svg";
import moment from "moment";
import {
	manageNotification,
	resetNotificationSearch,
} from "../../data/Reducers/NotificationsReducer";
import { useDispatch, useSelector } from "react-redux";

const Notifications = () => {
	const [tab, setTab] = useState("unread");
	// const Arr = [
	// 	{
	// 		title: "notification title",
	// 		details:
	// 			"Lorem ipsum dolor sit amet consectetur. Erat nisi volutpat netus posuere fermentum hendrerit fermentum. Enim porttitor nulla maecenas et. Lorem urna venenatis aliquet porttitor id non eu sagittis iaculis. ",
	// 		time: "4:30PM",
	// 	},
	// 	{
	// 		title: "notification title",
	// 		details:
	// 			"Lorem ipsum dolor sit amet consectetur. Erat nisi volutpat netus posuere fermentum hendrerit fermentum. Enim porttitor nulla maecenas et. Lorem urna venenatis aliquet porttitor id non eu sagittis iaculis. ",
	// 		time: "4:30PM",
	// 	},
	// 	{
	// 		title: "notification title",
	// 		details:
	// 			"Lorem ipsum dolor sit amet consectetur. Erat nisi volutpat netus posuere fermentum hendrerit fermentum. Enim porttitor nulla maecenas et. Lorem urna venenatis aliquet porttitor id non eu sagittis iaculis. ",
	// 		time: "4:30PM",
	// 	},
	// 	{
	// 		title: "notification title",
	// 		details:
	// 			"Lorem ipsum dolor sit amet consectetur. Erat nisi volutpat netus posuere fermentum hendrerit fermentum. Enim porttitor nulla maecenas et. Lorem urna venenatis aliquet porttitor id non eu sagittis iaculis. ",
	// 		time: "4:30PM",
	// 	},
	// 	{
	// 		title: "notification title",
	// 		details:
	// 			"Lorem ipsum dolor sit amet consectetur. Erat nisi volutpat netus posuere fermentum hendrerit fermentum. Enim porttitor nulla maecenas et. Lorem urna venenatis aliquet porttitor id non eu sagittis iaculis. ",
	// 		time: "4:30PM",
	// 	},
	// ];

	let { notification } = useSelector(state => state),
		dispatch = useDispatch();
	const handleSubmit = isEdit => async e => {
		e?.preventDefault();
		await dispatch(manageNotification("put", { ...isEdit }));
	};

	useEffect(() => {
		dispatch(manageNotification("get", null));
		dispatch(resetNotificationSearch());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [data, setData] = useState(null);

	useEffect(() => {
		if (notification?.isFound) setData(notification?.mainSearch);
		else {
			if (tab === "read")
				setData(notification?.data?.docs?.filter(it => it?.isRead));
			else setData(notification?.data?.docs);
		}
	}, [
		notification?.data,
		notification?.isFound,
		notification?.mainSearch,
		tab,
	]);

	if (!data) return;

	return (
		<div>
			<div className="">
				<div className="w-5/6 mx-auto">
					<div className="my-10 lg:w-1/2 grid lg:grid-cols-2 gap-8">
						<button
							onClick={() => setTab("unread")}
							className={`${
								tab === "unread"
									? "bg-black shadow-xl text-white transition duration-500 ease-out transform translate-x-2"
									: "bg-white shadow-xl text-black"
							} h-10  inter text-base font-semibold`}>
							Unread Notifications
						</button>
						<button
							onClick={() => setTab("read")}
							className={`${
								tab === "read"
									? "bg-black shadow-xl text-white transition duration-500 ease-out transform translate-x-2"
									: "bg-white shadow-xl text-black"
							} h-10 inter text-base capitalize font-semibold`}>
							Read Notifications
						</button>
					</div>
					<div className="w-full mt-10">
						<h2 className="text-secondary text-opacity-70 text-xl font-bold sansation">
							All Notifications
						</h2>
						<Unread Arr={data} handleSubmit={handleSubmit} />
					</div>
				</div>
			</div>
		</div>
	);
};
const Unread = ({ Arr, handleSubmit }) => {
	return (
		<div>
			<div
				style={{
					overflowY: "scroll",
				}}
				className="space-y-8 h-[500px] w-full noScroll pt-10 px-10">
				{Arr.map((item, i) => (
					<div
						key={i}
						className="flex gap-6 w-full"
						onClick={handleSubmit(item)}>
						<div>
							<img src={Img} alt="" className="mt-2" />
						</div>
						<div className="w-full">
							<div className="flex w-full items-center justify-between">
								<div>
									<h4 className="text-base text-main font-bold sansation capitalize">
										{item?.title}
									</h4>
								</div>
								<div>
									<h4 className="text-base text-[#2C8BE2] font-bold sansation">
										<DateReturned item={item} />
									</h4>
								</div>
							</div>
							<p className="inter text-xs pt-2 font-normal text-[#1b1b1b] text-opacity-80 pr-10">
								{item?.message}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

// const Read = ({ Arr }) => {
//   return (
//     <div>
//       <div
//         style={{
//           overflowY: "scroll",
//         }}
//         className="space-y-8 h-[500px] w-full noScroll pt-10 px-10"
//       >
//         {Arr.map((item, i) => (
//           <div key={i} className="flex gap-6 w-full">
//             <div>
//               <img src={Img} alt="" className="mt-2" />
//             </div>
//             <div className="w-full">
//               <div className="flex w-full items-center justify-between">
//                 <div>
//                   <h4 className="text-base text-main font-bold sansation capitalize">
//                     {item.title}
//                   </h4>
//                 </div>
//                 <div>
//                   <h4 className="text-base text-[#2C8BE2] font-bold sansation">
//                     {item.time}
//                   </h4>
//                 </div>
//               </div>
//               <p className="inter text-xs pt-2 font-normal text-[#1b1b1b] text-opacity-80 pr-10">
//                 {item.details}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export default Notifications;

export const DateReturned = ({ item }) => {
	return (
		<>
			{moment(item?.createdAt).diff(moment(), "years") < 0
				? moment(item?.createdAt).format("L hh:mm A")
				: moment(item?.createdAt).diff(moment(), "months") < 0
				? moment(item?.createdAt).format("DD/MM hh:mm A")
				: moment(item?.createdAt).diff(moment(), "days") < 0
				? moment(item?.createdAt).format("DD/MM hh:mm A")
				: moment(item?.createdAt).format("hh:mm A")}
		</>
	);
};
