import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurriculumViewer from "./views/CurriculumViewer";
import ProgramViewer from "./views/ProgramViewer";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import "./App.scss";

import { useProgram } from "./services/program";

function App() {
  const program = useProgram(1);

  return (
    <Router>
      <div className="App">
        <AppHeader programLabel={program?.label || ""} />
        <main>
          <Routes>
            <Route
              path="404"
              element={<p>Couldn&lsquo;t find that, sorry!</p>}
            />
            {program ? (
              <>
                <Route
                  path="/program-viewer"
                  element={<ProgramViewer program={program} />}
                />
                <Route
                  path="*"
                  element={<CurriculumViewer program={program} />}
                />
              </>
            ) : (
              <Route path="*" element={<p>Loading...</p>} />
            )}
          </Routes>
        </main>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
