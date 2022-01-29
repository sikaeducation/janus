import "./ActivityInteraction.scss";
import { useContext } from "react";
import { activityContext } from "../../contexts/activity";

import ActivityInteractionTopic from "../ActivityInteractionTopic";

type props = {
  postType: postType;
  activities: activity[];
  userId: string;
  postSlug: string;
};

export default function ActivityInteraction({
  postType,
  activities,
  userId,
  postSlug,
}: props) {
  const { postActivity } = useContext(activityContext);
  const interactions = {
    topic: (
      <ActivityInteractionTopic
        userId={userId}
        postActivity={postActivity}
        postSlug={postSlug}
        activities={activities}
      />
    ),
    root: null,
    unit: null,
    section: null,
    exercise: null,
    guide: null,
    concept: null,
  } as const;
  return interactions[postType];
}
