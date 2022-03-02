import { format } from "date-fns";
import useIndicator from "../../hooks/use-indicator";
import AppContent from "../AppContent";
import "./PreviousSubmissionFeedback.scss";

const formatDateTime = (dateTime: string) => {
  return format(new Date(dateTime), "M/d/yy p");
};

type props = {
  performances: evaluatedSubmissionPerformance[];
};

export default function PreviousSubmissionFeedback({ performances }: props) {
  const getIndicator = useIndicator();

  return (
    <ul className="PreviousSubmissionFeedback">
      {performances.map((performance) => (
        <li key={performance.id}>
          <div>
            <div className="meta">
              <a href={performance.payload.url}>
                <time>
                  {performance.evaluation?.createdAt &&
                    formatDateTime(performance.evaluation?.createdAt)}
                </time>
              </a>
              {getIndicator(performance)}
            </div>
            {performance.evaluation?.feedback ? (
              <AppContent
                className="feedback"
                isContained
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
