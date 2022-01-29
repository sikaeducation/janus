import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";

import "./CurriculumViewer.scss";
import { useAuth0 } from "@auth0/auth0-react";
import UnitNavigation from "../../components/UnitNavigation";
import CrumbNavigation from "../../components/CrumbNavigation";
import AppContent from "../../components/AppContent";
import ActivityNavigation from "../../components/ActivityNavigation";
import ActivityInteraction from "../../components/ActivityInteraction";

import { activityContext } from "../../contexts/activity";
import { getCurrentPost, getLinks } from "../../services/program";

type props = {
  program: hydratedProgram;
};

export default function CurriculumViewer({ program }: props) {
  const { user, isAuthenticated } = useAuth0();
  const { activities } = useContext(activityContext);
  const path = useLocation().pathname;
  if (!isAuthenticated) return <Navigate replace to="/" />;
  const currentPost =
    path === "/" ? program.root : getCurrentPost(program.posts, path);
  if (!currentPost) return <Navigate replace to="/404" />;
  const { unitLinks, crumbLinks, nextLink } = getLinks(program, currentPost);
  const currentActivities = activities.filter(
    (activity) => activity.postSlug === currentPost.slug
  );

  return (
    <div className="CurriculumViewer">
      <UnitNavigation units={unitLinks} />
      <CrumbNavigation links={crumbLinks} />
      <AppContent content={currentPost.content} />
      <ActivityInteraction
        postSlug={currentPost.slug}
        postType={currentPost.type}
        userId={user?.email || ""}
        activities={currentActivities}
      />
      {nextLink && (
        <ActivityNavigation
          nextSlug={nextLink.path}
          nextLabel={nextLink.label}
        />
      )}
    </div>
  );
}
