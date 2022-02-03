import "./ActivityInteraction.scss";
import { useContext } from "react";
import { performanceContext } from "../../contexts/performance";

import ActivityInteractionView from "../ActivityInteractionView";
import ActivityInteractionSubmission from "../ActivityInteractionSubmission";

type props = {
  postType: postType;
  performances: evaluatedSubmissionPerformance[];
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
        performances={performances as unknown as postedViewPerformance[]}
      />
    ),
    exercise: (
      <ActivityInteractionSubmission
        userId={userId}
        postPerformance={postPerformance}
        postSlug={postSlug}
        performances={performances}
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
