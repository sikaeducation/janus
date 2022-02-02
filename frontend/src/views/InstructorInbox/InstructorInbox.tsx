import { useAuth0 } from "@auth0/auth0-react";
import { format } from "date-fns";
import { createRef, useContext, useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import Gravatar from "react-gravatar";
import { groupBy } from "lodash/fp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { performanceContext } from "../../contexts/performance";
import "./InstructorInbox.scss";

const formatDateTime = (dateTime: string) =>
  format(new Date(dateTime), "M/d/yy: p");

const formatTime = (dateTime: string) => format(new Date(dateTime), "p");

function getSubmissionComponent(performance: postedPerformance) {
  switch (performance.type) {
    case "view": {
      const checks = {
        1: <FontAwesomeIcon icon={faCheckCircle} className="failure" />,
        2: <FontAwesomeIcon icon={faCheckCircle} className="warning" />,
        3: <FontAwesomeIcon icon={faCheckCircle} className="success" />,
      };
      return (
        <div className="LearnerSubmission">
          <Gravatar email={performance.userId} size={60} />
          <p>
            {performance.userId} read{" "}
            <Link to="#something">{performance.postSlug}</Link>.
          </p>
          <span className="confidence-level">
            {checks[performance.payload.confidenceLevel]}
          </span>
          <time>{formatTime(performance.createdAt)}</time>
        </div>
      );
    }
    case "submission": {
      return (
        <div>
          <a href={performance.payload.url}>Submission</a>
        </div>
      );
    }
  }
}

export default function InstructorInbox() {
  const { isAuthenticated } = useAuth0();
  const { performances } = useContext(performanceContext);
  const lastMessageRef = createRef<HTMLLIElement>();
  const isInitialized = useRef<boolean>(false);
  const performancesByDay = groupBy((performance: postedPerformance) => {
    return format(new Date(performance.createdAt), "yyyy/MM/dd");
  })(performances);
  console.log(performancesByDay);

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
                  {getSubmissionComponent(performance)}
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
