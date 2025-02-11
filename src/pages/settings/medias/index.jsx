import { useEffect, useState, useContext } from "react";

// import { useNavigate, Link } from "react-router-dom";

// import { SlOptionsVertical } from "react-icons/sl";
// import { BiFilterAlt } from "react-icons/bi";
// import { BsArrowDown, BsFillPlusSquareFill } from "react-icons/bs";

// import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import ManageSettingsTab from "../../../components/settings/manage_settings/manage_settings_tab";
// import Search from "../../../components/search/search";
// import Option from "../../../components/oprion/option";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../../components/pagination/pagination";
import ModalContainer, {
	PageLoader,
} from "../../../components/modal-container/modal-container";
import Input from "../../../components/input/input";
import Button from "../../../components/button/button";
// import DropDown from "../../../components/dropdown/dropdown";
// import { IconContext } from "react-icons";
// import ApprovalFlowTab from "../../../components/settings/approval_flow_component/approval-flow-tab";
import SettingTable from "../../../components/settings/setting_table";
import { useDispatch, useSelector } from "react-redux";
import { manageMedia } from "../../../data/Reducers/MediaReducer";
import Addbutton from "../../../components/button/addbutton";
import { toast } from "react-toastify";
import axios from "axios";
import { returnErrors } from "../../../data/Reducers/ErrorReducer";
import { GlobalState } from "../../../data/Context";

const Medias = () => {
	// const navigate = useNavigate();
	// const [gradename, setGradename] = useState("");
	// const [leaveData, setLeaveData] = useState([]);

	const header = [
		{
			id: 1,
			name: "S/N",
			case: "number_count",
		},
		{
			id: 2,
			name: "Media",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: "url",
			type: "image",
		},
		{
			id: 3,
			name: "Media Name",
			case: "CashApprovalFlows_CASH_CATEGORY",
			keyName: "name",
		},
		{
			id: 4,
			name: "Media Description",
			case: "CashApprovalFlows_CASH_CATEGORY",
		},
		{
			id: 5,
			name: "ACTION",
			case: "BUTTON",
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
	const [createmedia, setCreatemedia] = useState(false);
	const toggleCreateLeave = () => {
			setCreatemedia(!createmedia);
			if (isEdit) {
				setIsEdit(null);
				setState(init);
			}
		},
		init = {
			name: "",
			description: "",
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
		{ media, auth } = useSelector(state => state),
		{ canApprove, canAdmin } = useContext(GlobalState),
		dispatch = useDispatch();

	let [logo, setLogo] = useState(null);

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
		},
		handleSubmit = async e => {
			e?.preventDefault();
			if (!isDelete) if (!state?.name || !logo) return;
			setLoading(true);
			try {
				let resImg;
				if (!isDelete) {
					if (logo)
						resImg = await axios.post(
							`/api/v1/file`,
							{ mic: logo },
							{
								headers: {
									"Content-Type": "multipart/form-data",
								},
							}
						);
				}

				await dispatch(
					manageMedia(
						isDelete ? "delete" : isEdit ? "put" : "post",
						isDelete || {
							...state,
							url: !isEdit
								? resImg?.data?.data?.files?.files?.[0]?.url || ""
								: resImg?.data?.data?.files?.files?.[0]?.url ||
								  isEdit?.url ||
								  "",
						}
					)
				);
				setLoading(false);
				setSubmit(true);
			} catch (err) {
				setLoading(false);
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

	let reset = () => {
		setSubmit(false);
		setCreatemedia(false);
		setIsDelete(false);
		setIsEdit(false);
		setState(init);
	};

	useEffect(() => {
		dispatch(manageMedia("get", null));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (media?.isAdded && submit) {
			reset();
		}
		if (media?.isUpdated && submit) {
			reset();
		}
		if (media?.isDeleted && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [media?.isAdded, submit, media?.isUpdated, media?.isDeleted]);

	useEffect(() => {
		if (isEdit) {
			setCreatemedia(true);
			setState({ ...state, ...isEdit });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit]);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);
	useEffect(() => {
		setData(media?.data);
	}, [media?.data]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!media?.data && !data) return <PageLoader />;
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
				manageMedia("get", { limit: data?.limit * data?.nextPage })
			);
			setLoading(false);
		};

	return (
		<div>
			<div className="flex justify-between items-center w-full">
				<ManageSettingsTab name="Manage Medias" />
				<div className="">
					{auth?.user?.isAdmin || canAdmin || canApprove ? (
						<Addbutton
							background={"bg-secondary"}
							text={"Add Media"}
							add={true}
							onClick={() => setCreatemedia(true)}
						/>
					) : null}
				</div>
			</div>

			<div className=" shadow-md sm:rounded-lg mt-10">
				<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
					{/* <MainRanger range={range} setRange={setRange} /> */}
					<SettingTable
						data={currentItems || dataTable}
						header={header}
						// update={auth?.user?.isAdmin  || canAdmin || canApprove ? setIsEdit: null}
						remove={
							auth?.user?.isAdmin || canAdmin || canApprove ? setIsDelete : null
						}
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

			<ModalContainer
				title={isEdit ? `Edit ${isEdit?.name || ""}` : "Add Media"}
				show={createmedia}
				close={toggleCreateLeave}>
				<div className="mx-20">
					<form className="space-y-4">
						<Input
							label={"Media Name"}
							placeholder={"Enter Media Name"}
							value={state?.name}
							name="name"
							onChange={textChange}
						/>
						<Input
							label={"Media Description"}
							placeholder={"Enter Media Description"}
							type={"textarea"}
							value={state?.description}
							name="description"
							onChange={textChange}
						/>
						<input
							title="Upload file"
							type="file"
							name="file"
							id="file"
							className="cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
							accept="image/*"
							onChange={handleChangeImage}
						/>
						<div className="mt-8 flex  justify-center">
							<Button
								buttonType={"primary"}
								title={isEdit ? "Update" : "Create"}
								width={"w-fit"}
								type="submit"
								loading={loading}
								onClick={handleSubmit}
							/>
						</div>
					</form>
				</div>
			</ModalContainer>
			<ModalContainer
				title={"Delete Media"}
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

export default Medias;
