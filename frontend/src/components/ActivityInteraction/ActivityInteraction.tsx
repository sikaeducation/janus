import "./ActivityInteraction.scss";
import { useContext } from "react";
import { performanceContext } from "../../contexts/activity";

import ActivityInteractionTopic from "../ActivityInteractionTopic";

type props = {
  postType: postType;
  performances: performance[];
  userId: string;
  postSlug: string;
};

export default function ActivityInteraction({
  postType,
  performances,
  userId,
  postSlug,
}: props) {
  const { postPerformance } = useContext(performanceContext);
  const interactions = {
    topic: (
      <ActivityInteractionTopic
        userId={userId}
        postPerformance={postPerformance}
        postSlug={postSlug}
        performances={performances}
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
