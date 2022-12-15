import AppContent from "../../ui/Markdown";
import "./InboxLearnerPromptResponseDisplay.scss";

type props = {
  currentBroadcast: rawBroadcast;
  response: string;
};

export default function InboxLearnerPromptResponseDisplay({
  currentBroadcast,
  response,
}: props) {
  const { prompt } = currentBroadcast;
  return (
    <>
      <AppContent className="prompt" isContained content={prompt} />
      <AppContent className="response" content={response} />
    </>
  );
}
