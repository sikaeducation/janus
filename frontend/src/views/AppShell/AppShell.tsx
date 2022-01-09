import { useLocation, Navigate } from "react-router-dom";

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
  const path = useLocation().pathname.substring(1);
  const { content, crumbs, next } = currentContent(path);
  const { program, unitLinks } = currentProgram(path);

  return (
    <div className="App">
      {path || <Navigate replace to={unitLinks[0].path} />}
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
