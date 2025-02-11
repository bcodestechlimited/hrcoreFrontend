import { useNavigate, Link, useLocation } from "react-router-dom";

import FormName from "../../components/form-name/form-name";
// import { SlOptionsVertical } from "react-icons/sl";
// import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import DropDown from "../../components/dropdown/dropdown";
import Search from "../../components/search/search";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../components/pagination/pagination";
import Option from "../../components/oprion/option";
// import { BsPlusSquare } from "react-icons/bs";
// import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import Addbutton from "../../components/button/addbutton";
import { useEffect, useState } from "react";
import {
	manageStaff,
	resetStaffSearch,
} from "../../data/Reducers/StaffReducer";
import { IconContext } from "react-icons";
import { AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";
import { PageLoader } from "../../components/modal-container/modal-container";
import moment from "moment";
import { CSVLink } from "react-csv";

const AllEmployee = () => {
	const navigate = useNavigate(),
		{ staff, company } = useSelector(state => state);

	let [data, setData] = useState(null),
		[loading, setLoading] = useState(null),
		dispatch = useDispatch(),
		[search, setSearch] = useState(""),
		[page, setPage] = useState(1),
		{ state } = useLocation(),
		[newSample, setNewSample] = useState(null);

	useEffect(() => {
		if (staff?.isFound) setData(staff?.mainSearch);
		else if (state?.department || state?.level || state?.position) {
			// eslint-disable-next-line array-callback-return
			let newDocs = staff?.all?.docs?.filter(it => {
				if (state?.department) return state?.department === it?.department?._id;
				if (state?.level) return state?.level === it?.level?._id;
				if (state?.position) return state?.position === it?.position?._id;
			});
			setData({
				docs: newDocs,
			});
		} else setData(staff?.data);
	}, [staff?.data, staff?.mainSearch, staff?.isFound, state, staff?.all]);

	useEffect(() => {
		let newArr = [],
			newHeader = [];
		let newObj = {};
		if (staff?.all?.docs?.length > 0) {
			for (let r = 0; r < staff?.all?.docs.length; r++) {
				let element = staff?.all?.docs[r];
				newObj = {
					name: `${element?.firstName || ""} ${element?.lastName || ""}`,
					employeeId: element?.employeeId,
					department: element?.department?.name,
					position: element?.position?.name,
					role: element?.type,
					email: element?.email,
					phoneNumber: element?.phone,
					dateAdded: moment(element?.createdAt).format("DD/MM/YYYY"),
				};
				console.log({ newObj, data: staff?.all });
				newArr?.push(newObj);
				newObj = {};
			}
		}
		newHeader = [
			"Name",
			"Employee ID",
			"Department",
			"Position",
			"Role",
			"Email Address",
			"Phone Number",
			"Date Added",
		];
		console.log({ newArr });
		let csvData = [
			newHeader,
			...newArr?.map(it => {
				let newA = Object?.keys(it)?.map(ic => it?.[ic]);
				return newA;
			}),
		];
		// console.log({ csvData });
		setNewSample(csvData);
	}, [staff?.all]);

	let [range] = useState(10);

	useEffect(() => {
		dispatch(manageStaff("get", null, company?.currentSelected));
		dispatch(resetStaffSearch());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!staff?.data && !data) return <PageLoader />;

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
				manageStaff(
					"get",
					{ limit: data?.limit * data?.nextPage, search },
					company?.currentSelected
				)
			);
			setLoading(false);
		},
		handleSearch = async e => {
			e?.preventDefault();
			setLoading("search");
			await dispatch(manageStaff("get", { search }, company?.currentSelected));
			setLoading(false);
		};

	return (
		<div>
			<div className="flex justify-between items-center">
				<p className="text-sl font-semibold">Manage employees</p>
				<div className="flex items-center">
					{process.env.REACT_APP_NAME === "Cephas HR Core" &&
						newSample?.length > 0 && (
							<>
								<CSVLink
									filename={`Employee Data ${moment().format(
										"YYYYMMDDHHMMASSS"
									)}.csv`}
									className="text-main flex items-center gap-1 w-full"
									data={newSample}>
									<Addbutton
										text="Download As CSV"
										background="bg-[#F72585]"
										// onClick={() => navigate("/employee/add-staff")}
										view
									/>
								</CSVLink>
							</>
						)}
					<Addbutton
						text="Copy Register Link"
						background="bg-[#F72585]"
						onClick={() =>
							navigator.clipboard
								.writeText(
									`${window.origin}/register?company=${company?.currentSelected}`
								)
								.then(
									() => {
										toast.info("Copied", { autoClose: 2000 });
									},
									err => {
										toast.warn(`Could not copy: ${err}`, {
											autoClose: 2000,
										});
									}
								)
						}
						add={true}
						copy
						space
					/>
					<Addbutton
						text="Add New"
						background="bg-[#F72585]"
						onClick={() => navigate("/employee/add-staff")}
						add={true}
					/>
				</div>
				{/* <button
          className="bg-[] btn h-12 px-5 flex justify-center items-center gap-3 rounded-md text-white whitespace-nowrap text-sm"
          onClick={() => navigate("/employee/add-staff")}
        >
          <div>
            <IconContext.Provider value={{ color: "white" }}>
              <BsPlusSquare size={20} />
            </IconContext.Provider>
          </div>
          <p className="text-white dtext manrope text-base transition-transform ease-in-out duration-100">Add Staff</p>
        </button>  */}
			</div>
			<div className=" shadow-md sm:rounded-lg mt-10">
				<div className="p-4 flex items-center justify-between">
					<select
						id="countries"
						className="bg-gray-50 w-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
						<option selected>Bulk Commands</option>
						<option value="reset">Reset Password</option>
						<option value="disable">Disable</option>
						<option value="audit">Audit</option>
					</select>
					<div className="flex items-center gap-4 w-2/3">
						<DropDown>
							<form>
								<div className="mb-2.5">
									<label className="font-semibold mb-2">Branches</label>
									<select
										id="countries"
										className="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-2 h-8">
										<option selected>All</option>
										<option value="reset">Reset Password</option>
										<option value="disable">Disable</option>
										<option value="audit">Audit</option>
									</select>
								</div>
								<div className="mb-2.5">
									<label className="font-semibold mb-2">Department</label>
									<select
										id="countries"
										className="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-2 h-8">
										<option selected>All</option>
										<option value="reset">Reset Password</option>
										<option value="disable">Disable</option>
										<option value="audit">Audit</option>
									</select>
								</div>
								<div className="mb-2.5">
									<label className="font-semibold mb-2">Grade</label>
									<select
										id="countries"
										className="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-2 h-8">
										<option selected>All</option>
										<option value="reset">Reset Password</option>
										<option value="disable">Disable</option>
										<option value="audit">Audit</option>
									</select>
								</div>
								<div className="mb-2">
									<label className="font-semibold mb-2">Status</label>
									<select
										id="countries"
										className="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-2 h-8">
										<option selected>All</option>
										<option value="reset">Reset Password</option>
										<option value="disable">Disable</option>
										<option value="audit">Audit</option>
									</select>
								</div>
								<div>
									<label className="font-semibold">Filters</label>
									<div className="right-0 flex gap-8 flex-wrap md:flex-nowrap divide-gray-100">
										<div className="grid gap-2 items-center text-xs">
											<label>from: </label>
											<input
												type="date"
												name=""
												className="border border-black rounded-md h-6 text-xs"
											/>
										</div>
										<div className="grid gap-2 items-center text-xs">
											<label>to: </label>
											<input
												type="date"
												name=""
												className="border border-black rounded-md h-6 text-xs"
											/>
										</div>
									</div>
								</div>
								<div className="mt-4">
									<button className="text-sm p-1 px-8">Cancel</button>
									<button className="text-sm bg-[#2A72A8] text-white p-1 px-8 rounded-lg">
										Filter
									</button>
								</div>
							</form>
						</DropDown>
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
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50">
							<tr>
								<th scope="col" className="p-4">
									<div className="flex items-center">
										<input
											type="checkbox"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
										/>
										<label for="checkbox-all-search" className="sr-only">
											checkbox
										</label>
									</div>
								</th>
								<th scope="col" className="px-6 py-3">
									Name
								</th>
								<th scope="col" className="px-6 py-3">
									Employee ID
								</th>
								<th scope="col" className="px-6 py-3">
									Department
								</th>
								<th scope="col" className="px-6 py-3">
									Position
								</th>
								<th scope="col" className="px-6 py-3">
									Role
								</th>
								<th scope="col" className="px-6 py-3">
									Email Address
								</th>
								<th scope="col" className="px-6 py-3">
									Phone Number
								</th>
								<th scope="col" className="px-6 py-3">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{currentItems?.map((item, i) => (
								<tr
									onClick={() =>
										navigate("/employee/profile", { state: item?._id })
									}
									key={i}
									className="bg-white border-b text-xs cursor-pointer">
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
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
										<FormName item={item} />
									</th>
									<td className="px-6 py-4">{item?.employeeId}</td>
									<td className="px-6 py-4">{item?.department?.name}</td>
									<td className="px-6 py-4">{item?.position?.name}</td>
									<td className="px-6 py-4">{item?.type}</td>
									<td className="px-6 py-4">{item?.email}</td>
									<td className="px-6 py-4">{item?.phone}</td>
									<td className="px-6 py-4">
										<Option type={"horizontal"}>
											<ul className="">
												<li>
													<div className="cursor-pointer">
														<Link to={"/employee/profile"} state={item?._id}>
															<IconContext.Provider value={{ color: "#000" }}>
																<AiFillEye size={20} />
															</IconContext.Provider>
														</Link>
													</div>

													{/* <Link className="block px-4 py-2 hover:bg-gray-100 text-blue-600">
                            View Profile
                          </Link> */}
												</li>
											</ul>
										</Option>
									</td>
								</tr>
							))}
						</tbody>
					</table>
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
		</div>
	);
};

export default AllEmployee;
