import "./App.css";
import $ from "jquery";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import DataProvider from "./data/Context";
import store from "./data/Store";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./Routes";
import { useEffect } from "react";
import { TOKEN, TOKEN_ID } from "./data/Reducers/UserReducer";
import {
  SetAuthCompanyID,
  SetAuthToken,
  SetDefaultHeaders,
} from "./data/Config";
import { ToWords } from "to-words";
// import { useEffect } from "react";
import Logo from "./assets/Cephas.png";

// Preloader
$(window).on("load", function () {
  $(".lds-ellipsis").fadeOut(); // will first fade out the loading animation
  $(".preloader").delay(333).fadeOut("slow"); // will fade out the white DIV that covers the website.
  $("body").delay(333);
});

SetDefaultHeaders();

if (localStorage.getItem(TOKEN)) {
  SetAuthToken(localStorage.getItem(TOKEN));
}
if (localStorage.getItem(TOKEN_ID)) {
  SetAuthCompanyID(localStorage.getItem(TOKEN_ID));
}

export const toWords = new ToWords({
  localeCode: "en-NG",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: "Naira",
      plural: "Naira",
      symbol: "₦",
      fractionalUnit: {
        name: "kobo",
        plural: "kobo",
        symbol: "k",
      },
    },
  },
});

const App = () => {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  useEffect(() => {
    if (process.env.REACT_APP_NAME) {
      let link = document.querySelector("link[rel~='icon']");
      let link2 = document.querySelector("link[rel~='apple-touch-icon']");
      // let title = document.querySelector("title");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
      if (!link2) {
        link2 = document.createElement("link");
        link2.rel = "apple-touch-icon";
        document.getElementsByTagName("head")[0].appendChild(link2);
      }
      link.href = Logo;
      link2.href = Logo;
      document.title = process.env.REACT_APP_NAME;
    }
  }, []);

  return (
    <div className="discontinued-page">
      <div className="discontinued-card">
        {/* <div className="discontinued-logo">
          <img src={Logo} alt="Company Logo" />
        </div>*/}

        <div className="discontinued-icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 8V12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 16.01L12.01 15.9989"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M10.29 3.86L1.82 18C1.43 18.65 1.23 18.98 1.28 19.25C1.32 19.48 1.47 19.68 1.67 19.8C1.9 19.95 2.28 19.95 3.03 19.95H20.97C21.72 19.95 22.1 19.95 22.33 19.8C22.53 19.68 22.68 19.48 22.72 19.25C22.77 18.98 22.57 18.65 22.18 18L13.71 3.86C13.32 3.21 13.12 2.89 12.87 2.78C12.65 2.68 12.35 2.68 12.13 2.78C11.88 2.89 11.68 3.21 11.29 3.86Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <h1>Application Discontinued</h1>

        <p className="discontinued-description">
          This application is no longer available and has been permanently
          discontinued.
        </p>

        <div className="discontinued-notice">
          <div className="notice-dot" />

          <div>
            <strong>Service unavailable</strong>
            <p>
              We have moved to a new platform to provide a better and more
              reliable experience.
            </p>
          </div>
        </div>

        <p className="discontinued-footer">
          If you believe you should still have access, please contact your
          administrator for assistance.
        </p>
      </div>
    </div>
  );

  // return (
  //   <Provider store={store}>
  //     <DataProvider>
  //       <Router>
  //         <Routers />
  //       </Router>
  //     </DataProvider>
  //   </Provider>
  // );
};

export default App;
