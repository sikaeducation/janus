import { useRef, useEffect, useState, createContext, useContext } from "react";
import { SocketContext } from "./socket";

type props = {
  children: JSX.Element;
};

type activityContext = {
  postActivity: (activity: activity) => void;
  activities: activity[];
};
export const activityContext = createContext<activityContext>(
  {} as activityContext
);

const handler = (
  activities: activity[],
  setActivities: (activities: activity[]) => void,
  activity: activity
) => {
  setActivities([...activities, activity]);
};

export function ActivityProvider({ children }: props) {
  // eslint-disable-next-line
  const [activities, setActivities] = useState<activity[]>([]);
  const activitiesRef = useRef(activities);
  // eslint-disable-next-line
  const socket = useContext(SocketContext);

  useEffect(() => {
    activitiesRef.current = activities;
  });

  useEffect(() => {
    const activityHandler = (activity: activity) =>
      handler(activitiesRef.current, setActivities, activity);
    socket.on("new-activity", activityHandler);
    return () => {
      socket.off("new-activity", activityHandler);
    };
    // eslint-disable-next-line
  }, []);

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
