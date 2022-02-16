import "./ActivityInteraction.scss";
import { useContext } from "react";
import { performanceContext } from "../../contexts/performance";

import ActivityInteractionView from "../ActivityInteractionView";
import ActivityInteractionSubmission from "../ActivityInteractionSubmission";
import ActivityInteractionQuestions from "../ActivityInteractionQuestions";

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
        performances={performances as unknown as postedViewPerformance[]}
      />
    ),
    exercise: (
      <ActivityInteractionSubmission
        userId={userId}
        postPerformance={postPerformance}
        postSlug={postSlug}
        performances={
          performances as unknown as evaluatedSubmissionPerformance[]
        }
      />
    ),
    questions: (
      <ActivityInteractionQuestions
        userId={userId}
        postPerformance={postPerformance}
        postSlug={postSlug}
      />
    ),
    root: null,
    unit: null,
    section: null,
    guide: null,
    concept: null,
    meta: null,
  } as const;
  return interactions[postType];
}
