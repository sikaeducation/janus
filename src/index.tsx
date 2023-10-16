/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./utilities/scroll-to-top";
import App from "./App";
import store from "./store";
import "@sikaeducation/ui/components.css";
import "@sikaeducation/ui/reset";
import "@sikaeducation/ui/styles";

if (import.meta.env.NODE_ENV !== "production") {
  console.log("Environment:");
  console.table(import.meta.env);
}

interface ImportMeta {
  env: {
    VITE_AUTH_ZERO_DOMAIN: string;
    VITE_CLIENT_ID: string;
    VITE_AUTH_ZERO_AUDIENCE: string;
  };
}

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH_ZERO_DOMAIN ?? ""}
      clientId={import.meta.env.VITE_CLIENT_ID ?? ""}
      redirectUri={window.location.origin}
      audience={import.meta.env.VITE_AUTH_ZERO_AUDIENCE}
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
  document.getElementById("root"),
);
