import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./utilities/scroll-to-top";
import App from "./App";
import store from "./store";
import reportWebVitals from "./reportWebVitals";
// These are blocked waiting for eslint to support the `exports` key in package.json
// eslint-disable-next-line
import "@sikaeducation/ui/components.css";
// eslint-disable-next-line
import "@sikaeducation/ui/reset";

if (process.env.NODE_ENV !== "production") {
	// eslint-disable-next-line
	console.log("Environment:");
	// eslint-disable-next-line
	console.table(process.env);
}

ReactDOM.render(<React.StrictMode>
	<Auth0Provider
		domain={process.env.REACT_APP_AUTH_ZERO_DOMAIN ?? ""}
		clientId={process.env.REACT_APP_CLIENT_ID ?? ""}
		redirectUri={window.location.origin}
		audience={process.env.REACT_APP_AUTH_ZERO_AUDIENCE}
		scope="openid"
	>
		<ReduxProvider store={store}>
			<Router>
				<ScrollToTop />
				<App />
			</Router>
		</ReduxProvider>
	</Auth0Provider>
</React.StrictMode>,
document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
