/* eslint no-nested-ternary: "off" */
import { useAuth0 } from "@auth0/auth0-react";
import {
  faCheckCircle,
  faClipboardCheck,
  faExternalLinkAlt,
  faQuestionCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { format } from "date-fns";
import { useContext, useState } from "react";
import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";
import { performanceContext } from "../../contexts/performance";
import AppContent from "../AppContent";
import PreviousFeedback from "../PreviousFeedback";
import "./LearnerSubmission.scss";

const formatTime = (dateTime: string) => format(new Date(dateTime), "p");

type props = {
  performance: evaluatedSubmissionPerformance;
  post?: hydratedPost;
};

export default function LearnerSubmission({ performance, post }: props) {
  const [feedback, setFeedback] = useState("");
  const { user } = useAuth0();
  const role = (user && user["https://sikaeducation.com/role"]) || "";
  const [evaluationStatus, setEvaluationStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { performancesWithEvaluations, postEvaluation } =
    useContext(performanceContext);

  if (performance.type !== "submission") {
    return null;
  }
  const title = post?.label?.short || post?.label?.full || "";
  const path = post?.path || "";

  const statuses = {
    submitted: <FontAwesomeIcon icon={faQuestionCircle} className="pending" />,
    rejected: <FontAwesomeIcon icon={faClipboardCheck} className="failure" />,
    accepted: <FontAwesomeIcon icon={faClipboardCheck} className="success" />,
  } as const;
  const status = statuses[performance?.evaluation?.status || "submitted"];

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const evaluation = {
      performanceId: performance.id,
      learnerId: performance.userId,
      evaluatorId: user?.email || "",
      feedback,
      status: evaluationStatus as "accepted" | "rejected",
    };
    postEvaluation(evaluation);
    setFeedback("");
    setEvaluationStatus("");
    setShowForm(false);
  };

  const previousPerformances = performancesWithEvaluations.filter(
    (evaluatedPerformance) => {
      return (
        evaluatedPerformance.userId === performance.userId &&
        evaluatedPerformance.postSlug === performance.postSlug &&
        evaluatedPerformance.id !== performance.id
      );
    }
  );

  return (
    <div className="LearnerSubmission">
      <Gravatar default="identicon" email={performance.userId} size={60} />
      {title ? (
        <p>
          {performance.userId} submitted{" "}
          <a href={performance.payload.url}>{title}</a>.
        </p>
      ) : (
        <p>{performance.userId} answered a prompt:</p>
      )}
      <ul className="meta">
        <li>
          <time>{formatTime(performance.createdAt)}</time>
        </li>
        {path ? (
          <li>
            <Link to={path} target="_blank" rel="noopener noreferrer">
              Original activity
            </Link>
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </li>
        ) : null}
      </ul>
      <span className="evaluation-status">{status}</span>
      {performance.payload.response && performance.payload.prompt ? (
        <div className="prompt-response">
          <AppContent content={performance.payload.prompt} />
          <AppContent content={performance.payload.response} />
        </div>
      ) : null}
      {showForm ? (
        <form onSubmit={handleSubmit}>
          {previousPerformances.length > 0 ? (
            <>
              <p>Previous feedback</p>
              <PreviousFeedback performances={previousPerformances} />
            </>
          ) : null}
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            onChange={(event) => setFeedback(event.target.value)}
            id="feedback"
            className="feedback"
            value={feedback}
          />
          <div className="status-buttons">
            <button
              type="button"
              className={classNames({
                active: evaluationStatus === "rejected",
                failure: true,
              })}
              onClick={() => setEvaluationStatus("rejected")}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
            <button
              type="button"
              onClick={() => setEvaluationStatus("accepted")}
              className={classNames({
                active: evaluationStatus === "accepted",
                success: true,
              })}
            >
              <FontAwesomeIcon icon={faCheckCircle} className="accepted" />
            </button>
          </div>
          <div className="submission-container">
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <input type="submit" value="Send Evaluation" />
          </div>
        </form>
      ) : !performance.evaluation && role === "coach" ? (
        !performance.payload.prompt ? (
          <div className="toggle-evaluation-form">
            <button type="button" onClick={() => setShowForm(true)}>
              Evaluate
            </button>
          </div>
        ) : null
      ) : (
        <div className="existing-feedback">
          <AppContent content={performance?.evaluation?.feedback || ""} />
        </div>
      )}
    </div>
  );
}
