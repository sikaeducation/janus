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
              className="prompt"
              isContained
              content={performance.payload.prompt}
            />
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
