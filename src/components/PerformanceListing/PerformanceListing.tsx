import Gravatar from "react-gravatar";
import LearnerPrompt from "../LearnerPrompt";
import LearnerQuestion from "../LearnerQuestion";
import LearnerSubmission from "../LearnerSubmission";
import LearnerViewing from "../LearnerViewing";
import "./PerformanceListing.scss";

type props = {
  performance: postedPerformance;
};

export default function PerformanceListing({ performance }: props){
	const performanceListingTypes = {
		view: <LearnerViewing performance={performance as postedViewPerformance} />,
		submission: (
      <LearnerSubmission
        performance={performance as evaluatedSubmissionPerformance}
      />
		),
		prompt: (
      <LearnerPrompt performance={performance as postedPromptPerformance} />
		),
		question: (
      <LearnerQuestion
        performance={performance as evaluatedQuestionPerformance}
      />
		),
	} as const;
	const performanceListingType = performanceListingTypes[performance.type];

	return (
    <div className="PerformanceListing">
      <Gravatar
        className="avatar"
        default="identicon"
        email={performance.userId}
        size={60}
      />
      {performanceListingType}
    </div>
	);
}
