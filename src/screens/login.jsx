// import React, { useEffect, useState } from "react";
// import Brand from "../components/brand/brand";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { loadUser, login, setUserFail } from "../data/Reducers/UserReducer";
// import { returnErrors } from "../data/Reducers/ErrorReducer";
// import Button from "../components/button/button";
// import BG from "../assets/bg.png";
// import Img from "../assets/loginimg.png";
// import Logo from "../assets/logo.svg";
// import Shape from "../assets/loginshape.svg";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import { IconContext } from "react-icons";

// const Login = () => {
//   const [show, setShow] = useState(false);

//   console.log(process.env.REACT_APP_BASE_URL);
//   console.log(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`);

//   const navigate = useNavigate(),
//     init = {
//       username: "",
//       password: "",
//     },
//     [state, setState] = useState(init),
//     textChange = (e) => {
//       let { name, value } = e.target;
//       setState({ ...state, [name]: value });
//     },
//     [loading, setLoading] = useState(false),
//     [submit, setSubmit] = useState(false),
//     { auth } = useSelector((state) => state),
//     dispatch = useDispatch();

//   useEffect(() => {
//     if (auth?.isLoggedIn && submit) {
//       navigate("/");
//     }
//   }, [auth, submit, navigate]);

//   const handleSubmit = async (e) => {
//     e?.preventDefault();
//     if (!state?.username || !state?.password) return;
//     setLoading(true);

//     console.log({
//       qww: state,
//     });

//     try {
//       let res = await axios.post(`/api/v1/auth/login`, { ...state });
//       console.log({ resp: res?.data });
//       toast.success(res?.data?.message);
//       dispatch(login(res?.data?.data));
//       dispatch(loadUser());
//     } catch (err) {
//       if (err?.response?.status === 429 || err?.response?.status === 405)
//         toast.error(err?.response?.data ? err?.response?.data : err?.message);
//       console.log({ err });
//       let error = err.response?.data?.error;
//       if (error) {
//         dispatch(returnErrors({ error, status: err?.response?.status }));
//       } else {
//         toast.error(err?.response?.data?.message);
//       }
//       dispatch(setUserFail());
//     }
//     setLoading(false);
//     setSubmit(true);
//   };
//   return (
//     <>
//       <div className="w-full h-screen">
//         <div className="w-full h-full grid lg:grid-cols-2">
//           <div
//             style={{
//               background: `url(${BG})`,
//               backgroundPosition: "center",
//               backgroundSize: "cover",
//             }}
//             className="h-full relative flex justify-center items-center"
//           >
//             {/* <img src={Logo} alt="" className="" /> */}
//             <div className="lg:w-full w-5/6 mx-auto">
//               <h1 className="text-white text-center manrope lg:text-4xl md:text-3xl text-2xl font-extrabold lg:tracking-wide lg:leading-[59.422px]">
//                 Transform Your HR <br /> Management with{" "}
//                 {process.env.REACT_APP_NAME || "HR Core"}
//               </h1>
//               <div className="flex justify-center">
//                 <img src={Img} alt="" className="mx-auto lg:h-96 h-64" />
//               </div>
//             </div>
//             <div className="absolute hidden lg:block bottom-2 left-16">
//               <p className="text-[#CBD5E1] text-center text-base manrope font-normal">
//                 ...the Leading HR Software for Your Business
//               </p>
//             </div>
//             <div className="absolute hidden lg:block bottom-0 right-0">
//               <img src={Shape} alt="" className="" />
//             </div>
//           </div>
//           <div className="bg-[#F8FAFC] py-8 lg:py-0 shadow-lg px-6 flex items-center justify-center h-full">
//             <div>
//               <img src={Logo} alt="" className="mx-auto" />
//               <h2 className="lg:text-4xl md:text-4xl text-2xl manrope font-semibold lg:tracking-[-1.801px] lg:leading-[55.82px] text-[#090914]">
//                 Welcome Back <span className="text-opacity-30">-</span>{" "}
//                 <span className="text-secondary">Admin</span>
//               </h2>
//               {/* <p className="lg:text-base text-sm manrope font-normal text-[#52525B] leading-[27px] max-w-md pt-6">
//                 Why did the HR manager's computer use HR Core? Because it needed
//                 a human resource.
//               </p> */}
//               <form action="" className="mt-10 w-96">
//                 <p className="font-bold text-sm text-[#090914] poppins leading-[22px]">
//                   Email Address
//                 </p>
//                 <input
//                   type="text"
//                   value={state?.username}
//                   onChange={textChange}
//                   name="username"
//                   placeholder="example@xyz.com"
//                   className="mt-3 lg:w-96 w-72 h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5"
//                 />
//                 <p className="font-bold pt-4 text-sm text-[#090914] poppins leading-[22px]">
//                   Password
//                 </p>
//                 <div className="mt-3 lg:w-full w-72 h-12 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-black text-sm poppins font-medium leading-5 relative flex justify-between items-center">
//                   <input
//                     type={show ? "text" : "password"}
//                     value={state?.password}
//                     onChange={textChange}
//                     name="password"
//                     placeholder="*********"
//                     className="h-full lg:w-full w-full noborder focus:border border-[#CBD5E1] bg-transparent"
//                   />
//                   <div
//                     onClick={() => setShow(!show)}
//                     className="pr-3 cursor-pointer absolute right-2"
//                   >
//                     {show ? (
//                       <IconContext.Provider value={{ color: "#2A72A8" }}>
//                         <AiFillEyeInvisible size={20} />
//                       </IconContext.Provider>
//                     ) : (
//                       <IconContext.Provider value={{ color: "#2A72A8" }}>
//                         <AiFillEye size={20} />
//                       </IconContext.Provider>
//                     )}
//                   </div>
//                 </div>

//                 <p
//                   onClick={() => navigate("/account-verification")}
//                   className="py-4 text-xs cursor-pointer text-[#F72585] lg:text-right text-left font-normal poppins"
//                 >
//                   Verify Account ?
//                 </p>
//                 <p
//                   onClick={() => navigate("/forgotpassword")}
//                   className="py-4 text-xs cursor-pointer text-[#F72585] lg:text-right text-left font-normal poppins"
//                 >
//                   Forgot Password ?
//                 </p>
//                 <Button
//                   title={"sign in"}
//                   buttonType={"primary"}
//                   width={"w-36"}
//                   // eslint-disable-next-line react/style-prop-object
//                   style={
//                     "h-14 mt-3 bg-secondary text-white text-sm font-semibold poppins rounded-lg capitalize text-center justify-center"
//                   }
//                   loading={loading}
//                   onClick={handleSubmit}
//                   type="submit"
//                 />

//                 <p className="text-[11px] pt-3 manrope text-[#64748B] font-medium hidden">
//                   You don't have an account?{" "}
//                   <span
//                     onClick={() => navigate("/register")}
//                     className="text-secondary cursor-pointer"
//                   >
//                     Register here
//                   </span>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

// export const ReuseBox = ({ children }) => {
//   return (
//     <>
//       <div className="bg-[#EFF6FC] min-h-screen flex justify-center items-center">
//         <div className="fixed inset-x-0 top-0">
//           <NonAuthHeader />
//         </div>
//         <div
//           style={{
//             maxWidth: "500px",
//           }}
//           className="bg-white rounded-sm shadow-sm w-full"
//         >
//           {children}
//         </div>
//       </div>
//     </>
//   );
// };

// export const NonAuthHeader = ({ img }) => {
//   return (
//     <div className="bg-white flex justify-center items-center py-3">
//       <Brand img={img} />
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { loadUser, login, setUserFail } from "../data/Reducers/UserReducer";
import { returnErrors } from "../data/Reducers/ErrorReducer";
import Button from "../components/button/button";
import Brand from "../components/brand/brand";

import BG from "../assets/bg.png";
import Img from "../assets/loginimg.png";
import Logo from "../assets/logo.svg";
import Shape from "../assets/loginshape.svg";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IconContext } from "react-icons";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const [state, setState] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (auth?.isLoggedIn && submit) {
      navigate("/");
    }
  }, [auth, submit, navigate]);

  const textChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.username || !state.password) return;

    setLoading(true);

    try {
      const res = await axios.post(`/api/v1/auth/login`, state);

      toast.success(res?.data?.message);
      dispatch(login(res?.data?.data));
      dispatch(loadUser());
    } catch (err) {
      const status = err?.response?.status;
      const error = err?.response?.data?.error;

      if (status === 429 || status === 405) {
        toast.error(err?.response?.data || err?.message);
      } else if (error) {
        dispatch(returnErrors({ error, status }));
      } else {
        toast.error(err?.response?.data?.message || "Login failed");
      }

      dispatch(setUserFail());
    } finally {
      setLoading(false);
      setSubmit(true);
    }
  };
  

  return (
    <div className="w-full h-screen">
      <div className="grid h-full w-full lg:grid-cols-2">
        {/* Left Side */}
        <div
          className="relative flex h-full items-center justify-center"
          style={{
            background: `url(${BG}) center / cover no-repeat`,
          }}
        >
          <div className="w-5/6 lg:w-full mx-auto">
            <h1 className="text-center font-extrabold text-white manrope text-2xl md:text-3xl lg:text-4xl lg:leading-[59px] lg:tracking-wide">
              Transform Your HR <br /> Management with{" "}
              {process.env.REACT_APP_NAME || "HR Core"}
            </h1>
            <div className="flex justify-center">
              <img
                src={Img}
                alt="Illustration"
                className="mx-auto h-64 lg:h-96"
              />
            </div>
          </div>

          <p className="absolute bottom-2 left-16 hidden text-center text-base font-normal text-[#CBD5E1] manrope lg:block">
            ...the Leading HR Software for Your Business
          </p>
          <img
            src={Shape}
            alt="Shape"
            className="absolute bottom-0 right-0 hidden lg:block"
          />
        </div>

        {/* Right Side */}
        <div className="flex h-full items-center justify-center bg-[#F8FAFC] px-6 py-8 lg:py-0 shadow-lg">
          <div>
            <img src={Logo} alt="Logo" className="mx-auto" />
            <h2 className="manrope font-semibold text-[#090914] text-2xl md:text-4xl lg:text-4xl lg:leading-[56px] lg:tracking-[-1.8px]">
              Welcome Back <span className="text-opacity-30">-</span>{" "}
              <span className="text-secondary">Admin</span>
            </h2>

            <form onSubmit={handleSubmit} className="mt-10 w-72 lg:w-96">
              {/* Email */}
              <label className="block text-sm font-bold text-[#090914] poppins leading-[22px]">
                Email Address
              </label>
              <input
                type="text"
                name="username"
                value={state.username}
                onChange={textChange}
                placeholder="example@xyz.com"
                className="mt-3 h-12 w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-sm font-medium text-black poppins"
              />

              {/* Password */}
              <label className="mt-4 block text-sm font-bold text-[#090914] poppins leading-[22px]">
                Password
              </label>
              <div className="relative mt-3 flex h-12 w-full items-center rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-sm font-medium text-black poppins">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={state.password}
                  onChange={textChange}
                  placeholder="*********"
                  className="h-full w-full bg-transparent pl-3 pr-10 focus:outline-none border-none focus:border-none "
                />
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 cursor-pointer"
                >
                  <IconContext.Provider value={{ color: "#2A72A8" }}>
                    {showPassword ? (
                      <AiFillEyeInvisible size={20} />
                    ) : (
                      <AiFillEye size={20} />
                    )}
                  </IconContext.Provider>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col items-end">
                <span
                  onClick={() => navigate("/account-verification")}
                  className="cursor-pointer py-4 text-left text-xs font-normal text-[#F72585] poppins lg:text-right"
                >
                  Verify Account?
                </span>
                <span
                  onClick={() => navigate("/forgotpassword")}
                  className="cursor-pointer py-4 text-left text-xs font-normal text-[#F72585] poppins"
                >
                  Forgot Password?
                </span>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  title="sign in"
                  buttonType="primary"
                  width="w-36"
                  style="h-14 mt-3 bg-secondary text-white text-sm font-semibold poppins rounded-lg capitalize text-center justify-center"
                  loading={loading}
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// Reusable Wrappers
export const ReuseBox = ({ children }) => (
  <div className="flex min-h-screen items-center justify-center bg-[#EFF6FC]">
    <div className="fixed inset-x-0 top-0">
      <NonAuthHeader />
    </div>
    <div
      className="w-full rounded-sm bg-white shadow-sm"
      style={{ maxWidth: "500px" }}
    >
      {children}
    </div>
  </div>
);

export const NonAuthHeader = ({ img }) => (
  <div className="flex items-center justify-center bg-white py-3">
    <Brand img={img} />
  </div>
);
