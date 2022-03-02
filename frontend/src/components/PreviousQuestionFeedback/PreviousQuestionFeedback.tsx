import { format } from "date-fns";
import useIndicator from "../../hooks/use-indicator";
import AppContent from "../AppContent";
import "./PreviousQuestionFeedback.scss";

const formatDateTime = (dateTime: string) => {
  return format(new Date(dateTime), "M/d/yy p");
};

type props = {
  performances: evaluatedQuestionPerformance[];
};

export default function PreviousQuestionFeedback({ performances }: props) {
  const getIndicator = useIndicator();

  return (
    <ul className="PreviousQuestionFeedback">
      {performances.map((performance) => (
        <li key={performance.id}>
          <div>
            <div className="meta">
              <time>
                {performance.evaluation?.createdAt &&
                  formatDateTime(performance.evaluation.createdAt)}
              </time>
              {getIndicator(performance)}
            </div>
            <AppContent
              className="response"
              isContained
              content={performance.payload.response}
            />
            {performance.evaluation?.feedback && (
              <AppContent
                isContained
                className="feedback"
                content={performance.evaluation.feedback}
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
