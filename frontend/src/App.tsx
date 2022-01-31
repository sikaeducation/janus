import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import CurriculumViewer from "./views/CurriculumViewer";
import ProgramViewer from "./views/ProgramViewer";
import AppMissing from "./views/AppMissing";
import AppLoading from "./views/AppLoading";
import AppError from "./views/AppError";
import AppHeader from "./components/AppHeader";
import AppHome from "./views/AppHome";
import AppFooter from "./components/AppFooter";
import { SocketProvider } from "./contexts/socket";
import { PerformanceProvider } from "./contexts/performance";
import "./App.scss";

import { useProgram } from "./services/program";

function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  const program = useProgram(1);

  return (
    <div className="App">
      <AppHeader programLabel={program?.label || ""} />
      <main>
        {isAuthenticated && isLoading ? <AppLoading /> : null}
        {!isAuthenticated && !isLoading ? <AppHome /> : null}
        {isAuthenticated && (
          <SocketProvider>
            <Routes>
              <Route path="/loading" element={<AppLoading />} />
              <Route path="/error" element={<AppError />} />
              <Route path="/404" element={<AppMissing />} />
              {program ? (
                <>
                  <Route
                    path="/program-viewer"
                    element={<ProgramViewer program={program} />}
                  />
                  <Route
                    path="*"
                    element={
                      <PerformanceProvider>
                        <CurriculumViewer program={program} />
                      </PerformanceProvider>
                    }
                  />
                </>
              ) : (
                <Route path="*" element={<AppLoading />} />
              )}
            </Routes>
          </SocketProvider>
        )}
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
