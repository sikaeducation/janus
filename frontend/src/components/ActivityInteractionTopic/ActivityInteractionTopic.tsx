import "./ActivityInteractionTopic.scss";
import { last } from "lodash/fp";

type props = {
  postPerformance: (performance: performance) => void;
  userId: string;
  postSlug: string;
  performances: performance[];
};

export default function ActivityInteractionTopic({
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
        type: "topic-view",
        confidenceLevel,
      },
    });
  };
  return (
    <div className="ActivityInteractionTopic">
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
