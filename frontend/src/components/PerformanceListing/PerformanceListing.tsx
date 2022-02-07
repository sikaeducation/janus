import { useContext } from "react";
import { programContext } from "../../contexts/program";
import LearnerSubmission from "../LearnerSubmission";
import LearnerViewing from "../LearnerViewing";
import "./PerformanceListing.scss";

type props = {
  performance: evaluatedSubmissionPerformance;
};

export default function PerformanceListing({ performance }: props) {
  const { postsBySlug } = useContext(programContext);
  return getSubmissionComponent(performance, postsBySlug[performance.postSlug]);
}

function getSubmissionComponent(
  performance: postedPerformance,
  post: hydratedPost
) {
  const components = {
    view: (
      <LearnerViewing
        performance={performance as postedViewPerformance}
        post={post}
      />
    ),
    submission: (
      <LearnerSubmission
        performance={performance as evaluatedSubmissionPerformance}
        post={post}
      />
    ),
  } as const;
  return components[performance.type];
}
