import { useAuth0 } from "@auth0/auth0-react";
import AppLoading from "./views/AppLoading";
import AppHeader from "./components/AppHeader";
import AppHome from "./views/AppHome";
import AppFooter from "./components/AppFooter";
import { SocketProvider } from "./contexts/socket";
import { PerformanceProvider } from "./contexts/performance";
import "./App.scss";

import ToastProvider from "./contexts/toast";
import AuthenticatedRoutes from "./views/AuthenticatedRoutes";
import { ProgramProvider } from "./contexts/program";

function App() {
  const { isLoading, isAuthenticated } = useAuth0();

  return (
    <ProgramProvider>
      <div className="App">
        <AppHeader />
        {isAuthenticated && isLoading ? <AppLoading /> : null}
        {!isAuthenticated && !isLoading ? <AppHome /> : null}
        {isAuthenticated && (
          <main>
            <SocketProvider>
              <ToastProvider>
                <PerformanceProvider>
                  <AuthenticatedRoutes />
                </PerformanceProvider>
              </ToastProvider>
            </SocketProvider>
          </main>
        )}
        <AppFooter />
      </div>
    </ProgramProvider>
  );
}

export default App;
