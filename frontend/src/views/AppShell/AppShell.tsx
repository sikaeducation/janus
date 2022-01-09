import { useLocation, Navigate } from "react-router-dom";

import "./AppShell.scss";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import UnitNavigation from "../../components/UnitNavigation";
import CrumbNavigation from "../../components/CrumbNavigation";
import AppContent from "../../components/AppContent";
import ActivityNavigation from "../../components/ActivityNavigation";

import getUnitLinks from "../../services/unit-links";
import getCrumbLinks from "../../services/crumb-links";
import getNextLink from "../../services/next-link";
import getCurrentProgram from "../../services/program-details";
import getCurrentPost from "../../services/current-post";

function AppShell() {
  const path = useLocation().pathname.substring(1);
  const program = getCurrentProgram();
  const unitLinks = getUnitLinks(path);
  const currentPost = getCurrentPost(path);
  const crumbLinks = getCrumbLinks(currentPost);
  const nextLink = getNextLink(currentPost);
  const { content } = currentPost;

  return (
    <div className="App">
      {path ? "" : <Navigate replace to={unitLinks[0].path} />}
      <AppHeader programLabel={program.label} />
      <main>
        <div className="content-container">
          <UnitNavigation units={unitLinks} />
          <CrumbNavigation links={crumbLinks} />
          <AppContent content={content} />
          {nextLink && (
            <ActivityNavigation
              nextSlug={nextLink.path}
              nextLabel={nextLink.label}
            />
          )}
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

export default AppShell;
