import AppContent from "../AppContent";
import "./LearnerPrompt.scss";

export default function LearnerPrompt({
  performance,
}: {
  performance: postedPromptPerformance;
}) {
  return (
    <>
      <p className="DescriptionPrompt description">
        {performance.userId} answered a prompt.
      </p>
      <div className="prompt-response">
        <AppContent
          wrapperClassName="flat"
          content={performance.payload.prompt || ""}
        />
        <AppContent
          wrapperClassName="flat"
          content={performance.payload.response || ""}
        />
      </div>
    </>
  );
}
