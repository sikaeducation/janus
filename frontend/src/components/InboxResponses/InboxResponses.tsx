import Gravatar from "react-gravatar";
import AppContent from "../AppContent";
import "./InboxResponses.scss";

type props = {
  performances: postedPromptPerformance[];
};

export default function InboxResponses({ performances }: props) {
  const promptPerformances = performances.filter(
    (performance) => performance.type === "prompt"
  );
  return (
    <div className="InboxResponses">
      <h2>Responses</h2>
      {promptPerformances.length && (
        <p className="response-count">Count: {promptPerformances.length}</p>
      )}
      <ul>
        {promptPerformances.map((performance) => (
          <li key={performance.id}>
            <div className="learner-response">
              <Gravatar email={performance.userId} size={60} />
              <div>
                <div className="username">{performance.userId}:</div>
                <AppContent
                  isContained
                  className="response-content"
                  content={performance.payload.response || ""}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
