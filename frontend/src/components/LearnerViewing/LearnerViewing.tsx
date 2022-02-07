import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import "./LearnerViewing.scss";

type props = {
  performance: postedViewPerformance;
};
const formatTime = (dateTime: string) => format(new Date(dateTime), "p");

export default function LearningViewing({ performance }: props) {
  const checks = {
    1: <FontAwesomeIcon icon={faCheck} className="failure" />,
    2: <FontAwesomeIcon icon={faCheck} className="pending" />,
    3: <FontAwesomeIcon icon={faCheck} className="success" />,
  } as const;

  return (
    <>
      <ul className="meta">
        <li>
          <time>{formatTime(performance.createdAt)}</time>
        </li>
      </ul>
      <span className="evaluation-status">
        {checks[performance.payload.confidenceLevel as confidenceLevel]}
      </span>
    </>
  );
}
