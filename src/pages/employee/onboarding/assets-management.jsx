import { useNavigate } from "react-router-dom";
import FormName from "../../../components/form-name/form-name";
import Search from "../../../components/search/search";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../../components/pagination/pagination";
import Button from "../../../components/button/button";
// import Viewbutton from "../../../components/button/viewbutton";
import Addbutton from "../../../components/button/addbutton";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
	manageStaff,
	resetStaffSearch,
} from "../../../data/Reducers/StaffReducer";
import { EditData } from "../../../data/Reducers/UserReducer";
import { toast } from "react-toastify";
import { manageTool } from "../../../data/Reducers/ToolReducer";

const AssetsManagement = () => {
	const navigate = useNavigate();
	const handleCommand = e => {
		if (e.target.value) {
			let filterOut = users?.filter(item => item?.isChecked);

			if (filterOut?.length === 0) return toast.info("No user selected");
			navigate("/employee/add-tools", {
				state: { users: filterOut, action: e.target.value },
			});
		}
	};
	let { staff, company } = useSelector(state => state);

	let [data, setData] = useState(null),
		[loading, setLoading] = useState(null),
		dispatch = useDispatch(),
		[search, setSearch] = useState(""),
		[page, setPage] = useState(1),
		[users, setUsers] = useState([]);

	useEffect(() => {
		if (staff?.isFound) setData(staff?.mainSearch);
		else setData(staff?.data);
	}, [staff?.data, staff?.mainSearch, staff?.isFound]);

	let [range] = useState(10),
		currentItems,
		[itemOffset, setItemOffset] = useState(0),
		endOffset = itemOffset + range;

	useEffect(() => {
		dispatch(manageStaff("get", null, company?.currentSelected));
		dispatch(manageTool("get", null, company?.currentSelected));
		dispatch(resetStaffSearch());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// if (users?.length === 0 && data)
		setUsers(data?.docs?.slice(itemOffset, endOffset));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.docs]);

	if (!data) return;

	currentItems = data?.docs?.slice(itemOffset, endOffset);
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
			<div className="flex items-center justify-between">
				<Button buttonType={"primary"} title={"All Assignment"} />
				<Addbutton
					view={true}
					text={"View all Tools"}
					background={"bg-secondary"}
					onClick={() => navigate("/all-tools")}
				/>
				{/* <Button
          buttonType={"secondary"}
          title={"View all Tools"}
          width={"w-fit"}
          onClick={() => navigate("/all-tools")}
        /> */}
			</div>
			<div className=" shadow-md sm:rounded-lg mt-10">
				<div className="p-4 flex items-center justify-between">
					<select
						id="countries"
						class="bg-gray-50 w-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
						onChange={handleCommand}>
						<option value={""}>Commands</option>
						<option value="assign">Assign Tools</option>
						<option value="remove">Remove</option>
					</select>
					<div className="flex items-center gap-4 w-2/3 justify-end">
						<Search
							value={search}
							onChange={setSearch}
							handleSubmit={handleSearch}
							loading={loading === "search"}
						/>
					</div>
				</div>
				<div className="relative overflow-x-auto">
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
										<label htmlFor="checkbox-all-search" className="sr-only">
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
									Tools
								</th>
							</tr>
						</thead>
						<tbody>
							{currentItems?.map((item, i) => (
								<tr className="bg-white border-b text-xs" key={i}>
									<td className="w-4 p-4">
										<CheckBoxUser
											users={users}
											setUsers={setUsers}
											item={item}
											i={i}
										/>
									</td>
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
										<FormName item={item?.profile || item} />
									</th>
									<td className="px-6 py-4">
										{item?.profile?.employeeId || item?.employeeId}
									</td>
									<td className="px-6 py-4">
										<ListAssignedTools item={item} />{" "}
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

export default AssetsManagement;

export const ListAssignedTools = ({ item }) => {
	let { tool } = useSelector(state => state),
		[tools, setTools] = useState([]);

	useEffect(() => {
		if (item && tool?.all) {
			let user = item?.profile?._id || item?._id,
				newTools = [];

			tool?.all?.docs?.map(
				it => it?.users?.includes(user) && newTools?.push(it?.name)
			);
			setTools(newTools);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item, tool?.all]);

	return (
		<>
			{tools?.length === 0 ? (
				<>No Tools Assigned</>
			) : (
				tools?.map((ij, i) => (
					<span key={i}>
						{ij} {i !== tools?.length - 1 && `, `}
					</span>
				))
			)}
		</>
	);
};

export const CheckBoxUser = ({ users, setUsers, item, i }) => {
	let [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		let findUser = users?.find(it => it?.isChecked && it?._id === item?._id);
		if (findUser) setIsChecked(true);
		else setIsChecked(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [users, item]);

	return (
		<div className="flex items-center">
			<input
				type="checkbox"
				name={`tools${i}`}
				id={`tools${i}`}
				className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
				checked={isChecked}
				onChange={e => {
					let newItem = item;
					if (e.target.checked) newItem = { ...newItem, isChecked: true };
					else
						newItem = {
							...newItem,
							isChecked: false,
						};
					let newData = EditData(users, newItem);
					// let findUser = newData?.find(
					// 	it => it?.isChecked && it?._id === item?._id
					// );
					// if (findUser) setIsChecked(true);
					// else setIsChecked(false);
					setUsers(newData);
				}}
			/>
			<label htmlFor={`tools${i}`} className="sr-only">
				checkbox
			</label>
		</div>
	);
};