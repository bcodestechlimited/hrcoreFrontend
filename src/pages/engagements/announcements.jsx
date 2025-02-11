import { useContext, useEffect, useRef, useState } from "react";
import Badge from "../../components/badge/badge";
// import Comment from "../../components/comment/comment";
// import SocialReactions from "../../components/social-reactions/social-reactions";
import Button from "../../components/button/button";
// import CommentPost from "../../components/comment/comment-post";
import ModalContainer, {
	PageLoader,
} from "../../components/modal-container/modal-container";
import { HiOutlineGlobeAsiaAustralia } from "react-icons/hi2";
import {
	BsChevronDown,
	BsImage,
	// BsLink45Deg
} from "react-icons/bs";
// import { GoVideo } from "react-icons/go";
import { TfiTarget } from "react-icons/tfi";
import Input from "../../components/input/input";
import { useDispatch, useSelector } from "react-redux";
import { manageAnnouncement } from "../../data/Reducers/AnnoucementReducer";
import { DateReturned } from "../notifications";
import { toast } from "react-toastify";
import homeimage from "../../assets/homeimage.png";
import { ActionButton } from "../finance/invoice-setting";
import { BiTrashAlt } from "react-icons/bi";
import { GlobalState } from "../../data/Context";

const Announcements = () => {
	// const [comments, setComments] = useState(true);
	const [post, setPost] = useState(false);
	const [targetGroup, setTargetGroup] = useState(false);
	const [privilege, setPrivilege] = useState(false);

	let { announcement, department, auth } = useSelector(state => state),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[files, setFiles] = useState(null),
		init = {
			title: "",
			description: "",
		},
		[state, setState] = useState(init),
		[data, setData] = useState(null),
		dispatch = useDispatch(),
		textChange = e => {
			let { name, value } = e?.target;
			setState({ ...state, [name]: value });
		},
		fileInputRef = useRef(),
		[isUpdate, setIsUpdate] = useState(null),
		{ canApprove, canAdmin } = useContext(GlobalState),
		[isDelete, setIsDelete] = useState(null);
	const handleSubmit = async e => {
		e?.preventDefault();
		if (!isDelete) if (!state?.title || !state?.description) return;
		setLoading(true);
		await dispatch(
			manageAnnouncement(
				isDelete ? "delete" : isUpdate ? "put" : "post",
				isDelete || { ...state, files }
			)
		);
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (isUpdate) {
			setState({ ...isUpdate });
			setFiles(isUpdate?.files);
			setPost(true);
		}
	}, [isUpdate]);

	const togglePrivilege = () => {
		setPrivilege(!privilege);
	};

	const toggleTargetGroup = () => {
		setTargetGroup(!targetGroup);
	};

	const togglePost = () => {
		setPost(!post);
	};

	let reset = () => {
		setSubmit(false);
		setState(init);
		setFiles(null);
		setPost(false);
		setIsDelete(null);
		setIsUpdate(null);
	};

	useEffect(() => {
		setData(announcement?.data);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [announcement?.data]);

	useEffect(() => {
		if (announcement?.isAdded && submit) {
			reset();
		}
		if (announcement?.isDeleted && submit) {
			reset();
		}
		if (announcement?.isUpdated && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		announcement?.isAdded,
		submit,
		announcement?.isUpdated,
		announcement?.isDeleted,
	]);

	let handleChangeImage = e => {
		const newfiles = [...e.target.files];
		let err = "",
			newImages = [];

		newfiles.forEach(file => {
			if (!file) return (err = `File, ${file?.name} does not exist`);
			if (!file.type.includes("image"))
				return (err = `File, ${file?.name} format not supported`);

			return newImages.push(file);
		});
		if (err) {
			return toast.error(err);
		} else {
			if (isUpdate) {
				// console.log({
				// 	files,
				// 	isUpdate: isUpdate?.files,
				// 	filer: files?.filter(it => it?._id),
				// 	newImages,
				// });
				setFiles([...newImages, ...files?.filter(it => it?._id)]);
			} else setFiles([...newImages]);
		}
	};

	if (!announcement?.data && !data) return <PageLoader />;
	if (!data) return;

	return (
		<div>
			<div className="max-w-2xl mx-auto">
				{auth?.user?.isAdmin || canAdmin || canApprove ? (
					<div className="bg-white rounded-md shadow px-10 py-4 flex items-center gap-8">
						<div>
							<div className="w-14 h-14 rounded-full bg-gray-200 cursor-pointer"></div>
						</div>
						<div
							className="border rounded-xl p-4 hover:bg-gray-50 cursor-pointer w-full"
							onClick={togglePost}>
							start post
						</div>
					</div>
				) : null}
				{data?.docs?.map((item, i) => (
					<div
						className="mt-8 bg-white  rounded-md shadow p-4"
						key={i}
						id={item?._id}>
						<div className="flex justify-between">
							<div className="flex items-center gap-2">
								<p className="text-sm">
									posted by:{" "}
									{item?.createdBy?.lastName ||
										item?.createdBy?.profile?.lastName ||
										"Admin"}{" "}
									{item?.createdBy?.firstName ||
										item?.createdBy?.profile?.firstName}
								</p>{" "}
								<Badge title={"Public"} />
							</div>
							<div>
								<p className="text-sm flex gap-2 items-center">
									<DateReturned item={item} />
									{auth?.user?.isAdmin || canAdmin || canApprove ? (
										<ActionButton
											each={item}
											update={setIsUpdate}
											remove={setIsDelete}
										/>
									) : null}
								</p>
							</div>
						</div>
						{item?.files?.length > 0 && (
							<div className="h-80 bg-gray-200 rounded-md mt-4">
								<ImageChange item={item?.files} />
							</div>
						)}
						<div className="mt-4">
							<article>
								<h1 className="text-2xl font-semibold mb-2">{item?.title}</h1>
								<p className="text-sm">{item?.description}</p>
							</article>
							{/* <div className="mt-4 flex justify-between items-center">
							<SocialReactions />
							<Comment />
						</div> */}
							{/* {comments && (
							<div>
								<div className="mt-4 p-4 border-t border-gray-300">
									<div className="flex gap-x-4">
										<div>
											<div className="w-12 h-12 rounded-full bg-gray-200 cursor-pointer border border-gray-300"></div>
										</div>
										<div className="w-full">
											<textarea
												placeholder="Write a comment"
												rows={1}
												className="border rounded-xl border-gray-300 p-4 bg-gray-200 cursor-pointer w-full"></textarea>
											<div className="mt-4">
												<Button
													buttonType={"primary"}
													title={"Post"}
													width={"w-fit"}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="mt-4 p-4 border-t border-gray-300">
									<p className="text-lg font-semibold">Comment</p>
									<div className="space-y-4">
										<CommentPost />
										<CommentPost />
									</div>
								</div>
							</div>
						)} */}
						</div>
					</div>
				))}
			</div>
			<ModalContainer
				title={isUpdate ? "Update Post" : "Create Post"}
				show={post}
				close={togglePost}>
				<div>
					<div className="flex gap-4">
						<div>
							<div className="w-12 h-12 rounded-full bg-gray-200 cursor-pointer"></div>
						</div>
						<div className="">
							<p className="font-semibold">Admin Name</p>
							<Badge
								title={"Public"}
								icon={<HiOutlineGlobeAsiaAustralia />}
								icon2={<BsChevronDown />}
								// handleClick={togglePrivilege}
							/>
						</div>
					</div>
					<form className="mt-8">
						<div className="space-y-4">
							<Input
								placeholder={"Write the subject matter of post"}
								label={"Post Title"}
								name="title"
								value={state?.title}
								onChange={textChange}
							/>
							<Input
								placeholder={"Write the subject matter of post"}
								label={"Post Body"}
								type={"textarea"}
								name="description"
								value={state?.description}
								onChange={textChange}
							/>
							{files?.length > 0 && (
								<>
									{files?.map((it, i) => (
										<div
											className="flex items-center justify-between px-2"
											key={i}>
											<p>{it?.name}</p>
											<BiTrashAlt
												className="cursor-pointer"
												onClick={() => {
													setFiles(prevRows => {
														const newRows = [...prevRows];
														newRows.splice(i, 1);
														return newRows;
													});
												}}
											/>
										</div>
									))}
								</>
							)}
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<div>
										<input
											ref={fileInputRef}
											type="file"
											accept="image/*"
											style={{ display: "none" }}
											onChange={handleChangeImage}
											name="image"
											multiple
										/>
										<div
											onClick={() => fileInputRef.current.click()}
											className="flex items-center text-blue-900 gap-2 cursor-pointer">
											<BsImage />
											Image
										</div>
									</div>
									{/* <div className="flex items-center text-blue-900 gap-2">
										<GoVideo />
										Image
									</div>
									<div className="flex items-center text-blue-900 gap-2">
										<BsLink45Deg />
										Link
									</div> */}
								</div>
								<Button
									title={isUpdate ? "Update" : "Post"}
									buttonType={"primary"}
									width={"w-fit"}
									loading={loading}
									onClick={handleSubmit}
								/>
							</div>
						</div>
					</form>
				</div>
			</ModalContainer>
			<ModalContainer
				title={"Who can see your post?"}
				show={privilege}
				close={togglePrivilege}>
				<div className="space-y-4">
					<div className="flex justify-between items-center">
						<div className="flex gap-2 items-center">
							<HiOutlineGlobeAsiaAustralia size={24} />
							<div>
								<p className="text-lg">Public</p>
								<p className="text-xs">
									post will be shared to all grade levels
								</p>
							</div>
						</div>
						<div className="flex items-center mb-4">
							<input
								type="radio"
								value=""
								name="default-radio"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
							/>
						</div>
					</div>
					<div className="flex justify-between items-center">
						<div className="flex gap-2 items-center">
							<TfiTarget size={24} />
							<div>
								<p className="text-lg">Targeted Group</p>
								<p className="text-xs">
									post will be shared to all grade levels
								</p>
							</div>
						</div>
						<div className="flex items-center mb-4">
							<input
								type="radio"
								value=""
								name="default-radio"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
								onClick={toggleTargetGroup}
							/>
						</div>
					</div>
					<div className="flex items-center justify-end gap-8">
						<Button
							buttonType={"primaryOutline"}
							title={"Back"}
							width={"w-fit"}
						/>
						<Button buttonType={"primary"} title={"Continue"} width={"w-fit"} />
					</div>
				</div>
			</ModalContainer>
			<ModalContainer
				title={"Who can see your post"}
				show={targetGroup}
				close={toggleTargetGroup}>
				<div className="grid grid-cols-2 gap-4 border-t pt-8">
					{department?.all?.docs?.map((item, i) => (
						<SelectAudience title={item?.name} key={i} />
					))}
					{/* <SelectAudience title={"Management"} />
					<SelectAudience title={"Junior Staff"} />
					<SelectAudience title={"Mid Level"} />
					<SelectAudience title={"Senior Officer 2"} />
					<SelectAudience title={"Senior Officer 4"} />
					<SelectAudience title={"Senior Officer 8"} />
					<SelectAudience title={"Management"} />
					<SelectAudience title={"Junior Staff"} />
					<SelectAudience title={"Mid Level"} />
					<SelectAudience title={"Senior Officer 2"} />
					<SelectAudience title={"Senior Officer 4"} />
					<SelectAudience title={"Senior Officer 8"} /> */}
					<div className="flex items-center justify-end gap-8 col-span-2">
						<Button
							buttonType={"primaryOutline"}
							title={"Back"}
							width={"w-fit"}
						/>
						<Button buttonType={"primary"} title={"Continue"} width={"w-fit"} />
					</div>
				</div>
			</ModalContainer>
			<ModalContainer
				title={`Delete Announcement
				`}
				width={"max-w-sm"}
				show={isDelete ? true : false}
				close={() => setIsDelete(null)}>
				<div className="mx-20">
					<form className="space-y-4">
						<div className="my-auto w-100">
							<p className="text2 Lexend text-center">
								Do you want to delete {isDelete?.title}?
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

export default Announcements;

export const SelectAudience = ({ title }) => {
	return (
		<div className="flex items-center mb-4">
			<input
				id="default-checkbox"
				type="checkbox"
				value=""
				className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
			/>
			<label
				for="default-checkbox"
				className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
				{title}
			</label>
		</div>
	);
};

export let ImageChange = ({ item }) => {
	let [count, setCount] = useState(0);
	useEffect(() => {
		if (item && item?.length > 0) {
			const next = (count + 1) % item?.length;
			const id = setTimeout(() => setCount(next), 10000);
			return () => clearTimeout(id);
		}
	}, [item, count]);
	return (
		<img
			src={item?.length > 0 ? item?.[count]?.url : homeimage}
			alt="Home Banner"
			className="h-full w-full max-h-96 ease-in-out"
		/>
	);
};
