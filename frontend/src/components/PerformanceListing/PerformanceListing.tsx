import AppContent from "../AppContent";
import EvaluationStatus from "../EvaluationStatus";
import LearnerSubmission from "../LearnerSubmission";
import LearnerViewing from "../LearnerViewing";
import "./PerformanceListing.scss";

type props = {
  performance: postedPerformance;
};

export default function PerformanceListing({ performance }: props) {
  const components = {
    view: <LearnerViewing performance={performance as postedViewPerformance} />,
    submission: (
      <LearnerSubmission
        performance={performance as evaluatedSubmissionPerformance}
      />
    ),
    prompt: (
      <LearnerPrompt
        performance={performance as evaluatedSubmissionPerformance}
      />
    ),
  } as const;
  const isPrompt = !!(performance as evaluatedSubmissionPerformance)?.payload
    ?.prompt;
  if (isPrompt) return components.prompt;
  return components[performance.type];
}

function LearnerPrompt({
  performance,
}: {
  performance: evaluatedSubmissionPerformance;
}) {
  return (
    <>
      <EvaluationStatus status={performance.evaluation?.status} />
      <div className="prompt-response">
        <AppContent content={performance.payload.prompt || ""} />
        <AppContent content={performance.payload.response || ""} />
      </div>
    </>
  );
}
