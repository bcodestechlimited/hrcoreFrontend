import calender from "../../assets/calender.png";
import iconedit from "../../assets/iconedit.svg";
import carbon_view from "../../assets/carbon_view.svg";
import fluent_delete from "../../assets/fluent_delete-28-regular.svg";
import Button from "../../components/button/button";
import ModalContainer, { PageLoader } from "../../components/modal-container/modal-container";
import Input from "../../components/input/input";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Addbutton from "../../components/button/addbutton";
import { useDispatch, useSelector } from "react-redux";
import { LoadMore } from "../../components/pagination/pagination";
import { manageRequest } from "../../data/Reducers/RequestReducer";
import { GlobalState } from "../../data/Context";

const Request = () => {
	const [createRequest, setCreateRequest] = useState(false);
	const toggleCreateRequest = () => {
			setCreateRequest(!createRequest);
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
		{ request, company, auth } = useSelector(state => state),
		{canAdmin , canApprove}=useContext(GlobalState),
		dispatch = useDispatch();

	const handleSubmit = async e => {
		e?.preventDefault();
		if (!isDelete) if (!state?.name) return;
		setLoading(true);
		await dispatch(
			manageRequest(
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
		setCreateRequest(false);
		setIsDelete(false);
		setIsEdit(false);
		setState(init);
	};

	useEffect(() => {
		dispatch(manageRequest("get", null, company?.currentSelected));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (request?.isAdded && submit) {
			reset();
		}
		if (request?.isUpdated && submit) {
			reset();
		}
		if (request?.isDeleted && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [request?.isAdded, submit, request?.isUpdated, request?.isDeleted]);

	useEffect(() => {
		if (isEdit) {
			setCreateRequest(true);
			setState({ ...state, ...isEdit });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit]);

	let [data, setData] = useState(null);

	useEffect(() => {
		setData(request?.data);
	}, [request?.data]);

	if (!request?.data && !data) return <PageLoader />;
	if (!data) return;

	const handleLoadMore = async () => {
		setLoading("loadmore");
		await dispatch(
			manageRequest(
				"get",
				{ limit: data?.limit * data?.nextPage },
				company?.currentSelected
			)
		);
		setLoading(false);
	};

	return (
		<div className="xl:mx-10">
			<div className="flex justify-between mb-5">
				<p className="f font-bold text-base">All Request</p>
				{auth?.user?.isAdmin || canAdmin || canApprove ? (
					<Addbutton
						background={"bg-secondary"}
						text={"Add New"}
						add={true}
						onClick={() => setCreateRequest(true)}
					/>
				):null}
			</div>
			{/* <MainRanger range={range} setRange={setRange} /> */}

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
				{data?.docs.map((item, i) => (
					<div
						key={i}
						className="bg bg-white    w-full  2xl:w-[270px] rounded-xl py-5 h-[150px] shadow-xl p-4 cursor-pointer mb-5
">
						<div className=" flex justify-center items-center">
							<div className="text-center">
								<img src={calender} alt="" srcset="" className="block m-auto" />
								<p className=" text-base font-semibold  mt-3">{item?.name}</p>
							</div>
						</div>
						<div className="flex  justify-between mt-4">
							{auth?.user?.isAdmin || canAdmin || canApprove ? (
								<div
									className="flex items-center gap-1 cursor-pointer"
									onClick={() => setIsEdit(item)}>
									<img src={iconedit} alt="" className="block" />
									<span className=" font-normal text-xs">Edit</span>
								</div>
							):null}
							{/* 
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  // onClick={() => navigate("/request/" + item.link)}
                >
                  <img src={carbon_view} alt="" />
                  <span className=" font-normal text-xs">View</span>
                </div> */}

							<div>
								<Link
									to={`/request/${item._id}`}
									state={item}
									className="flex items-center gap-1 cursor-pointer">
									{/* Your component content */}

									<img src={carbon_view} alt="" />
									<span className=" font-normal text-xs">View</span>
								</Link>
							</div>

							{auth?.user?.isAdmin || canAdmin || canApprove ? (
								<div
									className="flex items-center gap-1 cursor-pointer "
									onClick={() => setIsDelete(item)}>
									<img src={fluent_delete} alt="" />
									<span className=" font-normal text-xs">Delete</span>
								</div>
							):null}
						</div>
					</div>
				))}
			</div>

			<div className="mt-4 flex justify-center">
				<LoadMore
					next={data?.hasNextPage}
					loading={loading === "loadmore"}
					handleLoadMore={handleLoadMore}
				/>
			</div>
			{/* <div className="mt-4 flex justify-center">
				<MainPaginate pageCount={pageCount} handlePageClick={handlePageClick} />
			</div> */}

			<ModalContainer
				title={isEdit ? `Edit ${isEdit?.name || ""}` : "Add Request"}
				show={createRequest}
				close={toggleCreateRequest}>
				<div className="mx-20">
					<form className="space-y-4">
						<Input
							label={"Request Name"}
							placeholder={"Enter Request Name"}
							value={state?.name}
							name="name"
							onChange={textChange}
						/>
						<Input
							label={"Request Details"}
							placeholder={"Enter Request Details"}
							type={"textarea"}
							value={state?.description}
							name="description"
							onChange={textChange}
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
				title={"Delete Request"}
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

export default Request;
