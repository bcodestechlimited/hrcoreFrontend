import { useEffect, useState, useContext } from "react";
import Button from "../../components/button/button";
import FormName from "../../components/form-name/form-name";
import ModalContainer from "../../components/modal-container/modal-container";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../components/pagination/pagination";
import Search from "../../components/search/search";
import Input from "../../components/input/input";
import { useDispatch, useSelector } from "react-redux";
import { manageTool } from "../../data/Reducers/ToolReducer";
// import { RenderStatusCell } from "../../components/settings/setting_table";
import axios from "axios";
import { toast } from "react-toastify";
import { returnErrors } from "../../data/Reducers/ErrorReducer";
import Option from "../../components/oprion/option";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IconContext } from "react-icons";
import Addbutton from "../../components/button/addbutton";
import { GlobalState } from "../../data/Context";

const AllTools = () => {
	const [createLeave, setCreateLeave] = useState(false);
	const toggleCreateLeave = () => {
			setCreateLeave(!createLeave);
			if (isEdit) {
				setIsEdit(null);
				setState(init);
			}
		},
		init = {
			name: "",
			details: "",
			assetId: "",
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
		{ tool, company, auth } = useSelector(state => state),
		dispatch = useDispatch(),
		[logo, setLogo] = useState(null),
		{ canAdmin, canApprove } = useContext(GlobalState);

	let handleChangeImage = e => {
		const file = e.target.files[0];
		let err = "";

		if (!file) return (err = `File, ${file?.name} does not exist`);
		if (!file.type.includes("image"))
			return (err = `File, ${file?.name} format not supported`);

		if (err) {
			return toast.error(err);
		} else {
			setLogo(file);
		}
	};

	const handleSubmit = async e => {
		e?.preventDefault();
		if (!isDelete) if (!state?.name) return;
		setLoading("load");
		if (!isDelete) {
			var newState = state;
			if (logo) {
				try {
					console.log({ logo });
					var resImg = await axios.post(
						`/api/v1/file`,
						{ mic: logo },
						{
							headers: {
								"Content-Type": "multipart/form-data",
							},
						}
					);
					console.log({ img: resImg?.data });
				} catch (err) {
					if (err?.response?.status === 429 || err?.response?.status === 405) {
						setLoading(false);
						return toast.error(
							err?.response?.data ? err?.response?.data : err?.message
						);
					}
					console.log({ err });
					let error = err.response?.data?.error;
					if (error) {
						setLoading(false);
						return dispatch(
							returnErrors({ error, status: err?.response?.status })
						);
					} else {
						setLoading(false);
						return toast.error(err?.response?.data?.message);
					}
				}
				newState = {
					...newState,
					imageUri: resImg?.data?.data?.files?.files?.[0]?.url,
				};
			}
		}
		await dispatch(
			manageTool(
				isDelete ? "delete" : isEdit ? "put" : "post",
				isDelete || newState || state,
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
		setLoading(null);
	};

	useEffect(() => {
		dispatch(manageTool("get", null, company?.currentSelected));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (tool?.isAdded && submit) {
			reset();
		}
		if (tool?.isUpdated && submit) {
			reset();
		}
		if (tool?.isDeleted && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tool?.isAdded, submit, tool?.isUpdated, tool?.isDeleted]);

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
		if (tool?.isFound) setData(tool?.mainSearch);
		else setData(tool?.data);
	}, [tool?.data, tool?.isFound, tool?.mainSearch]);

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
				manageTool(
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
			await dispatch(manageTool("get", { search }, company?.currentSelected));
			setLoading(false);
		};

	return (
		<div>
			<div className="flex items-center justify-between">
				<p className=" font-bold  text-base">ASSETS</p>
				{auth?.user?.isAdmin || canAdmin || canApprove ? (
					<Addbutton
						background={"bg-secondary"}
						create={true}
						text={"Add tools"}
						onClick={() => toggleCreateLeave()}
					/>
				) : null}
			</div>
			<div className=" shadow-md sm:rounded-lg mt-10">
				<div className="p-4 flex items-center justify-between">
					<select
						id="countries"
						class="bg-gray-50 w-40 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
						<option selected>Commands</option>
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
										<label for="checkbox-all-search" className="sr-only">
											checkbox
										</label>
									</div>
								</th>
								<th scope="col" className="px-6 py-3">
									Photo
								</th>
								<th scope="col" className="px-6 py-3">
									Tool Name
								</th>
								<th scope="col" className="px-6 py-3">
									Details
								</th>
								<th scope="col" className="px-6 py-3">
									Tool ID
								</th>
								<th scope="col" className="px-6 py-3">
									Tool Description
								</th>
								<th scope="col" className="px-6 py-3">
									Commands
								</th>
							</tr>
						</thead>
						<tbody>
							{currentItems?.map((ite, i) => (
								<tr key={i} className="bg-white border-b text-xs">
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
										<FormName item={{ ...ite, avatar: ite?.imageUri }} />
									</th>
									<td className="px-6 py-4">{ite?.name}</td>
									<td className="px-6 py-4">{ite?.details}</td>
									<td className="px-6 py-4">{ite?.assetId}</td>
									<td className="px-6 py-4">{ite?.description}</td>
									<td className="px-6 py-4">
										<Option type={"horizontal"}>
											<div className="flex gap-4">
												<IconContext.Provider value={{ color: "#2A72A8" }}>
													<AiFillEdit
														onClick={() => setIsEdit(ite)}
														size={20}
													/>
												</IconContext.Provider>
												<IconContext.Provider value={{ color: "red" }}>
													<AiFillDelete
														onClick={() => setIsDelete(ite)}
														size={20}
													/>
												</IconContext.Provider>
											</div>
										</Option>
										{/* <div className="px-2 py-1 rounded-lg flex gap-2">
											<RenderStatusCell
												status="Update"
												onClick={() => setIsEdit(ite)}
											/>
											<RenderStatusCell
												status="Delete"
												onClick={() => setIsDelete(ite)}
											/>
										</div> */}
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

			{/* modals */}
			<ModalContainer
				close={toggleCreateLeave}
				show={createLeave}
				title={isEdit ? `EDIT ${isEdit?.name || ""} ASSET` : "CREATE ASSET"}>
				<div className="mx-20">
					<form className="space-y-4">
						<Input
							label={"Asset Name"}
							placeholder={"Enter Asset Name"}
							value={state?.name}
							name="name"
							onChange={textChange}
						/>
						<Input
							label={"Asset Details"}
							placeholder={"Enter Details"}
							value={state?.details}
							name="details"
							onChange={textChange}
						/>
						<Input
							label={"Tool ID"}
							placeholder={"Tool ID"}
							type={"text"}
							value={state?.assetId}
							name="assetId"
							onChange={textChange}
						/>
						<input
							title="Upload file"
							type="file"
							name="file"
							id="file"
							className="cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
							accept="image/*,.pdf"
							onChange={handleChangeImage}
						/>
						<Input
							label={"Asset Description"}
							placeholder={"Enter Asset Description"}
							type={"textarea"}
							value={state?.description}
							name="description"
							onChange={textChange}
						/>
						<div className="mt-8 flex justify-center">
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
				title={"Delete Tool"}
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

export default AllTools;
