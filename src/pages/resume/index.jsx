import React, { useEffect, useState } from "react";
import Photo from "../../assets/avatar3.png";
import Download from "../../assets/download.svg";
// import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { AvatarImg } from "../../components/form-name/form-name";

const Resume = () => {
	let { staff } = useSelector(state => state),
		location = useLocation(),
		[state, setState] = useState(null),
		resumeRef = useRef();

	const generatePDF = useReactToPrint({
		content: () => resumeRef.current,
	});

	useEffect(() => {
		if (location?.state) {
			staff?.all?.docs?.map(it => it?._id === location?.state && setState(it));
		}
	}, [location?.state, staff?.all?.docs]);

	if (!state) return;

	// const resume = new jsPDF("portrait", "mm", "a4");
	// resume.html(document.querySelector("#resume")).then(() => {
	//   resume.save(`${state?.lastName} ${state?.firstName} Resume.pdf`);
	// });
	return (
		<div>
			<div>
				<div
					ref={resumeRef}
					id="resume"
					className="py-10 px-6 w-full bg-white flex gap-2 relative">
					<div className="w-[30%]">
						{state?.profile?.avatar || state?.avatar ? (
							<img
								src={state?.avatar || state?.profile?.avatar || Photo}
								alt=""
								className="border-secondary border-[10px] rounded-full h-56 w-56"
							/>
						) : (
							<AvatarImg
								user={state?.profile || state}
								style={{ height: "10rem", width: "10rem" }}
							/>
						)}
						<div className="mt-16">
							<h2 className="text-xl text-secondary font-semibold manrope uppercase">
								basic information
							</h2>
							<ul className="list-none space-y-2 mt-4">
								<li className="text-sm font-medium manrope text-[#1b1b1b] capitalize">
									Date Of Birth:{" "}
									{state?.dateOfBirth ? moment().format("Do MMMM") : null}{" "}
								</li>
								<li className="text-sm font-medium manrope text-[#1b1b1b] capitalize">
									Gender: {state?.gender}{" "}
								</li>
								<li className="text-sm font-medium manrope text-[#1b1b1b] capitalize">
									Marital Status: {state?.maritalStatus}{" "}
								</li>
								<li className="text-sm font-medium manrope text-[#1b1b1b] capitalize">
									State of Origin: {state?.stateOfOrigin}{" "}
								</li>
								<li className="text-sm font-medium manrope text-[#1b1b1b] capitalize">
									LGA of Origin: {state?.lgaOfOrigin}{" "}
								</li>
								<li className="text-sm font-medium manrope text-[#1b1b1b] capitalize">
									State of Residence: {state?.stateOfResidence}{" "}
								</li>
							</ul>
						</div>
						<div className="mt-12">
							<h2 className="text-xl text-secondary font-semibold manrope uppercase">
								contacts
							</h2>
							<ul className="mt-4 list-none space-y-2">
								<li className="text-sm font-medium manrope text-[#1b1b1b]">
									Phone number: {state?.phone}{" "}
								</li>
								<li className="text-sm font-medium manrope text-[#1b1b1b]">
									Email address: {state?.email}
								</li>
							</ul>
						</div>
					</div>
					<div className="w-[70%] mt-8">
						<h1 className="text-3xl manrope font-semibold text-black uppercase">
							{state?.firstName} {state?.lastName}
						</h1>
						<div className="mt-3 space-y-2">
							<p className="manrope text-sm text-black font-semibold">
								Position:{" "}
								<span className="font-light">{state?.position?.name}</span>
							</p>
							<p className="manrope text-sm text-black font-semibold">
								Department:{" "}
								<span className="font-light">{state?.department?.name}</span>
							</p>
							<p className="manrope text-sm text-black font-semibold">
								Level: <span className="font-light">{state?.level?.name}</span>
							</p>
							<p className="manrope text-sm text-black font-semibold">
								Grade: <span className="font-light">{state?.grade?.name}</span>
							</p>
							<p className="manrope text-sm text-black font-semibold">
								Email: <span className="font-light">{state?.email}</span>
							</p>
							<p className="manrope text-sm text-black font-semibold">
								Employee ID:{" "}
								<span className="font-light">{state?.employeeId}</span>
							</p>
							<p className="manrope text-sm text-black font-semibold">
								Probation:{" "}
								<span className="font-light">
									{state?.profile?.probationPeriod || state?.probationPeriod
										? `${moment(
												state?.profile?.probationPeriod ||
													state?.probationPeriod
										  ).diff(state?.createdAt, "days")} days`
										: null}{" "}
									/{" "}
									{state?.profile?.probationPeriod || state?.probationPeriod
										? moment(
												state?.profile?.probationPeriod ||
													state?.probationPeriod
										  ).format("MMMM DD, YYYY")
										: null}
								</span>
							</p>
						</div>
						<div className="mt-8">
							<h2 className="text-xl text-secondary font-semibold manrope uppercase">
								education
							</h2>
							{state?.education?.map((it, a) => (
								<div className="mt-6 space-y-2">
									<p className="inter text-sm text-[#1b1b1b] font-semibold">
										{it?.institution},{" "}
										{moment(it?.startDate, "year").format("YYYY")} -{" "}
										{moment(it?.endDate, "year").format("YYYY")}
									</p>
									<p className="font-normal text-sm text-[#1b1b1bcc] inter">
										{it?.courseOfStudy} ({it?.qualification})
									</p>
									<p className="font-normal text-sm text-[#1b1b1bcc] inter">
										{state?.cgpa ? `CGPA: ${state?.cgpa}` : ""}
									</p>
								</div>
							))}
						</div>
						<div className="mt-8">
							<h2 className="text-xl text-secondary font-semibold manrope uppercase">
								employment history
							</h2>
							{state?.experience?.map((it, s) => (
								<div className="" key={s}>
									<p className="text-base font-bold text-[#1b1b1bcc] inter pt-2">
										{it?.company} {moment(it?.startDate, "year").format("YYYY")}{" "}
										- {moment(it?.endDate, "year").format("YYYY")} |{" "}
										{it?.position}
									</p>
									{/* <ul className="list-disc space-y-2 list-inside mt-2">
								<li className="font-normal text-sm text-[#1b1b1bcc] inter">
									Lorem ipsum dolor sit amet
								</li>
								<li className="font-normal text-sm text-[#1b1b1bcc] inter">
									Lorem ipsum dolor sit amet
								</li>
								<li className="font-normal text-sm text-[#1b1b1bcc] inter">
									Lorem ipsum dolor sit amet
								</li>
								<li className="font-normal text-sm text-[#1b1b1bcc] inter">
									Lorem ipsum dolor sit amet
								</li>
							</ul> */}
								</div>
							))}
						</div>
						<div className="mt-6">
							<h2 className="text-xl text-secondary font-semibold manrope uppercase">
								SKILLS & EXPERTISE
							</h2>
							{/* <ul className="list-disc space-y-2 list-inside mt-2">
								<li className="font-normal text-sm text-[#1b1b1bcc] inter">
									Human Resource management
								</li>
								<li className="font-normal text-sm text-[#1b1b1bcc] inter">
									Project management
								</li>
							</ul> */}
						</div>
					</div>
					<div
						onClick={generatePDF}
						className="absolute bottom-6 curso right-5">
						<img src={Download} alt="" className="cursor-pointer" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Resume;
