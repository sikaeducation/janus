// eslint-disable-next-line
// @ts-nocheck
import { useAuth0 } from "@auth0/auth0-react";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { maxBy, fromPairs } from "lodash/fp";
import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Gravatar from "react-gravatar";
import AppContent from "../../components/AppContent";
import { performanceContext } from "../../contexts/performance";
import { programContext } from "../../contexts/program";
import "./AppEvaluator.scss";

const formatDateTime = (dateTime: string) => {
  return format(new Date(dateTime), "M/d/yy p");
};

export default function AppEvaluator() {
  const { unevaluatedQuestionPerformancesBySlugByLearner, postEvaluation } =
    useContext(performanceContext);
  const slugs = Object.keys(unevaluatedQuestionPerformancesBySlugByLearner);
  const [selectedSlug, setSelectedSlug] = useState(
    slugs.length > 0 ? slugs[0] : ""
  );
  const { user } = useAuth0();
  const { postsBySlug } = useContext(programContext);
  const getPath = (slug) => {
    return postsBySlug[slug].path ?? "";
  };

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

  const setAll = (status: string) => {
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
  };

  const submitAll = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requests = Object.entries(evaluations)
      // eslint-disable-next-line
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
        setSelectedSlug(slugs.length > 1 ? slugs[1] : "");
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
            {answer && <AppContent className="answer" content={`${answer}`} />}
          </div>
          <form onSubmit={submitAll}>
            <table className="evaluator-performances">
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                  <th className="evaluate-all">
                    <button
                      className="rejected"
                      type="button"
                      onClick={() => setAll("rejected")}
                    >
                      Reject
                    </button>
                  </th>
                  <th className="evaluate-all">
                    <button
                      className="accepted"
                      type="button"
                      onClick={() => setAll("accepted")}
                    >
                      Accept
                    </button>
                  </th>
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
                        <time>
                          <Link
                            to={getPath(performance?.payload.originalPostSlug)}
                          >
                            {formatDateTime(performance?.createdAt)}
                          </Link>
                        </time>
                      </td>
                      <td className="submission">
                        <AppContent
                          isContained
                          content={performance?.payload.response || ""}
                        />
                      </td>
                      <td className="has-previous-feedback">
                        {hasMultiple && <FontAwesomeIcon icon={faRedo} />}
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
