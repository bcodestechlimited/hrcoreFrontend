import Button from "../button/button";
import ReactPaginate from "react-paginate";

const Pagination = () => {
	return (
		<nav>
			<ul className="flex items-center -space-x-px h-10 text-base">
				<li>
					<div className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer">
						<span className="sr-only">Previous</span>
						<svg
							className="w-3 h-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10">
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 1 1 5l4 4"
							/>
						</svg>
					</div>
				</li>
				<li>
					<div className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer">
						1
					</div>
				</li>
				<li>
					<div className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer">
						2
					</div>
				</li>
				<li>
					<div
						aria-current="page"
						className="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 cursor-pointer">
						...
					</div>
				</li>
				<li>
					<div className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer">
						4
					</div>
				</li>
				<li>
					<div className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer">
						5
					</div>
				</li>
				<li>
					<div className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer">
						<span className="sr-only">Next</span>
						<svg
							className="w-3 h-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10">
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 9 4-4-4-4"
							/>
						</svg>
					</div>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;

export const LoadMore = ({ handleLoadMore, next, loading }) => {
	return (
		<>
			{!next ? (
				""
			) : (
				<Button
					onClick={handleLoadMore}
					title={loading ? "Loading..." : "Load More"}
					loading={loading}
					css="mx-auto"
					type={"button"}
					buttonType={"primary"}
					width={"w"}
				/>
			)}
		</>
	);
};

export const MainPaginate = ({ handlePageClick, pageCount }) => (
	<ReactPaginate
		breakLabel="..."
		nextLabel=">"
		onPageChange={handlePageClick}
		pageRangeDisplayed={5}
		pageCount={pageCount}
		previousLabel="<"
		renderOnZeroPageCount={null}
		className="flex items-center justify-center p-3"
		pageClassName="mx-1 p-2 border rounded text-capitalize no-underline px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
		previousClassName="no-underline px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 flex items-center justify-center p-2"
		nextClassName="no-underline px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 flex items-center justify-center"
		activeClassName="bg-[#2a71a866] p-2"
	/>
);

export const MainRanger = ({ range, setRange }) => {
	let rangeArr = [10, 50, 100, 200, 500, 1000];

	return (
		<div className="py-3">
			<div className="col-3 col-md-1">
				<select
					className="form-control py-2 form-select rounded min-h-[auto] p-3 leading-[1.6] outline-none placeholder:opacity-60"
					name="range"
					value={range}
					onChange={e => {
						setRange(Number(e.target.value));
					}}>
					{rangeArr?.map((item, i) => (
						<option key={i} value={item}>
							{item}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};
