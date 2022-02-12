import { useAuth0 } from "@auth0/auth0-react";
import {
  faClipboardCheck,
  faExternalLinkAlt,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useContext } from "react";
import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";
import { programContext } from "../../contexts/program";
import AppContent from "../AppContent";
import LearnerQuestionEvaluable from "../LearnerQuestionEvaluable";
import "./LearnerQuestion.scss";

const formatTime = (dateTime: string) => format(new Date(dateTime), "p");

type props = {
  performance: evaluatedQuestionPerformance;
};

export default function LearnerQuestion({ performance }: props) {
  const { user } = useAuth0();
  const role = (user && user["https://sikaeducation.com/role"]) || "";

  const { postsBySlug } = useContext(programContext);
  const post = postsBySlug[performance.payload?.originalPostSlug];
  const statusIcons = {
    submitted: <FontAwesomeIcon icon={faQuestion} className="pending" />,
    rejected: <FontAwesomeIcon icon={faClipboardCheck} className="failure" />,
    accepted: <FontAwesomeIcon icon={faClipboardCheck} className="success" />,
  } as const;
  const statusIcon = statusIcons[performance.evaluation?.status || "submitted"];
  const title = post.label?.short || post.label?.full || "";
  const { path } = post;

  return (
    <div className="LearnerQuestion">
      <p className="description">
        {performance.userId} submitted a question response from {title}
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
      <div className="question-prompt-response">
        <AppContent
          className="prompt"
          isContained
          content={performance.payload.prompt}
        />
        <AppContent
          className="response"
          isContained
          content={performance.payload.response}
        />
      </div>
      <span className="evaluation-status">{statusIcon}</span>
      {role === "coach" && !performance.evaluation?.feedback && (
        <LearnerQuestionEvaluable performance={performance} />
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
            className="evaluation-feedback"
            isContained
            content={performance.evaluation.feedback || ""}
          />
        </>
      )}
    </div>
  );
}
