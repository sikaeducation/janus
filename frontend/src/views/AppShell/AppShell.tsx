import "./AppShell.scss";
import { useLocation } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import UnitNavigation from "../../components/UnitNavigation";
import CrumbNavigation from "../../components/CrumbNavigation";
import AppContent from "../../components/AppContent";

import {
  data,
  getCurrentActivity,
  getUnitLinks,
  getCrumbs,
  getSlugs,
} from "../../data";

function App() {
  const { pathname } = useLocation();

  const { program } = data;
  const slugs = getSlugs(pathname);
  const currentActivity = getCurrentActivity(
    program,
    slugs.unit,
    slugs.section,
    slugs.activity
  );
  const unitLinks = getUnitLinks(program.units);
  const currentCrumbs = getCrumbs(currentActivity);

  return (
    <div className="App">
      <AppHeader programLabel={program.label} />
      <main>
        <div className="content-container">
          <UnitNavigation units={unitLinks} />
          <CrumbNavigation links={currentCrumbs} />
          <AppContent content={currentActivity.content} />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
