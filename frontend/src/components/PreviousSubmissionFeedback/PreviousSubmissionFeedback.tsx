import { format } from "date-fns";
import AppContent from "../AppContent";
import "./PreviousSubmissionFeedback.scss";

const formatDateTime = (dateTime: string) => {
  return format(new Date(dateTime), "M/d/yy p");
};

type props = {
  performances: evaluatedSubmissionPerformance[];
};

export default function PreviousSubmissionFeedback({ performances }: props) {
  return (
    <ul className="PreviousSubmissionFeedback">
      {performances.map((performance) => (
        <li key={performance.id}>
          <div>
            <a href={performance.payload.url}>
              <time>
                {formatDateTime(performance.evaluation?.createdAt || "")}
              </time>
            </a>
            {performance.evaluation?.feedback ? (
              <AppContent
                wrapperClassName="contained"
                content={performance.evaluation?.feedback}
              />
            ) : (
              <p>None</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
