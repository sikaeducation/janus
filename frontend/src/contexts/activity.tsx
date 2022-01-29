import { useRef, useEffect, useState, createContext, useContext } from "react";
import { SocketContext } from "./socket";

type activityContext = {
  postActivity: (activity: activity) => void;
  activities: activity[];
};
export const activityContext = createContext<activityContext>(
  {} as activityContext
);

const addActivity = (
  activities: activity[],
  setActivities: (activities: activity[]) => void,
  activity: activity
) => {
  setActivities([...activities, activity]);
};

type props = {
  children: JSX.Element;
};

export function ActivityProvider({ children }: props) {
  // eslint-disable-next-line
  const [activities, setActivities] = useState<activity[]>([]);
  const activitiesRef = useRef(activities);
  // eslint-disable-next-line
  const socket = useContext(SocketContext);

  useEffect(() => {
    const handleNewActivity = (activity: activity) => {
      addActivity(activitiesRef.current, setActivities, activity);
    };
    socket.on("new-activity", handleNewActivity);
    return () => {
      socket.off("new-activity", handleNewActivity);
    };
    // eslint-disable-next-line
  }, []); // Only add listeners on initialization

  useEffect(() => {
    activitiesRef.current = activities;
  }); // On rerenders, update activitiesRef

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
