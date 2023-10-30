import { useSelector } from "react-redux";
import AppLoading from "./views/AppLoading";
import AppHeader from "./components/AppHeader";
import AppHome from "./views/AppHome";
import AppFooter from "./components/AppFooter";
import "./App.scss";

import AuthenticatedRoutes from "./views/AuthenticatedRoutes";
import { RootState } from "./store";
import useAuth from "./hooks/use-auth";

function App() {
	useAuth();
	const selector = (state: RootState) => state.user;
	const { isLoading, isAuthenticated } = useSelector(selector);

	return (
		<div className="App">
			<AppHeader />
			{isLoading && <AppLoading />}
			{!isAuthenticated && !isLoading && <AppHome />}
			{isAuthenticated && (
				<main>
					<AuthenticatedRoutes />
				</main>
			)}
			<AppFooter />
		</div>
	);
}

export default App;
