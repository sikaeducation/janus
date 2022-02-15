import { useAuth0 } from "@auth0/auth0-react";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useContext, useState } from "react";
import { performanceContext } from "../../contexts/performance";
import AppContent from "../AppContent";
import PreviousQuestionFeedback from "../PreviousQuestionFeedback";
import "./QuestionEvaluationForm.scss";

type props = {
  previousPerformances: evaluatedQuestionPerformance[];
  performance: evaluatedQuestionPerformance;
  cancel: () => void;
};

export default function QuestionEvaluationForm({
  previousPerformances,
  performance,
  cancel,
}: props) {
  const { user } = useAuth0();
  const [feedback, setFeedback] = useState("");
  const [evaluationStatus, setEvaluationStatus] = useState("");
  const { postEvaluation } = useContext(performanceContext);
  const canSubmit = !!evaluationStatus;

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const evaluation = {
      performanceId: performance.id,
      learnerId: performance.userId,
      evaluatorId: user?.email || "",
      feedback,
      status: evaluationStatus as "accepted" | "rejected",
    };
    postEvaluation(evaluation);
    setFeedback("");
    setEvaluationStatus("");
    cancel();
  };

  return (
    <form onSubmit={handleSubmit} className="QuestionEvaluationForm">
      {previousPerformances.length > 0 ? (
        <>
          <h2>Previous feedback:</h2>
          <PreviousQuestionFeedback performances={previousPerformances} />
        </>
      ) : null}
      {performance.payload.response && (
        <AppContent
          isContained
          className="response"
          content={performance.payload.response}
        />
      )}
      <label htmlFor="feedback">Feedback:</label>
      <textarea
        onChange={(event) => setFeedback(event.target.value)}
        id="feedback"
        className="feedback"
        value={feedback}
      />
      <div className="status-buttons">
        <button
          type="button"
          className={classNames({
            active: evaluationStatus === "rejected",
            failure: true,
          })}
          onClick={() => setEvaluationStatus("rejected")}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </button>
        <button
          type="button"
          onClick={() => setEvaluationStatus("accepted")}
          className={classNames({
            active: evaluationStatus === "accepted",
            success: true,
          })}
        >
          <FontAwesomeIcon icon={faCheckCircle} className="accepted" />
        </button>
      </div>
      <div className="submission-container">
        <button type="button" onClick={cancel}>
          Cancel
        </button>
        <input type="submit" disabled={!canSubmit} value="Send Evaluation" />
      </div>
    </form>
  );
}
