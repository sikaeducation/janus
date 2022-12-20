import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import { performanceContext } from "../../contexts/performance";
import Markdown from "../ui/Markdown";
import TextArea from "../ui/TextArea";
import "./QuestionForm.scss";
import useIndicator from "../../hooks/use-indicator";
import PreviousQuestionResponses from "../PreviousQuestionResponses";
import Button from "../ui/Button";

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
        <Markdown className="prompt" content={prompt} />
        {lastPerformance && getIndicator(lastPerformance)}
      </div>
      {!displayResponseForm &&
        !responsesShouldDisplay &&
        lastPerformance?.evaluation?.status === "accepted" && (
          <Markdown content={lastPerformance.payload.response} />
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
          <TextArea
            id={id}
            label="Response"
            value={response}
            updateValue={setResponse}
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
            <Button type="primary" submit>
              Submit response
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
