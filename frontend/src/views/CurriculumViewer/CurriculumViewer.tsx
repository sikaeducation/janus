import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";

import "./CurriculumViewer.scss";
import { useAuth0 } from "@auth0/auth0-react";
import UnitNavigation from "../../components/UnitNavigation";
import CrumbNavigation from "../../components/CrumbNavigation";
import AppContent from "../../components/AppContent";
import ActivityNavigation from "../../components/ActivityNavigation";
import ActivityInteraction from "../../components/ActivityInteraction";

import { performanceContext } from "../../contexts/performance";
import { getCurrentPost, getLinks } from "../../services/program";

type props = {
  program: hydratedProgram;
};

export default function CurriculumViewer({ program }: props) {
  const { user, isAuthenticated } = useAuth0();
  const { performances, evaluations } = useContext(performanceContext);
  const path = useLocation().pathname;
  if (!isAuthenticated) return <Navigate replace to="/" />;
  const currentPost =
    path === "/" ? program.root : getCurrentPost(program.posts, path);
  if (!currentPost) return <Navigate replace to="/404" />;
  const { unitLinks, crumbLinks, nextLink } = getLinks(program, currentPost);
  const currentPerformances = performances.filter(
    (performance) => performance.postSlug === currentPost.slug
  );
  const currentPerformancesWithEvaluations = currentPerformances.map(
    (performance) => {
      return {
        ...performance,
        ...{
          evaluation: evaluations.find(
            (evaluation) => evaluation.performanceId === performance.id
          ),
        },
      };
    }
  );
  const allPerformancesWithEvaluations = performances.map((performance) => {
    return {
      ...performance,
      ...{
        evaluation: evaluations.find(
          (evaluation) => evaluation.performanceId === performance.id
        ),
      },
    };
  });

  return (
    <div className="CurriculumViewer">
      <UnitNavigation units={unitLinks} />
      <CrumbNavigation links={crumbLinks} />
      <AppContent
        performances={allPerformancesWithEvaluations}
        content={currentPost.content}
      />
      <ActivityInteraction
        postSlug={currentPost.slug}
        postType={currentPost.type}
        userId={user?.email || ""}
        performances={
          currentPerformancesWithEvaluations as unknown as (postedPerformance & {
            evaluation?: postedEvaluation;
          })[]
        }
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
