import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { setUser } from "./slices/userSlice";
import AppLoading from "./views/AppLoading";
import AppHeader from "./components/AppHeader";
import AppHome from "./views/AppHome";
import AppFooter from "./components/AppFooter";
import "./App.scss";
import tokenAccessors from "./slices/security";

import ToastProvider from "./contexts/toast";
import AuthenticatedRoutes from "./views/AuthenticatedRoutes";

const { setTokenFetcher } = tokenAccessors;

function App() {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const dispatch = useDispatch();
  if (user) {
    dispatch(setUser(user));
  }

  setTokenFetcher(getAccessTokenSilently);

  return (
    <div className="App">
      <AppHeader />
      {isLoading && <AppLoading />}
      {!isAuthenticated && !isLoading && <AppHome />}
      {isAuthenticated && (
        <main>
          <ToastProvider>
            <AuthenticatedRoutes />
          </ToastProvider>
        </main>
      )}
      <AppFooter />
    </div>
  );
}

export default App;
