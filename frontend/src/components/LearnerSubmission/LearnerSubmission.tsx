import { useAuth0 } from "@auth0/auth0-react";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useContext, useState } from "react";
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
  const { user } = useAuth0();
  const role = (user && user["https://sikaeducation.com/role"]) || "";

  const { postsBySlug } = useContext(programContext);
  const post = postsBySlug[performance.postSlug];
  const path = post?.path || "";

  return (
    <>
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
      <EvaluationStatus status={performance.evaluation?.status} />
      {role === "coach" && (
        <LearnerSubmissionEvaluable performance={performance} />
      )}
      {performance.evaluation?.feedback && (
        <div className="existing-feedback">
          <AppContent content={performance?.evaluation?.feedback || ""} />
        </div>
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
