import { useLocation, Navigate } from "react-router-dom";

import "./AppShell.scss";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import UnitNavigation from "../../components/UnitNavigation";
import CrumbNavigation from "../../components/CrumbNavigation";
import AppContent from "../../components/AppContent";
import ActivityNavigation from "../../components/ActivityNavigation";

// import getUnitLinks from "../../services/unit-links";
import getCrumbLinks from "../../services/crumb-links";
import getNextLink from "../../services/next-link";
// import getCurrentPost from "../../services/current-post";

type props = {
  program: programData;
};

function getUnitLinks(posts: post[], unitIds: number[], currentPath: string) {
  return posts
    .filter((post) => unitIds.includes(post.id))
    .map((unit, index) => ({
      id: index + 1,
      path: `/${unit.slug}`,
      label: unit.label.tiny,
      isActive: currentPath.startsWith(`/${unit.slug}`),
    }));
}

function getCurrentPost(posts: post[], path: string) {
  const segments = path.split("/");
  const slug = segments[segments.length - 1];
  return posts.find((post) => post.slug === slug);
}

function AppShell({ program }: props) {
  const path = useLocation().pathname;
  const unitLinks = getUnitLinks(program.posts, program.root.children, path);
  const currentPost =
    path === "/" ? program.root : getCurrentPost(program.posts, path);
  if (!currentPost) return <Navigate replace to="/404" />;
  const crumbLinks = getCrumbLinks(program.posts, currentPost);
  const nextLink = getNextLink(program.posts, currentPost, program.root);
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
