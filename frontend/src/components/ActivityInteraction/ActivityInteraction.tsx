import "./ActivityInteraction.scss";
import { useContext } from "react";
import { performanceContext } from "../../contexts/performance";

import ActivityInteractionTopic from "../ActivityInteractionTopic";
import ActivityInteractionExercise from "../ActivityInteractionExercise";

type props = {
  postType: postType;
  performances: postedPerformance[];
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
        performances={performances as postedTopicViewPerformance[]}
      />
    ),
    exercise: (
      <ActivityInteractionExercise
        userId={userId}
        postPerformance={postPerformance}
        postSlug={postSlug}
        performances={performances as postedExerciseSubmissionPerformance[]}
      />
    ),
    root: null,
    unit: null,
    section: null,
    guide: null,
    concept: null,
  } as const;
  return interactions[postType];
}
