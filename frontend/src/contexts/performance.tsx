import { useState, createContext, useContext, useEffect } from "react";
import { groupBy } from "lodash/fp";
import { format } from "date-fns";
import useSocketHandlers from "../hooks/use-socket-handlers";
import { toastContext } from "./toast";
import { SocketContext } from "./socket";

type performanceContext = {
  startInboxPrompt: (broadcast: rawBroadcast) => void;
  endInboxPrompt: () => void;
  postPerformance: (performance: rawPerformance) => void;
  postEvaluation: (evaluation: rawEvaluation) => void;
  performances: evaluatedPerformance[];
  performancesWithEvaluations: evaluatedSubmissionPerformance[];
  performancesByDay: Record<string, evaluatedSubmissionPerformance[]>;
  evaluations: postedEvaluation[];
  currentBroadcast: rawBroadcast | null;
  getPreviousEvaluations: (
    performance: evaluatedSubmissionPerformance
  ) => evaluatedSubmissionPerformance[];
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
  const [currentBroadcast, setCurrentBroadcast] = useState<rawBroadcast | null>(
    null
    // {
    //   slug: "aaaaaaaa",
    //   prompt: "## Ladders\n* Can you climb them?\n```ts\nconst a = 1;\n```",
    //   responseType: "markdown",
    // }
  );
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
    "new-inbox-prompt": (broadcast: rawBroadcast) =>
      setCurrentBroadcast(broadcast),
    "end-inbox-prompt": () => setCurrentBroadcast(null),
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
  const startInboxPrompt = (broadcast: rawBroadcast) => {
    socket.emit("start-inbox-prompt", broadcast);
  };
  const endInboxPrompt = () => {
    socket.emit("end-inbox-prompt");
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

  return (
    <performanceContext.Provider
      value={{
        performances,
        performancesWithEvaluations,
        performancesByDay,
        postPerformance,
        postEvaluation,
        getPreviousEvaluations,
        startInboxPrompt,
        endInboxPrompt,
        evaluations,
        currentBroadcast,
      }}
    >
      {children}
    </performanceContext.Provider>
  );
}
