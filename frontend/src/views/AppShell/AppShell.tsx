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
import getCurrentPost from "../../services/current-post";

type props = {
  program: programData;
};

function AppShell({ program }: props) {
  const path = useLocation().pathname.substring(1);
  if (!program.posts.length) return <Navigate replace to="/404" />;
  const unitLinks = getUnitLinks(program.posts, path);
  if (!path) return <Navigate replace to={unitLinks[0].path} />;
  const currentPost = getCurrentPost(program.posts, path);
  if (!currentPost) return <Navigate replace to="/404" />;
  const crumbLinks = getCrumbLinks(program.posts, currentPost);
  const nextLink = getNextLink(program.posts, currentPost);
  const { content } = currentPost;

  return (
    <div className="App">
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
