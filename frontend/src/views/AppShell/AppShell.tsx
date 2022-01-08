import { useLocation } from "react-router-dom";

import "./AppShell.scss";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import UnitNavigation from "../../components/UnitNavigation";
import CrumbNavigation from "../../components/CrumbNavigation";
import AppContent from "../../components/AppContent";
import ActivityNavigation from "../../components/ActivityNavigation";

import currentContent from "../../hooks/current-content";
import currentProgram from "../../hooks/current-program";

function AppShell() {
  const { pathname } = useLocation();
  const { content, crumbs, next } = currentContent(pathname);
  const { program, unitLinks } = currentProgram();

  return (
    <div className="App">
      <AppHeader programLabel={program.label} />
      <main>
        <div className="content-container">
          <UnitNavigation units={unitLinks} />
          <CrumbNavigation links={crumbs} />
          <AppContent content={content} />
          {next && (
            <ActivityNavigation nextSlug={next.path} nextLabel={next.label} />
          )}
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

export default AppShell;
