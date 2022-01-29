import { Routes, Route } from "react-router-dom";
import CurriculumViewer from "./views/CurriculumViewer";
import ProgramViewer from "./views/ProgramViewer";
import AppMissing from "./views/AppMissing";
import AppLoading from "./views/AppLoading";
import AppError from "./views/AppError";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import { ActivityProvider } from "./contexts/activity";
import "./App.scss";

import { useProgram } from "./services/program";

function App() {
  const program = useProgram(1);

  return (
    <div className="App">
      <AppHeader programLabel={program?.label || ""} />
      <main>
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
                  <ActivityProvider>
                    <CurriculumViewer program={program} />
                  </ActivityProvider>
                }
              />
            </>
          ) : (
            <Route path="*" element={<AppLoading />} />
          )}
        </Routes>
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
