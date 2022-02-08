/* eslint react/jsx-props-no-spreading: "off" */
import { useAuth0 } from "@auth0/auth0-react";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useContext, useState } from "react";
import { performanceContext } from "../../contexts/performance";
import PreviousFeedback from "../PreviousFeedback";
import "./SubmissionEvaluationForm.scss";

type props = {
  previousPerformances: evaluatedSubmissionPerformance[];
  performance: evaluatedSubmissionPerformance;
  cancel: () => void;
};

export default function SubmissionEvaluationForm({
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
    <form onSubmit={handleSubmit} className="SubmissionEvaluationForm">
      {previousPerformances.length > 0 ? (
        <>
          <h2>Previous feedback:</h2>
          <PreviousFeedback performances={previousPerformances} />
        </>
      ) : null}
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
