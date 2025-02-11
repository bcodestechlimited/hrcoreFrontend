import React, { useEffect, useState } from "react";
import Brand from "../components/brand/brand";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { loadUser, login, setUserFail } from "../data/Reducers/UserReducer";
import { returnErrors } from "../data/Reducers/ErrorReducer";
import Button from "../components/button/button";
import BG from "../assets/bg.png";
import Img from "../assets/loginimg.png";
import Logo from "../assets/logo.svg";
import Shape from "../assets/loginshape.svg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import Forgotpassword from "./forgotpassword/index";
// import Emailsent from "./emailsent";
// import Resetpassword from "./forgotpassword/resetpassword";
// import Resetsuccess from "./forgotpassword/resetsuccess";
import { IconContext } from "react-icons";

const Login = () => {
  const [show, setShow] = useState(false);

  console.log(process.env.REACT_APP_BASE_URL);
  console.log(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`);

  const navigate = useNavigate(),
    init = {
      username: "",
      password: "",
    },
    [state, setState] = useState(init),
    textChange = (e) => {
      let { name, value } = e.target;
      setState({ ...state, [name]: value });
    },
    [loading, setLoading] = useState(false),
    [submit, setSubmit] = useState(false),
    { auth } = useSelector((state) => state),
    dispatch = useDispatch();

  useEffect(() => {
    if (auth?.isLoggedIn && submit) {
      navigate("/");
    }
  }, [auth, submit, navigate]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!state?.username || !state?.password) return;
    setLoading(true);

    console.log({
      qww: state,
    });

    try {
      let res = await axios.post(`/api/v1/auth/login`, { ...state });
      console.log({ resp: res?.data });
      toast.success(res?.data?.message);
      dispatch(login(res?.data?.data));
      dispatch(loadUser());
    } catch (err) {
      if (err?.response?.status === 429 || err?.response?.status === 405)
        toast.error(err?.response?.data ? err?.response?.data : err?.message);
      console.log({ err });
      let error = err.response?.data?.error;
      if (error) {
        dispatch(returnErrors({ error, status: err?.response?.status }));
      } else {
        toast.error(err?.response?.data?.message);
      }
      dispatch(setUserFail());
    }
    setLoading(false);
    setSubmit(true);
  };
  return (
    <>
      <div className="w-full h-screen">
        <div className="w-full h-full grid lg:grid-cols-2">
          <div
            style={{
              background: `url(${BG})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="h-full relative flex justify-center items-center"
          >
            {/* <img src={Logo} alt="" className="" /> */}
            <div className="lg:w-full w-5/6 mx-auto">
              <h1 className="text-white text-center manrope lg:text-4xl md:text-3xl text-2xl font-extrabold lg:tracking-wide lg:leading-[59.422px]">
                Transform Your HR <br /> Management with{" "}
                {process.env.REACT_APP_NAME || "HR Core"}
              </h1>
              <div className="flex justify-center">
                <img src={Img} alt="" className="mx-auto lg:h-96 h-64" />
              </div>
            </div>
            <div className="absolute hidden lg:block bottom-2 left-16">
              <p className="text-[#CBD5E1] text-center text-base manrope font-normal">
                ...the Leading HR Software for Your Business
              </p>
            </div>
            <div className="absolute hidden lg:block bottom-0 right-0">
              <img src={Shape} alt="" className="" />
            </div>
          </div>
          <div className="bg-[#F8FAFC] py-8 lg:py-0 shadow-lg px-6 flex items-center justify-center h-full">
            <div>
              <img src={Logo} alt="" className="mx-auto" />
              <h2 className="lg:text-4xl md:text-4xl text-2xl manrope font-semibold lg:tracking-[-1.801px] lg:leading-[55.82px] text-[#090914]">
                Welcome Back <span className="text-opacity-30">-</span>{" "}
                <span className="text-secondary">Admin</span>
              </h2>
              {/* <p className="lg:text-base text-sm manrope font-normal text-[#52525B] leading-[27px] max-w-md pt-6">
                Why did the HR manager's computer use HR Core? Because it needed
                a human resource.
              </p> */}
              <form action="" className="mt-10 w-96">
                <p className="font-bold text-sm text-[#090914] poppins leading-[22px]">
                  Email Address
                </p>
                <input
                  type="text"
                  value={state?.username}
                  onChange={textChange}
                  name="username"
                  placeholder="example@xyz.com"
                  className="mt-3 lg:w-96 w-72 h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5"
                />
                <p className="font-bold pt-4 text-sm text-[#090914] poppins leading-[22px]">
                  Password
                </p>
                <div className="mt-3 lg:w-full w-72 h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5 relative flex justify-between items-center">
                  <input
                    type={show ? "text" : "password"}
                    value={state?.password}
                    onChange={textChange}
                    name="password"
                    placeholder="*********"
                    className="h-full lg:w-full w-full noborder focus:border border-[#CBD5E1] bg-transparent"
                  />
                  <div
                    onClick={() => setShow(!show)}
                    className="pr-3 cursor-pointer absolute right-2"
                  >
                    {show ? (
                      <IconContext.Provider value={{ color: "#2A72A8" }}>
                        <AiFillEyeInvisible size={20} />
                      </IconContext.Provider>
                    ) : (
                      <IconContext.Provider value={{ color: "#2A72A8" }}>
                        <AiFillEye size={20} />
                      </IconContext.Provider>
                    )}
                  </div>
                </div>

                <p
                  onClick={() => navigate("/account-verification")}
                  className="py-4 text-xs cursor-pointer text-[#F72585] lg:text-right text-left font-normal poppins"
                >
                  Verify Account ?
                </p>
                <p
                  onClick={() => navigate("/forgotpassword")}
                  className="py-4 text-xs cursor-pointer text-[#F72585] lg:text-right text-left font-normal poppins"
                >
                  Forgot Password ?
                </p>
                <Button
                  title={"sign in"}
                  buttonType={"primary"}
                  width={"w-36"}
                  // eslint-disable-next-line react/style-prop-object
                  style={
                    "h-14 mt-3 bg-secondary text-white text-sm font-semibold poppins rounded-lg capitalize text-center justify-center"
                  }
                  loading={loading}
                  onClick={handleSubmit}
                  type="submit"
                />

                <p className="text-[11px] pt-3 manrope text-[#64748B] font-medium hidden">
                  You don't have an account?{" "}
                  <span
                    onClick={() => navigate("/register")}
                    className="text-secondary cursor-pointer"
                  >
                    Register here
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <ReuseBox>
				<div>
					<div className="bg-gray-100 px-3 rounded-t">
						<div className="w-52 mx-auto flex">
							{btnTab?.map((item, i) => (
								<button
									onClick={() => setState({ ...state, userType: item })}
									key={i}
									className={`capitalize w-52 cursor-pointer px-4 py-2 ${
										item === state?.userType
											? "bg-[#F72585] rounded-md text-white"
											: ""
									}`}>
									{item}
								</button>
							))}
						</div>
					</div>
					<form className="p-3">
						<h2 className="capitalize mb-4">{state?.userType} login</h2>
						<div className="mb-4">
							<Input
								type={"email"}
								value={state?.username}
								onChange={textChange}
								name="username"
								placeholder="example@xyz.com"
								label={"Email address"}
								// eslint-disable-next-line react/style-prop-object
								style={"bg-gray-100 border-0"}
							/>
						</div>
						<div className="mb-4">
							<Input
								type={"password"}
								value={state?.password}
								onChange={textChange}
								name="password"
								placeholder="*******"
								label={"Password"}
								// eslint-disable-next-line react/style-prop-object
								style={"bg-gray-100 border-0"}
							/>
						</div>
						<div className="mb-4">
							<Button
								title={"sign in"}
								buttonType={"primary"}
								width={"w-full"}
								// eslint-disable-next-line react/style-prop-object
								style={"text-center capitalize justify-center rounded-0 mt-10"}
								loading={loading}
								onClick={handleSubmit}
								type="submit"
							/>
						</div>
					</form>
				</div>
			</ReuseBox> */}
      {/* <Forgotpassword />
      <Emailsent />
      <Resetpassword />
      <Resetsuccess /> */}
    </>
  );
};

export default Login;

export const ReuseBox = ({ children }) => {
  return (
    <>
      <div className="bg-[#EFF6FC] min-h-screen flex justify-center items-center">
        <div className="fixed inset-x-0 top-0">
          <NonAuthHeader />
        </div>
        <div
          style={{
            maxWidth: "500px",
          }}
          className="bg-white rounded-sm shadow-sm w-full"
        >
          {children}
        </div>
      </div>
    </>
  );
};

export const NonAuthHeader = ({ img }) => {
  return (
    <div className="bg-white flex justify-center items-center py-3">
      <Brand img={img} />
    </div>
  );
};
