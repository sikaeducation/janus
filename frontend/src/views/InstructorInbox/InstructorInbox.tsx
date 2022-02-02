import { useAuth0 } from "@auth0/auth0-react";
import { format } from "date-fns";
import { createRef, useContext, useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import Gravatar from "react-gravatar";
import { groupBy } from "lodash/fp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExternalLinkAlt,
  faQuestionCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { performanceContext } from "../../contexts/performance";
import "./InstructorInbox.scss";
import { programContext } from "../../contexts/program";

const formatDateTime = (dateTime: string) =>
  format(new Date(dateTime), "M/d/yy: p");

const formatTime = (dateTime: string) => format(new Date(dateTime), "p");

function getSubmissionComponent(
  performance: postedPerformance,
  post: hydratedPost
) {
  const title = post.label.short || post.label.full;
  const { path } = post;

  switch (performance.type) {
    case "view": {
      const checks = {
        1: <FontAwesomeIcon icon={faCheckCircle} className="failure" />,
        2: <FontAwesomeIcon icon={faCheckCircle} className="pending" />,
        3: <FontAwesomeIcon icon={faCheckCircle} className="success" />,
      } as const;
      return (
        <div className="LearnerViewing">
          <Gravatar email={performance.userId} size={60} />
          <p>
            {performance.userId} read <Link to={path}>{title}</Link>.
          </p>
          <time>{formatTime(performance.createdAt)}</time>
          <span className="confidence-level">
            {checks[performance.payload.confidenceLevel]}
          </span>
        </div>
      );
    }
    case "submission": {
      const statuses = {
        submitted: (
          <FontAwesomeIcon icon={faQuestionCircle} className="pending" />
        ),
        rejected: <FontAwesomeIcon icon={faTimesCircle} className="failure" />,
        accepted: <FontAwesomeIcon icon={faCheckCircle} className="success" />,
      } as const;
      const status =
        statuses[
          (performance as gradedSubmissionPerformance)?.evaluation?.status ||
            "submitted"
        ];
      return (
        <div className="LearnerSubmission">
          <Gravatar email={performance.userId} size={60} />
          <p>
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
          <span className="evaluation-status">{status}</span>
        </div>
      );
    }
  }
}

export default function InstructorInbox() {
  const { isAuthenticated } = useAuth0();
  const { performances } = useContext(performanceContext);
  const { postsBySlug } = useContext(programContext);
  const lastMessageRef = createRef<HTMLLIElement>();
  const isInitialized = useRef<boolean>(false);
  const performancesByDay = groupBy((performance: postedPerformance) => {
    return format(new Date(performance.createdAt), "yyyy/MM/dd");
  })(performances);
  useEffect(() => {
    if (performances.length > 0 && !isInitialized.current) {
      isInitialized.current = true;
      lastMessageRef?.current?.scrollIntoView();
    }
  }, [performances, isInitialized, lastMessageRef]);

  if (!isAuthenticated) return <Navigate replace to="/" />;

  return (
    <div className="InstructorInbox">
      <h1>Student Activity</h1>
      <div className="submissions">
        {Object.entries(performancesByDay).map(([date, performanceByDay]) => (
          <div key={date}>
            <h2>{format(new Date(date), "eeee, LLLL do")}</h2>
            <ul>
              {performanceByDay.map((performance) => (
                <li key={performance.id}>
                  {getSubmissionComponent(
                    performance,
                    postsBySlug[performance.postSlug]
                  )}
                </li>
              ))}
              <li className="dummy" ref={lastMessageRef} />
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
