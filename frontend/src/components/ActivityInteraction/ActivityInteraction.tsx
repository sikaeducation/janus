import "./ActivityInteraction.scss";
import { useContext } from "react";
import { activityContext } from "../../contexts/activity";

type props = {
  userId: number;
  postSlug: string;
  currentConfidenceLevel?: 1 | 2 | 3;
};

export default function ActivityInteraction({
  userId,
  postSlug,
  currentConfidenceLevel,
}: props) {
  const { postActivity } = useContext(activityContext);
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
    <div className="ActivityInteraction">
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
