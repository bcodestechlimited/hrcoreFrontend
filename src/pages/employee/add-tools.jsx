import Button from "../../components/button/button";
import Search from "../../components/search/search";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { manageTool } from "../../data/Reducers/ToolReducer";
import {
	LoadMore,
	MainPaginate,
	MainRanger,
} from "../../components/pagination/pagination";
import { CheckBoxUser } from "./onboarding/assets-management";
import { toast } from "react-toastify";

const AddTools = () => {
	let location = useLocation(),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[search, setSearch] = useState(""),
		{ tool, company } = useSelector(state => state),
		dispatch = useDispatch(),
		[state, setState] = useState([]),
		navigate = useNavigate();

	const handleSubmit = async e => {
		e?.preventDefault();
		let filterOut = state?.filter(item => item?.isChecked);

		if (filterOut?.length === 0) return toast.info("No tool selected");
		setLoading("load");
		for (let f = 0; f < filterOut.length; f++) {
			let thisUser = [...filterOut?.[f]?.users];

			if (location?.state?.action === "assign") {
				thisUser = [
					...new Set([
						...filterOut?.[f]?.users,
						...location?.state?.users?.map(item => item?._id),
					]),
				];
			}
			if (location?.state?.action === "remove") {
				for (let a = 0; a < location?.state?.users.length; a++) {
					thisUser = thisUser?.filter(
						item => item !== location?.state?.users[a]?._id
					);
				}
			}
			await dispatch(
				manageTool(
					"put",
					{
						...filterOut?.[f],
						users: thisUser,
					},
					company?.currentSelected
				)
			);
		}
		setLoading(false);
		setSubmit(true);
	};
	let reset = () => {
		setSubmit(false);
		setState(null);
		setLoading(null);
		navigate("/employee/onboarding/assets-management");
	};

	useEffect(() => {
		dispatch(manageTool("get", null, company?.currentSelected));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (tool?.isAdded && submit) {
			reset();
		}
		if (tool?.isUpdated && submit) {
			reset();
		}
		if (tool?.isDeleted && submit) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tool?.isAdded, submit, tool?.isUpdated, tool?.isDeleted]);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);

	useEffect(() => {
		if (tool?.isFound) setData(tool?.mainSearch);
		else setData(tool?.data);
	}, [tool?.data, tool?.isFound, tool?.mainSearch]);

	let [range, setRange] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	useEffect(() => {
		// if (users?.length === 0 && data)
		setState(data?.docs?.slice(itemOffset, endOffset));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.docs]);

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
				manageTool(
					"get",
					{ limit: data?.limit * data?.nextPage, search },
					company?.currentSelected
				)
			);
			setLoading(false);
		},
		handleSearch = async e => {
			e?.preventDefault();
			setLoading("search");
			await dispatch(manageTool("get", { search }, company?.currentSelected));
			setLoading(false);
		};

	return (
		<div>
			<div>
				<Button
					title={`${location?.state?.action} Office Tools`}
					buttonType={"primary"}
					width={"capitalize"}
				/>
			</div>

			<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
				<div className="p-4 flex items-center justify-between">
					<div className="w-2/5">
						<Search
							placeholder={"Search by Item Name"}
							value={search}
							onChange={setSearch}
							handleSubmit={handleSearch}
							loading={loading === "search"}
						/>
					</div>
					<p className="flex items-center gap-2 font-medium">
						<Button
							buttonType={"primary"}
							title={"Done"}
							width={"w-fit"}
							loading={loading === "load"}
							onClick={handleSubmit}
						/>
					</p>
				</div>
				<MainRanger range={range} setRange={setRange} />

				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50">
						<tr>
							<th scope="col" className="p-4">
								S/N
							</th>
							<th scope="col" className="px-6 py-3">
								Office Tool
							</th>
							<th scope="col" className="px-6 py-3">
								Asset ID
							</th>
							<th scope="col" className="px-6 py-3">
								Model
							</th>
							<th scope="col" className="px-6 py-3">
								Asset Details
							</th>
							<th scope="col" className="px-6 py-3">
								Description
							</th>
						</tr>
					</thead>
					<tbody>
						{currentItems?.map((item, i) => (
							<tr className="bg-white border-b" key={i}>
								<td className="w-4 p-4">
									<th scope="col" className="p-4">
										<CheckBoxUser
											users={state}
											setUsers={setState}
											item={item}
											i={i}
										/>
									</th>
								</td>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									<p>{item?.name}</p>
								</th>
								<td className="px-6 py-4">{item?.assetId}</td>
								<td className="px-6 py-4">{item?.model}</td>
								<td className="px-6 py-4">{item?.details}</td>
								<td className="px-6 py-4">{item?.description}</td>
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

export default AddTools;
