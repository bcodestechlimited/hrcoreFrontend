import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

// import { SlOptionsVertical } from "react-icons/sl";
import { BiFilterAlt } from "react-icons/bi";
// import { BsArrowDown, BsFillPlusSquareFill } from "react-icons/bs";

// import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import ManageSettingsTab from "../../../components/settings/manage_settings/manage_settings_tab";
import Search from "../../../components/search/search";
// import Option from "../../../components/oprion/option";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../../components/pagination/pagination";
// import ModalContainer from "../../../components/modal-container/modal-container";
// import Input from "../../../components/input/input";
// import Button from "../../../components/button/button";
import DropDown from "../../../components/dropdown/dropdown";
// import { IconContext } from "react-icons";
// import ApprovalFlowTab from "../../../components/settings/approval_flow_component/approval-flow-tab";
import SettingTable from "../../../components/settings/setting_table";
import Addbutton from "../../../components/button/addbutton";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteAdmins,
	deleteManagers,
	manageStaff,
	resetStaffSearch,
} from "../../../data/Reducers/StaffReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { returnErrors } from "../../../data/Reducers/ErrorReducer";
import Button from "../../../components/button/button";
import ModalContainer, {
	PageLoader,
} from "../../../components/modal-container/modal-container";
import { manageCompany } from "../../../data/Reducers/CompanyReducer";

const ManageAdmins = () => {
	const navigate = useNavigate();

	let [seeManagers, setSeeManagers] = useState(0);

	const header = [
		{
			id: 1,
			name: "S/N",
			case: "number_count",
			show: true,
		},
		{
			id: 2,
			name: "Name",
			case: "Name",
			show: true,
		},
		{
			id: 3,
			name: "Admin Type",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: "type",
			show: true,
		},
		{
			id: 4,
			name: "Grade for Position",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: seeManagers === 3 ? "gradeForPosition1" : "gradeForPosition2",
			subKeyName: "name",
			show: seeManagers === 3 || seeManagers === 4 ? true : false,
		},
		{
			id: 5,
			name: "Employee ID",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: "employeeId",
			show: true,
		},
		{
			id: 6,
			name: "Email address",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: "email",
			show: true,
		},
		{
			id: 7,
			name: "ACTION",
			case: "BUTTON",
			keyName: "profile",
			show: true,
			// name: "EditResetPasswordEnableDisable",
		},
	];

	const dataTable = [
		{ id: 1, name: "Alice", age: 30, city: "New York" },
		{ id: 2, name: "Bob", age: 25, city: "Los Angeles" },
		{ id: 3, name: "Charlie", age: 28, city: "Chicago" },
		{ id: 4, name: "David", age: 35, city: "Houston" },
		{ id: 5, name: "Eve", age: 22, city: "Miami" },
	];
	// const [createLeave, setCreateLeave] = useState(false);
	// const toggleCreateLeave = () => {
	// 	setCreateLeave(!createLeave);
	// };
	let { company, staff, position } = useSelector(state => state),
		dispatch = useDispatch(),
		[findCompMain, setFindComp] = useState(null);
	useEffect(() => {
		if (company?.currentSelected) {
			let findComp = company?.data?.docs?.find(
					item => item?._id === company?.currentSelected
				),
				mainPostion = position?.all?.docs || position?.data?.docs || [];
			setFindComp(findComp);
			// console.log({ findComp });
			dispatch(
				manageStaff(
					"get",
					{ admin: findComp?.admins?.toString() },
					company?.currentSelected
				)
			);
			dispatch(
				manageStaff(
					"get",
					{ managers: findComp?.managers?.toString() },
					company?.currentSelected
				)
			);
			dispatch(
				manageStaff(
					"get",
					{ manager1: mainPostion?.map(it => it?._id)?.toString() },
					company?.currentSelected
				)
			);
			dispatch(
				manageStaff(
					"get",
					{ manager2: mainPostion?.map(it => it?._id)?.toString() },
					company?.currentSelected
				)
			);
			dispatch(
				manageStaff(
					"get",
					{ executive: findComp?.executive?.toString() },
					company?.currentSelected
				)
			);
		}
	}, [company, dispatch, position?.data, position?.all]);

	let [data, setData] = useState(null),
		[loading, setLoading] = useState(null),
		[search, setSearch] = useState(""),
		[page, setPage] = useState(1);

	useEffect(() => {
		if (staff?.isFound) setData(staff?.mainSearch || { docs: [] });
		else if (seeManagers === 4) setData(staff?.manager2 || { docs: [] });
		else if (seeManagers === 3) setData(staff?.manager1 || { docs: [] });
		else if (seeManagers === 2) setData(staff?.manager || { docs: [] });
		else if (seeManagers === 1) setData(staff?.executive || { docs: [] });
		else setData(staff?.admin || { docs: [] });
	}, [
		staff?.admin,
		staff?.mainSearch,
		staff?.isFound,
		seeManagers,
		staff?.manager,
		staff?.manager1,
		staff?.manager2,
		staff?.executive,
	]);

	let [range] = useState(10);

	useEffect(() => {
		dispatch(resetStaffSearch());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [userId, setUser] = useState(""),
		[gradeForPosition, setGradeForPosition] = useState(null);

	const handleSubmit = type => async e => {
		e?.preventDefault();
		if (!userId) return;

		let newG = gradeForPosition
			?.filter(it => it?.isChecked)
			?.map(it => it?._id);
		if (seeManagers === 4 || seeManagers === 3) {
			if (newG?.length === 0)
				return toast.info("Please select position(s) to remove");
		}

		setLoading(type);
		try {
			let dd = {};
			if (seeManagers === 4 || seeManagers === 3) {
				dd.gradeForPosition = newG;
			}
			let res = await axios.put(
				`/api/v1/company/remove/${type}/${company?.currentSelected}/${userId?._id}`,
				dd
			);

			toast.success(res?.data?.message);
			setUser(null);
			setGradeForPosition(null);
			if (["manager", "manager1", "manager2"]?.includes(type))
				dispatch(deleteManagers(res?.data));
			dispatch(deleteAdmins(res?.data));
			dispatch(manageCompany("get"));
		} catch (err) {
			if (err?.response?.status === 429 || err?.response?.status === 405)
				toast.error(err?.response?.data ? err?.response?.data : err?.message);
			console.log({ err });
			let error = err.response?.data?.error;
			if (error) {
				dispatch(returnErrors({ error, status: err?.response?.status }));
			} else {
				toast.error(err?.response?.data?.message);
			}
		}
		setLoading(false);
	};

	useEffect(() => {
		if (userId) {
			if (seeManagers === 4) setGradeForPosition(userId?.gradeForPosition2);
			else setGradeForPosition(userId?.gradeForPosition1);
		}
	}, [userId, seeManagers]);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (
		seeManagers === 4 &&
		!staff?.manager2 &&
		!data &&
		position?.data?.docs?.length > 0
	)
		return <PageLoader />;

	if (
		seeManagers === 3 &&
		!staff?.manager1 &&
		!data &&
		position?.data?.docs?.length > 0
	)
		return <PageLoader />;

	if (
		seeManagers === 2 &&
		!staff?.manager &&
		!data &&
		findCompMain?.managers?.length > 0
	)
		return <PageLoader />;

	if (
		seeManagers === 1 &&
		!staff?.executive &&
		!data &&
		findCompMain?.executive?.length > 0
	)
		return <PageLoader />;

	if (
		seeManagers === 0 &&
		!staff?.admin &&
		!data &&
		findCompMain?.admins?.length > 0
	)
		return <PageLoader />;

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
			if (company?.currentSelected) {
				let findComp = company?.data?.docs?.find(
						item => item?._id === company?.currentSelected
					),
					mainPostion = position?.all?.docs || position?.data?.docs || [];
				let findWho =
					seeManagers === 4
						? {
								manager2: mainPostion?.map(it => it?._id)?.toString(),
						  }
						: seeManagers === 3
						? {
								manager1: mainPostion?.map(it => it?._id)?.toString(),
						  }
						: seeManagers === 2
						? {
								managers: findComp?.managers?.toString(),
						  }
						: seeManagers === 1
						? {
								executive: findComp?.executive?.toString(),
						  }
						: {
								admin: findComp?.admins?.toString(),
						  };
				// console.log({ findComp });
				await dispatch(
					manageStaff(
						"get",
						{
							limit: data?.limit * data?.nextPage,
							search,
							...findWho,
						},
						company?.currentSelected
					)
				);
			}
			setLoading(false);
		},
		handleSearch = async e => {
			e?.preventDefault();
			setLoading("search");
			if (company?.currentSelected) {
				let findComp = company?.data?.docs?.find(
						item => item?._id === company?.currentSelected
					),
					mainPostion = position?.all?.docs || position?.data?.docs || [];
				let findWho =
					seeManagers === 4
						? {
								manager2: mainPostion?.map(it => it?._id)?.toString(),
						  }
						: seeManagers === 3
						? {
								manager1: mainPostion?.map(it => it?._id)?.toString(),
						  }
						: seeManagers === 2
						? {
								managers: findComp?.managers?.toString(),
						  }
						: seeManagers === 1
						? {
								executive: findComp?.executive?.toString(),
						  }
						: {
								admin: findComp?.admins?.toString(),
						  };
				// console.log({ findComp });
				await dispatch(
					manageStaff(
						"get",
						{
							search,
							...findWho,
						},
						company?.currentSelected
					)
				);
			}
			setLoading(false);
		};

	return (
		<div>
			<div className="flex justify-between items-center">
				<ManageSettingsTab
					name={
						seeManagers === 4
							? "Manage Department Managers 2"
							: seeManagers === 3
							? "Manage Department Managers"
							: seeManagers === 2
							? "Manage Managers"
							: seeManagers === 1
							? "Manage Executives"
							: "Manage Admins"
					}
				/>

				<div className="flex items-center">
					<Addbutton
						background={"bg-secondary"}
						text={"View Admins"}
						view={true}
						onClick={() => setSeeManagers(0)}
						space
					/>
					<Addbutton
						background={"bg-secondary"}
						text={"View Executives"}
						view={true}
						onClick={() => setSeeManagers(1)}
						space
					/>
					<Addbutton
						background={"bg-secondary"}
						text={
							"View Managers"
							// seeManagers === 1
							// 	? "View Managers"
							// 	: seeManagers === 0
							// 	? "View Executives"
							// 	: "View Admins"
						}
						view={true}
						onClick={
							() => setSeeManagers(2)
							// setSeeManagers(seeManagers === 2 ? 0 : ++seeManagers)
						}
						space
					/>
					<Addbutton
						background={"bg-secondary"}
						text={
							"View Department Managers"
							// seeManagers === 1
							// 	? "View Managers"
							// 	: seeManagers === 0
							// 	? "View Executives"
							// 	: "View Admins"
						}
						view={true}
						onClick={
							() => setSeeManagers(3)
							// setSeeManagers(seeManagers === 2 ? 0 : ++seeManagers)
						}
						space
					/>
					<Addbutton
						background={"bg-secondary"}
						text={
							"View Department Managers 2"
							// seeManagers === 1
							// 	? "View Managers"
							// 	: seeManagers === 0
							// 	? "View Executives"
							// 	: "View Admins"
						}
						view={true}
						onClick={
							() => setSeeManagers(4)
							// setSeeManagers(seeManagers === 2 ? 0 : ++seeManagers)
						}
						space
					/>
					<Addbutton
						background={"bg-secondary"}
						text={"Add Staff"}
						add={true}
						onClick={() =>
							navigate("/settings/manage-admins/create-admin", {
								state:
									seeManagers === 4
										? "manager2"
										: seeManagers === 3
										? "manager1"
										: seeManagers === 2
										? "manager"
										: seeManagers === 1
										? "executive"
										: "admin",
							})
						}
					/>
				</div>
			</div>

			<div className=" shadow-md sm:rounded-lg mt-10">
				<div className="p-4 flex items-center justify-between">
					<select
						id="countries"
						class="bg-gray-50 w-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
						<option selected>Bulk Commands</option>
						<option value="reset">Reset Password</option>
						<option value="disable">Disable</option>
						<option value="audit">Audit</option>
					</select>
					<div className="flex items-center gap-4 w-2/3">
						{/* <button
              className="bg-[#F72585] p-2 px-8 rounded-md text-white whitespace-nowrap text-sm"
              onClick={() => navigate("/settings/manage-admins/create-admin")}
            >
              <span></span> Add Staff
            </button> */}
						<div className=" flex items-center cursor-pointer">
							<BiFilterAlt />
							<DropDown />
						</div>
						<Search
							value={search}
							onChange={setSearch}
							handleSubmit={handleSearch}
							loading={loading === "search"}
						/>
					</div>
				</div>

				<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
					{/* <MainRanger range={range} setRange={setRange} /> */}

					<SettingTable
						data={currentItems || dataTable}
						header={header?.filter(it => it?.show)}
						view
						cancel={setUser}
					/>
				</div>
			</div>
			<div className="mt-4 flex justify-center">
				<LoadMore
					next={page === pageCount && data?.hasNextPage}
					loading={loading === "loadmore"}
					handleLoadMore={handleLoadMore}
				/>
			</div>
			<div className="mt-4 flex justify-center">
				{/* <Pagination /> */}
				<MainPaginate pageCount={pageCount} handlePageClick={handlePageClick} />
			</div>

			{/* <ModalContainer
				title={"Approval Flows"}
				show={createLeave}
				close={toggleCreateLeave}>
				<div className="mx-20">
					<form className="space-y-4">
						<Input label={"Department"} />
						<Input label={"Select Approver (1st Approver)"} type={"select"} />
						<Input label={"Select Approver (2st Approver)"} type={"select"} />

						<div className="flex justify-center items-center">
							<div className=" ">
								<p>Adeoye Adeoti</p>

								<div className="m-auto flex justify-center ">
									<IconContext.Provider
										value={{ className: "global-class-name text-[#2A72A8CC]" }}>
										<div>
											<BsArrowDown />
										</div>
									</IconContext.Provider>
								</div>
								<p>Adeoye Adeoti</p>
							</div>
						</div>

						<Input label={"Select Approver (3st Approver)"} type={"select"} />

						<div className="flex justify-center items-center">
							<div className=" ">
								<p>Adeoye Adeoti</p>

								<div className="m-auto flex justify-center ">
									<IconContext.Provider
										value={{ className: "global-class-name text-[#2A72A8CC]" }}>
										<div>
											<BsArrowDown />
										</div>
									</IconContext.Provider>
								</div>
								<p>Adeoye Adeoti</p>

								<div className="m-auto flex justify-center ">
									<IconContext.Provider
										value={{ className: "global-class-name text-[#2A72A8CC]" }}>
										<div>
											<BsArrowDown />
										</div>
									</IconContext.Provider>
								</div>

								<p>Adeoye Adeoti</p>
							</div>
						</div>
						<div className="flex justify-end">
							<IconContext.Provider
								value={{ className: "global-class-name text-[#F97AB4]" }}>
								<div>
									<BsFillPlusSquareFill />
								</div>
							</IconContext.Provider>
						</div>
						<div className="mt-8 flex  justify-center">
							<Button buttonType={"primary"} title={"Create"} width={"w-fit"} />
						</div>
					</form>
				</div>
			</ModalContainer> */}
			<ModalContainer
				title={`Remove ${
					seeManagers === 4
						? "Department Manager 2"
						: seeManagers === 3
						? "Department Manager"
						: seeManagers === 2
						? "Manager"
						: seeManagers === 1
						? "Executive"
						: "Admin"
				}`}
				width={"max-w-sm"}
				show={userId ? true : false}
				close={() => {
					setUser(null);
					setGradeForPosition(null);
				}}>
				<div className={seeManagers === 4 || seeManagers === 3 ? "" : "mx-20"}>
					<form className="space-y-4">
						<div className="my-auto w-100">
							<p className="text2 Lexend text-center">
								{seeManagers === 4 || seeManagers === 3 ? (
									<>Please select position(s) to remove</>
								) : (
									<>
										Do you want to remove{" "}
										{userId?.lastName || userId?.profile?.lastName}?
									</>
								)}
							</p>
							{seeManagers === 4 || seeManagers === 3 ? (
								<div className="grid grid-cols-1 py-5 gap-2">
									{gradeForPosition?.map((it, i) => (
										<div
											onClick={() => {
												let newM = gradeForPosition;
												setGradeForPosition([
													...newM?.map(ic =>
														ic?._id === it?._id
															? {
																	...ic,
																	isChecked: ic?.isChecked ? false : true,
															  }
															: ic
													),
												]);
											}}
											className={`bg flex justify-center items-center  w-full  2xl:w-[270px] rounded-xl text-sm py-2 h-[80px] shadow-xl p-2 cursor-pointer mb-2 ${
												it?.isChecked ? "bg-[#EFF6FC]" : "bg-white"
											}`}
											key={i}>
											{it?.name}
										</div>
									))}
								</div>
							) : null}
							<div className="pt-4 flex">
								<Button
									buttonType={"primary"}
									title={
										seeManagers === 4 || seeManagers === 3 ? "Remove" : "Yes"
									}
									type="button"
									width={"w-fit me-2"}
									loading={loading}
									onClick={handleSubmit(
										seeManagers === 4
											? "manager2"
											: seeManagers === 3
											? "manager1"
											: seeManagers === 2
											? "manager"
											: seeManagers === 1
											? "executive"
											: "admin"
									)}
								/>
								<Button
									buttonType={"secondary"}
									title={
										seeManagers === 4 || seeManagers === 3 ? "Cancel" : "No"
									}
									type="button"
									width={"w-fit ms-2"}
									onClick={() => {
										setUser(null);
										setGradeForPosition(null);
									}}
								/>
							</div>
						</div>
					</form>
				</div>
			</ModalContainer>
		</div>
	);
};

export default ManageAdmins;
