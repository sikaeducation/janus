import { useAuth0 } from "@auth0/auth0-react";
import { format } from "date-fns";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Gravatar from "react-gravatar";
import { performanceContext } from "../../contexts/performance";
import "./InstructorInbox.scss";

type props = {
  program: hydratedProgram;
};

function getSubmissionComponent(performance: postedPerformance) {
  switch (performance.type) {
    case "view": {
      return <div>View! Confidence: {performance.payload.confidenceLevel}</div>;
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

export default function InstructorInbox({ program }: props) {
  const { isAuthenticated } = useAuth0();
  const { performances } = useContext(performanceContext);
  if (!isAuthenticated) return <Navigate replace to="/" />;
  const formatDateTime = (dateTime: string) =>
    format(new Date(dateTime), "M/d/yy: p");
  return (
    <div className="InstructorInbox">
      <ul className="submissions">
        {performances.map((performance) => (
          <li key={performance.id}>
            <div className="LearnerSubmission">
              <Gravatar email={performance.userId} size={60} />
              <time>{formatDateTime(performance.createdAt)}</time>
              <span>{performance.postSlug}</span>
              Check it out: {getSubmissionComponent(performance)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
