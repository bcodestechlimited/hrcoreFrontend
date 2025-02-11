import React, { useEffect, useContext } from "react";
import {
	LoadMore,
	MainPaginate,
	// MainRanger,
} from "../../components/pagination/pagination";
// import { useNavigate } from "react-router-dom";
// import Search from "../../components/search/search";
import Addbutton from "../../components/button/addbutton";
import Button from "../../components/button/button";
import { useState } from "react";
import ModalContainer, { PageLoader } from "../../components/modal-container/modal-container";
import Input from "../../components/input/input";
import { manageVoucherCompanies } from "../../data/Reducers/VoucherCompanyReducer";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ActionButton } from "./invoice-setting";
import { GlobalState } from "../../data/Context";

function CompanyVoucher() {
	// const navigate = useNavigate();
	// { leaveRequest, company } = useSelector((state) => state);

	const [isopen, setIsopen] = useState(false);
	const [isUpdate, setisUpdate] = useState(false);

	const [isDelete, setIsDelete] = useState(false);

	let [loading, setLoading] = useState(false),
		{ voucherCompanies, auth } = useSelector(state => state),
		{canAdmin, canApprove} = useContext(GlobalState),
		dispatch = useDispatch(),
		[submit, setSubmit] = useState(false),
		init = { name: "" },
		[state, setState] = useState(init);

	useEffect(() => {
		dispatch(manageVoucherCompanies("get", null));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);

	useEffect(() => {
		setData(voucherCompanies?.data);
	}, [voucherCompanies?.data]);

	let reset = () => {
		setisUpdate(null);
		setIsDelete(null);
		setSubmit(false);
		setIsopen(false);
	};

	const handleSubmit = async e => {
		e?.preventDefault();
		if (!isDelete) if (!state?.name) return;
		setLoading(true);
		await dispatch(
			manageVoucherCompanies(
				isDelete ? "delete" : isUpdate ? "put" : "post",
				isDelete
					? isDelete
					: {
							...isUpdate,
							name: state?.name,
							_id: isUpdate?._id || state?._id,
							id: isUpdate?._id || state?._id,
					  }
			)
		);
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (isUpdate) {
			setState({ ...isUpdate });
			setIsopen(true);
		}
	}, [isUpdate]);

	useEffect(() => {
		if (voucherCompanies?.isAdded && submit) {
			reset();
		}
		if (voucherCompanies?.isUpdated && submit) {
			reset();
		}
		if (voucherCompanies?.isDeleted && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		voucherCompanies?.isAdded,
		submit,
		voucherCompanies?.isAdded,
		voucherCompanies?.isAdded,
	]);

	let [range] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!voucherCompanies?.data && !data) return <PageLoader />;
	if (!data) return;

	const currentItems = data?.docs?.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data?.docs.length / range);

	const handlePageClick = event => {
			const newOffset = (event.selected * range) % data?.docs.length;
			setItemOffset(newOffset);
			setPage(1 + event?.selected);
		},
		handleLoadMore = async () => {
			setLoading("loadmore");
			await dispatch(
				manageVoucherCompanies("get", { limit: data?.limit * data?.nextPage })
			);
			setLoading(false);
		};

	return (
		<div>
			<div className="flex  justify-center">
				<div className="  w-[90%] ">
					{canAdmin || canApprove || auth?.user?.isAdmin ? (
						<div className="p-4 flex items-center justify-end">
							<p className="flex items-center gap-2 font-medium">
								{/* <Button
              buttonType={"secondary"}
              title={"Create Request"}
              icon={<AiTwotoneCalendar />}
              width={"w-fit"}
              onClick={() => navigate("/leave/create-leave")}
            /> */}
								<Addbutton
									background={"bg-[#2C78C6]"}
									create={true}
									text={"Create"}
									onClick={() => setIsopen(true)}
								/>
							</p>
						</div>
					) : null}
					<div className="mt-5">
						<div className="employeedirtable__body">
							<div className="">
								<div className="relative overflow-x-auto overflow-y-visible min-h-screen">
									{/* <MainRanger range={range} setRange={setRange} /> */}

									<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
										<thead className="text-xs text-gray-700 uppercase bg-gray-50">
											<tr>
												<th scope="col" className="px-6 py-3">
													S/N
												</th>

												<th scope="col" className="px-6 py-3">
													Company
												</th>
												<th scope="col" className="px-6 py-3">
													Date created
												</th>

												<th scope="col" className="px-6 py-3">
													Action
												</th>
											</tr>
										</thead>
										<tbody>
											{currentItems?.map((item, i) => (
												<tr key={i} className="bg-white border-b text-xs">
													<td className="px-6 py-4">{i + 1}</td>

													<td className="px-6 py-4">{item?.name}</td>
													<td className="px-6 py-4">
														{moment(item?.createdAt).format("DD/MM/YYYY")}
													</td>
													<td className="px-6 py-4">
														<ActionButton
															each={item}
															update={setisUpdate}
															remove={setIsDelete}
														/>
													</td>

													{/* <td
                            className="px-6 py-4"
                            onClick={() =>
                              navigate(`/finance/invoice/${item?.id}`)
                            }
                          >
                            <span className="bg-[#F0F6FA] px-2 py-1 cursor-pointer">
                              View details
                            </span>
                          </td> */}
												</tr>
											))}
										</tbody>
									</table>
								</div>

								<div className="mt-4 flex justify-center">
									<LoadMore
										next={page === pageCount && data?.hasNextPage}
										loading={loading === "loadmore"}
										handleLoadMore={handleLoadMore}
									/>
								</div>
								<div className="mt-4 flex justify-center">
									{/* <Pagination /> */}
									<MainPaginate
										pageCount={pageCount}
										handlePageClick={handlePageClick}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<ModalContainer
				title={`Delete Company
				`}
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

			<ModalContainer
				title={
					isUpdate ? `Edit ${isUpdate?.name || "Company"}` : "CREATE COMPANY"
				}
				width={"max-w-xl  "}
				show={isopen ? true : false}
				close={reset}>
				<div className="mx-50 ">
					{/* <form className="space-y-4 debug"> */}
					<form className="">
						{/* <div className="my-auto  w-full debug"> */}
						<div>
							<Input
								label={"CREATE COMPANY"}
								placeholder={"Bct Limited"}
								name="name"
								onChange={e => setState({ ...state, name: e?.target?.value })}
								value={state?.name}
							/>

							<div className="pt-4 flex justify-center">
								<Button
									buttonType={"primary"}
									title={isUpdate ? "Update" : "CREATE"}
									type="button"
									width={"w-fit me-2"}
									loading={loading}
									onClick={handleSubmit}
								/>
								<Button
									buttonType={"secondary"}
									title={"Cancel"}
									type="button"
									width={"w-fit ms-2"}
									onClick={reset}
								/>
							</div>
						</div>
					</form>
				</div>
			</ModalContainer>
		</div>
	);
}

export default CompanyVoucher;
