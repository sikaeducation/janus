import { Markdown } from "@sikaeducation/ui";
import "./InboxLearnerPromptResponseDisplay.scss";

type props = {
  currentBroadcast: rawBroadcast;
  response: string;
};

export default function InboxLearnerPromptResponseDisplay({
	currentBroadcast,
	response,
}: props){
	const { prompt } = currentBroadcast;
	return (
    <>
      <Markdown className="prompt" content={prompt} />
      <Markdown className="response" content={response} />
    </>
	);
}
