import React, { useState, useEffect } from "react";
import "./birthday.css";
import moment from "moment";
import ModalContainer, {
	PageLoader,
} from "../../components/modal-container/modal-container";
// import Button from "../../components/button/button";
import Input from "../../components/input/input";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { returnErrors } from "../../data/Reducers/ErrorReducer";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AvatarImg } from "../../components/form-name/form-name";

const BirthdayPage = () => (
	<CelebrantsComponent event="birthMonth" picker="dateOfBirth" />
);

export default BirthdayPage;

export const CelebrantsComponent = ({
	event = "birthMonth",
	picker = "dateOfBirth",
}) => {
	let getData = async (company, data) => {
		try {
			let res = await axios.get(
				`/api/v1/user/users/${
					company || ""
				}?_populate=position&_populate=department&_populate=level
				&${event}=${moment(month ? `${month}-01` : moment())
					.format("MM")
					?.toLowerCase()}&_limit=0`
			);
			setData(res?.data?.data);
		} catch (err) {
			if (err) console.log({ error: err.response?.data, err });
			if (err?.response?.status === 429) toast.error(err?.response?.data);
			let error = err.response?.data?.error;
			if (error) {
				dispatch(returnErrors({ error, status: err?.response?.status }));
			} else {
				toast.error(err?.response?.data?.message);
			}
		}
	};

	let [month, setMonth] = useState(""),
		[isOpen, setIsOpen] = useState(null),
		[data, setData] = useState(null),
		{ company } = useSelector(st => st),
		dispatch = useDispatch();

	useEffect(() => {
		if (company?.currentSelected) getData(company?.currentSelected);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [company?.currentSelected, month]);
	// console.log({ data });
	if (!data) return <PageLoader />;

	return (
		<div className="relative bg-[#EFF6FC] min-h-[100vh] p-1">
			<div className="flex justify-between  mt-2 mb-2">
				<div className="flex">
					<p className="text-xl font-bold">
						{moment(month ? `${month}-01` : moment()).format("MMMM")} Celebrants
					</p>
					<img src={require("../../assets/party.png")} alt="Birthday" />
				</div>
				<div
					className="flex bg-[#EAECF0] px-1 rounded items-center cursor-pointer"
					onClick={() => setIsOpen(true)}>
					<img
						width="25px"
						height="18px"
						src={require("../../assets/Calendar.png")}
						alt="Birthday"
					/>
					<p className="ml-1 text-[#3B404D] text-base">
						{moment(month ? `${month}-01` : moment()).format("MMMM")}
					</p>
				</div>
			</div>

			<div className="bg-white py-3 px-3 grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4">
				{data?.docs?.map((each, index) => (
					<Link key={index} to={"/employee/profile"} state={each?._id}>
						<div className="birthdayCard px-5 py-3 mt-2">
							{each?.profile?.avatar || each?.avatar ? (
								<img
									width="150px"
									height="150px"
									src={
										each?.profile?.avatar ||
										each?.avatar ||
										require("../../assets/birthdayImg.png")
									}
									className="rounded-full"
									alt="Birthday"
								/>
							) : (
								<AvatarImg
									user={each}
									style={{ height: "6rem", width: "6rem" }}
								/>
							)}
							<p className="font-extrabold text-xl mt-3 capitalize text-center">
								{each?.lastName || each?.profile?.lastName}{" "}
								{each?.firstName || each?.profile?.firstName}
							</p>
							<p className="font-medium text-3x mt-1 text-center">
								{each?.department?.name || each?.profile?.department?.name}{" "}
							</p>
							{/* <p className="text-md mt-8">
								Employee ID: {each?.employeeId || each?.profile?.employeeId}
							</p> */}
							<p className="font-extrabold text-md mt-1 text-[#407BFF]">
								{each?.[picker] || each?.profile?.[picker]
									? moment(each?.[picker] || each?.profile?.[picker]).format(
											"Do MMMM"
									  )
									: null}
							</p>
						</div>
					</Link>
				))}
			</div>
			<ModalContainer
				title={"Select Month"}
				width={"max-w-sm"}
				show={isOpen ? true : false}
				close={() => setIsOpen(null)}>
				<div className="mx-20">
					<form className="space-y-4">
						<div className="my-auto w-100">
							<Input
								type="month"
								onChange={e => setMonth(e.target.value)}
								value={month}
							/>
							{/* <div className="pt-4 flex">
								<Button
									buttonType={"primary"}
									title={"Yes"}
									type="button"
									width={"w-fit me-2"}
									// loading={loading}
									// onClick={handleSubmit}
								/>
								<Button
									buttonType={"secondary"}
									title={"No"}
									type="button"
									width={"w-fit ms-2"}
									onClick={() => setIsOpen(null)}
								/>
							</div> */}
						</div>
					</form>
				</div>
			</ModalContainer>
		</div>
	);
};
