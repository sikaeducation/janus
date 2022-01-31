import "./ActivityInteractionView.scss";
import { last } from "lodash/fp";

type props = {
  postPerformance: (performance: rawPerformance) => void;
  userId: string;
  postSlug: string;
  performances: postedTopicViewPerformance[];
};

export default function ActivityInteractionView({
  userId,
  postSlug,
  performances,
  postPerformance,
}: props) {
  const currentConfidenceLevel = last(performances)?.payload.confidenceLevel;
  const buttons = [
    {
      confidenceLevel: 1,
      label: "Unclear",
    },
    {
      confidenceLevel: 2,
      label: "Clear",
    },
    {
      confidenceLevel: 3,
      label: "Confident",
    },
  ] as const;
  const handleClick = (confidenceLevel: confidenceLevel) => () => {
    postPerformance({
      userId,
      postSlug,
      payload: {
        type: "view",
        confidenceLevel,
      },
    });
  };
  return (
    <div className="ActivityInteractionView">
      <p>After reading this, I feel:</p>
      <ul>
        {buttons.map(({ label, confidenceLevel }) => (
          <li key={confidenceLevel}>
            <button
              type="button"
              onClick={handleClick(confidenceLevel)}
              data-confidence-level={confidenceLevel}
              className={
                confidenceLevel === currentConfidenceLevel ? "active" : ""
              }
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
