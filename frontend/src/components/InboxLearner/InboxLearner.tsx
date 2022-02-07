import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import { performanceContext } from "../../contexts/performance";
import InboxLearnerPromptResponseDisplay from "../InboxLearnerPromptResponseDisplay";
import InboxLearnerPromptResponseForm from "../InboxLearnerPromptResponseForm";
import "./InboxLearner.scss";

export default function InboxLearner() {
  const [formShouldDisplay, setFormShouldDisplay] = useState<boolean>(true);
  const [response, setResponse] = useState<string>("");
  const { currentBroadcast, postPerformance } = useContext(performanceContext);
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
    setFormShouldDisplay(false);
  };

  return (
    <div className="InboxLearner">
      {currentBroadcast && formShouldDisplay && (
        <InboxLearnerPromptResponseForm
          response={response}
          setResponse={setResponse}
          postResponse={postResponse}
          currentBroadcast={currentBroadcast}
        />
      )}
      {currentBroadcast && !formShouldDisplay && (
        <InboxLearnerPromptResponseDisplay
          response={response}
          currentBroadcast={currentBroadcast}
        />
      )}
      {!currentBroadcast && <p>Nothing for now!</p>}
    </div>
  );
}
