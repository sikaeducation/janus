import { useSelector } from "react-redux";
import AppLoading from "./views/AppLoading";
import AppHeader from "./components/AppHeader";
import AppHome from "./views/AppHome";
import AppFooter from "./components/AppFooter";
import { ErrorBoundary } from "react-error-boundary";
import "./App.scss";

import AuthenticatedRoutes from "./views/AuthenticatedRoutes";
import { RootState } from "./store";
import useAuth from "./hooks/use-auth";
import { StatusMessage } from "@sikaeducation/ui";

function App() {
  useAuth();
  const selector = (state: RootState) => state.user;
  const { isLoading, isAuthenticated } = useSelector(selector);

  return (
    <div className="App">
      <AppHeader />
      <ErrorBoundary fallback={<StatusMessage type="general-error" />}>
        {isLoading && <AppLoading />}
        {!isAuthenticated && !isLoading && <AppHome />}
        {isAuthenticated && (
          <main>
            <AuthenticatedRoutes />
          </main>
        )}
      </ErrorBoundary>
      <AppFooter />
    </div>
  );
}

export default App;
