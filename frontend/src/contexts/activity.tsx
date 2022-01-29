import { useState, createContext } from "react";

type props = {
  children: JSX.Element;
};

type activityContext = {
  postActivity: (activity: activity) => Promise<void>;
  isError: boolean;
  activities: activity[];
};
export const activityContext = createContext<activityContext>(
  {} as activityContext
);

export function ActivityProvider({ children }: props) {
  // eslint-disable-next-line
  const [activities, setActivities] = useState<activity[]>([]);
  // eslint-disable-next-line
  const [isError, setIsError] = useState<boolean>(false);

  const postActivity = (activity: activity) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activity),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) throw new Error(response.error);
        setIsError(false);
        setActivities([...activities, response.activity]);
      })
      .catch(() => {
        setIsError(true);
      });
  };

  return (
    <activityContext.Provider
      value={{
        activities,
        postActivity,
        isError,
      }}
    >
      {children}
    </activityContext.Provider>
  );
}
