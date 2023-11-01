import { StrictMode } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "@/utilities/scroll-to-top";
import App from "@/App";
import store from "@/store";
import "@sikaeducation/ui/components.css";
import "@sikaeducation/ui/reset";
import "@sikaeducation/ui/styles";
import { createRoot } from "react-dom/client";
import "@/sentry";

if (
  !import.meta.env.VITE_AUTH_ZERO_DOMAIN ||
  !import.meta.env.VITE_AUTH_ZERO_CLIENT_ID ||
  !import.meta.env.VITE_AUTH_ZERO_AUDIENCE ||
  !import.meta.env.VITE_ACTIVITY_API_BASE_URL
) {
  console.table(import.meta.env);
  throw new Error("Required environment variables not set!");
}

if (import.meta.env.DEV || import.meta.env.MODE === "test") {
  console.log("Environment:");
  console.table(import.meta.env);
}

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <StrictMode>
    <Auth0Provider
      domain={String(import.meta.env.VITE_AUTH_ZERO_DOMAIN)}
      clientId={String(import.meta.env.VITE_AUTH_ZERO_CLIENT_ID)}
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
  </StrictMode>,
);
