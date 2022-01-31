import "./ActivityInteraction.scss";
import { useContext } from "react";
import { performanceContext } from "../../contexts/performance";

import ActivityInteractionView from "../ActivityInteractionView";
import ActivityInteractionSubmission from "../ActivityInteractionSubmission";

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
      <ActivityInteractionView
        userId={userId}
        postPerformance={postPerformance}
        postSlug={postSlug}
        performances={performances as postedTopicViewPerformance[]}
      />
    ),
    exercise: (
      <ActivityInteractionSubmission
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
