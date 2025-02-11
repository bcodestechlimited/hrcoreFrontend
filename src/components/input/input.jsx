import { useState } from "react";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Input = ({
  type,
  label,
  style,
  height,
  width,
  options,
  password,
  country,
  ...otherProps
}) => {
  const [show, setShow] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const toggleShow = () => {
    setShow(!show);
    if (!show) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  return (
		<div>
			<div>
				{type === "textarea" ? (
					<div class="">
						<label className="block mb-2 text-sm font-medium text-gray-900">
							{label}
						</label>
						<textarea
							name=""
							id=""
							className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${style}`}
							rows="5"
							type={type}
							{...otherProps}></textarea>
					</div>
				) : type === "password" ? (
					<div class="">
						<label
							for="exampleFormControlInput1"
							className="block mb-2 text-sm font-medium text-gray-900">
							{label}
						</label>
						<input
							type={password ? passwordType : type}
							id="floating_outlined"
							className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${style}`}
							{...otherProps}
						/>
						<span
							className="absolute right-5 top-4 cursor-pointer text-mainShade"
							onClick={toggleShow}>
							{password &&
								(!show ? (
									<AiFillEye size={"20px"} />
								) : (
									<AiFillEyeInvisible size={"20px"} />
								))}
						</span>
					</div>
				) : type === "select" ? (
					<div class="">
						<label class="block mb-2 text-sm font-medium text-gray-900">
							{label}
						</label>
						{options ? (
							<select
								name=""
								className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm capitalize rounded-lg block w-full p-2.5 ${style}`}
								{...otherProps}>
								<option value="">Select</option>
								{options.map((option, i) => (
									<option
										key={i}
										value={option?._id || option.value || option?.name}>
										{otherProps?.name === "reliever" ? (
											<>
												{option?.profile?.lastName || option?.lastName}{" "}
												{option?.profile?.firstName || option?.firstName}
											</>
										) : (
											<>
												{option?.bankName ||
													option?.bankAccountName ||
													option?.name ||
													option?.email ||
													option.value}
											</>
										)}
									</option>
								))}
							</select>
						) : (
							<select
								name=""
								className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5`}
								{...otherProps}>
								<option value="">Select</option>
							</select>
						)}
					</div>
				) : type === "checkbox" ? (
					<div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
						<input
							class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-text outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
							type="checkbox"
							value=""
							id="exampleCheck3"
							checked
							{...otherProps}
						/>
						<label
							class="inline-block pl-[0.15rem] hover:cursor-pointer"
							for="exampleCheck3">
							{label}
						</label>
					</div>
				) : (
					<div className="">
						<label className="block mb-2 text-sm font-medium text-gray-900">
							{label}
						</label>
						<input
							type={type || `text`}
							className={`border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${style}`}
							{...otherProps}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Input;
