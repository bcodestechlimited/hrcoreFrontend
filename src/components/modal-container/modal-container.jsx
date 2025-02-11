import "./loader.css";

const ModalContainer = ({ show, title, close, children, width }) => {
	return (
		<div
			className={`fixed ${
				show ? "flex" : "hidden"
			} flex items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
			<div className="fixed inset-0 bg-black opacity-30"></div>
			<div
				className={`relative w-full ${
					width ? width : "max-w-2xl"
				} mx-auto max-h-full`}>
				{/* <!-- Modal content --> */}
				<div className="relative bg-white rounded-lg shadow">
					{/* <!-- Modal header --> */}
					<div className="flex items-start justify-between gap-4 p-4 rounded-t">
						<h3 className="text-xl capitalize font-semibold text-gray-900">
							{title}
						</h3>
						<button
							type="button"
							className="bg-gray-400 text-white rounded-lg text-sm p-1.5 inline-flex items-center"
							onClick={close}>
							<span className="sr-only">Close modal</span>
							<svg
								aria-hidden="true"
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"></path>
							</svg>
						</button>
					</div>
					{/* <!-- Modal body --> */}
					<div className="p-6 space-y-6">{children}</div>
					{/* <!-- Modal footer --> */}
					{/* <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              I accept
            </button>
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Decline
            </button>
          </div> */}
				</div>
			</div>
		</div>
	);
};

export default ModalContainer;

export const SuccessModal = ({ show, close, children, width }) => {
	return (
		<div
			className={`fixed ${
				show ? "flex" : "hidden"
			} flex items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
			<div className="fixed inset-0 bg-black opacity-30" onClick={close}></div>
			<div
				className={`relative w-full ${
					width ? width : "max-w-2xl"
				} mx-auto max-h-full`}>
				{/* <!-- Modal content --> */}
				<div className="relative bg-white rounded-lg shadow">
					<div className="p-6 space-y-6">{children}</div>
				</div>
			</div>
		</div>
	);
};

export const PageLoader = () => {
	return (
		<div className="ring">
			Loading
			<span className="spanClass"></span>
		</div>
	);
};
