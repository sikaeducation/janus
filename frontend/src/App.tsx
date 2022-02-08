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
import { PromptProvider } from "./contexts/prompt";

function App() {
  const { isLoading, isAuthenticated } = useAuth0();

  return (
    <ProgramProvider>
      <div className="App">
        <AppHeader />
        {isLoading && <AppLoading />}
        {!isAuthenticated && !isLoading && <AppHome />}
        {isAuthenticated && (
          <main>
            <SocketProvider>
              <ToastProvider>
                <PromptProvider>
                  <PerformanceProvider>
                    <AuthenticatedRoutes />
                  </PerformanceProvider>
                </PromptProvider>
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
