import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import Input from "../../components/input/input";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { returnErrors } from "../../data/Reducers/ErrorReducer";
import { managePerformance } from "../../data/Reducers/PerformanceReducer";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/button/button";
import { v4 } from "uuid";
import Logo2 from '../../assets/Cephas.png'

const AddEvaluation = () => {
	let init = {
			weight: "",
			self_score: "",
			manager_score: "",
			weighted_score: "",
			kpiname: "",
			kpiId: v4(),
		},
		[state, setState] = useState(null),
		item = useLocation()?.state,
		{ department, performance, position } = useSelector(s => s),
		dispatch = useDispatch(),
		textChange = e => {
			let { name, value } = e.target;
			setState({ ...state, [name]: value });
		},
		[step, setStep] = useState("0"),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[cloner, setCloner] = useState(null),
		navigate = useNavigate();
	const [kpi] = useState([init]);
	const [formInfo, setFormInfo] = useState([
		{ title: "", subTitle: kpi, queId: v4() },
	]);

	const addKpi = formIndex => {
		// setKpi([...kpi, {weight: "", self_score: "" , manager_score:'', weighted_score:''}]);
		const newForm = [...formInfo];
		newForm[formIndex].subTitle.push(init);
		setFormInfo(newForm);
	};

	const removeKpi = (formIndex, kpiIndex) => {
		// const newKpi = [...kpi];
		// newKpi.splice(index, 1);
		// setKpi(newKpi);
		console.log(formIndex, kpiIndex);
		const newForm = [...formInfo];
		newForm[formIndex].subTitle.splice(kpiIndex, 1);
		setFormInfo(newForm);
	};

	useEffect(() => {
		if (item) {
			setFormInfo(item?.sections);
			setStep("2");
			setState({
				...state,
				name: item?.name,
				reviewPeriod: item?.reviewPeriod,
				department: item?.department?._id,
				position: item?.position?._id,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item]);

	useEffect(() => {
		if (cloner && step === "2") {
			setFormInfo(cloner?.sections);
			setState({
				...state,
				name: cloner?.name,
				reviewPeriod: cloner?.reviewPeriod,
			});
			setCloner(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cloner, step]);

	const handleKpi = (event, formIndex, kpiIndex) => {
		const newInputs = [...formInfo];
		let { name, value } = event.target;
		// newInputs[formIndex].subTitle[kpiIndex][name] = value;
		let clonedObject = { ...newInputs[formIndex].subTitle[kpiIndex] };
		clonedObject = { ...clonedObject, [name]: value };

		let arr1 = [
			...newInputs[formIndex].subTitle?.map((it, i) =>
				i === kpiIndex ? clonedObject : it
			),
		];
		// if (formIndex >= 0 && formIndex < newInputs?.length && kpiIndex >= 0 && kpiIndex < newInputs[formIndex].subTitle?.length) {
		// Check if the subTitle array exists, and if not, initialize it
		// if (!newInputs[formIndex].subTitle) {
		//   newInputs[formIndex].subTitle = [];
		// }

		// // Check if the kpiname property exists, and if not, initialize it
		// if (!newInputs[formIndex].subTitle[kpiIndex]) {
		//   newInputs[formIndex].subTitle[kpiIndex] = {};
		// }

		// Set the value for the kpiname property
		let total3 = arr1?.reduce((ac, i) => (ac += Number(i?.weight || 0)), 0);
		// Update the state with the modified newInputs
		// setKpi(newInputs);
		let arr2 = [
			...newInputs?.map((it, i) =>
				i === formIndex
					? {
							...it,
							subTitle: arr1,
							weight: total3,
					  }
					: it
			),
		];
		setFormInfo(arr2);
		// }
	};
	const handleFormTitle = (event, formIndex) => {
		const newFormInput = [...formInfo];
		let { name, value } = event.target;
		newFormInput[formIndex][name] = value;
		setFormInfo(newFormInput);
	};

	const addForm = () => {
		setFormInfo([...formInfo, { title: "", subTitle: [init], queId: v4() }]);
	};
	const removeForm = formIndex => {
		console.log(formIndex);
		const newFormTitle = [...formInfo];
		newFormTitle.splice(formIndex, 1);
		setFormInfo(newFormTitle);
	};

	const handleSubmit = async event => {
		event.preventDefault();

		let errArr = [];

		if (formInfo?.length === 0) return toast.info("Questions required");

		// if (!state?.name)
		// 	errArr.push({
		// 		message: `Evaluation title is required`,
		// 		path: "title",
		// 	});
		if (!state?.reviewPeriod)
			errArr.push({
				message: `Evaluation review Period is required`,
				path: "reviewPeriod",
			});

		for (let e = 0; e < formInfo.length; e++) {
			let element = formInfo?.[e];
			if (!element?.title)
				errArr.push({
					message: `Question ${e + 1} is required`,
					path: "title",
				});
			if (!element?.subTitle)
				errArr.push({
					message: `Question ${e + 1} sub evaluation is required`,
					path: "subTitle",
				});
			if (element?.subTitle?.length === 0)
				errArr.push({
					message: `Question ${e + 1} sub evaluation is required`,
					path: "subTitle",
				});

			// console.log({ element });
			for (let o = 0; o < element?.subTitle.length; o++) {
				let elementOption = element?.subTitle?.[o];
				if (!elementOption?.kpiname)
					errArr.push({
						message: `Question ${e + 1} Sub Evaluation title ${
							o + 1
						} is required`,
						path: "title",
					});
				if (!elementOption?.weight)
					errArr.push({
						message: `Question ${e + 1} Sub Evaluation weight ${
							o + 1
						} is required`,
						path: "weight",
					});
			}
		}

		// console.log({ returnedData });
		if (errArr?.length > 0) return dispatch(returnErrors({ error: errArr }));

		console.log({ formInfo, state });
		// return;
		setLoading(true);
		let datum = {
			...state,
			active: true,
			sections: formInfo,
		};
		await dispatch(managePerformance(item ? "put" : "post", datum, item?._id));
		setLoading(false);
		setSubmit(true);
	};
	// console.log({ formInfo });
	let reset = () => {
		setState(null);
		setFormInfo([init]);
		setCloner(null);
		navigate("/performance");
	};

	useEffect(() => {
		if (performance?.isAdded && submit) {
			reset();
		}
		if (performance?.isUpdated && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [performance?.isAdded, submit, performance?.isUpdated]);
	return (
		<div className="relative bg-[#EFF6FC] min-h-[100vh]">
			{/* <div className="w-11/12 p-8 mx-auto mt-10 bg-white">
				<h1 className="text-base font-bold text-main text-center segoe uppercase">
					add evaluation
				</h1>
				<div className="">
					<form action="">
						<div className="w-11/12 mx-auto mt-12 grid grid-cols-2 gap-y-10 gap-8">
							<Myinput label={"Employee Name"} />
							<Myinput label={"given date"} />
							<Myinput label={"task given"} />
							<Myinput label={"date submitted"} />
							<Myinput label={"project"} />
							<Myinput label={"given by"} />
							<Myinput label={"department"} />
							<Myinput label={"date evaluated"} />
						</div>
						<div className="w-full mt-10">
							<h1 className="text-base font-bold text-main text-left segoe uppercase">
								ratings
							</h1>
							<div className="w-11/12 mx-auto mt-12 grid grid-cols-2 gap-y-10 gap-8">
								<MyselectInput label={"efficiency"} />
								<MyselectInput label={"Accuracy"} />
								<MyselectInput label={"Timeliness"} />
								<MyselectInput label={"excellence"} />
							</div>
							<div className="w-11/12 mx-auto mt-10">
								<p className="text-black text-sm font-normal manrope py-4 capitalize">
									remarks
								</p>
								<textarea
									name="remarks"
									id=""
									cols="30"
									rows="10"
									className="h-40 rounded-xl w-full border"></textarea>
							</div>
						</div>
						<div className="flex justify-center mt-10">
							<button className="bg-main h-12 w-24 rounded-lg text-white segoe text-base font-bold">
								Create
							</button>
						</div>
					</form>
				</div>
			</div> */}
			<div className="p-6">
				{step === "0" ? (
					<div className="bg-white py-3 px-5">
						<h2 className="text-xl manrope text-[#013468] font-semibold">
							Please select a department to continue
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5">
							{department?.all?.docs?.map((it, i) => (
								<div
									key={i}
									onClick={() => setState({ ...state, department: it?._id })}
									className={`bg    flex justify-center items-center  w-full  2xl:w-[270px] rounded-xl py-5 h-[132px] shadow-xl p-4 cursor-pointer mb-5 ${
										state?.department === it?._id ? "bg-[#EFF6FC]" : "bg-white"
									}`}>
									<div className=" text-center">
										{/* <img src={icon} alt="" srcset="" className="block m-auto" /> */}
										<p className=" text-base font-semibold  mt-3">{it?.name}</p>
									</div>
								</div>
							))}
						</div>
						<div className="flex justify-center items-center mt-5">
							<button
								type="button"
								onClick={() => {
									if (!state?.department)
										return toast.info("Please select a department to continue");
									setStep("1");
								}}
								className="text-white bg-[#2A72A8] border-none rounded py-2 px-4 font-bold">
								Next
							</button>
						</div>
					</div>
				) : step === "1" ? (
					<div className="bg-white py-3 px-5">
						<h2 className="text-xl manrope text-[#013468] font-semibold">
							Please select a position to continue
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5">
							{position?.all?.docs
								?.filter(item => {
									let dept = state?.department?._id || state?.department;

									return item?.name && dept === item?.department?._id;
								})
								?.map((it, i) => (
									<div
										key={i}
										onClick={() => setState({ ...state, position: it?._id })}
										className={`bg    flex justify-center items-center  w-full  2xl:w-[270px] rounded-xl py-5 h-[132px] shadow-xl p-4 cursor-pointer mb-5 ${
											state?.position === it?._id ? "bg-[#EFF6FC]" : "bg-white"
										}`}>
										<div className=" text-center">
											{/* <img src={icon} alt="" srcset="" className="block m-auto" /> */}
											<p className=" text-base font-semibold  mt-3">
												{it?.name}
											</p>
										</div>
									</div>
								))}
						</div>
						<div className="flex justify-center items-center mt-5">
							<div className="flex justify-center items-center gap-3">
								<button
									type="button"
									onClick={() => {
										if (!state?.position)
											return toast.info("Please select a position to continue");
										setStep("2");
									}}
									className="text-white bg-[#2A72A8] border-none rounded py-2 px-4 font-bold">
									Next
								</button>
								{performance?.all && performance?.all?.docs?.length > 0 && (
									<button
										type="button"
										onClick={() => {
											if (!state?.position)
												return toast.info(
													"Please select a position to continue"
												);
											setStep("3");
										}}
										className="text-white bg-[#2A72A8] border-none rounded py-2 px-4 font-bold">
										Clone
									</button>
								)}
							</div>
						</div>
					</div>
				) : step === "3" ? (
					<>
						<div className="bg-white py-3 px-5">
							<h2 className="text-xl manrope text-[#013468] font-semibold">
								Please select a performance to clone from
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5">
								{performance?.all?.docs
									?.filter(item => {
										return item?.name;
									})
									?.map((it, i) => (
										<div
											key={i}
											onClick={() => setCloner(it)}
											className={`bg    flex justify-center items-center  w-full  2xl:w-[270px] rounded-xl py-5 h-[132px] shadow-xl p-4 cursor-pointer mb-5 ${
												cloner?._id === it?._id ? "bg-[#EFF6FC]" : "bg-white"
											}`}>
											<div className=" text-center">
												{/* <img src={icon} alt="" srcset="" className="block m-auto" /> */}
												<p className=" text-base font-semibold  mt-3">
													{it?.name}
												</p>
											</div>
										</div>
									))}
							</div>
							<div className="flex justify-center items-center gap-3">
								<button
									type="button"
									onClick={() => {
										if (!cloner)
											return toast.info(
												"Please select a performance to continue"
											);
										setStep("2");
									}}
									className="text-white bg-[#2A72A8] border-none rounded py-2 px-4 font-bold">
									Next
								</button>
							</div>
						</div>
					</>
				) : (
					<form onSubmit={handleSubmit} className="bg-white py-3 px-5">
						<div className="mt-2 flex justify-between items-center">
							<img
								className="w-[200px] h-[115px]"
								src={
									process.env.REACT_APP_NAME
										? Logo2
										: require("../../assets/Logo FA 1.png")
								}
								alt=""
							/>
							<p className="font-bold text-xl">ICS OUTSOURCING</p>
						</div>
						<div
							className="pt-1 pb-3"
							style={{
								borderBottomColor: "#CCCCCC",
								borderBottomWidth: "2px",
								borderTopColor: "#CCCCCC",
								borderTopWidth: "2px",
							}}>
							<div className="flex justify-between">
								<p className="font-bold text-xl uppercase">
									EVALUATION for " "
									{
										position?.all?.docs?.find(it => it?._id === state?.position)
											?.name
									}
									" in{" "}
									{
										department?.all?.docs?.find(
											it => it?._id === state?.department
										)?.name
									}
									" department
								</p>
							</div>
							<PerformanceHeader state={state} textChange={textChange} />
						</div>
						{formInfo?.map((each, formIndex) => (
							<div key={formIndex} className="mt-8 shadow-md pl-4 pb-4">
								<div className=" flex justify-between">
									<div className="w-[80%]"></div>
									<div className="flex justify-evenly w-[20%]">
										<p className="font-bold text-xs">Weight(%)</p>
										{/* <p className="font-bold text-xs">Self score </p> */}
										{/* <p className="font-bold text-xs">Manager score</p> */}
										{/* <p className="font-bold text-xs">Weighted score</p> */}
									</div>
								</div>
								<div className="flex justify-between">
									<div className="w-[75%]">
										<div className="flex px-3 py-1 bg-[#F9FFFF] w-full font-bold items-center">
											<p className="mr-1">{formIndex + 1}.</p>
											<input
												type="text"
												name="title"
												onChange={event => handleFormTitle(event, formIndex)}
												className="border-none outline-none w-full"
												value={each?.title}
											/>
										</div>
									</div>
									<div className="flex justify-around w-[20%]">
										<input
											type="tel"
											name="weight"
											onChange={event => handleFormTitle(event, formIndex)}
											className="w-[75px] mt-1 border-[#CCCCCC] rounded-xl text-center"
											readOnly
											value={each?.weight}
										/>
										{/* <input
											type="text"
											name="titleSelf_score"
											onChange={event => handleFormTitle(event, formIndex)}
											className="w-[75px] mt-1 border-[#CCCCCC] rounded-xl"
										/>
										<input
											type="text"
											name="titleManager_score"
											onChange={event => handleFormTitle(event, formIndex)}
											className="w-[75px] mt-1 border-[#CCCCCC] rounded-xl"
										/>
										<input
											type="text"
											name="titleWeighted_score"
											onChange={event => handleFormTitle(event, formIndex)}
											className="w-[75px] mt-1 border-[#CCCCCC] rounded-xl"
										/> */}
									</div>
								</div>
								<div className="pl-5">
									{/* <p className="text-sm my-2">
										KEY PERFORMANCE INDICATOR (KPI)
									</p> */}
									<>
										{each.subTitle?.map((item, kpiIndex) => (
											<div key={kpiIndex} className="w-full my-1">
												<div className="flex justify-between">
													<div className="w-[75%] border rounded-xl">
														<div className="flex px-3 py-1 w-full font-bold items-center">
															<p className="mr-1">{kpiIndex + 1}.</p>
															<input
																type="text"
																name="kpiname" // Unique name attribute
																onChange={event =>
																	handleKpi(event, formIndex, kpiIndex)
																}
																className="border-none outline-none w-full"
																value={item?.kpiname}
															/>
														</div>
													</div>
													<div className="flex justify-around w-[20%]">
														<input
															type="tel"
															name="weight" // Unique name attribute
															onChange={event =>
																handleKpi(event, formIndex, kpiIndex)
															} // Call handleKpi when input changes
															className="w-[75px] mt-1 border-[#CCCCCC] rounded-xl text-center"
															value={item?.weight}
														/>
														{/* <input
															type="text"
															name="self_score" // Unique name attribute
															onChange={event =>
																handleKpi(event, formIndex, kpiIndex)
															} // Call handleKpi when input changes
															className="w-[75px] mt-1 border-[#CCCCCC] rounded-xl"
														/>
														<input
															type="text"
															name="manager_score" // Unique name attribute
															onChange={event =>
																handleKpi(event, formIndex, kpiIndex)
															} // Call handleKpi when input changes
															className="w-[75px] mt-1 border-[#CCCCCC] rounded-xl"
														/>
														<input
															type="text"
															name="weighted_score" // Unique name attribute
															onChange={event =>
																handleKpi(event, formIndex, kpiIndex)
															} // Call handleKpi when input changes
															className="w-[75px] mt-1 border-[#CCCCCC] rounded-xl"
														/> */}
													</div>
												</div>
												{each?.subTitle?.length > 1 && (
													<div className="flex justify-end my-1.5 w-[98%]">
														<button
															type="button"
															onClick={() => removeKpi(formIndex, kpiIndex)}
															className="bg-red-600 text-white w-[24px] font-bold rounded-full">
															-
														</button>
													</div>
												)}
											</div>
										))}
									</>

									<div className="flex justify-end w-[98%]">
										<button
											type="button"
											onClick={() => addKpi(formIndex)}
											className=" text-white bg-[#0681CD] w-[24px] rounded-full pb-[2px] font-bold">
											+
										</button>
									</div>
								</div>
								<div className="flex justify-end w-[98%] mt-4">
									<button
										type="button"
										onClick={() => removeForm(formIndex)}
										className=" text-white bg-red-600 p-2 flex justify-center items-center rounded-xl  font-bold">
										<AiFillDelete className="text-2xl" />
									</button>
								</div>
							</div>
						))}

						<div className="flex justify-end w-[98%] mt-4">
							<button
								onClick={addForm}
								type="button"
								className=" text-white bg-[#0681CD] text-3xl w-[35px] rounded-full pb-[2px] font-bold">
								+
							</button>
							{/* <button>submit</button> */}
						</div>

						<div className="flex justify-center items-center mt-5">
							{/* <button
								type="submit"
								className="text-white bg-[#2A72A8] border-none rounded py-2 px-4 font-bold">
								Create
							</button> */}
							<Button
								// buttonType={"primary"}
								title={item ? "Update" : "Create"}
								width={
									"text-white bg-[#2A72A8] border-none rounded py-2 px-4 font-bold"
								}
								type="submit"
								loading={loading}
								onClick={handleSubmit}
							/>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};
export const Myinput = ({ label, value, onChange }) => {
	return (
		<div className="flex gap-2 items-center">
			<p
				htmlFor={value}
				className="text-sm w-32 capitalize whitespace-nowrap font-normal text-[#1b1b1b] text-opacity-80 nunito">
				{label}
			</p>
			<input
				type="text"
				value={value}
				onChange={onChange}
				className="rounded-lg w-72 h-10 bg-white border ml-6 border-[#ccc]"
			/>
		</div>
	);
};
export const MyselectInput = ({ label, value, onChange, names }) => {
	return (
		<div>
			<div className="flex gap-2 items-center">
				<p
					htmlFor={value}
					className="text-sm w-32 capitalize whitespace-nowrap font-normal text-[#1b1b1b] text-opacity-80 nunito">
					{label}
				</p>
				<select
					name={names}
					className="rounded-lg w-72 h-10 bg-white border ml-6 border-[#ccc]">
					<option value="1"> 1</option>
					<option value="1"> 2</option>
					<option value="1"> 3</option>
					<option value="1"> 4</option>
					<option value="1"> 5</option>
				</select>
			</div>
		</div>
	);
};
export default AddEvaluation;

export const PerformanceHeader = ({ state, textChange }) => {
	return (
		<>
			<div className="w-full bg-white p-8 rounded-xl">
				<h2 className="text-xl manrope text-[#013468] font-semibold">
					Performance Header
				</h2>
				<div className="w-4/5 grid grid-cols-2 gap-6 mt-6">
					<Input
						name="name"
						label={"Title"}
						type={"text"}
						value={state?.name}
						onChange={textChange}
					/>
					<Input
						name="reviewPeriod"
						label={"Review Period"}
						type={"text"}
						value={state?.reviewPeriod}
						onChange={textChange}
					/>
				</div>
			</div>
		</>
	);
};
