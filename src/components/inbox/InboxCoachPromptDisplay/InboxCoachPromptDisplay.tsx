import {
	useContext,
} from "react";
import {
	Tag, Button, Markdown,
} from "@sikaeducation/ui";
import {
	performanceContext,
} from "../../../contexts/performance";
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
}: props){
	const {
		performances,
	} = useContext(performanceContext);
	const promptPerformances = performances.filter((performance): performance is postedPromptPerformance => performance.postSlug === slug);

	const handleEndPrompt = () => {
		endPrompt();
	};
	return (
    <div className="InboxCoachPromptDisplay">
      {tags.length > 0 && (
        <ul className="tags">
          {tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      )}
      {slug && <div className="slug">{slug}</div>}
      <Markdown className="existing-prompt" content={prompt} />
      <div className="submission-section">
        <Button type="primary" actionType="failure" action={handleEndPrompt}>
          End Prompt
        </Button>
      </div>
      {promptPerformances.length > 0 && (
        <InboxResponses performances={promptPerformances} />
      )}
    </div>
	);
}
