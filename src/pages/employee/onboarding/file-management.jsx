import Button from "../../../components/button/button";

import {
	SlOptionsVertical,
	// SlOptions
} from "react-icons/sl";
// import { MdAdd } from "react-icons/md";
import {
	PiFolderNotchFill,
	//  PiGlobeHemisphereWestThin
} from "react-icons/pi";
// import Badge from "../../../components/badge/badge";
import FileCard from "../../../components/file-card/file-card";
import ModalContainer from "../../../components/modal-container/modal-container";
import Input from "../../../components/input/input";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Addbutton from "../../../components/button/addbutton";
import { useDispatch, useSelector } from "react-redux";
import { manageFolder } from "../../../data/Reducers/FolderReducer";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../../components/pagination/pagination";
import moment from "moment";
import { EditData } from "../../../data/Reducers/UserReducer";
import { GlobalState } from "../../../data/Context";

const FileManagement = () => {
	const [addFolder, setAddFolder] = useState(false);
	const toggleAddFolder = () => {
		setAddFolder(!addFolder);
	};
	const init = {
			name: "",
			description: "",
			imageUri: "",
			levels: [],
		},
		[state, setState] = useState(init),
		textChange = e => {
			let { name, value } = e.target;
			setState({ ...state, [name]: value });
		},
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[isEdit, setIsEdit] = useState(null),
		[permit, setPermit] = useState(null),
		[isDelete, setIsDelete] = useState(null),
		{ level, company, folder, auth } = useSelector(state => state),
		{ canAdmin, canApprove } = useContext(GlobalState),
		dispatch = useDispatch();
	const handleSubmit = async e => {
		e?.preventDefault();
		if (!isDelete) if (!state?.name) return;
		let newState = {
			...state,
			levels: permit?.filter(item => item?.isChecked)?.map(item => item?._id),
		};
		setLoading(true);
		await dispatch(
			manageFolder(
				isDelete ? "delete" : isEdit ? "put" : "post",
				isDelete || newState,
				company?.currentSelected
			)
		);
		setLoading(false);
		setSubmit(true);
	};

	let reset = () => {
		setSubmit(false);
		setAddFolder(false);
		setIsDelete(false);
		setIsEdit(false);
		setState(init);
	};

	useEffect(() => {
		dispatch(manageFolder("get", null, company?.currentSelected));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (folder?.isAdded && submit) {
			reset();
		}
		if (folder?.isUpdated && submit) {
			reset();
		}
		if (folder?.isDeleted && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [folder?.isAdded, submit, folder?.isUpdated, folder?.isDeleted]);

	useEffect(() => {
		setPermit(level?.all?.docs);
	}, [level?.all]);

	useEffect(() => {
		if (isEdit) {
			setAddFolder(true);
			setState({ ...state, ...isEdit });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit]);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);

	useEffect(() => {
		setData(folder?.data);
	}, [folder?.data]);

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
				manageFolder(
					"get",
					{ limit: data?.limit * data?.nextPage },
					company?.currentSelected
				)
			);
			setLoading(false);
		};

	return (
		<div>
			<div>
				<Button buttonType={"primary"} title={"Documents"} />
			</div>

			<div className="block shadow mt-6 p-4 bg-white rounded-lg overflow-x-auto scrollbar-hide">
				<p className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
					Recommened(24)
				</p>

				<div className="flex gap-8 overflow-x-auto noScroll">
					{currentItems?.slice(0, 10)?.map((item, i) => (
						<FileCard item={item} key={i} />
					))}
				</div>
			</div>

			<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
				<div className="p-4 flex items-center justify-between">
					<p className="font-semibold">Files Folder</p>
					<p className="flex items-center gap-2 font-medium">
						{auth?.user?.isAdmin || canAdmin || canApprove ? (
							<Addbutton
								background={"bg-main"}
								add={true}
								onClick={toggleAddFolder}
								text={"Add New"}
							/>
						) : null}

						{/* <Button
              buttonType={"primary"}
              title={"Add New"}
              width={"w-fit"}
              icon={<MdAdd />}
              onClick={toggleAddFolder}
            /> */}
					</p>
				</div>
				{/* <MainRanger range={range} setRange={setRange} /> */}
				<FileDocumentTable currentItems={currentItems} />
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

			{/* modals */}
			<ModalContainer
				title={"Add New Folder"}
				show={addFolder}
				close={toggleAddFolder}>
				<div>
					<form className="space-y-4">
						<Input
							label={"File Name"}
							placeholder={"File Name"}
							value={state?.name}
							onChange={textChange}
							name="name"
						/>
						<Input
							label={"File Description"}
							placeholder={"File Description"}
							value={state?.description}
							onChange={textChange}
							name="description"
							type={"textarea"}
						/>
						{/* <Input
							onChange={textChange}
							name="level"
							value={state?.level}
							label={"Sharing By Level"}
							type={"select"}
							options={level?.all?.docs?.filter(item => item?.name)}
						/> */}
						<label className="block mb-2 text-sm font-medium text-gray-900">
							Sharing by Level
						</label>
						<div className="grid grid-cols-2 gap-8">
							{permit?.map((item, i) => (
								<div className="p-2 flex items-center" key={i}>
									<LevelCheck
										item={item}
										setPermit={setPermit}
										permit={permit}
										i={i}
										levels={state?.levels}
									/>
									<label htmlFor={`level${i}`} className="text-capitalize my-0">
										{item?.name}
									</label>
								</div>
							))}
						</div>
						<div className="mt-8 flex justify-end">
							<Button
								buttonType={"primary"}
								title={isEdit ? "Update" : "Create"}
								type="submit"
								width={"w-fit"}
								loading={loading}
								onClick={handleSubmit}
							/>
						</div>
					</form>
				</div>
			</ModalContainer>
			<ModalContainer
				title={"Delete Department"}
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
									loading={loading}
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

export default FileManagement;

const LevelCheck = ({ item, permit, setPermit, i, levels }) => {
	let [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		let findUser = permit?.find(it => it?.isChecked && it?._id === item?._id);
		if (findUser) setIsChecked(true);
		else if (levels?.includes(item?._id)) {
			setIsChecked(true);
			setPermit(EditData(permit, { ...item, isChecked: true }));
		} else setIsChecked(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item, permit, levels]);

	return (
		<span className="me-3">
			<input
				type="checkbox"
				name={`level${i}`}
				id={`level${i}`}
				className="form-check-input form-check form-check-inline"
				checked={isChecked}
				onChange={e => {
					let newItem = item;
					if (e.target.checked) newItem = { ...newItem, isChecked: true };
					else
						newItem = {
							...newItem,
							isChecked: false,
						};
					setPermit(EditData(permit, newItem));
				}}
			/>
		</span>
	);
};

export const FileDocumentTable = ({ currentItems }) => {
	let navigate = useNavigate();
	return (
		<>
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="p-4">
							S/N
						</th>
						<th scope="col" className="px-6 py-3">
							Name
						</th>
						<th scope="col" className="px-6 py-3">
							Sharing
						</th>
						<th scope="col" className="px-6 py-3">
							Modified
						</th>
						<th scope="col" className="px-6 py-3">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{currentItems?.map((item, i) => (
						<tr
							className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
							key={i}>
							<td className="w-4 p-4">{i + 1}</td>
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
								<div className="flex items-center space-x-4">
									<span className="text-[#2A72A8]">
										<PiFolderNotchFill size={24} />
									</span>
									<div className="font-medium">
										<div>{item?.name}</div>
									</div>
								</div>
							</th>
							<td className="px-6 py-4">
								<span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-md">
									{item?.description || `Public`}
								</span>
							</td>
							<td className="px-6 py-4">
								{moment(item?.updatedAt).format("MMM Do, YYYY")}
							</td>
							<td className="px-6 py-4">
								<div
									className="cursor-pointer"
									onClick={() =>
										navigate(`/employee/file-management/${item?.name}`, {
											state: item?._id,
										})
									}>
									<SlOptionsVertical size={24} />
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};