import { useState, createContext, useContext } from "react";
import useSocketHandlers from "../services/use-socket-handlers";
import { SocketContext } from "./socket";

type activityContext = {
  postActivity: (activity: activity) => void;
  activities: activity[];
};
export const activityContext = createContext<activityContext>(
  {} as activityContext
);

type props = {
  children: JSX.Element;
};

export function ActivityProvider({ children }: props) {
  const [activities, setActivities] = useState<activity[]>([]);
  const socket = useContext(SocketContext);

  useSocketHandlers({
    "new-activity": (activity: activity) =>
      setActivities((previous) => [...previous, activity]),
  });

  const postActivity = (activity: activity) => {
    socket.emit("post-activity", activity);
  };

  return (
    <activityContext.Provider
      value={{
        activities,
        postActivity,
      }}
    >
      {children}
    </activityContext.Provider>
  );
}
