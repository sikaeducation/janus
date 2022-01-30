import { useState, createContext, useContext, useEffect } from "react";
import useSocketHandlers from "../services/use-socket-handlers";
import { SocketContext } from "./socket";

type performanceContext = {
  postPerformance: (performance: performance) => void;
  performances: performance[];
};
export const performanceContext = createContext<performanceContext>(
  {} as performanceContext
);

type props = {
  children: JSX.Element;
};

export function PerformanceProvider({ children }: props) {
  const [performances, setPerformances] = useState<performance[]>([]);
  const socket = useContext(SocketContext);

  useSocketHandlers({
    "list-performances": (retrievedPerformances: performance[]) =>
      setPerformances(retrievedPerformances),
    "new-performance": (performance: performance) =>
      setPerformances((previous) => [...previous, performance]),
  });

  useEffect(() => {
    socket.emit("list-performances");
  }, [socket]);

  const postPerformance = (performance: performance) => {
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
