import { useAuth0 } from "@auth0/auth0-react";
import AppLoading from "./views/AppLoading";
import AppHeader from "./components/AppHeader";
import AppHome from "./views/AppHome";
import AppFooter from "./components/AppFooter";
import "./App.scss";

import ToastProvider from "./contexts/toast";
import AuthenticatedRoutes from "./views/AuthenticatedRoutes";

function App() {
  const { isLoading, isAuthenticated } = useAuth0();

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
