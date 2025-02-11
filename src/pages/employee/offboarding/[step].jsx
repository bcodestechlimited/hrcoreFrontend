/* eslint-disable react/style-prop-object */
import { useState, useEffect } from "react";
import Avatar from "../../../components/avatar/avatar";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import Button from "../../../components/button/button";
import Input from "../../../components/input/input";
import ModalContainer, {
  SuccessModal,
} from "../../../components/modal-container/modal-container";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { manageResignation } from "../../../data/Reducers/ResignationReducer";

const Details = () => {
  const [reasonModal, setReasonModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const toggleReason = () => {
    setReasonModal(!reasonModal);
  };
  const toggleConfirm = () => {
    setConfirmModal(!confirmModal);
  };
  const toggleSuccess = () => {
    setShowSuccess(!showSuccess);
  };

  let location = useLocation(),
    [state, setState] = useState(null),
    [loading, setLoading] = useState(false),
    [submit, setSubmit] = useState(false),
    { resignation, company } = useSelector((state) => state),
    dispatch = useDispatch(),
    navigate = useNavigate();

  const handleSubmit = (status) => async (e) => {
    e?.preventDefault();
    console.log({ state }, "submit");
    if (!status) return;
    setLoading(status);

    await dispatch(
      manageResignation(
        "put",
        {
          ...state,
          status,
        },
        company?.currentSelected
      )
    );
    setLoading(false);
    setSubmit(true);
  };

  let reset = () => {
    setSubmit(false);
    navigate("/employee/offboarding");
  };

  useEffect(() => {
    if (resignation?.isAdded && submit) {
      reset();
    }
    if (resignation?.isUpdated && submit) {
      reset();
    }
    if (resignation?.isDeleted && submit) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    resignation?.isAdded,
    submit,
    resignation?.isUpdated,
    resignation?.isDeleted,
  ]);

  useEffect(() => {
    if (location?.state) {
      resignation?.all?.docs?.map(
        (it) => it?._id === location?.state && setState(it)
      );
    }
  }, [location?.state, resignation?.all?.docs]);

  if (!state) return;

  return (
    <div>
      <PreviewCancelRequest
        state={state}
        handleSubmit={handleSubmit}
        loading={loading}
      />

      {/* modals */}
      <ModalContainer
        close={toggleReason}
        show={reasonModal}
        width={"max-w-xs"}
      >
        <form>
          <Input
            label={"Reason for Ccancelation"}
            placeholder={"State Reason"}
          />
          <div className="flex justify-center mt-6">
            <Button
              buttonType={"primary"}
              title={"Next"}
              width={"w-fit"}
              onClick={() => {
                toggleReason();
                toggleConfirm();
              }}
            />
          </div>
        </form>
      </ModalContainer>

      <ModalContainer
        close={toggleConfirm}
        show={confirmModal}
        width={"max-w-xs"}
      >
        <form>
          <p className="text-center text-lg">
            Are you sure you want to cancel resignation? Action cannot be
            undone.
          </p>
          <div className="flex justify-center mt-6 gap-6">
            <Button
              buttonType={"primary"}
              title={"No"}
              width={"w-fit"}
              onClick={toggleConfirm}
            />
            <Button
              buttonType={"tetiary"}
              title={"Yes"}
              width={"w-fit"}
              onClick={() => {
                toggleConfirm();
                toggleSuccess();
              }}
            />
          </div>
        </form>
      </ModalContainer>
      <SuccessModal close={toggleSuccess} show={showSuccess} width={"max-w-xs"}>
        <div>
          <p className="text-xl text-center">Success!</p>
        </div>
      </SuccessModal>
    </div>
  );
};

export default Details;

export const PreviewCancelRequest = ({
  state,
  toggleReason,
  isCreateRequest,
  handleSubmit,
  loading,
}) => {
  // console.log({ state });
  let { auth } = useSelector((sta) => sta);
  return (
		<div class="block mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow max-w-4xl mx-auto">
			<div className="flex items-center justify-between">
				<Breadcrumb />
				<div className="flex">
					<Button
						buttonType={"second"}
						title={isCreateRequest ? "Cancel Resignation" : "Decline"}
						width={"w-fit me-3 text-main font-semibold"}
						type={"button"}
						loadCss={"#2A72A8"}
						onClick={
							!isCreateRequest
								? auth?.user?._id === state?.createdBy?._id
									? null
									: ["Pending"]?.includes(state?.status)
									? handleSubmit("Declined")
									: null
								: toggleReason
						}
						loading={!isCreateRequest ? loading === "Declined" : null}
					/>
					<Button
						buttonType={"primary"}
						title={isCreateRequest ? "Submit" : "Approve"}
						width={"w-fit"}
						type={"button"}
						loading={!isCreateRequest ? loading === "Approved" : loading}
						onClick={
							!isCreateRequest
								? auth?.user?._id === state?.createdBy?._id
									? null
									: ["Pending"]?.includes(state?.status)
									? handleSubmit("Approved")
									: null
								: handleSubmit
						}
					/>
				</div>
			</div>

			<div className="max-w-2xl mx-auto mt-20">
				<div className="flex gap-6">
					<Avatar
						lg
						img={
							state?.avatar ||
							state?.createdBy?.profile?.avatar ||
							state?.createdBy?.avatar
						}
					/>
					<div>
						<p className="text-xl font-semibold">
							{state?.createdBy?.profile?.lastName ||
								state?.createdBy?.lastName}{" "}
							{state?.createdBy?.profile?.firstName ||
								state?.createdBy?.firstName}
						</p>
						<p className="text-sm">
							<span className="font-semibold mb-2">Role:</span>{" "}
							{state?.createdBy?.profile?.role || state?.createdBy?.role}
						</p>
						<p className="text-sm">
							<span className="font-semibold mb-2">Email:</span>{" "}
							{state?.createdBy?.profile?.email || state?.createdBy?.email}
						</p>
						<p className="text-sm">
							<span className="font-semibold mb-2">Employee ID:</span>{" "}
							{state?.createdBy?.profile?.employeeId ||
								state?.createdBy?.employeeId}
						</p>
					</div>
				</div>

				<div className="mt-10">
					<div className="flex justify-between">
						<div>
							<p className="text-md font-medium">Last Working Day</p>
							<p className="text-gray-500 text-md font-medium">
								{moment(state?.lastWorkingDate).format("YYYY - MM - DD")}
							</p>
						</div>
						<div>
							<p className="text-md font-medium">Resignation Date</p>
							<p className="text-gray-500 text-md font-medium">
								{moment(state?.createdAt).format("YYYY - MM - DD")}
							</p>
						</div>
					</div>
					<div className="flex justify-between mt-8">
						<div>
							<p className="text-md font-medium">Department</p>
							<p className="text-gray-500 text-md font-medium">
								{state?.createdBy?.profile?.department?.name ||
									state?.createdBy?.department?.name}
							</p>
						</div>
						<div>
							<p className="text-md font-medium">Notice Period</p>
							<p className="text-gray-500 text-md font-medium">
								{moment(state?.lastWorkingDate).diff(
									moment(state?.createdAt),
									"days"
								) < 0
									? 0
									: moment(state?.lastWorkingDate).diff(
											moment(state?.createdAt),
											"days"
									  )}{" "}
								days
							</p>
						</div>
					</div>
				</div>
				<div className="mt-8 space-y-6">
					<Input
						label={"Reason For Resignation"}
						type={"text"}
						name="reason"
						readOnly
						value={state?.reason}
					/>
					<Input
						label={"Have You Returned all Your Work Tools"}
						placeholder={"No"}
						type="select"
						name="toolsReturned"
						readOnly
						value={state?.toolsReturned}
						options={[
							{
								name: "No, I have not",
								value: false,
							},
							{
								name: "Yes, I have",
								value: true,
							},
						]}
					/>
					<Input
						label={"Correspondence Address"}
						placeholder={"Current Address"}
						name="currentAddress"
						readOnly
						value={state?.currentAddress}
					/>
					<Input
						label={"Email Address"}
						type={"email"}
						name="personalEmail"
						readOnly
						value={state?.personalEmail}
					/>
					<Input
						label={"Phone Number"}
						type={"tel"}
						name="personalPhone"
						value={state?.personalPhone}
						readOnly
					/>
					<Input
						label={"How do you want your outstanding allowance to be paid?"}
						type={"text"}
						placeholder={"Lorep Ipsum"}
						name=""
						value={state?.personalPhone}
						readOnly
					/>
					<Input
						label={"Company Seconded to"}
						type={"text"}
						placeholder={"Lorep Ipsum"}
						name=""
						value={state?.personalPhone}
						readOnly
					/>
					<Input
						label={"Do you have any outstanding obligation?"}
						type={"text"}
						placeholder={"No"}
						name=""
						value={state?.personalPhone}
						readOnly
					/>
					<Input
						label={"Do you have any outstanding issues?"}
						type={"text"}
						placeholder={"No"}
						name=""
						value={state?.personalPhone}
						readOnly
					/>
					<Input
						label={
							"Have you submitted all the company’s properties in your care?"
						}
						type={"text"}
						placeholder={"No"}
						name=""
						value={state?.personalPhone}
						readOnly
					/>
					<div className="mb-10">
						<p className="block mb-2 text-sm font-medium text-gray-900">
							Signature
						</p>
						<input type="file" className="" />
					</div>
				</div>
			</div>
		</div>
	);
};
