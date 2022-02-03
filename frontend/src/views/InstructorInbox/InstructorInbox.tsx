import { useAuth0 } from "@auth0/auth0-react";
import { format } from "date-fns";
import { createRef, useContext, useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import Gravatar from "react-gravatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { performanceContext } from "../../contexts/performance";
import "./InstructorInbox.scss";
import { programContext } from "../../contexts/program";
import LearnerSubmission from "../../components/LearnerSubmission";

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
        1: <FontAwesomeIcon icon={faCheck} className="failure" />,
        2: <FontAwesomeIcon icon={faCheck} className="pending" />,
        3: <FontAwesomeIcon icon={faCheck} className="success" />,
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
      return (
        <LearnerSubmission submittedPerformance={performance} post={post} />
      );
    }
  }
}

export default function InstructorInbox() {
  const { isAuthenticated } = useAuth0();
  const { performances, performancesByDay } = useContext(performanceContext);
  const { postsBySlug } = useContext(programContext);
  const lastMessageRef = createRef<HTMLLIElement>();
  const isInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (performances.length > 0 && !isInitialized.current) {
      isInitialized.current = true;
      lastMessageRef?.current?.scrollIntoView();
    }
  }, [performances, isInitialized, lastMessageRef]);

  if (!isAuthenticated) return <Navigate replace to="/" />;

  return (
    <div className="InstructorInbox">
      <h1>Learner Performances</h1>
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
