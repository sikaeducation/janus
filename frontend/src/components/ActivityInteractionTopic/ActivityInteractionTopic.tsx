import "./ActivityInteractionTopic.scss";
import { last } from "lodash/fp";

type props = {
  postActivity: (activity: activity) => void;
  userId: string;
  postSlug: string;
  activities: activity[];
};

export default function ActivityInteractionTopic({
  userId,
  postSlug,
  activities,
  postActivity,
}: props) {
  const currentConfidenceLevel = last(activities)?.payload.confidenceLevel;
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
    postActivity({
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
