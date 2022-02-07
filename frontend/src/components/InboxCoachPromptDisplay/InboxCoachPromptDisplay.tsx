import { useContext } from "react";
import Gravatar from "react-gravatar";
import { performanceContext } from "../../contexts/performance";
import AppContent from "../AppContent";
import InboxResponses from "../InboxResponses";
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
  const promptPerformances = performances.filter(
    (performance) => performance.postSlug === slug
  ) as postedPromptPerformance[];

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
      <InboxResponses performances={promptPerformances} />
    </div>
  );
}
