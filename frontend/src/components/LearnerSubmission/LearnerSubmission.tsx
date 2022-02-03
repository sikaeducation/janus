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
import "./LearnerSubmission.scss";

const formatTime = (dateTime: string) => format(new Date(dateTime), "p");
const formatDateTime = (dateTime: string | undefined) => {
  if (!dateTime) return "";
  return format(new Date(dateTime), "M/d/yy p");
};

type props = {
  submittedPerformance: evaluatedSubmissionPerformance;
  post?: hydratedPost;
};

export default function LearnerSubmission({
  submittedPerformance,
  post,
}: props) {
  const [feedback, setFeedback] = useState("");
  const { user } = useAuth0();
  const role = (user && user["https://sikaeducation.com/role"]) || "";
  const [evaluationStatus, setEvaluationStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { performancesWithEvaluations, postEvaluation } =
    useContext(performanceContext);

  if (submittedPerformance.type !== "submission") {
    return null;
  }
  const title = post?.label?.short || post?.label?.full || "";
  const path = post?.path || "";

  const statuses = {
    submitted: <FontAwesomeIcon icon={faQuestionCircle} className="pending" />,
    rejected: <FontAwesomeIcon icon={faClipboardCheck} className="failure" />,
    accepted: <FontAwesomeIcon icon={faClipboardCheck} className="success" />,
  } as const;
  const status =
    statuses[submittedPerformance?.evaluation?.status || "submitted"];

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const evaluation = {
      performanceId: submittedPerformance.id,
      learnerId: submittedPerformance.userId,
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
    (performance) => {
      return (
        performance.userId === submittedPerformance.userId &&
        performance.postSlug === submittedPerformance.postSlug &&
        performance.id !== submittedPerformance.id
      );
    }
  );

  return (
    <div className="LearnerSubmission">
      <Gravatar email={submittedPerformance.userId} size={60} />
      {title ? (
        <p>
          {submittedPerformance.userId} submitted{" "}
          <a href={submittedPerformance.payload.url}>{title}</a>.
        </p>
      ) : (
        <p>{submittedPerformance.userId} answered a prompt:</p>
      )}
      <ul className="meta">
        <li>
          <time>{formatTime(submittedPerformance.createdAt)}</time>
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
      {submittedPerformance.payload.response &&
      submittedPerformance.payload.prompt ? (
        <div className="prompt-response">
          <AppContent content={submittedPerformance.payload.prompt} />
          <AppContent content={submittedPerformance.payload.response} />
        </div>
      ) : null}
      {showForm ? (
        <form onSubmit={handleSubmit}>
          {previousPerformances.length > 0 ? (
            <>
              <p>Previous feedback</p>
              <ul className="previous-feedback">
                {previousPerformances.map((performance) => (
                  <li key={performance.id}>
                    <div>
                      <a href={performance.payload.url}>
                        <time>
                          {formatDateTime(
                            performance.evaluation?.createdAt || ""
                          )}
                        </time>
                      </a>
                      <AppContent
                        content={performance.evaluation?.feedback || ""}
                      />
                    </div>
                  </li>
                ))}
              </ul>
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
      ) : !submittedPerformance.evaluation && role === "coach" ? (
        !submittedPerformance.payload.prompt ? (
          <div className="toggle-evaluation-form">
            <button type="button" onClick={() => setShowForm(true)}>
              Evaluate
            </button>
          </div>
        ) : null
      ) : (
        <div className="existing-feedback">
          <AppContent
            content={submittedPerformance?.evaluation?.feedback || ""}
          />
        </div>
      )}
    </div>
  );
}
