import "./AppShell.scss";
import { useLocation } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import UnitNavigation from "../../components/UnitNavigation";
import CrumbNavigation from "../../components/CrumbNavigation";
import AppContent from "../../components/AppContent";

import currentContent from "../../hooks/current-content";
import currentProgram from "../../hooks/current-program";

function App() {
  const { pathname } = useLocation();
  const { crumbs, content } = currentContent(pathname);
  const { program, unitLinks } = currentProgram();

  return (
    <div className="App">
      <AppHeader programLabel={program.label} />
      <main>
        <div className="content-container">
          <UnitNavigation units={unitLinks} />
          <CrumbNavigation links={crumbs} />
          <AppContent content={content} />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
