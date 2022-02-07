/* eslint no-nested-ternary: "off" */
import { useAuth0 } from "@auth0/auth0-react";
import {
  faClipboardCheck,
  faExternalLinkAlt,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useContext, useState } from "react";
import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";
import { performanceContext } from "../../contexts/performance";
import AppContent from "../AppContent";
import SubmissionEvaluationForm from "../SubmissionEvaluationForm";
import "./LearnerSubmission.scss";

const formatTime = (dateTime: string) => format(new Date(dateTime), "p");

type props = {
  performance: evaluatedSubmissionPerformance;
  post?: hydratedPost;
};

export default function LearnerSubmission({ performance, post }: props) {
  const { user } = useAuth0();
  const role = (user && user["https://sikaeducation.com/role"]) || "";
  const [showForm, setShowForm] = useState(false);
  const { performancesWithEvaluations } = useContext(performanceContext);

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
        <SubmissionEvaluationForm
          performance={performance}
          previousPerformances={previousPerformances}
          cancel={() => setShowForm(false)}
        />
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
