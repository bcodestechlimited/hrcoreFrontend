import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import Button from "../../../components/button/button";

import { PiUploadFill } from "react-icons/pi";
import FileCard from "../../../components/file-card/file-card";
import ModalContainer from "../../../components/modal-container/modal-container";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DeleteData, EditData } from "../../../data/Reducers/UserReducer";
import { toast } from "react-toastify";
import { returnErrors } from "../../../data/Reducers/ErrorReducer";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../../components/pagination/pagination";
import { GlobalState } from "../../../data/Context";

const FileName = () => {
	let location = useLocation(),
		[data, setData] = useState(null),
		dispatch = useDispatch(),
		[submit, setSubmit] = useState(false),
		manageFolderFiles = async (type, datum) => {
			try {
				let res;

				if (type === "get") {
					res = await axios.get(
						`/api/v1/file?ref=${location?.state}&_populate=refType${
							datum?.limit ? `&_limit=${datum?.limit}` : ""
						}${datum?.search ? `&_refType=${datum?.search}` : ""}`
					);
					console.log({ da: res?.data });
					setData(res?.data?.data || res?.data);
				}
				if (type === "post") {
					res = await axios.post(
						`/api/v1/file?ref=${location?.state}`,
						{
							...datum,
							ref: location?.state,
						},
						{
							headers: {
								"Content-Type": "multipart/form-data",
							},
						}
					);
					setData({
						...data,
						docs: [...data?.docs, res?.data?.data || res?.data],
					});
					manageFolderFiles("get", datum);
				}
				if (type === "put") {
					res = await axios.put(
						`/api/v1/file/${datum?._id}?ref=${location?.state}`,
						{
							...datum,
						}
					);
					setData({
						...data,
						docs: EditData(data?.docs, res?.data?.data || res?.data),
					});
					manageFolderFiles("get", datum);
				}
				if (type === "delete") {
					res = await axios.delete(
						`/api/v1/file/${datum?._id}?ref=${location?.state}`
					);
					setData({
						...data,
						docs: DeleteData(data?.docs, datum),
					});
				}
				if (type !== "get") {
					toast.success(res?.data?.message);
					setSubmit(true);
				}
			} catch (err) {
				if (err) console.log({ error: err.response?.data, err });
				if (err?.response?.status === 429) toast.error(err?.response?.data);
				if (type && type !== "get") {
					let error = err.response?.data?.error;
					if (error) {
						dispatch(returnErrors({ error, status: err?.response?.status }));
					} else {
						toast.error(err?.response?.data?.message);
					}
				}
			}
		},
		init = {
			refType: "Folder",
			file: null,
		},
		[state, setState] = useState(init),
		[loading, setLoading] = useState(false),
		{ step } = useParams(),
		navigate = useNavigate(),
		{ auth } = useSelector(state => state),
		{ canAdmin, canApprove } = useContext(GlobalState);

	const handleSubmit = async e => {
		e?.preventDefault();
		if (!state?.file) return;

		setLoading(true);
		await manageFolderFiles("post", { ...state, ref: location?.state });
		setLoading(false);
	};

	let reset = () => {
		setSubmit(false);
		setShowModal(false);
		setState(init);
	};

	useEffect(() => {
		if (submit) {
			reset();
		}
		if (submit) {
			reset();
		}
		if (submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit]);

	useEffect(() => {
		if (location?.state) {
			let getData = async () => {
				setLoading("getting");
				await manageFolderFiles("get", null);
				setLoading(null);
			};
			getData();
		} else setData(null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.state]);

	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => {
		setShowModal(!showModal);
	};

	let [range] = useState(10),
		[page, setPage] = useState(1);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;
	if (loading === "getting")
		return (
			<>
				<div className="flex justify-center items-center min-h-52">
					<PropagateLoader size={24} color="#2A72A8" />
				</div>
			</>
		);
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
			await manageFolderFiles("get", { limit: data?.limit * data?.nextPage });
			setLoading(false);
		},
		handleChangeImage = e => {
			const file = e.target.files[0];
			let err = "";

			if (!file) return (err = `File, ${file?.name} does not exist`);

			if (err) {
				return toast.error(err);
			} else {
				setState({ ...state, file });
			}
		};
	// console.log({ data });

	return (
		<div>
			<div>
				<Button
					title={step}
					width={"capitalize"}
					buttonType={"primary"}
					onClick={() => navigate(-1)}
				/>
			</div>

			<div class="block mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow">
				<div className="flex items-center justify-between">
					<Breadcrumb />
					{auth?.user?.isAdmin || canAdmin || canApprove ? (
						<Button
							buttonType={"primary"}
							title={"Add New"}
							icon={<PiUploadFill />}
							width={"w-fit"}
							onClick={toggleModal}
						/>
					) : null}
				</div>
				{/* <MainRanger range={range} setRange={setRange} /> */}
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
					{currentItems?.map((it, i) => (
						<FileCard key={i} item={it} linked />
					))}
				</div>
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
				close={toggleModal}
				show={showModal}
				title={`Add New File to ${step}`}>
				<div className="p-8 border-t">
					<form className="space-y-4">
						{/* <Input
							label={"File name"}
							name="name"
							onChange={textChange}
							value={state?.name}
						/> */}
						<input
							title="Upload file"
							type="file"
							name="file"
							id="file"
							className="cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
							accept="image/*,.pdf"
							onChange={handleChangeImage}
						/>
						<div className="flex justify-end mt-6">
							<Button
								buttonType={"primary"}
								title={"Create"}
								width={"w-fit"}
								type="submit"
								loading={loading}
								onClick={handleSubmit}
							/>
						</div>
					</form>
				</div>
			</ModalContainer>
		</div>
	);
};

export default FileName;
