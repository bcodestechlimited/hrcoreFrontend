// import Manage_settings_card from "../../components/settings/manage_settings/manage_settings_card";
// import { IconContext } from "react-icons";
// import icon5 from "../../../assets/icon5.png";
// import icon6 from "../../../assets/icon6.png";
import icon7 from "../../../assets/icon7.png";
import iconDelete1 from "../../../assets/iconDelete1.png";

import ApprovalFlowCard from "../../../components/settings/approval_flow_component/approval_flow_card";
import ManageSettingsTab from "../../../components/settings/manage_settings/manage_settings_tab";
// import { BsArrowDown, BsFillPlusSquareFill } from "react-icons/bs";
import ModalContainer from "../../../components/modal-container/modal-container";
import Input from "../../../components/input/input";
import { useEffect, useState, useContext } from "react";
import Button from "../../../components/button/button";
import Addbutton from "../../../components/button/addbutton";
import { useDispatch, useSelector } from "react-redux";
import { manageFlow } from "../../../data/Reducers/FlowReducer";
import { GlobalState } from "../../../data/Context";

// import { HiChevronRight } from "react-icons/hi";
// import ManageSettingsTab from "../../components/settings/manage_settings/manage_settings_tab";
const Approval_flow = () => {
  const [createFlow, setCreateFlow] = useState(false);
  const toggleCreateFlow = () => {
			setCreateFlow(!createFlow);
			if (isEdit) {
				setIsEdit(null);
				setState(init);
			}
		},
		init = {
			name: "",
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
		{ flow, company, auth } = useSelector(state => state),
		{canApprove, canAdmin}=useContext(GlobalState),
		dispatch = useDispatch();
	const handleSubmit = async e => {
		e?.preventDefault();
		if (!isDelete) if (!state?.name) return;
		setLoading(true);
		await dispatch(
			manageFlow(
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
		setCreateFlow(false);
		setIsDelete(false);
		setIsEdit(false);
		setState(init);
	};

	useEffect(() => {
		if (flow?.isAdded && submit) {
			reset();
		}
		if (flow?.isUpdated && submit) {
			reset();
		}
		if (flow?.isDeleted && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [flow?.isAdded, submit, flow?.isUpdated, flow?.isDeleted]);

	useEffect(() => {
		if (isEdit) {
			setCreateFlow(true);
			setState({ ...state, ...isEdit });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit]);

	let [data, setData] = useState(null);
	useEffect(() => {
		setData(flow?.data);
	}, [flow?.data]);

	return (
		<div className="xl:mx-10 ">
			<ManageSettingsTab name="Manage Approval Flows" />
			<div className="flex jus justify-end mb-5">
				{auth?.user?.isAdmin || canAdmin || canApprove ? (
					<Addbutton
						background={"bg-secondary"}
						text={"Add New Flow"}
						add={true}
						onClick={() => setCreateFlow(!createFlow)}
					/>
				):null}
				{/* <button
          onClick={() => setCreateFlow(!createFlow)}
          className="f font-medium text-xs bg-[#F72585] text-white rounded px-4 py-1"
        >
          Add New Flow
        </button> */}
			</div>

			{/* <div className=" flex flex-wrap  justify-between  gap-5  "> */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 xl:gap-10">
				<ApprovalFlowCard
					icon={icon7}
					title="Leave Flow"
					link="leave-approval-flows"
					// handleLink={""}
					// icon_2={iconDelete1}
				/>
				{/* <ApprovalFlowCard
					icon={icon6}
					title="Cash Flow"
					link="cash-approval-flows"
					icon_2={iconDelete1}
				/>
				<ApprovalFlowCard
					icon={icon6}
					title="Appraisal Flow"
					link="appraisal-approval-flows"
					icon_2={iconDelete1}
				/>
				<ApprovalFlowCard
					icon={icon6}
					title="Requisition Flow"
					link="requisition-approval-flows"
					icon_2={iconDelete1}
				/>
				<ApprovalFlowCard
					icon={icon5}
					title="ID Card Flow"
					link="id-card-approval-flows"
					icon_2={iconDelete1}
				/>

				<ApprovalFlowCard
					icon={icon5}
					title="ID Card Flow"
					link="leave-types"
					icon_2={iconDelete1}
				/>

				<ApprovalFlowCard
					icon={icon5}
					title="ID Card Flow"
					link="leave-types"
					icon_2={iconDelete1}
				/>

				<ApprovalFlowCard
					icon={icon5}
					title="ID Card Flow"
					link="leave-types"
					icon_2={iconDelete1}
				/> */}
				{data?.docs?.map((it, i) => (
					<ApprovalFlowCard
						icon={icon7}
						title={it?.name}
						link={it?.name}
						icon_2={iconDelete1}
						key={i}
						item={it}
						handleDelete={() => setIsDelete(it)}
					/>
				))}
			</div>

			<ModalContainer
				title={isEdit ? `Edit ${isEdit?.name || ""}` : "Create Flow"}
				show={createFlow}
				close={toggleCreateFlow}>
				<div className="px-6 py-4 overflow-y-auto ">
					<div className="popmodal__cover">
						<div className="popmodal__content ">
							<form>
								<div>
									<Input
										label={"Flow Name"}
										placeholder={"Flow Name"}
										value={state?.name}
										onChange={textChange}
										name="name"
									/>
								</div>
								<div className="mt-8 flex  justify-end">
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
					</div>
				</div>
			</ModalContainer>
			<ModalContainer
				title={"Delete Flow"}
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

export default Approval_flow;
