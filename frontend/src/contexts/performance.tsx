import { useState, createContext, useContext, useEffect } from "react";
import useSocketHandlers from "../services/use-socket-handlers";
import { toastContext } from "./toast";
import { SocketContext } from "./socket";

type performanceContext = {
  postPerformance: (performance: rawPerformance) => void;
  postEvaluation: (evaluation: rawEvaluation) => void;
  performances: postedPerformance[];
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
    "list-performances": (retrievedPerformances: postedPerformance[]) =>
      setPerformances(retrievedPerformances),
    "new-performance": (performance: postedPerformance) =>
      setPerformances((previous) => [...previous, performance]),
    "new-performance-notice": (performance: postedPerformance) =>
      setToasts([...toasts, performance.userId]),
    "evaluate-performance": (evaluation: postedEvaluation) =>
      setEvaluations((previous) => [...previous, evaluation]),
  });

  useEffect(() => {
    socket.emit("list-performances");
  }, [socket]);

  const postPerformance = (performance: rawPerformance) => {
    socket.emit("post-performance", performance);
  };
  const postEvaluation = (evaluation: rawEvaluation) => {
    socket.emit("post-evaluation", evaluation);
  };

  return (
    <performanceContext.Provider
      value={{
        performances,
        postPerformance,
        postEvaluation,
        evaluations,
      }}
    >
      {children}
    </performanceContext.Provider>
  );
}
