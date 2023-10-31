import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "@/utilities/scroll-to-top";
import App from "@/App";
import store from "@/store";
import "@sikaeducation/ui/components.css";
import "@sikaeducation/ui/reset";
import "@sikaeducation/ui/styles";

if (import.meta.env.DEV) {
  console.log("Environment:");
  console.table(import.meta.env);
}

if (
  !import.meta.env.VITE_AUTH_ZERO_DOMAIN ||
  !import.meta.env.VITE_CLIENT_ID ||
  !import.meta.env.VITE_AUTH_ZERO_AUDIENCE
) {
  console.table(import.meta.env);
  throw new Error("Required environment variables not set!");
}

const AuthProvider =
  import.meta.env.NODE_ENV === "test"
    ? ({ children }: { children: ReactNode }) => (
        <Auth0Provider
          domain={import.meta.env.VITE_AUTH_ZERO_DOMAIN || ""}
          clientId={import.meta.env.VITE_CLIENT_ID || ""}
          redirectUri={window.location.origin}
          audience={import.meta.env.VITE_AUTH_ZERO_AUDIENCE}
          scope="openid"
        >
          {children}
        </Auth0Provider>
      )
    : ({ children }: { children: ReactNode }) => <>{children}</>;

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ReduxProvider store={store}>
        <Router>
          <ScrollToTop />
          <App />
        </Router>
      </ReduxProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
