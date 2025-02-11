import { Link, useNavigate } from "react-router-dom";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import { BsMegaphone, BsPerson } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { TbMessages } from "react-icons/tb";
import { BiBarChartSquare } from "react-icons/bi";
import AnnouncementCard from "../../components/announcement-card/announcement-card";
// import DonutChart from "../../components/donut-chart/donut-chart";
// import DistributedChart from "../../components/distributed-chart/distributed-chart";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useContext, useState } from "react";
import { LeaveRequestTable } from "../leave/manage";
import { FileDocumentTable } from "../employee/onboarding/file-management";
import { InvoiceTable } from "../finance/invoices";
import { ImageChange } from "../engagements/announcements";
import { PageLoader } from "../../components/modal-container/modal-container";
import { GlobalState } from "../../data/Context";
import { manageVoucher } from "../../data/Reducers/VoucherReducer";
import moment from "moment";
import axios from "axios";
// import { MyLeaveRequestList } from "../leave/my-request";

const Dashboard = () => {
	let navigate = useNavigate(),
		{
			staff,
			department,
			position,
			leaveRequest,
			folder,
			invoice,
			auth,
			level,
			media,
			announcement,
			voucher,
			company,
		} = useSelector(state => state),
		[dataPosition, setDataPosition] = useState([]),
		[dataDept, setDataDept] = useState([]),
		{ canApprove, canAdmin, canExecute } = useContext(GlobalState),
		abilityView = auth?.user?.isAdmin || canAdmin || canApprove,
		dispatch = useDispatch(),
		[birthday, setBirthDay] = useState(null);

	useEffect(() => {
		let thisData = staff?.all || staff?.data;
		if (thisData) {
			let groups = thisData?.docs?.reduce((groups, game) => {
				let newDept = game?.department?.name;
				// let date = moment(game?.createdAt).format("MM/DD/YYYY");
				if (!groups[newDept]) {
					groups[newDept] = [];
				}
				groups[newDept].push(game);
				return groups;
			}, {});

			const groupArrays = Object?.keys(groups).map(dept => {
				return {
					dept: dept !== "undefined" ? dept : "Nil",
					staff: groups[dept],
				};
			});
			let groups2 = thisData?.docs?.reduce((groups, game) => {
				let newPosition = game?.position?.name;
				// let date = moment(game?.createdAt).format("MM/DD/YYYY");
				if (!groups[newPosition]) {
					groups[newPosition] = [];
				}
				groups[newPosition].push(game);
				return groups;
			}, {});

			const groupArrays2 = Object?.keys(groups2).map(position => {
				return {
					position: position !== "undefined" ? position : "Nil",
					staff: groups2[position],
				};
			});
			setDataDept(groupArrays?.filter(item => item?.dept !== "undefined"));
			setDataPosition(
				groupArrays2?.filter(item => item?.position !== "undefined")
			);
		}
		// console.log({ groupArrays });
	}, [staff?.all, staff?.data]);

	let getData = async (company, data) => {
		try {
			let res = await axios.get(
				`/api/v1/user/users/${
					company || ""
				}?_populate=position&_populate=department&_populate=level
				&birthMonth=${moment(moment()).format("MM")?.toLowerCase()}&_limit=0`
			);
			setBirthDay(res?.data?.data);
		} catch (err) {
			if (err) console.log({ error: err.response?.data, err });
			if (err?.response?.status === 429) console.log(err?.response?.data);
			let error = err.response?.data?.error;
			console.log({ error });
		}
	};

	useEffect(() => {
		dispatch(manageVoucher("get", null));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (company?.currentSelected) getData(company?.currentSelected);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [company?.currentSelected]);

	if (abilityView) if (!dataDept && !dataPosition) return <PageLoader />;

	// if (abilityView) if (!staff?.data) return <PageLoader />;

	// if (!abilityView)
	if (!media?.all) return <PageLoader />;

	return (
		<div className="grid lg:grid-cols-7 gap-4">
			<div className="col-span-5">
				<div className="grid md:grid-cols-3 gap-4 mb-4">
					<div className="flex items-center justify-center">
						<div className="relative block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md">
							<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
								{abilityView ? staff?.data?.totalDocs : level?.data?.totalDocs}
								<span
									onClick={
										abilityView
											? () => navigate(`/employee/all-employee`)
											: null
									}
									className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-md cursor-pointer">
									View Details
								</span>
							</h5>
							<p className="font-normal text-gray-700 text-xs">
								{abilityView ? `Employees` : "Levels"}
							</p>
							<div className="absolute inline-flex items-center justify-center w-12 h-12 text-xs font-bold text-[#2A72A8] bg-[#E4F2FD] border-2 border-white rounded-full -top-3 right-4">
								<HiOutlineUsers size={24} />
							</div>
						</div>
					</div>
					<div className="flex items-center justify-center">
						<div className="relative block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md">
							<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
								{department?.data?.totalDocs}
								<span
									onClick={
										!abilityView
											? null
											: () => navigate(`/settings/departments`)
									}
									className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-md cursor-pointer">
									View Details
								</span>
							</h5>
							<p className="font-normal text-gray-700 text-xs">Departments</p>
							<div className="absolute inline-flex items-center justify-center w-12 h-12 text-xs font-bold text-[#F72585] bg-[#FFEBF4] border-2 border-white rounded-full -top-3 right-4">
								<TbMessages size={24} />
							</div>
						</div>
					</div>
					<div className="flex items-center justify-center">
						<div className="relative block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md">
							<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
								{position?.data?.totalDocs}
								<span
									onClick={
										!abilityView ? null : () => navigate(`/settings/positions`)
									}
									className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-md cursor-pointer">
									View Details
								</span>
							</h5>
							<p className="font-normal text-gray-700 text-xs">Positions</p>
							<div className="absolute inline-flex items-center justify-center w-12 h-12 text-xs font-bold text-[#28B411] bg-[#E5FFDC] border-2 border-white rounded-full -top-3 right-4">
								<BiBarChartSquare size={24} />
							</div>
						</div>
					</div>
				</div>

				{/* charts */}
				{
					// abilityView ? (
					// 	<div className="grid w-full xl:grid-cols-2 gap-8">
					// 		<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl justify-center flex items-center">
					// 			<div className="self-center">
					// 				<DonutChart
					// 					data={dataDept?.map(item => {
					// 						return Number(
					// 							(item?.staff?.length / staff?.data?.totalDocs) * 100
					// 						).toFixed(0);
					// 					})}
					// 					labels={dataDept?.map(item => item?.dept)}
					// 				/>
					// 			</div>
					// 		</div>
					// 		<div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-xl">
					// 			<DistributedChart
					// 				data={dataPosition?.map(item => item?.staff?.length)}
					// 				labels={dataPosition
					// 					?.map(it => {
					// 						let name = it?.position;
					// 						if (name?.length > 5) {
					// 							if (name?.includes("("))
					// 								name = name?.slice(0, name?.indexOf("("));
					// 							name = name
					// 								?.trim()
					// 								?.split(" ")
					// 								?.map(ij => ij?.slice(0, 1))
					// 								?.join("");
					// 						}
					// 						return { ...it, name: it?.position, position: name };
					// 					})
					// 					?.map(it => it?.position)}
					// 			/>
					// 			{/* {console.log({
					// 				dataPosition: dataPosition?.map(it => {
					// 					let name = it?.position;
					// 					if (name?.length > 5) {
					// 						if (name?.includes("("))
					// 							name = name?.slice(0, name?.indexOf("("));
					// 						name = name
					// 							?.trim()
					// 							?.split(" ")
					// 							?.map(ij => ij?.slice(0, 1))
					// 							?.join("");
					// 					}
					// 					return { ...it, name: it?.position, position: name };
					// 				}),
					// 			})} */}
					// 		</div>
					// 	</div>
					// ) :
					<div>
						{/* <img
							src={
								media?.all?.docs?.length > 0
									? media?.all?.docs?.[count]?.url
									: homeimage
							}
							alt="Home Banner"
							className="h-full w-full max-h-96 ease-in-out"
						/> */}
						<ImageChange item={media?.all?.docs} />
					</div>
				}

				{/* 1 */}

				<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
					<div className="p-4 flex items-center justify-between">
						<p className="font-semibold">Leave Request</p>
						<p
							onClick={() =>
								navigate(abilityView ? "/leave/manage" : "/leave/my-request")
							}
							className="flex items-center gap-2 font-medium cursor-pointer">
							View All{" "}
							<span>
								<MdArrowForwardIos />
							</span>
						</p>
					</div>
					{/* {auth?.user?.isAdmin ? ( */}
					<LeaveRequestTable
						currentItems={
							abilityView
								? leaveRequest?.data?.docs?.slice(0, 5)
								: leaveRequest?.manage?.docs?.slice(0, 5)
						}
					/>
					{/* ) : (
						<MyLeaveRequestList
							currentItems={leaveRequest?.my?.docs?.slice(0, 5)}
						/>
					)} */}
				</div>

				{/* 2 */}

				<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
					<div className="p-4 flex items-center justify-between">
						<p className="font-semibold">Recent Documents</p>
						<p
							onClick={() => navigate("/employee/onboarding/file-management")}
							className="flex items-center gap-2 font-medium cursor-pointer">
							View All{" "}
							<span>
								<MdArrowForwardIos />
							</span>
						</p>
					</div>
					<FileDocumentTable currentItems={folder?.data?.docs?.slice(0, 5)} />
				</div>
				{/* 3 */}

				{abilityView && (
					<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
						<div className="p-4 flex items-center justify-between">
							<p className="font-semibold">Invoice</p>
							<p
								onClick={() => navigate("/finance/invoice")}
								className="flex items-center gap-2 font-medium cursor-pointer">
								View All{" "}
								<span>
									<MdArrowForwardIos />
								</span>
							</p>
						</div>
						<InvoiceTable currentItems={invoice?.data?.docs?.slice(0, 5)} />
					</div>
				)}
			</div>
			<div className="col-span-2 hidden  sm:block space-y-4">
				<div
					className="block max-w-sm p-4 bg-white border border-gray-200 rounded-md shadow space-y-2"
					onClick={() => navigate(`/profile`)}>
					<p className="text-xl font-semibold tracking-tight text-gray-900 flex items-center gap-6 mb-4">
						My Info
						<span>
							<BsPerson />
						</span>
					</p>
					<div className="block p-2 bg-white border border-gray-200 rounded-md shadow cursor-pointer">
						<p className="mb-2 text-md font-medium tracking-tight text-gray-900">
							Name: {auth?.user?.firstName} {auth?.user?.lastName}
						</p>
						<p className="font-normal text-gray-500 text-xs textTrunc textTrunc5 pb-1">
							Department: {auth?.user?.department?.name}
						</p>
						<p className="font-normal text-gray-500 text-xs textTrunc textTrunc5 pb-1">
							Position: {auth?.user?.position?.name}
						</p>
						<p className="font-normal text-gray-500 text-xs textTrunc textTrunc5 pb-1">
							Level: {auth?.user?.level?.name}
						</p>
						{auth?.user?.gradeForPosition1?.length > 0 && (
							<p className="font-normal text-gray-500 text-xs textTrunc textTrunc5 pb-1">
								Manager 1:{" "}
								{auth?.user?.gradeForPosition1?.map((it, e) => (
									<span key={e}>
										{it?.name}{" "}
										{e !== auth?.user?.gradeForPosition1?.length - 1 && <>, </>}{" "}
									</span>
								))}
							</p>
						)}
						{auth?.user?.gradeForPosition2?.length > 0 && (
							<p className="font-normal text-gray-500 text-xs textTrunc textTrunc5 pb-1">
								Manager 2:{" "}
								{auth?.user?.gradeForPosition2?.map((it, e) => (
									<span key={e}>
										{it?.name}{" "}
										{e !== auth?.user?.gradeForPosition2?.length - 1 && <>, </>}{" "}
									</span>
								))}
							</p>
						)}
					</div>
				</div>
				{abilityView ? (
					<>
						<div
							onClick={() => navigate("/birthday")}
							className="flex items-center justify-center cursor-pointer">
							<div className="relative  block w-full p-6 py-4 bg-white border border-gray-200 rounded-lg shadow-md">
								<div className="flex  items-center space-x-4">
									<div className="flex -space-x-4">
										{birthday?.docs
											?.filter(it => it?.avatar)
											?.slice(0, 2)
											?.map((ac, i) => (
												<img
													key={i}
													className="w-10 h-10 border-2 border-[#F72585] rounded-full"
													src={ac?.avatar}
													alt={ac?.lastName}
												/>
											))}
										<Link
											to=""
											className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-[#F72585] border-2 border-[#F72585] rounded-full">
											+{birthday?.totalDocs || 0}
										</Link>
									</div>
									<div className="">
										<div className="text-md font-medium">
											Birthday celebrant
										</div>
										<div className="text-sm text-gray-5 flex items-center gap-2">
											click to see more{" "}
											<span>
												<MdArrowForwardIos />
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div
							onClick={() => navigate("/anniversary")}
							className="items-center justify-center cursor-pointer hidden">
							<div className="relative  block w-full p-6 py-4 bg-white border border-gray-200 rounded-lg shadow-md">
								<div className="flex  items-center space-x-4">
									<div className="flex -space-x-4">
										<img
											className="w-10 h-10 border-2 border-[#F72585] rounded-full"
											src={require("../../assets/photo-2.png")}
											alt=""
										/>
										<img
											className="w-10 h-10 border-2 border-[#F72585] rounded-full"
											src={require("../../assets/photo-3.png")}
											alt=""
										/>
										<Link
											to=""
											className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-[#F72585] border-2 border-[#F72585] rounded-full">
											+24
										</Link>
									</div>
									<div className="">
										<div className="text-md font-medium">
											Anniversary celebrant
										</div>
										<div className="text-sm text-gray-5 flex items-center gap-2">
											click to see more{" "}
											<span>
												<MdArrowForwardIos />
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				) : null}

				{/*  */}
				{canExecute &&
					voucher?.all?.docs?.filter(it => !it?.endorsed)?.length > 0 && (
						<div
							className="flex items-center justify-center cursor-pointer"
							onClick={() => navigate("/finance/voucher")}>
							<div className="relative block w-full p-6 py-4 bg-white border border-gray-200 rounded-lg shadow">
								<div className="flex items-center justify-between font-semibold">
									<span>
										<MdArrowBackIosNew />
									</span>
									<p>Pending Voucher Endorsement</p>
									<span>
										<MdArrowForwardIos />
									</span>
								</div>
								<div className="bg-gray-200 flex rounded-md border border-gray-50 p-2 px-4 font-medium mt-4 justify-center">
									<p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
										{voucher?.all?.docs?.filter(it => !it?.endorsed)?.length}
									</p>
								</div>
							</div>
						</div>
					)}
				{canApprove &&
					voucher?.all?.docs?.filter(it => !it?.approved)?.length > 0 && (
						<div
							className="flex items-center justify-center cursor-pointer"
							onClick={() => navigate("/finance/voucher")}>
							<div className="relative block w-full p-6 py-4 bg-white border border-gray-200 rounded-lg shadow">
								<div className="flex items-center justify-between font-semibold">
									<span>
										<MdArrowBackIosNew />
									</span>
									<p>Pending Voucher Approval</p>
									<span>
										<MdArrowForwardIos />
									</span>
								</div>
								<div className="bg-gray-200 flex rounded-md border border-gray-50 p-2 px-4 font-medium mt-4 justify-center">
									<p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
										{voucher?.all?.docs?.filter(it => !it?.approved)?.length}
									</p>
								</div>
							</div>
						</div>
					)}
				<div className="hidden items-center justify-center">
					<div className="relative block w-full p-6 py-4 bg-white border border-gray-200 rounded-lg shadow">
						<div className="flex items-center justify-between">
							<span>
								<MdArrowBackIosNew />
							</span>
							<p>Upcoming Holiday</p>
							<span>
								<MdArrowForwardIos />
							</span>
						</div>
						<div className="bg-gray-200 flex rounded-md border border-gray-50 p-2 px-4 font-medium mt-4 justify-between">
							<p>Easter Sunday</p>
							<span>|</span>
							<p>12th Oct</p>
						</div>
					</div>
				</div>

				{/*  */}

				<div className="block max-w-sm p-4 bg-white border border-gray-200 rounded-md shadow space-y-2">
					<p className="text-xl font-semibold tracking-tight text-gray-900 flex items-center gap-6 mb-4">
						Announcement
						<span>
							<BsMegaphone />
						</span>
					</p>
					{announcement?.data?.docs?.map((item, i) => (
						<AnnouncementCard item={item} key={i} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
