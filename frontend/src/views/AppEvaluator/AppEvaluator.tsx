// eslint-disable-next-line
// @ts-nocheck
import { useAuth0 } from "@auth0/auth0-react";
import { maxBy, fromPairs } from "lodash/fp";
import { useEffect, useContext, useState, useCallback, useMemo } from "react";
import AppContent from "../../components/AppContent";
import { programContext } from "../../contexts/program";
import { performanceContext } from "../../contexts/performance";
import "./AppEvaluator.scss";
import EvaluatorPerformance from "../../components/EvaluatorPerformance";
import EvaluatorPerformanceHeader from "../../components/EvaluatorPerformanceHeader";
import EvaluatorQuestionSelector from "../../components/EvaluatorQuestionSelector";

type performanceTuple = [string, evaluatedQuestionPerformance];

export default function AppEvaluator() {
  const { unevaluatedQuestionPerformancesBySlugByLearner, postEvaluation } =
    useContext(performanceContext);
  const { user } = useAuth0();
  const slugs = useMemo(
    () => Object.keys(unevaluatedQuestionPerformancesBySlugByLearner),
    [unevaluatedQuestionPerformancesBySlugByLearner]
  );
  const [selectedSlug, setSelectedSlug] = useState("");
  useEffect(() => {
    setSelectedSlug(slugs.length > 0 ? slugs[0] : "");
  }, []);
  const currentQuestion =
    unevaluatedQuestionPerformancesBySlugByLearner[selectedSlug] || {};
  const currentPerformances = Object.entries(currentQuestion).map(
    ([learnerId, performances]) =>
      [learnerId, maxBy("createdAt", performances)] as const
  );

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

  const { prompt, answer } = currentPerformances?.[0]?.[1]?.payload || {};
  const { postsBySlug } = useContext(programContext);
  const getPath = useCallback((slug: string) => postsBySlug[slug].path ?? "");
  const getFeedback = useCallback((learnerId: string) => {
    return evaluations[learnerId]?.feedback || "";
  });
  const getStatus = useCallback((learnerId: string) => {
    return evaluations[learnerId]?.status || "";
  });

  const setAll = useCallback(
    (status: string) => {
      setEvaluations((previousState) => {
        const newState = Object.entries(previousState).map(
          ([learnerId, evaluation]) => {
            return [
              learnerId,
              {
                ...evaluation,
                status,
              },
            ];
          }
        );
        return fromPairs(newState);
      });
    },
    [selectedSlug]
  );
  const updateFeedback = useCallback(
    (learnerId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEvaluations((evaluations) => ({
        ...evaluations,
        [learnerId]: {
          ...evaluations[learnerId],
          feedback: event.target.value,
        },
      }));
    },
    []
  );

  const updateStatus = useCallback(
    (learnerId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEvaluations((evaluations) => ({
        ...evaluations,
        [learnerId]: {
          ...evaluations[learnerId],
          status: event.target.value,
        },
      }));
    },
    []
  );

  const submitAll = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requests = Object.entries(evaluations)
      // eslint-disable-next-line
      .filter(([learnerId, evaluation]) => evaluation.status !== "pending")
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
        setSelectedSlug(slugs.length > 1 ? slugs[1] : ""); // index 0 will still be there while waiting for sockets to come back
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(error.message);
      });
  };

  return (
    <div className="AppEvaluator">
      <h2>Evaluator</h2>
      <EvaluatorQuestionSelector
        slugs={slugs}
        selectedSlug={selectedSlug}
        setSelectedSlug={setSelectedSlug}
      />
      {selectedSlug && (
        <>
          <div className="question-details">
            <AppContent className="prompt" content={prompt || ""} />
            {answer && <AppContent className="answer" content={`${answer}`} />}
          </div>
          <form onSubmit={submitAll}>
            <table className="evaluator-performances">
              <EvaluatorPerformanceHeader setAll={setAll} />
              <tbody>
                {currentPerformances.map(([learnerId, performance]) => (
                  <EvaluatorPerformance
                    key={learnerId}
                    performance={performance}
                    path={getPath(performance.payload.originalPostSlug)}
                    status={getStatus(learnerId)}
                    updateStatus={updateStatus}
                    feedback={getFeedback(learnerId)}
                    updateFeedback={updateFeedback}
                  />
                ))}
              </tbody>
            </table>
            <button type="submit">Submit All</button>
          </form>
        </>
      )}
    </div>
  );
}
