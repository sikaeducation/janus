import { useState, createContext, useContext, useEffect } from "react";
import { flow, groupBy, head, mapValues, reverse, sortBy } from "lodash/fp";
import { format } from "date-fns";
import useSocketHandlers from "../hooks/use-socket-handlers";
import { toastContext } from "./toast";
import { SocketContext } from "./socket";

type performanceContext = {
  learners: string[];
  postPerformance: (performance: rawPerformance) => void;
  postEvaluation: (evaluation: rawEvaluation) => void;
  performances: evaluatedPerformance[];
  performancesWithEvaluations: evaluatedSubmissionPerformance[];
  performancesByDay: Record<string, evaluatedSubmissionPerformance[]>;
  evaluations: postedEvaluation[];
  getPreviousEvaluations: (
    performance: evaluatedSubmissionPerformance
  ) => evaluatedSubmissionPerformance[];
  performancesBySlugByLearner: Record<
    string,
    Record<string, evaluatedSubmissionPerformance>
  >;
};
export const performanceContext = createContext<performanceContext>(
  {} as performanceContext
);

type props = {
  children: JSX.Element;
};

export function PerformanceProvider({ children }: props) {
  const [performances, setPerformances] = useState<
    evaluatedSubmissionPerformance[]
  >([]);
  const [evaluations, setEvaluations] = useState<postedEvaluation[]>([]);
  const socket = useContext(SocketContext);
  const { toasts, setToasts } = useContext(toastContext);

  useSocketHandlers({
    "list-performances": (
      retrievedPerformances: evaluatedSubmissionPerformance[]
    ) => setPerformances(retrievedPerformances),
    "list-evaluations": (retrievedEvaluations: postedEvaluation[]) =>
      setEvaluations(retrievedEvaluations),
    "new-performance": (performance: evaluatedSubmissionPerformance) =>
      setPerformances((previous) => [...previous, performance]),
    "new-performance-notice": (performance: postedPerformance) =>
      setToasts([...toasts, performance.userId]),
    "new-evaluation": (evaluation: postedEvaluation) =>
      setEvaluations((previous) => [...previous, evaluation]),
    "new-evaluation-notice": (evaluation: postedEvaluation) =>
      setToasts([...toasts, evaluation.status]),
  });

  useEffect(() => {
    socket.emit("list-performances");
    socket.emit("list-evaluations");
    // eslint-disable-next-line
  }, []);

  const postPerformance = (performance: rawPerformance) => {
    socket.emit("post-performance", performance);
  };
  const postEvaluation = (evaluation: rawEvaluation) => {
    socket.emit("post-evaluation", evaluation);
  };
  const performancesWithEvaluations = performances.map((performance) => {
    return {
      ...performance,
      ...{
        evaluation: evaluations.find(
          (evaluation) => evaluation.performanceId === performance.id
        ),
      },
    };
  });
  const performancesByDay = groupBy(
    (performance: evaluatedSubmissionPerformance) => {
      return format(new Date(performance.createdAt), "yyyy/MM/dd");
    }
  )(performancesWithEvaluations);

  function getPreviousEvaluations(performance: evaluatedSubmissionPerformance) {
    return performancesWithEvaluations.filter((evaluatedPerformance) => {
      return (
        evaluatedPerformance.userId === performance.userId &&
        evaluatedPerformance.postSlug === performance.postSlug &&
        evaluatedPerformance.id !== performance.id
      );
    });
  }

  const learners = Array.from(
    new Set(performances.map((performance) => performance.userId))
  );

  const performancesBySlugByLearner = flow([
    groupBy("postSlug"),
    mapValues(sortBy("createdAt")),
    mapValues(reverse),
    mapValues(flow([groupBy("userId"), mapValues(head)])),
  ])(performancesWithEvaluations);

  return (
    <performanceContext.Provider
      value={{
        learners,
        performances,
        performancesWithEvaluations,
        performancesByDay,
        performancesBySlugByLearner,
        postPerformance,
        postEvaluation,
        getPreviousEvaluations,
        evaluations,
      }}
    >
      {children}
    </performanceContext.Provider>
  );
}
