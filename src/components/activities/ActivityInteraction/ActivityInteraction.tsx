import "./ActivityInteraction.scss";
import { useContext } from "react";
import { performanceContext } from "../../../contexts/performance";

import ActivityInteractionView from "../ActivityInteractionView";
import ActivityInteractionSubmission from "../ActivityInteractionSubmission";
import ActivityInteractionQuestions from "../ActivityInteractionQuestions";

type props = {
  postType: postType;
  userId: string;
  postSlug: string;
};

export default function ActivityInteraction({
	postType,
	userId,
	postSlug,
}: props){
	const { postPerformance, performancesBySlugByLearner }
    = useContext(performanceContext);
	const performances = performancesBySlugByLearner?.[postSlug]?.[userId] ?? [];
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
