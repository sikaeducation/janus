import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

console.log(window.location.origin);
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_ZERO_DOMAIN ?? ""}
      clientId={process.env.REACT_APP_CLIENT_ID ?? ""}
      redirectUri={window.location.origin}
    >
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
