import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { programContext } from "../../contexts/program";
import "./LearnerViewing.scss";

type props = {
  performance: postedViewPerformance;
};
const formatTime = (dateTime: string) => format(new Date(dateTime), "p");

export default function LearningViewing({ performance }: props) {
  const { postsBySlug } = useContext(programContext);
  const post = postsBySlug[performance.postSlug];
  const path = post?.path || "";
  const title = post.label?.short || post.label?.full || "";

  const checks = {
    1: <FontAwesomeIcon icon={faCheck} className="failure" />,
    2: <FontAwesomeIcon icon={faCheck} className="pending" />,
    3: <FontAwesomeIcon icon={faCheck} className="success" />,
  } as const;

  return (
    <div className="LearnerViewing">
      <p className="description">
        {" "}
        {performance.userId} read <Link to={path}>{title}</Link>.{" "}
      </p>
      <ul className="meta">
        <li>
          <time>{formatTime(performance.createdAt)}</time>
        </li>
      </ul>
      <span className="evaluation-status">
        {checks[performance.payload.confidenceLevel as confidenceLevel]}
      </span>
    </div>
  );
}
