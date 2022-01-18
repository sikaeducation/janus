import { useLocation, Navigate } from "react-router-dom";

import "./AppShell.scss";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import UnitNavigation from "../../components/UnitNavigation";
import CrumbNavigation from "../../components/CrumbNavigation";
import AppContent from "../../components/AppContent";
import ActivityNavigation from "../../components/ActivityNavigation";

import { getCurrentPost, getLinks } from "../../services/program";

type props = {
  program: programData;
};

function AppShell({ program }: props) {
  const path = useLocation().pathname;
  const currentPost =
    path === "/" ? program.root : getCurrentPost(program.posts, path);
  if (!currentPost) return <Navigate replace to="/404" />;
  const { unitLinks, crumbLinks, nextLink } = getLinks(program, currentPost);

  return (
    <div className="App">
      <AppHeader programLabel={program.label} />
      <main>
        <div className="content-container">
          <UnitNavigation units={unitLinks} />
          <CrumbNavigation links={crumbLinks} />
          <AppContent content={currentPost.content} />
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
