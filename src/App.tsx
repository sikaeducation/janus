import { useSelector } from "react-redux";
import AppLoading from "./views/AppLoading";
import AppHeader from "./components/AppHeader";
import AppHome from "./views/AppHome";
import AppFooter from "./components/AppFooter";
import "./App.scss";

import ToastProvider from "./contexts/toast";
import AuthenticatedRoutes from "./views/AuthenticatedRoutes";
import { RootState } from "./store";
import useAuth from "./hooks/use-auth";

function App(){
	useAuth();
	const { isLoading, isAuthenticated } = useSelector((state: RootState) => state.user);

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
