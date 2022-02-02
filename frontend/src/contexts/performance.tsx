import { useState, createContext, useContext, useEffect } from "react";
import { groupBy } from "lodash/fp";
import { format } from "date-fns";
import useSocketHandlers from "../services/use-socket-handlers";
import { toastContext } from "./toast";
import { SocketContext } from "./socket";

type performanceContext = {
  postPerformance: (performance: rawPerformance) => void;
  postEvaluation: (evaluation: rawEvaluation) => void;
  performances: postedPerformance[];
  performancesWithEvaluations: evaluatedPerformance[];
  performancesByDay: Record<string, evaluatedPerformance[]>;
  evaluations: postedEvaluation[];
};
export const performanceContext = createContext<performanceContext>(
  {} as performanceContext
);

type props = {
  children: JSX.Element;
};

export function PerformanceProvider({ children }: props) {
  const [performances, setPerformances] = useState<postedPerformance[]>([]);
  const [evaluations, setEvaluations] = useState<postedEvaluation[]>([]);
  const socket = useContext(SocketContext);
  const { toasts, setToasts } = useContext(toastContext);

  useSocketHandlers({
    "list-performances": (retrievedPerformances: evaluatedPerformance[]) =>
      setPerformances(retrievedPerformances),
    "list-evaluations": (retrievedEvaluations: postedEvaluation[]) =>
      setEvaluations(retrievedEvaluations),
    "new-performance": (performance: postedPerformance) =>
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
  }, [socket]);

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
  const performancesByDay = groupBy((performance: evaluatedPerformance) => {
    return format(new Date(performance.createdAt), "yyyy/MM/dd");
  })(performancesWithEvaluations);

  return (
    <performanceContext.Provider
      value={{
        performances,
        performancesWithEvaluations,
        performancesByDay,
        postPerformance,
        postEvaluation,
        evaluations,
      }}
    >
      {children}
    </performanceContext.Provider>
  );
}
