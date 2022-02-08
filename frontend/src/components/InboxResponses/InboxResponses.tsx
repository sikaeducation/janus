import Gravatar from "react-gravatar";
import AppContent from "../AppContent";
import "./InboxResponses.scss";

type props = {
  performances: postedPromptPerformance[];
};

export default function InboxResponses({ performances }: props) {
  return (
    <ul className="InboxResponses">
      {performances.map(
        (performance) =>
          performance.type === "prompt" && (
            <li key={performance.id}>
              <div className="learner-response">
                <Gravatar email={performance.userId} size={60} />
                <div>
                  <span className="username">{performance.userId}</span>
                  <AppContent content={performance.payload.response || ""} />
                </div>
              </div>
            </li>
          )
      )}
    </ul>
  );
}
