import { format } from "date-fns";
import AppContent from "../AppContent";
import "./PreviousQuestionFeedback.scss";

const formatDateTime = (dateTime: string) => {
  return format(new Date(dateTime), "M/d/yy p");
};

type props = {
  performances: evaluatedQuestionPerformance[];
};

export default function PreviousQuestionFeedback({ performances }: props) {
  return (
    <ul className="PreviousQuestionFeedback">
      {performances.map((performance) => (
        <li key={performance.id}>
          <div>
            <time>
              {formatDateTime(performance.evaluation?.createdAt || "")}
            </time>
            <AppContent
              wrapperClassName="contained"
              content={performance.payload.prompt}
            />
            <AppContent
              wrapperClassName="contained"
              content={performance.payload.response}
            />
            {performance.evaluation?.feedback ? (
              <AppContent
                wrapperClassName="contained"
                content={performance.evaluation.feedback}
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
