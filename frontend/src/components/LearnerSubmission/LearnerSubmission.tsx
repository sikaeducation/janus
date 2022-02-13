import { useAuth0 } from "@auth0/auth0-react";
import { format } from "date-fns";
import { useContext } from "react";
import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";
import { programContext } from "../../contexts/program";
import useIndicator from "../../hooks/use-indicator";
import AppContent from "../AppContent";
import LearnerSubmissionEvaluable from "../LearnerSubmissionEvaluable";
import "./LearnerSubmission.scss";

const formatTime = (dateTime: string) => format(new Date(dateTime), "p");

type props = {
  performance: evaluatedSubmissionPerformance;
};

export default function LearnerSubmission({ performance }: props) {
  const { user } = useAuth0();
  const getIndicator = useIndicator();
  const role = (user && user["https://sikaeducation.com/role"]) || "";

  const { postsBySlug } = useContext(programContext);
  const post = postsBySlug[performance.postSlug];
  const path = post?.path || "";

  const indicator = getIndicator(performance);

  const title = post.label?.short || post.label?.full || "";

  return (
    <div className="LearnerSubmission">
      <p className="description">
        {performance.userId} submitted{" "}
        <a href={performance.payload.url}>{title}</a>.
      </p>
      <ul className="meta">
        <li>
          <time>{formatTime(performance.createdAt)}</time>
        </li>
        <li>
          <Link to={path}>Original activity</Link>
        </li>
      </ul>
      <span className="evaluation-status">{indicator}</span>
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
            isContained
            content={performance?.evaluation?.feedback || ""}
            className="evaluation-feedback"
          />
        </>
      )}
    </div>
  );
}
