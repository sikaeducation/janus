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
    <>
      <p className="description">{performance.userId} answered a prompt.</p>
      <ul className="meta">
        <li>
          <time>{formatTime(performance.createdAt)}</time>
        </li>
      </ul>
      <div className="prompt-response">
        <AppContent
          wrapperClassName="contained"
          content={performance.payload.prompt || ""}
        />
        <AppContent
          wrapperClassName="contained"
          content={performance.payload.response || ""}
        />
      </div>
    </>
  );
}
