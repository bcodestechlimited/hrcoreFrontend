import { useState, useEffect } from "react";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import { useSelector, useDispatch } from "react-redux";
import { manageLeaveRequest } from "../../data/Reducers/LeaveReducer";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ApprovalList } from "./my-request";
import { BsArrowRightShort } from "react-icons/bs";
import { toast } from "react-toastify";

const CreateLeave = () => {
  let init = {
			leaveType: "",
			justification: "",
			days: "",
			startDate: "",
			endDate: "",
			reliever: "",
		},
		[state, setState] = useState(init),
		textChange = e => {
			let { name, value } = e.target;
			setState({ ...state, [name]: value });
		},
		navigate = useNavigate(),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		{ leaveRequest, company, staff, leaveType, auth, leaveFlow } = useSelector(
			state => state
		),
		dispatch = useDispatch(),
		[state2, setState2] = useState([]),
		[app, setApp] = useState({
			approver: "",
			level: "",
		});
	let [isEdit, setIsEdit] = useState(null),
		[active, setActive] = useState(0),
		[subActive, setSubActive] = useState(0),
		[isOpen, setIsOpen] = useState(null),
		[grader, setGrader] = useState(null);

	useEffect(() => {
		if (isEdit) {
			setApp({ ...app, ...isEdit });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit]);

	useEffect(() => {
		if (auth?.user) {
			let finder = auth?.user?.profile?.grade || auth?.user?.grade;
			if (finder) setGrader(finder?.noOfLeaveDays);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth?.user]);

	const handleSubmit = async e => {
		e?.preventDefault();
		if (
			!state?.leaveType ||
			!state?.justification ||
			!state?.endDate ||
			!state?.startDate ||
			!state?.reliever
		)
			return toast.info("Please fill all fields");
		let newS = state;
		delete newS?.days;
		if (state2?.length === 0) return toast.info("Please provider approver(s)");
		setLoading("load");
		await dispatch(
			manageLeaveRequest(
				"post",
				{ ...newS, approvers: state2?.map(i => i?.approver) },
				company?.currentSelected
			)
		);
		setLoading(false);
		setSubmit(true);
	};

	let reset = () => {
		setSubmit(false);
		setState(init);
		setState2([]);
		setIsEdit(null);
		setApp({ approver: "", level: "" });
		setActive(0);
		setSubActive(0);
		navigate("/leave/my-request");
	};

	useEffect(() => {
		if (leaveRequest?.isAdded && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		leaveRequest?.isAdded,
		submit,
		leaveRequest?.isUpdated,
		leaveRequest?.isDeleted,
	]);

	useEffect(() => {
		if (state?.startDate && state?.endDate) {
			setState({
				...state,
				days: moment(state?.endDate).diff(moment(state?.startDate), "days"),
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.endDate, state?.startDate]);

	let relieverArr = staff?.all?.docs ? [...staff?.all?.docs] : [];

	return (
		<div>
			<div className="max-w-4xl mx-auto">
				<div className="bg-white rounded-md shadow px-10 py-4">
					<p className="text-2xl font-medium text-center">
						Create Leave Request
					</p>
				</div>
				{grader && (
					<h2 className="text-2xl manrope text-[#013468] font-semibold text-right py-5">
						{grader} days applicable
					</h2>
				)}
				<div className="bg-white rounded-md mt-12 shadow px-10 py-4">
					<form className="mx-auto max-w-xl space-y-8">
						{subActive !== 0 ? (
							<ApprovalRequest
								state2={state2}
								setIsEdit={setIsEdit}
								isEdit={isEdit}
								active={active}
								isOpen={isOpen}
								app={app}
								setApp={setApp}
								setState2={setState2}
								setActive={setActive}
							/>
						) : (
							<>
								<Input
									label={"Leave Type"}
									type={"select"}
									name="leaveType"
									onChange={textChange}
									value={state?.leaveType}
									options={leaveType?.all?.docs?.filter(item => item?.name)}
								/>
								<Input
									label={"Start Date"}
									type={"date"}
									name="startDate"
									onChange={textChange}
									value={state?.startDate}
									min={moment().format("YYYY-MM-DD")}
								/>
								{state?.startDate && (
									<Input
										label={"End Date"}
										type={"date"}
										name="endDate"
										onChange={textChange}
										value={state?.endDate}
										min={moment(state?.startDate).format("YYYY-MM-DD")}
									/>
								)}
								<Input
									label={"Leave Days"}
									placeholder={"8 days"}
									name="days"
									onChange={textChange}
									value={state?.days}
									readOnly
								/>
								<Input
									label={"Justification"}
									placeholder={"Reason for leave"}
									name="justification"
									onChange={textChange}
									value={state?.justification}
								/>
								<Input
									label={"Choose Reliver"}
									type={"select"}
									name="reliever"
									onChange={textChange}
									value={state?.reliever}
									options={relieverArr
										?.sort((a, b) => {
											let nameA = a?.profile?.lastName || a?.lastName,
												nameB = b?.profile?.lastName || b?.lastName;
											var textA = nameA?.toUpperCase();
											var textB = nameB?.toUpperCase();
											return textA < textB ? -1 : textA > textB ? 1 : 0;
										})
										?.filter(
											item => item?._id && item?._id !== auth?.user?._id
										)}
								/>
							</>
						)}
						<div className="flex justify-end">
							<Button
								buttonType={"primary"}
								title={subActive === 0 ? "Next" : "Submit"}
								width={"w-fit"}
								type={subActive === 0 ? "button" : "submit"}
								loading={loading === "load"}
								onClick={
									subActive === 0
										? e => {
												e?.preventDefault();
												if (
													!state?.leaveType ||
													!state?.justification ||
													!state?.endDate ||
													!state?.startDate ||
													!state?.reliever
												)
													return toast.info("Please fill all fields");
												if (!auth?.user?.profile?.level && !auth?.user?.level) {
													toast.info(
														"Please update your profile level to proceed"
													);
													return;
												}
												let findFlow = leaveFlow?.all?.docs?.find(
													da =>
														da?.level?._id ===
															auth?.user?.profile?.level?._id ||
														da?.level?._id === auth?.user?.level?._id
												);
												if (!findFlow) {
													toast.info(
														"Level Leave flow could not be determined, please try again later"
													);
													return;
												}
												setIsOpen({
													type: "update",
													flow: findFlow,
												});
												setSubActive(1);
										  }
										: handleSubmit
								}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateLeave;

export const ApprovalRequest = ({
  state2,
  setIsEdit,
  isEdit,
  active,
  isOpen,
  app,
  setApp,
  setState2,
  setActive,
}) => {
  let { staff } = useSelector((state) => state);

  return (
    <>
      {state2?.length !== 0 && (
        <ApprovalList state={state2} setIsEdit={setIsEdit} />
      )}
      <form className="space-y-4">
        {isEdit || active !== isOpen?.flow?.approvers?.length ? (
          <Input
            type={"select"}
            value={app?.approver}
            onChange={(e) => setApp({ ...app, approver: e.target.value })}
            name="reliever"
            options={staff?.all?.docs?.filter((ite) => {
              let use =
                isEdit?.level?._id || isOpen?.flow?.approvers?.[active]?._id;

              return use === ite?.level?._id;
            })}
            label={`Select ${
              isEdit?.level?.name || isOpen?.flow?.approvers?.[active]?.name
            } Approver`}
          />
        ) : null}
        {isEdit || isOpen?.flow?.approvers?.length !== state2?.length ? (
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="h-10 px-4 border border-gray-500 rounded-md text-md capitalize flex items-center gap-2"
              onClick={() => {
                if (!app?.approver) return;
                let newA = {
                  ...app,
                  level: isEdit?.level || isOpen?.flow?.approvers?.[active],
                  user: staff?.all?.docs?.find(
                    (it) => it?._id === app?.approver
                  ),
                  case: isEdit ? isEdit?.case : active,
                };
                setApp(newA);
                setState2(
                  isEdit
                    ? [
                        ...state2?.map((ig) =>
                          ig?.case === isEdit?.case ? newA : ig
                        ),
                      ]
                    : [...state2, newA]
                );
                if (!isEdit)
                  if (isOpen?.flow?.approvers?.length !== active)
                    setActive(active + 1);
                setApp({ level: "", approver: "" });
                setIsEdit(null);
              }}
            >
              <span>
                <BsArrowRightShort />
              </span>
              Next{" "}
            </button>
          </div>
        ) : null}
      </form>
    </>
  );
};
