import { useAuth0 } from "@auth0/auth0-react";
import {
  faCaretDown,
  faCaretRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import Gravatar from "react-gravatar";
import { performanceContext } from "../../contexts/performance";
import AppContent from "../AppContent";
import ButtonFormSubmission from "../ButtonFormSubmission";
import TextAreaResponse from "../TextAreaResponse";
import "./QuestionForm.scss";

const formatDateTime = (dateTime: string) =>
  format(new Date(dateTime), "M/d/yy: p");

const getIndicatorIcon = (status: "pending" | "accepted" | "rejected") => {
  const indicators = {
    pending: faCheck,
    accepted: faCheck,
    rejected: faCheck,
  } as const;

  return indicators[status];
};

type props = {
  id: string;
  prompt: string;
  response: string;
  setResponse: (response: string) => void;
  postResponse: ({
    response,
    prompt,
  }: {
    response: string;
    prompt: string;
  }) => void;
};

export default function QuestionForm({
  id,
  prompt,
  response,
  setResponse,
  postResponse,
}: props) {
  const [displayResponseForm, setDisplayResponseForm] = useState(false);
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
    postResponse({ response, prompt });
  };

  return (
    <div className="QuestionForm">
      <div className="prompt-container">
        {lastPerformance && (
          <FontAwesomeIcon
            icon={getIndicatorIcon(
              lastPerformance.evaluation?.status || "pending"
            )}
            className={lastPerformance.evaluation?.status || "pending"}
          />
        )}
        <AppContent className="prompt" isContained content={prompt} />
      </div>
      {!displayResponseForm && lastPerformance && (
        <AppContent content={lastPerformance.payload.response} />
      )}
      {typedPreviousPerformances.length > 0 && (
        <PreviousQuestionResponses performances={typedPreviousPerformances} />
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
          <ButtonFormSubmission label="Submit response" />
        </form>
      )}
    </div>
  );
}

type oProps = {
  performances: evaluatedQuestionPerformance[];
};
function PreviousQuestionResponses({ performances }: oProps) {
  const [responsesShouldDisplay, setResponsesShouldDisplay] = useState(false);
  const handleKeyboard =
    (state: boolean) => (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.keyCode === 13) {
        setResponsesShouldDisplay(state);
      }
    };
  return (
    <div className="PreviousQuestionResponses">
      {responsesShouldDisplay ? (
        <>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setResponsesShouldDisplay(false)}
            onKeyDown={handleKeyboard(false)}
            className="previous-response-control"
          >
            <FontAwesomeIcon icon={faCaretDown} /> Previous Responses
          </div>
          <ul>
            {performances.map((performance) => (
              <li key={performance.id}>
                <div className="previous-content">
                  <div className="meta">
                    <time>{formatDateTime(performance.createdAt)}</time>
                    <FontAwesomeIcon
                      icon={getIndicatorIcon(
                        performance.evaluation?.status || "pending"
                      )}
                      className={performance.evaluation?.status || "pending"}
                    />
                  </div>
                  <AppContent
                    isContained
                    content={performance.payload.response}
                    className="previous-response-content"
                  />
                  {performance.evaluation?.feedback && (
                    <>
                      <Gravatar
                        email={performance.evaluation.evaluatorId}
                        className="evaluator-avatar"
                      />
                      <AppContent
                        isContained
                        content={performance.evaluation.feedback}
                        className="previous-feedback-content"
                      />
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setResponsesShouldDisplay(true)}
          onKeyDown={handleKeyboard(true)}
          className="previous-response-control"
        >
          <FontAwesomeIcon icon={faCaretRight} /> Previous Responses
        </div>
      )}
    </div>
  );
}
