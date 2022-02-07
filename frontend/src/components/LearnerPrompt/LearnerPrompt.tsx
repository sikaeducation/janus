import AppContent from "../AppContent";
import "./LearnerPrompt.scss";

export default function LearnerPrompt({
  performance,
}: {
  performance: evaluatedSubmissionPerformance;
}) {
  return (
    <div className="prompt-response">
      <AppContent content={performance.payload.prompt || ""} />
      <AppContent content={performance.payload.response || ""} />
    </div>
  );
}
