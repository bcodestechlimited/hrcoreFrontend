import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/button";
import FormName from "../../../components/form-name/form-name";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { manageResignation } from "../../../data/Reducers/ResignationReducer";
import {
  LoadMore,
  MainPaginate,
  // MainRanger,
} from "../../../components/pagination/pagination";
import { RenderStatusCell } from "../../../components/settings/setting_table";
import moment from "moment";
import Addbutton from "../../../components/button/addbutton";
import { IconContext } from "react-icons";
import { AiFillEye } from "react-icons/ai";

const OffBoarding = () => {
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false),
    { resignation, company } = useSelector((state) => state),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(manageResignation("get", null, company?.currentSelected));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let [data, setData] = useState(null),
    [page, setPage] = useState(1);
  useEffect(() => {
    setData(resignation?.data);
  }, [resignation?.data]);

  let [range] = useState(10);

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + range;

  if (!data) return;

  const currentItems = data?.docs?.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data?.docs?.length / range);

	const handlePageClick = event => {
			const newOffset = (event.selected * range) % data?.docs?.length;
			setItemOffset(newOffset);
			setPage(1 + event?.selected);
		},
		handleLoadMore = async () => {
			setLoading("loadmore");
			await dispatch(
				manageResignation(
					"get",
					{ limit: data?.limit * data?.nextPage },
					company?.currentSelected
				)
			);
			setLoading(false);
		};

  return (
		<div>
			<div className="p-4 flex justify-between items-center">
				<Button buttonType={"primary"} title={"All Resignation"} />
				<Addbutton
					background={"bg-secondary"}
					text={"Submit Resignation"}
					add={true}
					onClick={() => navigate("/employee/offboarding/create-request")}
				/>
			</div>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
				{/* <MainRanger range={range} setRange={setRange} /> */}
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50">
						<tr>
							<th scope="col" className="p-4">
								S/N
							</th>
							<th scope="col" className="px-6 py-3">
								Sent To
							</th>
							<th scope="col" className="px-6 py-3">
								Date Sent
							</th>
							<th scope="col" className="px-6 py-3">
								Notice Period
							</th>
							<th scope="col" className="px-6 py-3">
								Office Tool
							</th>
							<th scope="col" className="px-6 py-3">
								Letter Attached
							</th>
							<th scope="col" className="px-6 py-3">
								Status
							</th>
							<th scope="col" className="px-6 py-3"></th>
						</tr>
					</thead>
					<tbody>
						{currentItems?.map((item, i) => (
							<tr
								key={i}
								className="bg-white border-b cursor-pointer"
								onClick={() =>
									navigate(
										`/employee/offboarding/${
											item?.createdBy?.profile?.lastName ||
											item?.createdBy?.lastName
										}`,
										{ state: item?._id }
									)
								}>
								<td className="w-4 p-4">{i + 1}</td>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
									<FormName
										item={
											item?.createdBy?.profile?._id
												? item?.createdBy?.profile || item?.createdBy
												: item?.createdBy
										}
									/>
								</th>
								<td className="px-6 py-4">
									{moment(item?.createdAt).format("dddd Do, MMMM")}
								</td>
								<td className="px-6 py-4">
									{moment(item?.lastWorkingDate).diff(
										moment(item?.createdAt),
										"days"
									) < 0
										? 0
										: moment(item?.lastWorkingDate).diff(
												moment(item?.createdAt),
												"days"
										  )}{" "}
									days{" "}
								</td>
								<td className="px-6 py-4">
									{item?.toolsReturned ? `Returned` : "Not Returned"}
								</td>
								<td className="px-6 py-4">
									{item?.relievingLetter ? `Present` : "Not Present"}
								</td>
								<td className="px-6 py-4">
									<RenderStatusCell status={item?.status} />
								</td>
								<td className="px-6 py-4 cursor-pointer">
									<IconContext.Provider value={{ color: "2A72A8" }}>
										<AiFillEye size={20} />
									</IconContext.Provider>
								</td>
							</tr>
						))}
					</tbody>
				</table>
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
	);
};

export default OffBoarding;
