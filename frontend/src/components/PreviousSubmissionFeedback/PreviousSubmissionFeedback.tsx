import { format } from "date-fns";
import useIndicator from "../../hooks/use-indicator";
import Markdown from "../ui/Markdown";
import "./PreviousSubmissionFeedback.scss";

const formatDateTime = (dateTime: string) => {
  return format(new Date(dateTime), "M/d/yy p");
};

type props = {
  performances: evaluatedSubmissionPerformance[];
};

export default function PreviousSubmissionFeedback({ performances }: props) {
  const getIndicator = useIndicator();
  const performancesWithEvaluations = performances.filter(
    (performance) => performance.evaluation
  );

  return (
    <ul className="PreviousSubmissionFeedback">
      {performancesWithEvaluations.map((performance) => (
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
              <Markdown
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
