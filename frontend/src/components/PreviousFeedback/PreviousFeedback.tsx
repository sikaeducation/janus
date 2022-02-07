import { format } from "date-fns";
import AppContent from "../AppContent";
import "./PreviousFeedback.scss";

type props = {
  performances: evaluatedSubmissionPerformance[];
};

const formatDateTime = (dateTime: string) => {
  return format(new Date(dateTime), "M/d/yy p");
};

export default function PreviousFeedback({ performances }: props) {
  return (
    <ul className="previous-feedback">
      {performances.map((performance) => (
        <li key={performance.id}>
          <div>
            <a href={performance.payload.url}>
              <time>
                {formatDateTime(performance.evaluation?.createdAt || "")}
              </time>
            </a>
            <AppContent content={performance.evaluation?.feedback || ""} />
          </div>
        </li>
      ))}
    </ul>
  );
}
