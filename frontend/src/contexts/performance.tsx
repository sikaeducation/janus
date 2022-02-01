import { useState, createContext, useContext, useEffect } from "react";
import useSocketHandlers from "../services/use-socket-handlers";
import { toastContext } from "./toast";
import { SocketContext } from "./socket";

type performanceContext = {
  postPerformance: (performance: rawPerformance) => void;
  performances: postedPerformance[];
};
export const performanceContext = createContext<performanceContext>(
  {} as performanceContext
);

type props = {
  children: JSX.Element;
};

export function PerformanceProvider({ children }: props) {
  const [performances, setPerformances] = useState<postedPerformance[]>([]);
  const socket = useContext(SocketContext);
  const { toasts, setToasts } = useContext(toastContext);

  useSocketHandlers({
    "list-performances": (retrievedPerformances: postedPerformance[]) =>
      setPerformances(retrievedPerformances),
    "new-performance": (performance: postedPerformance) =>
      setPerformances((previous) => [...previous, performance]),
    "new-performance-notice": (performance: postedPerformance) => {
      return setToasts([...toasts, performance.userId]);
    },
  });

  useEffect(() => {
    socket.emit("list-performances");
  }, [socket]);

  const postPerformance = (performance: rawPerformance) => {
    socket.emit("post-performance", performance);
  };

  return (
    <performanceContext.Provider
      value={{
        performances,
        postPerformance,
      }}
    >
      {children}
    </performanceContext.Provider>
  );
}
