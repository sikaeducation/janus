import { useState, createContext, useContext, useEffect } from "react";
import useSocketHandlers from "../services/use-socket-handlers";
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

  useSocketHandlers({
    "list-performances": (retrievedPerformances: postedPerformance[]) =>
      setPerformances(retrievedPerformances),
    "new-performance": (performance: postedPerformance) =>
      setPerformances((previous) => [...previous, performance]),
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
