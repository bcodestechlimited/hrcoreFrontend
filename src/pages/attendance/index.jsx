import moment from "moment/moment";
import React, { useEffect, useState, useRef } from "react";
// import FormName from "../../components/form-name/form-name";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../components/pagination/pagination";
import Addbutton from "../../components/button/addbutton";
import { AiOutlineClose, AiFillCopy } from "react-icons/ai";
import { IconContext } from "react-icons";
// import { Pagination } from "flowbite-react";
// import Code from "../../assets/qrcode.svg";
import { useDispatch, useSelector } from "react-redux";
import { manageAttendance } from "../../data/Reducers/AttendanceReducer";
import QRCode from "qrcode";
import { toast } from "react-toastify";
import { AvatarImg } from "../../components/form-name/form-name";

const Attendance = () => {
	const [attendanceTab, setAttendanceTab] = useState("list");

	return (
		<div>
			<div className="my-10 lg:w-1/2 grid lg:grid-cols-2 gap-8">
				<button
					onClick={() => setAttendanceTab("list")}
					className={`${
						attendanceTab === "list"
							? "bg-black shadow-xl text-white"
							: "bg-white shadow-xl text-black"
					} h-10  inter text-base font-semibold`}>
					Attendance List
				</button>
				<button
					onClick={() => setAttendanceTab("qr")}
					className={`${
						attendanceTab === "qr"
							? "bg-black shadow-xl text-white"
							: "bg-white shadow-xl text-black"
					} h-10 inter text-base capitalize font-semibold`}>
					Qr code management
				</button>
			</div>
			<div>
				{attendanceTab === "list" && <List />}
				{attendanceTab === "qr" && <Qr />}
			</div>
		</div>
	);
};

const List = () => {
	let [data, setData] = useState(null),
		[page, setPage] = useState(1),
		{ attendance, company } = useSelector(state => state),
		[loading, setLoading] = useState(null),
		dispatch = useDispatch();
	useEffect(() => {
		setData(attendance?.all || attendance?.data);
	}, [attendance?.all, attendance?.data]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!data) return;

	const currentItems = data?.docs
		?.filter(item => item?.purpose?.toLowerCase() === "check-in")
		.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(
		data?.docs?.filter(item => item?.purpose?.toLowerCase() === "check-in")
			?.length / range
	);

	const handlePageClick = event => {
			const newOffset =
				(event.selected * range) %
				data?.docs?.filter(item => item?.purpose?.toLowerCase() === "check-in")
					.length;
			setItemOffset(newOffset);
			setPage(1 + event?.selected);
		},
		handleLoadMore = async () => {
			setLoading("loadmore");
			await dispatch(
				manageAttendance(
					"get",
					{ limit: data?.limit * data?.nextPage },
					company?.currentSelected
				)
			);
			setLoading(false);
		};

	return (
		<div>
			<div className="">
				<form className="my-4 flex gap-6" action="">
					<select
						style={{
							boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
						}}
						name="date"
						id="date"
						className="h-10 w-32 border border-[#D0D5DD] rounded px-4">
						<option value="21" selected>
							21
						</option>
						<option value="21">21</option>
					</select>
					<select
						style={{
							boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
						}}
						name="months"
						id="date"
						className="h-10 w-32 border border-[#D0D5DD] rounded px-4">
						<option value="21" selected>
							July
						</option>
						<option value="21">August</option>
					</select>
				</form>
				<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
					{/* <MainRanger range={range} setRange={setRange} /> */}
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs manrope text-[#667085] font-medium capitalize bg-[#F9FAFB] border-b border-b-[#EAECF0]">
							<tr>
								<th scope="col" className="p-3">
									S/N
								</th>
								<th scope="col" className="px-4 py-3">
									Name
								</th>
								<th scope="col" className="px-4 py-3">
									Employee ID
								</th>
								<th scope="col" className="px-4 py-3">
									Phone number
								</th>
								<th scope="col" className="px-4 py-3">
									Email address
								</th>
								<th scope="col" className="px-4 py-3">
									Sign in
								</th>
								<th scope="col" className="px-4 py-3">
									Sign out
								</th>
							</tr>
						</thead>
						<tbody>
							{currentItems?.map((item, i) => (
								<tr
									key={i}
									className="text-sm inter font-normal text-[#667085] inter border-b border-b-[#EAECF0]">
									<td className="w-4 p-4">
										<div className="flex items-center">
											<input
												type="checkbox"
												className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
											/>
											<label for="checkbox-all-search" className="sr-only">
												checkbox
											</label>
										</div>
									</td>
									<td className="flex p-4 h-full items-center gap-3 text-[#101828] inter font-medium text-sm">
										{" "}
										{item?.user?.profile?.avatar || item?.user?.avatar ? (
											<img
												class="w-10 h-10 border-2 border-[#F72585] rounded-full"
												src={
													item?.user?.profile?.avatar ||
													item?.user?.avatar ||
													require("../../assets/photo-2.png")
												}
												alt=""
											/>
										) : (
											<AvatarImg
												user={
													item?.user?.profile?._id
														? item?.user?.profile || item?.user
														: item?.user
												}
											/>
										)}
										<p className="">
											{item?.user?.profile?.firstName}{" "}
											{item?.user?.profile?.lastName}
										</p>
									</td>
									<td className="p-4">
										{item?.user?.profile?.employeeId || item?.user?.employeeId}
									</td>
									<td className="p-4">
										{item?.user?.profile?.phone || item?.user?.phone}
									</td>
									<td className="p-4">
										{item?.user?.profile?.email || item?.user?.email}
									</td>
									<td className="p-4">
										{moment(item?.createdAt).format("DD/MM/YYYY hh:mm A")}
									</td>
									<td className="p-4">
										{moment(
											attendance?.all?.docs
												?.filter(
													item => item?.purpose?.toLowerCase() === "check-out"
												)
												?.find(da => da?.user?._id === item?.user?._id)
												?.createdAt
										).format("DD/MM/YYYY hh:mm A")}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="mt-4 flex justify-center">
						<LoadMore
							next={page === pageCount && data?.hasNextPage}
							loading={loading === "loadmore"}
							handleLoadMore={handleLoadMore}
						/>
					</div>
					<div className="mt-4 flex justify-center">
						<MainPaginate
							pageCount={pageCount}
							handlePageClick={handlePageClick}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const Qr = () => {
	const [modal, setModal] = useState(false);
	let [data, setData] = useState(null),
		[page, setPage] = useState(1),
		{ attendance, company } = useSelector(state => state),
		[loading, setLoading] = useState(null),
		dispatch = useDispatch();
	useEffect(() => {
		let thisData = attendance?.all || attendance?.data;
		let groups = thisData?.docs?.reduce((groups, game) => {
			let date = moment(game?.createdAt).format("MM/DD/YYYY");
			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(game);
			return groups;
		}, {});
		const groupArrays = Object.keys(groups).map(date => {
			return {
				date,
				signin: groups[date]?.filter(item => item?.purpose === "check-in"),
				signout: groups[date]?.filter(item => item?.purpose === "check-out"),
			};
		});

		setData({ ...thisData, docs: groupArrays });
	}, [attendance?.all, attendance?.data]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!data) return;

	const currentItems = data?.docs?.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data?.docs?.length / range);

	const handlePageClick = event => {
			const newOffset = (event.selected * range) % data?.docs?.length;
			setItemOffset(newOffset);
			setPage(1 + event?.selected);
		},
		handleLoadMore = async () => {
			setLoading("loadmore");
			await dispatch(
				manageAttendance(
					"get",
					{ limit: data?.limit * data?.nextPage },
					company?.currentSelected
				)
			);
			setLoading(false);
		};
	return (
		<div>
			<div className="">
				<div className="flex flex-col lg:flex-row lg:justify-between">
					<form className="my-4 flex gap-6" action="">
						<select
							style={{
								boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
							}}
							name="date"
							id="date"
							className="h-10 w-32 border border-[#D0D5DD] rounded px-4">
							<option value="21" selected>
								21
							</option>
							<option value="21">21</option>
						</select>
						<select
							style={{
								boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
							}}
							name="months"
							id="date"
							className="h-10 w-32 border border-[#D0D5DD] rounded px-4">
							<option value="21" selected>
								July
							</option>
							<option value="21">August</option>
						</select>
					</form>
					<div>
						<Addbutton
							background={"bg-secondary"}
							text={"View QR code"}
							onClick={() => setModal(true)}
							add={true}
						/>
					</div>
				</div>
				<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
					{/* <MainRanger range={range} setRange={setRange} /> */}
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs manrope text-[#667085] font-medium capitalize bg-[#F9FAFB] border-b border-b-[#EAECF0]">
							<tr>
								<th scope="col" className="p-3">
									S/No
								</th>
								<th scope="col" className="px-4 py-3">
									Date
								</th>
								<th scope="col" className="px-4 py-3">
									Sign In Scans
								</th>
								<th scope="col" className="px-4 py-3">
									Sign Out Scans
								</th>
							</tr>
						</thead>
						<tbody>
							{currentItems?.map((item, i) => (
								<tr
									className="text-sm inter font-normal text-[#667085] inter border-b border-b-[#EAECF0]"
									key={i}>
									<td className="w-4 p-4">
										<div className="flex gap-3 items-center">
											<div>
												<input
													type="checkbox"
													className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
												/>
												<label for="checkbox-all-search" className="sr-only">
													checkbox
												</label>
											</div>
											<p className="text-[#101828] font-semibold">{i + 1}</p>
										</div>
									</td>
									<td className="p-4">
										{moment(item?.date).format("ddd Do, MMM")}
									</td>
									<td className="p-4">{item?.signin?.length}</td>
									<td className="p-4">{item?.signout?.length}</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="mt-4 flex justify-center">
						<LoadMore
							next={page === pageCount && data?.hasNextPage}
							loading={loading === "loadmore"}
							handleLoadMore={handleLoadMore}
						/>
					</div>
					<div className="mt-4 flex justify-center">
						<MainPaginate
							pageCount={pageCount}
							handlePageClick={handlePageClick}
						/>
					</div>
				</div>
			</div>
			{modal && <QrModal handleClose={() => setModal(false)} />}
		</div>
	);
};

const QrModal = ({ handleClose }) => {
	let { attendance } = useSelector(state => state);

	const canvasRef = useRef();

	useEffect(() => {
		if (attendance?.qr)
			QRCode?.toCanvas(
				canvasRef?.current,
				// QR code doesn't work with an empty string
				// so we are using a blank space as a fallback
				attendance?.qr?.uri || " ",
				error => error && console.error(error)
			);
	}, [attendance?.qr]);

	if (!attendance?.qr) return;

	return (
		<div>
			<div className="fixed inset-0 w-full bg-black h-screen bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
				<div className="p-10 bg-white rounded-3xl">
					<div onClick={handleClose} className="float-right cursor-pointer">
						<IconContext.Provider value={{ color: "#000" }}>
							<AiOutlineClose size={20} />
						</IconContext.Provider>
					</div>
					<div className="mt-6">
						{/* <img src={Code} alt="" className="mx-auto" /> */}
						<canvas ref={canvasRef} />
						<div className="flex gap-2 h-full items-center">
							<p className="pt-4 text-2xl text-[#1b1b1b] font-normal segoe text-center">
								QR Code Generated:{" "}
								<span className="text-main">{attendance?.qr?.code}</span>
							</p>
							<div
								className="cursor-pointer"
								onClick={
									attendance?.qr?.code
										? () => {
												navigator.clipboard
													.writeText(attendance?.qr?.code)
													.then(
														() => {
															toast.info("Copied", { autoClose: 2000 });
														},
														err => {
															toast.warn(`Could not copy: ${err}`, {
																autoClose: 2000,
															});
														}
													);
										  }
										: null
								}>
								<IconContext.Provider value={{ color: "#2A72A8" }}>
									<AiFillCopy size={20} />
								</IconContext.Provider>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Attendance;
