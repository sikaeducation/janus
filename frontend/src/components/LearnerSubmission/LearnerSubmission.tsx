import { useAuth0 } from "@auth0/auth0-react";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useContext, useState } from "react";
import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";
import { performanceContext } from "../../contexts/performance";
import { programContext } from "../../contexts/program";
import AppContent from "../AppContent";
import EvaluationStatus from "../EvaluationStatus";
import SubmissionEvaluationForm from "../SubmissionEvaluationForm";
import "./LearnerSubmission.scss";

const formatTime = (dateTime: string) => format(new Date(dateTime), "p");

type props = {
  performance: evaluatedSubmissionPerformance;
};

export default function LearnerSubmission({ performance }: props) {
  const { postsBySlug } = useContext(programContext);
  const post = postsBySlug[performance.postSlug];
  const title = post?.label?.short || post?.label?.full || "";
  const path = post?.path || "";
  const { user } = useAuth0();
  const role = (user && user["https://sikaeducation.com/role"]) || "";

  return (
    <div className="LearnerSubmission">
      <Gravatar default="identicon" email={performance.userId} size={60} />
      <p>
        {performance.userId} submitted{" "}
        <a href={performance.payload.url}>{title}</a>.
      </p>
      <ul className="meta">
        <li>
          <time>{formatTime(performance.createdAt)}</time>
        </li>
        {path && (
          <li>
            <Link to={path} target="_blank" rel="noopener noreferrer">
              Original activity
            </Link>
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </li>
        )}
      </ul>
      {role === "coach" ? (
        <LearnerSubmissionReadOnly performance={performance} />
      ) : (
        <LearnerSubmissionEvaluable performance={performance} />
      )}
    </div>
  );
}

function LearnerSubmissionReadOnly({ performance }: props) {
  return (
    <>
      <EvaluationStatus status={performance.evaluation?.status} />
      <div className="existing-feedback">
        <AppContent content={performance?.evaluation?.feedback || ""} />
      </div>
    </>
  );
}

function LearnerSubmissionEvaluable({ performance }: props) {
  const [showForm, setShowForm] = useState(false);
  const { getPreviousEvaluations } = useContext(performanceContext);

  const previousPerformances = getPreviousEvaluations(performance);

  return (
    <>
      <EvaluationStatus status={performance.evaluation?.status} />
      {showForm ? (
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
      )}
    </>
  );
}
