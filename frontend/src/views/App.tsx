import "./App.scss";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import UnitNavigation from "../components/UnitNavigation";
import CrumbNavigation from "../components/CrumbNavigation";
import AppContent from "../components/AppContent";

import { data, getUnitLinks, getCrumbs, getSections } from "../data";

function App() {
  const { program } = data;
  const sections = getSections(program);
  const currentActivity = program.units[0].sections[0].activities[0];
  const unitLinks = getUnitLinks(program.units);
  const currentCrumbs = getCrumbs(program.units, sections, currentActivity);

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
