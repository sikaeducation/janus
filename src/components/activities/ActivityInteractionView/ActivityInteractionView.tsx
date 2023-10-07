import "./ActivityInteractionView.scss";
import { last } from "lodash/fp";
import { Button } from "@sikaeducation/ui";

type props = {
  postPerformance: (performance: rawPerformance) => void;
  userId: string;
  postSlug: string;
  performances: postedViewPerformance[];
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
      type: "view",
      payload: {
        confidenceLevel,
      },
    });
  };
  return (
    <div className="ActivityInteractionView">
      <p>After reading this, I feel:</p>
      <ul>
        {buttons.map(({ label, confidenceLevel }) => (
          <li key={confidenceLevel} data-confidence-level={confidenceLevel}>
            <Button
              type="secondary"
              action={handleClick(confidenceLevel)}
              disabled={confidenceLevel === currentConfidenceLevel}
            >
              {label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
