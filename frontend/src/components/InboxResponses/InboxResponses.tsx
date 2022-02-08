import Gravatar from "react-gravatar";
import AppContent from "../AppContent";
import "./InboxResponses.scss";

type props = {
  performances: postedPromptPerformance[];
};

export default function InboxResponses({ performances }: props) {
  return (
    <div className="InboxResponses">
      <h2>Responses</h2>
      <ul>
        {performances.map(
          (performance) =>
            performance.type === "prompt" && (
              <li key={performance.id}>
                <div className="learner-response">
                  <Gravatar email={performance.userId} size={60} />
                  <div>
                    <div className="username">{performance.userId}:</div>
                    <AppContent
                      wrapperClassName="contained"
                      content={performance.payload.response || ""}
                    />
                  </div>
                </div>
              </li>
            )
        )}
      </ul>
    </div>
  );
}
