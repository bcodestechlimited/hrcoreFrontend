import "./App.css";
import $ from "jquery";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import DataProvider from "./data/Context";
import store from "./data/Store";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./Routes";
// import { useEffect } from "react";
import { TOKEN, TOKEN_ID } from "./data/Reducers/UserReducer";
import {
	SetAuthCompanyID,
	SetAuthToken,
	SetDefaultHeaders,
} from "./data/Config";
import { ToWords } from "to-words";
import { useEffect } from "react";
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
		<Provider store={store}>
			<DataProvider>
				<Router>
					<Routers />
				</Router>
			</DataProvider>
		</Provider>
	);
};

export default App;
