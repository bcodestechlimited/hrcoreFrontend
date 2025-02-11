import React, { useContext } from "react";
import Option from "../oprion/option";
import FormName from "../form-name/form-name";
import { Link } from "react-router-dom";
import { GlobalState } from "../../data/Context";
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";
import { IconContext } from "react-icons";
import Avatar from "../avatar/avatar";

export const getStatusColor = status => {
	if (["pending", "update"]?.includes(status?.toLowerCase())) {
		return "   rounded-xl bg-[#F0F6FA] text-[#2A72A8] px-2";
	} else if (["approved", "approve"]?.includes(status?.toLowerCase())) {
		return "  rounded-xl bg-[#2A72A8] text-white px-2";
	} else if (
		["rejected", "delete", "decline", "declined"]?.includes(
			status?.toLowerCase()
		)
	) {
		return "   rounded-xl bg-[#F5E1EA] text-[#F52685] px-2";
	} else {
		return ""; // Default style when the status doesn't match any of the conditions
	}
};

export const RenderStatusCell = ({ status, onClick }) => {
	return (
		<span
			onClick={onClick}
			className={`px-2 py-1 rounded-lg cursor-pointer ${getStatusColor(
				status
			)}`}>
			{status}
		</span>
	);
};

function Setting_table({
	header,
	data,
	update,
	remove,
	cancel,
	view,
	copy,
	viewFilter,
	onClick,
}) {
	const { numberWithCommas } = useContext(GlobalState);
	return (
		<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50">
					<tr>
						{header?.map((item, index) => (
							<th scope="col" key={index} className="px-6 py-3 text-[11.21px]">
								{item?.name}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					<tr className="bg-white border-b text-xs">
						{data?.map((each, index) =>
							header?.map((item, i) => {
								switch (item?.case) {
									case "Admin_fan_scout":
										return (
											<td className="px-6 py-4" key={i}>
												sam
											</td>
										);
									default:
										return <></>;
								}
							})
						)}
					</tr>
					{data?.map((each, index) => {
						return (
							<tr
								onClick={onClick ? () => onClick(each) : () => {}}
								className={`bg-white border-b text-xs ${
									onClick ? "cursor-pointer" : ""
								}`}
								key={index}>
								{header?.map((item, i) => {
									switch (item?.case) {
										case "number_count":
											return (
												<td className="px-6 py-4 w-[2%]" key={i}>
													{index + 1}
												</td>
											);

										case "CashApprovalFlows_CASH_CATEGORY":
											return (
												<td key={i} className="px-6 py-4">
													{item?.number ? (
														numberWithCommas(
															Number(each?.[item?.keyName] || 0).toFixed(2)
														)
													) : item?.subKeyName ? (
														Array?.isArray(each?.[item?.keyName]) ? (
															each?.[item?.keyName]?.map((ic, e) => (
																<span key={e}>
																	{ic?.[item?.subKeyName] || ic}{" "}
																	{e !== each?.[item?.keyName]?.length - 1 && (
																		<>, </>
																	)}{" "}
																</span>
															))
														) : (
															each?.[item?.keyName]?.[item?.subKeyName]
														)
													) : Array.isArray(each?.[item?.keyName]) ? (
														each?.[item?.keyName]?.map((it, t) => (
															<span key={t}>
																{it?.name || it}{" "}
																{t !== each?.[item?.keyName]?.length - 1 && (
																	<>, </>
																)}{" "}
															</span>
														))
													) : item?.type === "image" ? (
														<Avatar lg img={each?.url} noround />
													) : (
														each?.[item?.keyName] || each?.description
													)}
												</td>
											);

										case "Name":
											return (
												<td key={i} className="px-6 py-4">
													<FormName
														item={
															each?.profile?._id ? each?.profile || each : each
														}
													/>
												</td>
											);

										case "ACTION":
											return (
												<td key={i} className="px-6 py-4  w-[5%]">
													{item?.keyName === "profile" ? (
														<Option type={"horizontal"}>
															<ul className="p-4">
																<li>
																	<div
																		// onClick={() => navigate("/employee/profile")}
																		className="cursor-pointer">
																		<Link
																			to={"/employee/profile"}
																			state={each?._id}>
																			<IconContext.Provider
																				value={{ color: "#000" }}>
																				<AiFillEye size={20} />
																			</IconContext.Provider>
																		</Link>
																	</div>
																</li>
															</ul>
														</Option>
													) : (
														<Option type={"vertical"}>
															<ul className="py-2 text-sm">
																<li>
																	<Link
																		to={"/profile"}
																		className="block px-4 py-2 hover:bg-gray-100 text-main">
																		View Profile
																	</Link>
																</li>
																{/* <li>
	                                <Link
	                                  to={"/"}
	                                  className="block px-4 py-2 hover:bg-gray-100"
                                >
	                                  View Profile
	                                </Link>
	                              </li>
	                              <li>
	                                <Link
	                                  to={"/"}
	                                  className="block px-4 py-2 hover:bg-gray-100 text-red-600"
                                >
	                                  View Profile
	                                </Link>
	                              </li> */}
															</ul>
														</Option>
													)}
												</td>
											);

										case "BUTTON":
											return (
												<td key={i} className="px-6 py-4  w-[5%]">
													<Option type={"horizontal"}>
														<div className="flex gap-4">
															{copy ? copy(each?._id) : null}
															{update ? (
																<IconContext.Provider
																	value={{ color: "#2A72A8" }}>
																	<AiFillEdit
																		onClick={() => update(each)}
																		size={20}
																	/>
																</IconContext.Provider>
															) : null}
															{remove ? (
																<IconContext.Provider value={{ color: "red" }}>
																	<AiFillDelete
																		onClick={() => remove(each)}
																		size={20}
																	/>
																</IconContext.Provider>
															) : null}
															{cancel ? (
																<IconContext.Provider value={{ color: "red" }}>
																	<LiaTimesSolid
																		onClick={() => cancel(each)}
																		size={20}
																	/>
																</IconContext.Provider>
															) : null}
															{view ? (
																<div
																	// onClick={() => navigate("/employee/profile")}
																	className="cursor-pointer">
																	<Link
																		to={"/employee/profile"}
																		state={each?._id}>
																		<IconContext.Provider
																			value={{ color: "#000" }}>
																			<AiFillEye size={20} />
																		</IconContext.Provider>
																	</Link>
																</div>
															) : null}
															{viewFilter ? (
																<div
																	// onClick={() => navigate("/employee/profile")}
																	className="cursor-pointer">
																	<Link
																		to={"/employee/all-employee"}
																		state={{ [viewFilter]: each?._id }}>
																		<IconContext.Provider
																			value={{ color: "#000" }}>
																			<AiFillEye size={20} />
																		</IconContext.Provider>
																	</Link>
																</div>
															) : null}
														</div>
													</Option>
													{/* <div className="px-2 py-1 rounded-lg flex gap-2">
														{update ? (
															<RenderStatusCell
																status="Update"
																onClick={() => update(each)}
															/>
														) : null}
														{remove ? (
															<RenderStatusCell
																status="Delete"
																onClick={() => remove(each)}
															/>
														) : null}
													</div> */}
												</td>
											);

										case "Admin_fan_Acitive_Negotiate":
											return (
												<td key={i} className="px-6 py-4">
													sam23
												</td>
											);

										case "Admin_fan_Closed_Negotiate":
											return (
												<td key={i} className="px-6 py-4">
													sam234
												</td>
											);

										case "Admin_fan_Suspend_message_view":
											return (
												<td key={i} className="px-6 py-4">
													sam2345
												</td>
											);
										default:
											return <></>;
									}
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default Setting_table;

// const Setting_table = ({ data, columns }) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           {columns.map((column, index) => (
//             <th key={index}>{column.header}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, rowIndex) => (
//           <tr key={rowIndex}>
//             {columns.map((column, colIndex) => (
//               <td key={colIndex}>{row[column.field]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Setting_table;
