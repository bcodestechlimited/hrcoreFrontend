import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { manageResignation } from "../../../data/Reducers/ResignationReducer";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/input/input";
import moment from "moment";
import Button from "../../../components/button/button";
import { toast } from "react-toastify";
import { PreviewCancelRequest } from "./[step]";
import axios from "axios";
import { returnErrors } from "../../../data/Reducers/ErrorReducer";

const CreateRequest = () => {
  let init = {
      reason: "",
      lastWorkingDate: "",
      toolsReturned: false,
      currentAddress: "",
      personalEmail: "",
      personalPhone: "",
      relievingLetter: "",
    },
    [state, setState] = useState(init),
    textChange = (e) => {
      let { name, value } = e.target;
      setState({ ...state, [name]: value });
    },
    [loading, setLoading] = useState(false),
    [submit, setSubmit] = useState(false),
    { resignation, company, auth } = useSelector((state) => state),
    dispatch = useDispatch(),
    navigate = useNavigate(),
    [active, setActive] = useState(0);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!state?.reason) return;
    setLoading(true);
    try {
      console.log({ logo: state?.relievingLetter });
      var resImg = await axios.post(
        `/api/v1/file`,
        { mic: state?.relievingLetter },
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
        return dispatch(returnErrors({ error, status: err?.response?.status }));
      } else {
        setLoading(false);
        return toast.error(err?.response?.data?.message);
      }
    }
    await dispatch(
      manageResignation(
        "post",
        {
          ...state,
          relievingLetter: resImg?.data?.data?.files?.files?.[0]?.url,
        },
        company?.currentSelected
      )
    );
    setLoading(false);
    setSubmit(true);
  };

  let handleChangeImage = (name) => (e) => {
    const file = e.target.files[0];
    let err = "";

    if (!file) return (err = `File, ${file?.name} does not exist`);
    if (!file.type.includes("image"))
      return (err = `File, ${file?.name} format not supported`);

    if (err) {
      return toast.error(err);
    } else {
      setState({ ...state, [name]: file });
    }
  };

  let reset = () => {
    setSubmit(false);
    setState(init);
    navigate("/employee/offboarding");
    setActive(0);
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-md shadow px-10 py-4">
        <p className="text-2xl font-medium text-center">
          {active !== 0 ? `Preview` : `Create`} Resignation Request
        </p>
      </div>
      {active !== 0 ? (
        <PreviewCancelRequest
          handleSubmit={handleSubmit}
          state={{ ...state, createdBy: auth?.user }}
          isCreateRequest
          toggleReason={() => navigate("/employee/offboarding")}
          loading={loading}
        />
      ) : (
        <div className="bg-white rounded-md mt-12 shadow px-10 py-4">
          <form action="" className="mx-auto max-w-xl space-y-8">
            <Input
              label={"Full Name"}
              type={"text"}
              placeholder={"Enter Full Name"}
              name="full name"
              onChange={textChange}
              value={state?.reason}
            />
            <Input
              label={"Correspondence address after exit"}
              type={"text"}
              placeholder={"Enter Address"}
              name="adress"
              onChange={textChange}
              value={state?.reason}
            />
            <Input
              label={"Full Name"}
              type={"text"}
              placeholder={"Enter Full Name"}
              name="full-name"
              onChange={textChange}
              value={state?.reason}
            />
            <Input
              label={"Email Address"}
              type={"text"}
              placeholder={"Email Address"}
              name="Email Address"
              onChange={textChange}
              value={state?.reason}
            />
            <Input
              label={"Telephone Number"}
              type={"text"}
              placeholder={"Telephone Number"}
              name="Telephone nunmber"
              onChange={textChange}
              value={state?.reason}
            />
            <Input
              label={"Unit/Department"}
              type={"text"}
              placeholder={"which department do you belong to ?"}
              name="unit"
              onChange={textChange}
              value={state?.reason}
            />
            <Input
              label={"Reason For Exit"}
              type={"text"}
              placeholder={"why do you want to leave ?"}
              name="reason"
              onChange={textChange}
              value={state?.reason}
            />
            <Input
              label={"Reason For Exit"}
              type={"text"}
              placeholder={"why do you want to leave ?"}
              name="reason"
              onChange={textChange}
              value={state?.reason}
            />
            <Input
              label={"Date Employed"}
              type={"text"}
              placeholder={"dd-mm-yyyy"}
              name="date"
              onChange={textChange}
              value={state?.reason}
            />
            <Input
              label={"Exit Date"}
              type={"text"}
              placeholder={"dd-mm-yyyy"}
              name="text"
              onChange={textChange}
              value={state?.reason}
            />
            <Input
              label={"Company Seconded to"}
              type={"text"}
              placeholder={"Enter answer"}
              name="text"
              onChange={textChange}
              value={state?.reason}
            />
            <Input
              label={"How do you want your outstanding allwances to be paid"}
              type={"text"}
              placeholder={"Enter answer"}
              name="text"
              onChange={textChange}
              value={state?.reason}
            />
            <div>
              <p className="block mb-2 text-sm font-medium text-gray-900">
                Do you have any outstanding obligation?
              </p>
              <div className="flex gap-6">
                <div>
                  <input type="radio" name="obligation" value={"Yes"} />
                  <label htmlFor="Yes" className="pl-3">
                    Yes
                  </label>
                </div>
                <div>
                  <input type="radio" name="obligation" value={"No"} />
                  <label htmlFor="Yes" className="pl-3">
                    No
                  </label>
                </div>
              </div>
            </div>
            <Input
              label={"If yes state it"}
              type={"text"}
              placeholder={"Leave blank if answer to above question is no"}
              name="text"
              onChange={textChange}
              value={state?.reason}
            />
            <Input
              label={"How do you plan to repay ?"}
              type={"text"}
              placeholder={""}
              name="text"
              onChange={textChange}
              value={state?.reason}
            />
            <Input
              label={"How do you plan to repay ?"}
              type={"text"}
              placeholder={""}
              name="text"
              onChange={textChange}
              value={state?.reason}
            />
            <div>
              <p className="block mb-2 text-sm font-medium text-gray-900">
                Do you have any outstanding issues?
              </p>
              <div className="flex gap-6">
                <div>
                  <input type="radio" name="obligation" value={"Yes"} />
                  <label htmlFor="Yes" className="pl-3">
                    Yes
                  </label>
                </div>
                <div>
                  <input type="radio" name="obligation" value={"No"} />
                  <label htmlFor="Yes" className="pl-3">
                    No
                  </label>
                </div>
              </div>
            </div>
            <Input
              label={"To what extent has the issue been resolved??"}
              type={"text"}
              placeholder={"Leave blank if answer to above question is no"}
              name="text"
              onChange={textChange}
              value={state?.reason}
            />
            <Input
              label={"What is your plan about resolving the issue?"}
              type={"text"}
              placeholder={""}
              name="text"
              onChange={textChange}
              value={state?.reason}
            />
            <div>
              <p className="block mb-2 text-sm font-medium text-gray-900">
                Have you submitted all the company’s properties in your care?
              </p>
              <div className="flex gap-6">
                <div>
                  <input type="radio" name="obligation" value={"Yes"} />
                  <label htmlFor="Yes" className="pl-3">
                    Yes
                  </label>
                </div>
                <div>
                  <input type="radio" name="obligation" value={"No"} />
                  <label htmlFor="Yes" className="pl-3">
                    No
                  </label>
                </div>
              </div>
            </div>
            <div>
              <p className="block mb-2 text-sm font-medium text-gray-900">
                Signature
              </p>
              <input type="file" className="" />
            </div>
            <div className="flex justify-end">
              <div className="flex">
                <Button
                  buttonType={"second"}
                  title={"Cancel"}
                  width={"w-fit me-3 text-main font-semibold"}
                  type={"button"}
                  onClick={() => setState(init)}
                />
                <Button
                  buttonType={"primary"}
                  title={"Next"}
                  width={"w-fit"}
                  type={"button"}
                  loading={loading === "load"}
                  onClick={() => setActive(1)}
                />
              </div>
            </div>
          </form>
          {/* <form className="mx-auto max-w-xl space-y-8">
						<Input
							label={"Reason For Resignation"}
							type={"text"}
							name="reason"
							onChange={textChange}
							value={state?.reason}
						/>
						<Input
							label={"Last Working Day"}
							type={"date"}
							name="lastWorkingDate"
							onChange={textChange}
							value={state?.lastWorkingDate}
							min={moment().format("YYYY-MM-DD")}
						/>
						<Input
							label={"Have You Returned all Your Work Tools"}
							placeholder={"No"}
							type="select"
							name="toolsReturned"
							onChange={textChange}
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
							label={"Current Address"}
							placeholder={"Current Address"}
							name="currentAddress"
							onChange={textChange}
							value={state?.currentAddress}
						/>
						<Input
							label={"Personal Email"}
							type={"email"}
							name="personalEmail"
							onChange={textChange}
							value={state?.personalEmail}
						/>
						<Input
							label={"Personal Number"}
							type={"tel"}
							name="personalPhone"
							onChange={textChange}
							value={state?.personalPhone}
						/>
						<small className="block">Upload handwritten letter</small>
						<input
							title="Upload file"
							type="file"
							name="file"
							id="file"
							className="cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
							accept="image/*,.pdf"
							onChange={handleChangeImage("relievingLetter")}
						/>
						<div className="flex justify-end">
							<div className="flex">
								<Button
									buttonType={"second"}
									title={"Cancel"}
									width={"w-fit me-3 text-main font-semibold"}
									type={"button"}
									onClick={() => setState(init)}
								/>
								<Button
									buttonType={"primary"}
									title={"Next"}
									width={"w-fit"}
									type={"button"}
									loading={loading === "load"}
									onClick={() => setActive(1)}
								/>
							</div>
						</div>
					</form> */}
        </div>
      )}
    </div>
  );
};

export default CreateRequest;
