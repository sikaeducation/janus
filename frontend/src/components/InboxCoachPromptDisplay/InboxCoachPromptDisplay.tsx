import { useContext } from "react";
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
    (performance): performance is postedPromptPerformance =>
      performance.postSlug === slug
  );

  const handleEndPrompt = () => {
    endPrompt();
  };
  return (
    <div className="InboxCoachPromptDisplay">
      {tags.length > 0 && (
        <ul className="tags">
          {tags.map((tag) => (
            <li className="tag" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      )}
      {slug && <div className="slug">{slug}</div>}
      <AppContent wrapperClassName="contained" content={prompt} />
      <div className="submission-section">
        <button onClick={handleEndPrompt} type="button">
          End Prompt
        </button>
      </div>
      {promptPerformances.length > 0 && (
        <InboxResponses performances={promptPerformances} />
      )}
    </div>
  );
}
