import "./EvaluatorPerformance.scss";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Gravatar from "react-gravatar";
import { Markdown } from "@sikaeducation/ui";

const formatDateTime = (dateTime: string) =>
  format(new Date(dateTime), "M/d/yy p");

type props = {
  path: string;
  performance: evaluatedQuestionPerformance;
  feedback: string;
  updateFeedback: (
    learnerId: string,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  status: string;
  updateStatus: (
    learnerId: string,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function EvaluatorPerformance({
  path,
  performance,
  feedback,
  updateFeedback,
  status,
  updateStatus,
}: props) {
  const learnerId = performance?.userId ?? "";
  return (
    <tr className="EvaluatorPerformance">
      <td className="avatar">
        <Gravatar email={learnerId} size={60} title={learnerId} />
      </td>
      <td className="submission-time">
        <time>
          <Link to={path}>{formatDateTime(performance?.createdAt)}</Link>
        </time>
      </td>
      <td className="submission">
        <Markdown content={performance?.payload.response || ""} />
      </td>
      <td className="feedback">
        <input
          onChange={updateFeedback(performance?.userId)}
          value={feedback}
          aria-labelledby="feedback-label"
        />
      </td>
      <td className="evaluation-reject">
        <input
          type="radio"
          name={learnerId}
          checked={status === "rejected"}
          value="rejected"
          onChange={updateStatus(learnerId)}
          aria-labelledby="rejected"
        />
      </td>
      <td className="evaluation-accept">
        <input
          type="radio"
          name={learnerId}
          checked={status === "accepted"}
          value="accepted"
          onChange={updateStatus(learnerId)}
          aria-labelledby="accepted"
        />
      </td>
    </tr>
  );
}
