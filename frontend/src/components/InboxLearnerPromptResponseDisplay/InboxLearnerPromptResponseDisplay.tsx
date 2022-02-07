import AppContent from "../AppContent";
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
      <AppContent content={prompt} />
      <AppContent content={response} />
    </>
  );
}