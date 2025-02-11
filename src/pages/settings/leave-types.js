import Search from "../../components/search/search";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../components/pagination/pagination";
import ManageSettingsTab from "../../components/settings/manage_settings/manage_settings_tab";
import ModalContainer, {
	PageLoader,
} from "../../components/modal-container/modal-container";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { manageLeaveType } from "../../data/Reducers/LeaveTypeReducer";
import { useEffect } from "react";
// import { RenderStatusCell } from "../../components/settings/setting_table";
import Addbutton from "../../components/button/addbutton";
import Option from "../../components/oprion/option";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IconContext } from "react-icons";
// import Addbutton from "../../components/button/addbutton";

const Leavetypes = () => {
	const [createLeave, setCreateLeave] = useState(false);
	const toggleCreateLeave = () => {
			setCreateLeave(!createLeave);
		},
		init = {
			name: "",
			description: "",
			days: "",
		},
		[state, setState] = useState(init),
		textChange = e => {
			let { name, value } = e.target;
			setState({ ...state, [name]: value });
		},
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[isEdit, setIsEdit] = useState(null),
		[isDelete, setIsDelete] = useState(null),
		[search, setSearch] = useState(""),
		{ leaveType, company } = useSelector(state => state),
		dispatch = useDispatch();
	const handleSubmit = async e => {
		e?.preventDefault();
		if (!isDelete) if (!state?.name) return;
		setLoading("load");
		await dispatch(
			manageLeaveType(
				isDelete ? "delete" : isEdit ? "put" : "post",
				isDelete || state,
				company?.currentSelected
			)
		);
		setLoading(false);
		setSubmit(true);
	};
	let reset = () => {
		setSubmit(false);
		setCreateLeave(false);
		setIsDelete(false);
		setIsEdit(false);
		setState(init);
	};

	useEffect(() => {
		dispatch(manageLeaveType("get", null, company?.currentSelected));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (leaveType?.isAdded && submit) {
			reset();
		}
		if (leaveType?.isUpdated && submit) {
			reset();
		}
		if (leaveType?.isDeleted && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [leaveType?.isAdded, submit, leaveType?.isUpdated, leaveType?.isDeleted]);

	useEffect(() => {
		if (isEdit) {
			setCreateLeave(true);
			setState({ ...state, ...isEdit });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit]);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);
	useEffect(() => {
		if (leaveType?.isFound) setData(leaveType?.mainSearch);
		else setData(leaveType?.data);
	}, [leaveType?.data, leaveType?.isFound, leaveType?.mainSearch]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!leaveType?.data && !data) return <PageLoader />;
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
				manageLeaveType(
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
			await dispatch(
				manageLeaveType("get", { search }, company?.currentSelected)
			);
			setLoading(false);
		};

	return (
		<div>
			<div className="flex justify-between items-center">
				<ManageSettingsTab name="Manage Leave Types" />
				<Addbutton
					background={"bg-secondary"}
					text={"Add Levels Type"}
					add={true}
					onClick={() => setCreateLeave(!createLeave)}
				/>
			</div>

			<div className=" shadow-md sm:rounded-lg mt-10">
				<div className="float-right mb-24"></div>
				<div className="p-4 flex mt-16 items-center justify-between">
					<div className="flex items-center justify-between w-full">
						<p>Leave Types</p>
						{/* <button
							className="bg-[#F72585] p-2 px-8 rounded-md text-white whitespace-nowrap text-sm"
							onClick={() => setCreateLeave(!createLeave)}>
							<span></span> Add Leave Type
						</button> */}
						<div className="w-1/2">
							<Search
								value={search}
								onChange={setSearch}
								handleSubmit={handleSearch}
								loading={loading === "search"}
							/>
						</div>
					</div>
					{/* <Addbutton
            background={"bg-secondary"}
            text={"Add Levels Type"}
            add={true}
            onClick={() => setCreateLeave(!createLeave)}
          /> */}
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
									Leave Type
								</th>
								<th scope="col" className="px-6 py-3">
									Description
								</th>
								<th scope="col" className="px-6 py-3">
									Days
								</th>

								<th scope="col" className="px-6 py-3">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{currentItems?.map((item, i) => (
								<tr className="bg-white border-b text-xs">
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

									<td className="px-6 py-4">{item?.name}</td>
									<td className="px-6 py-4">{item?.description}</td>
									<td className="px-6 py-4">{item?.days}</td>
									<td className="px-6 py-4  w-[5%]">
										<Option type={"horizontal"}>
											<div className="flex gap-4">
												<IconContext.Provider value={{ color: "#2A72A8" }}>
													<AiFillEdit
														onClick={() => setIsEdit(item)}
														size={20}
													/>
												</IconContext.Provider>
												<IconContext.Provider value={{ color: "red" }}>
													<AiFillDelete
														onClick={() => setIsDelete(item)}
														size={20}
													/>
												</IconContext.Provider>
											</div>
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

			<ModalContainer
				title={
					isEdit ? `Edit ${isEdit?.name || ""} Leave Type` : "CREATE LEAVE TYPE"
				}
				show={createLeave}
				close={toggleCreateLeave}>
				<div className="mx-20">
					<form className="space-y-4">
						<Input
							label={"Leave Type Name"}
							placeholder={"Enter Leave Type Name"}
							value={state?.name}
							name="name"
							onChange={textChange}
						/>
						<Input
							label={"Leave Type Description"}
							placeholder={"Enter Leave Type Description"}
							type={"textarea"}
							value={state?.description}
							name="description"
							onChange={textChange}
						/>
						<Input
							label={"Leave Type Duration"}
							placeholder={"Enter Leave Type Duration"}
							type={"tel"}
							value={state?.days}
							name="days"
							onChange={textChange}
						/>
						<div className="mt-8 flex justify-end">
							<Button
								buttonType={"primary"}
								title={isEdit ? "Update" : "Create"}
								width={"w-fit"}
								type="submit"
								loading={loading === "load"}
								onClick={handleSubmit}
							/>
						</div>
					</form>
				</div>
			</ModalContainer>
			<ModalContainer
				title={"Delete Leave Type"}
				width={"max-w-sm"}
				show={isDelete ? true : false}
				close={() => setIsDelete(null)}>
				<div className="mx-20">
					<form className="space-y-4">
						<div className="my-auto w-100">
							<p className="text2 Lexend text-center">
								Do you want to delete {isDelete?.name}?
							</p>
							<div className="pt-4 flex">
								<Button
									buttonType={"primary"}
									title={"Yes"}
									type="button"
									width={"w-fit me-2"}
									loading={loading === "load"}
									onClick={handleSubmit}
								/>
								<Button
									buttonType={"secondary"}
									title={"No"}
									type="button"
									width={"w-fit ms-2"}
									onClick={() => setIsDelete(null)}
								/>
							</div>
						</div>
					</form>
				</div>
			</ModalContainer>
		</div>
	);
};

export default Leavetypes;
