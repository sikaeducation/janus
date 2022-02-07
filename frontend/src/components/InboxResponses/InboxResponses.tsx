import Gravatar from "react-gravatar";
import AppContent from "../AppContent";
import "./InboxResponses.scss";

type props = {
  performances: postedPromptPerformance[];
};

export default function InboxResponses({ performances }: props) {
  return (
    <ul className="responses">
      {performances.map(
        (performance) =>
          performance.type === "prompt" && (
            <li key={performance.id}>
              <div className="prompt-response">
                <Gravatar email={performance.userId} size={60} />
                <AppContent content={performance.payload.response || ""} />
              </div>
            </li>
          )
      )}
    </ul>
  );
}
