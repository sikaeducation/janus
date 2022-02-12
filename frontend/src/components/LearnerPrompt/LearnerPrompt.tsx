import { format } from "date-fns";
import AppContent from "../AppContent";
import "./LearnerPrompt.scss";

const formatTime = (dateTime: string) => format(new Date(dateTime), "p");

export default function LearnerPrompt({
  performance,
}: {
  performance: postedPromptPerformance;
}) {
  return (
    <div className="LearnerPrompt">
      <p className="description">{performance.userId} answered a prompt.</p>
      <ul className="meta">
        <li>
          <time>{formatTime(performance.createdAt)}</time>
        </li>
      </ul>
      <div className="prompt-response">
        <AppContent
          className="prompt"
          isContained
          content={performance.payload.prompt || ""}
        />
        <AppContent
          className="response"
          isContained
          content={performance.payload.response || ""}
        />
      </div>
    </div>
  );
}
