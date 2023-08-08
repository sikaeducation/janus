import { format } from "date-fns";
import { Markdown } from "@sikaeducation/ui";
import useIndicator from "../../hooks/use-indicator";
import "./PreviousQuestionFeedback.scss";

const formatDateTime = (dateTime: string) =>
  format(new Date(dateTime), "M/d/yy p");

type props = {
  performances: evaluatedQuestionPerformance[];
};

export default function PreviousQuestionFeedback({ performances }: props) {
  const getIndicator = useIndicator();
  const performancesWithEvaluations = performances.filter(
    (performance) => performance.evaluation,
  );

  return (
    <ul className="PreviousQuestionFeedback">
      {performancesWithEvaluations.map((performance) => (
        <li key={performance.id}>
          <div>
            <div className="meta">
              <time>
                {performance.evaluation?.createdAt &&
                  formatDateTime(performance.evaluation.createdAt)}
              </time>
              {getIndicator(performance)}
            </div>
            <Markdown
              className="response"
              content={performance.payload.response}
            />
            {performance.evaluation?.feedback && (
              <Markdown
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
