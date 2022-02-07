import Gravatar from "react-gravatar";
import DescriptionPrompt from "../DescriptionPrompt";
import DescriptionSubmission from "../DescriptionSubmission";
import DescriptionView from "../DescriptionView";
import LearnerPrompt from "../LearnerPrompt";
import LearnerSubmission from "../LearnerSubmission";
import LearnerViewing from "../LearnerViewing";
import "./PerformanceListing.scss";

type props = {
  performance: postedPerformance;
};

export default function PerformanceListing({ performance }: props) {
  const performanceListingTypes = {
    view: (
      <>
        <LearnerViewing performance={performance as postedViewPerformance} />
        <DescriptionView performance={performance as postedViewPerformance} />
      </>
    ),
    submission: (
      <>
        <DescriptionSubmission
          performance={performance as evaluatedSubmissionPerformance}
        />
        <LearnerSubmission
          performance={performance as evaluatedSubmissionPerformance}
        />
      </>
    ),
    prompt: (
      <>
        <DescriptionPrompt
          performance={performance as evaluatedSubmissionPerformance}
        />
        <LearnerPrompt
          performance={performance as evaluatedSubmissionPerformance}
        />
      </>
    ),
  } as const;
  const performanceListingType = performanceListingTypes[performance.type];

  return (
    <div className="PerformanceListing">
      <Gravatar default="identicon" email={performance.userId} size={60} />
      {performanceListingType}
    </div>
  );
}
