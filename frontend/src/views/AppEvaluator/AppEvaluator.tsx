// eslint-disable-next-line
// @ts-nocheck
import { useAuth0 } from "@auth0/auth0-react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { maxBy } from "lodash/fp";
import { useEffect, useContext, useState } from "react";
import Gravatar from "react-gravatar";
import AppContent from "../../components/AppContent";
import { performanceContext } from "../../contexts/performance";
import "./AppEvaluator.scss";

export default function AppEvaluator() {
  const { unevaluatedQuestionPerformancesBySlugByLearner, postEvaluation } =
    useContext(performanceContext);
  const slugs = Object.keys(unevaluatedQuestionPerformancesBySlugByLearner);
  const [selectedSlug, setSelectedSlug] = useState(
    slugs.length > 0 ? slugs[0] : ""
  );
  const { user } = useAuth0();

  const currentQuestion =
    unevaluatedQuestionPerformancesBySlugByLearner?.[selectedSlug] || {};
  const currentPerformances = Object.entries(currentQuestion).map(
    ([learnerId, performances]) => {
      return [
        learnerId,
        maxBy("createdAt", performances),
        performances.length > 1,
      ] as const;
    }
  );
  const { prompt, answer } = currentPerformances?.[0]?.[1]?.payload || {};

  const getInitialEvaluations = () =>
    currentPerformances.reduce((initialState, [learnerId, performance]) => {
      return {
        ...initialState,
        [learnerId]: {
          feedback: "",
          status: "pending",
          performance,
        },
      };
    }, {});
  useEffect(() => {
    setEvaluations(getInitialEvaluations());
    // eslint-disable-next-line
  }, [selectedSlug]);
  const [evaluations, setEvaluations] = useState<
    Record<
      string,
      {
        feedback: string;
        status: string;
        performance: evaluatedQuestionPerformance;
      }
    >
  >(getInitialEvaluations());

  const getFeedback = (learnerId: string) => {
    return evaluations[learnerId]?.feedback || "";
  };

  const getStatus = (learnerId: string) => {
    return evaluations[learnerId]?.status || "";
  };

  const updateFeedback =
    (learnerId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEvaluations({
        ...evaluations,
        [learnerId]: {
          ...evaluations[learnerId],
          feedback: event.target.value,
        },
      });
    };
  const updateStatus =
    (learnerId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEvaluations({
        ...evaluations,
        [learnerId]: {
          ...evaluations[learnerId],
          status: event.target.value,
        },
      });
    };
  type performanceTuple = [string, evaluatedQuestionPerformance, boolean];

  const submitAll = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requests = Object.entries(evaluations)
      .filter(([learnerId, evaluation]) => {
        return evaluation.status !== "pending";
      })
      .map(([learnerId, evaluation]) => {
        const learnerPerformance = currentPerformances.find(
          ([performanceLearnerId]: performanceTuple) =>
            performanceLearnerId === learnerId
        );
        const evaluationToPost = {
          performanceId: learnerPerformance[1].id,
          learnerId,
          evaluatorId: user?.email || "",
          feedback: evaluation.feedback,
          status: evaluation.status as "accepted" | "rejected",
        };
        return postEvaluation(evaluationToPost);
      });
    Promise.all(requests)
      .then(() => {
        setSelectedSlug(slugs.length > 0 ? slugs[0] : "");
        getInitialEvaluations();
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(error.message);
      });
  };

  return (
    <div className="AppEvaluator">
      <h2>Evaluator</h2>
      <form>
        <select
          value={selectedSlug}
          onChange={(event) => setSelectedSlug(event.target.value)}
        >
          <option disabled>Select an activity to evaluate</option>
          {slugs.map((slug) => (
            <option key={slug} value={slug}>
              {slug}
            </option>
          ))}
        </select>
      </form>
      {selectedSlug && (
        <>
          <div className="question-details">
            <AppContent className="prompt" content={prompt || ""} />
            {answer && <AppContent className="answer" content={answer} />}
          </div>
          <form onSubmit={submitAll}>
            <table className="evaluator-performances">
              <thead>
                <tr>
                  <th>Learner</th>
                  <th>Time</th>
                  <th>Submission</th>
                  <th>Resubmission?</th>
                  <th>Feedback</th>
                  <th>Reject</th>
                  <th>Accept</th>
                </tr>
              </thead>
              <tbody>
                {currentPerformances.map(
                  ([learnerId, performance, hasMultiple]) => (
                    <tr key={learnerId} className="evaluator-performance">
                      <td className="avatar">
                        <Gravatar
                          email={performance?.userId}
                          size={60}
                          title={performance?.userId}
                        />
                      </td>
                      <td className="submission-time">
                        <time>{performance?.createdAt}</time>
                      </td>
                      <td className="submission">
                        <AppContent
                          content={performance?.payload.response || ""}
                        />
                      </td>
                      <td className="has-previous-feedback">
                        {hasMultiple && <FontAwesomeIcon icon={faCheck} />}
                      </td>
                      <td className="feedback">
                        <input
                          onChange={updateFeedback(learnerId)}
                          value={getFeedback(learnerId)}
                        />
                      </td>
                      <td className="evaluation-reject">
                        <input
                          type="radio"
                          name={learnerId}
                          checked={getStatus(learnerId) === "rejected"}
                          value="rejected"
                          onChange={updateStatus(learnerId)}
                        />
                      </td>
                      <td className="evaluation-accept">
                        <input
                          type="radio"
                          name={learnerId}
                          checked={getStatus(learnerId) === "accepted"}
                          value="accepted"
                          onChange={updateStatus(learnerId)}
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <button type="submit">Submit All</button>
          </form>
        </>
      )}
    </div>
  );
}
