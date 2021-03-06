import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import { performanceContext } from "../../contexts/performance";
import AppContent from "../AppContent";
import ButtonFormSubmission from "../ButtonFormSubmission";
import TextAreaResponse from "../TextAreaResponse";
import "./QuestionForm.scss";
import useIndicator from "../../hooks/use-indicator";
import PreviousQuestionResponses from "../PreviousQuestionResponses";

type props = {
  id: string;
  prompt: string;
  response: string;
  answer?: string;
  setResponse: (response: string) => void;
  postResponse: ({
    response,
    prompt,
  }: {
    response: string;
    prompt: string;
    answer?: string;
  }) => void;
};

export default function QuestionForm({
  id,
  prompt,
  answer,
  response,
  setResponse,
  postResponse,
}: props) {
  const getIndicator = useIndicator();
  const [displayResponseForm, setDisplayResponseForm] = useState(false);
  const [responsesShouldDisplay, setResponsesShouldDisplay] = useState(false);
  const { performancesBySlugByLearner, lastPerformanceBySlugByLearner } =
    useContext(performanceContext);
  const { user } = useAuth0();
  const previousPerformances =
    performancesBySlugByLearner?.[id]?.[user?.email || ""] ?? [];
  const typedPreviousPerformances = previousPerformances.filter(
    (
      performance: evaluatedPerformance
    ): performance is evaluatedQuestionPerformance =>
      performance.type === "question"
  );
  const lastPerformance =
    (lastPerformanceBySlugByLearner?.[id]?.[
      user?.email || ""
    ] as evaluatedQuestionPerformance) || null;

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisplayResponseForm(false);
    postResponse({ response, prompt, answer });
  };

  return (
    <div className="QuestionForm">
      <div className="prompt-container">
        <AppContent className="prompt" isContained content={prompt} />
        {lastPerformance && getIndicator(lastPerformance)}
      </div>
      {!displayResponseForm &&
        !responsesShouldDisplay &&
        lastPerformance?.evaluation?.status === "accepted" && (
          <AppContent content={lastPerformance.payload.response} />
        )}
      {!displayResponseForm && typedPreviousPerformances.length > 0 && (
        <PreviousQuestionResponses
          shouldDisplay={responsesShouldDisplay}
          setShouldDisplay={setResponsesShouldDisplay}
          performances={typedPreviousPerformances}
        />
      )}
      {!displayResponseForm && lastPerformance && (
        <button
          type="button"
          className="toggle-response-submission-form"
          onClick={() => setDisplayResponseForm(true)}
        >
          Submit another response
        </button>
      )}
      {(displayResponseForm || !lastPerformance) && (
        <form onSubmit={handleSubmit}>
          <TextAreaResponse
            id={id}
            label="Response"
            content={response}
            action={setResponse}
          />
          <div className="actions">
            {displayResponseForm && (
              <button
                type="button"
                onClick={() => setDisplayResponseForm(false)}
                className="cancel"
              >
                Cancel
              </button>
            )}
            <ButtonFormSubmission label="Submit response" />
          </div>
        </form>
      )}
    </div>
  );
}
