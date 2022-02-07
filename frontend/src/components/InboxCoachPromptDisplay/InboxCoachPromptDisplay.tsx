import { useContext } from "react";
import Gravatar from "react-gravatar";
import { performanceContext } from "../../contexts/performance";
import AppContent from "../AppContent";
import "./InboxCoachPromptDisplay.scss";

type props = {
  tags: string[];
  prompt: string;
  endPrompt: () => void;
  slug: string;
};

export default function CoachInboxPromptDisplay({
  slug,
  tags,
  prompt,
  endPrompt,
}: props) {
  const { performances } = useContext(performanceContext);
  const handleEndPrompt = () => {
    endPrompt();
  };
  return (
    <div className="InboxCoachPromptDisplay">
      <ul className="tags">
        {tags.map((tag) => (
          <li className="tag" key={tag}>
            {tag}
          </li>
        ))}
      </ul>
      <AppContent content={prompt} />
      <div className="submission-section">
        <button onClick={handleEndPrompt} type="button">
          End Prompt
        </button>
      </div>
      <ul className="responses">
        {performances
          .filter((performance) => {
            return performance.postSlug === slug;
          })
          .map((performance) => {
            return performance.type === "prompt" ? (
              <li key={performance.id}>
                <div className="prompt-response">
                  <Gravatar email={performance.userId} size={60} />
                  <AppContent content={performance.payload.response || ""} />
                </div>
              </li>
            ) : (
              (null as never)
            );
          })}
      </ul>
    </div>
  );
}
