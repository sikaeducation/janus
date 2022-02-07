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
import { programContext } from "../../contexts/program";
import AppContent from "../AppContent";
import SubmissionEvaluationForm from "../SubmissionEvaluationForm";
import "./LearnerSubmission.scss";

const formatTime = (dateTime: string) => format(new Date(dateTime), "p");

type props = {
  performance: evaluatedSubmissionPerformance;
};

export default function LearnerSubmission({ performance }: props) {
  const { user } = useAuth0();
  const role = (user && user["https://sikaeducation.com/role"]) || "";

  const { postsBySlug } = useContext(programContext);
  const post = postsBySlug[performance.postSlug];
  const path = post?.path || "";

  const statusIcons = {
    submitted: <FontAwesomeIcon icon={faQuestionCircle} className="pending" />,
    rejected: <FontAwesomeIcon icon={faClipboardCheck} className="failure" />,
    accepted: <FontAwesomeIcon icon={faClipboardCheck} className="success" />,
  } as const;
  const statusIcon = statusIcons[performance.evaluation?.status || "submitted"];
  const title = post.label?.short || post.label?.full || "";

  return (
    <>
      <p className="DescriptionSubmission description">
        {performance.userId} submitted{" "}
        <a href={performance.payload.url}>{title}</a>.
      </p>
      <ul className="meta">
        <li>
          <time>{formatTime(performance.createdAt)}</time>
        </li>
        <li>
          <Link to={path} target="_blank" rel="noopener noreferrer">
            Original activity
          </Link>
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </li>
      </ul>
      <span className="evaluation-status">{statusIcon}</span>
      {role === "coach" && !performance.evaluation?.feedback && (
        <LearnerSubmissionEvaluable performance={performance} />
      )}
      {performance.evaluation?.feedback && (
        <>
          <Gravatar
            className="evaluator-avatar"
            default="identicon"
            email={performance.evaluation.evaluatorId}
            size={40}
          />
          <AppContent
            wrapperClassName="evaluation-feedback flat"
            content={performance?.evaluation?.feedback || ""}
          />
        </>
      )}
    </>
  );
}

function LearnerSubmissionEvaluable({ performance }: props) {
  const [showForm, setShowForm] = useState(false);
  const { getPreviousEvaluations } = useContext(performanceContext);

  const previousPerformances = getPreviousEvaluations(performance);

  return showForm ? (
    <SubmissionEvaluationForm
      performance={performance}
      previousPerformances={previousPerformances}
      cancel={() => setShowForm(false)}
    />
  ) : (
    <div className="toggle-evaluation-form">
      <button type="button" onClick={() => setShowForm(true)}>
        Evaluate
      </button>
    </div>
  );
}
