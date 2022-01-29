import { useLocation, Navigate } from "react-router-dom";

import "./CurriculumViewer.scss";
import { useAuth0 } from "@auth0/auth0-react";
import UnitNavigation from "../../components/UnitNavigation";
import CrumbNavigation from "../../components/CrumbNavigation";
import AppContent from "../../components/AppContent";
import ActivityNavigation from "../../components/ActivityNavigation";
import ActivityInteraction from "../../components/ActivityInteraction";

import { ActivityProvider } from "../../contexts/activity";

import { getCurrentPost, getLinks } from "../../services/program";

type props = {
  program: hydratedProgram;
};

export default function CurriculumViewer({ program }: props) {
  const { user } = useAuth0();
  const path = useLocation().pathname;
  const currentPost =
    path === "/" ? program.root : getCurrentPost(program.posts, path);
  if (!currentPost) return <Navigate replace to="/404" />;
  const { unitLinks, crumbLinks, nextLink } = getLinks(program, currentPost);

  return (
    <div className="CurriculumViewer">
      <UnitNavigation units={unitLinks} />
      <CrumbNavigation links={crumbLinks} />
      <AppContent content={currentPost.content} />
      <ActivityProvider>
        <ActivityInteraction
          currentConfidenceLevel={undefined}
          postSlug={currentPost.slug}
          userId={user?.id}
        />
      </ActivityProvider>
      {nextLink && (
        <ActivityNavigation
          nextSlug={nextLink.path}
          nextLabel={nextLink.label}
        />
      )}
    </div>
  );
}
