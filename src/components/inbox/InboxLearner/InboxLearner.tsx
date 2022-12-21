import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import { performanceContext } from "../../../contexts/performance";
import { promptContext } from "../../../contexts/prompt";
import InboxLearnerPromptResponseDisplay from "../InboxLearnerPromptResponseDisplay";
import InboxLearnerPromptResponseForm from "../InboxLearnerPromptResponseForm";
import "./InboxLearner.scss";

export default function InboxLearner() {
  const [response, setResponse] = useState<string>("");
  const { postPerformance, performances } = useContext(performanceContext);
  const { currentBroadcast } = useContext(promptContext);
  const { user } = useAuth0();
  const postResponse = (postedResponse: string) => {
    postPerformance({
      userId: user?.email || "",
      postSlug: currentBroadcast?.slug || "",
      type: "prompt",
      payload: {
        response: postedResponse,
        prompt: currentBroadcast?.prompt || "",
      },
    });
  };

  const alreadyAnswered = !!performances.find(
    (performance) =>
      currentBroadcast?.slug && performance.postSlug === currentBroadcast?.slug
  );

  return (
    <div className="InboxLearner">
      {currentBroadcast &&
        (alreadyAnswered ? (
          <InboxLearnerPromptResponseDisplay
            response={response}
            currentBroadcast={currentBroadcast}
          />
        ) : (
          <InboxLearnerPromptResponseForm
            response={response}
            setResponse={setResponse}
            postResponse={postResponse}
            currentBroadcast={currentBroadcast}
          />
        ))}
      {!currentBroadcast && <p>Nothing for now!</p>}
    </div>
  );
}
