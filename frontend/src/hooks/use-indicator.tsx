import {
  faCheck,
  faCheckCircle,
  faClipboardCheck,
  faQuestion,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { countBy, flow, isEmpty, values } from "lodash/fp";
import { useContext } from "react";
import { performanceContext } from "../contexts/performance";

const getViewIndicator = (performance: postedViewPerformance) => {
  const indicators = {
    1: (
      <FontAwesomeIcon
        icon={faTimes}
        size="sm"
        className="indicator failure"
        title="You read this and indicated that it was unclear to you"
      />
    ),
    2: (
      <FontAwesomeIcon
        icon={faCheck}
        size="sm"
        className="indicator pending"
        title="You read this and indicated that it was clear to you"
      />
    ),
    3: (
      <FontAwesomeIcon
        icon={faCheckCircle}
        size="sm"
        className="indicator success"
        title="You read this and indicated that you were confident about it."
      />
    ),
  };
  const { confidenceLevel } = performance.payload;
  return indicators[confidenceLevel];
};

const getSubmissionIndicator = (
  performance: evaluatedSubmissionPerformance
) => {
  const indicators = {
    rejected: (
      <FontAwesomeIcon
        icon={faTimes}
        className="indicator failure"
        title="Your latest submission needs more work"
      />
    ),
    submitted: (
      <FontAwesomeIcon
        icon={faQuestion}
        className="indicator submitted"
        title="Your latest submission is waiting to be graded"
      />
    ),
    accepted: (
      <FontAwesomeIcon
        icon={faClipboardCheck}
        className="indicator success"
        title="Your latest submission was accepted!"
      />
    ),
  } as const;

  const status =
    (performance as evaluatedSubmissionPerformance)?.evaluation?.status || "";
  return indicators[status || "submitted"];
};

const getQuestionIndicator = (
  performance: postedPerformance,
  performances: Record<string, postedQuestionPerformance>
) => {
  if (!performances) return null;

  const { rejected, pending, accepted } = flow([
    values,
    countBy((p: evaluatedQuestionPerformance) => {
      return !p.evaluation ? "pending" : p.evaluation.status;
    }),
  ])(performances);

  return (
    <span className="question">
      {rejected > 0 && <span className="indicator failure">{rejected}</span>}
      {pending > 0 && <span className="indicator pending">{pending}</span>}
      {accepted > 0 && <span className="indicator success">{accepted}</span>}
    </span>
  );
};

export default function useIndicator() {
  const { lastQuestionPerformancesBySlugByLearnerByQuestion } =
    useContext(performanceContext);

  const performanceTypes = {
    view: (performance: postedPerformance) => {
      return getViewIndicator(performance as postedViewPerformance);
    },
    submission: (performance: postedPerformance) => {
      return getSubmissionIndicator(
        performance as evaluatedSubmissionPerformance
      );
    },
    // eslint-disable-next-line
    prompt: (performance: postedPerformance) => {
      return null;
    },
    question: (performance: postedPerformance) => {
      return isEmpty(lastQuestionPerformancesBySlugByLearnerByQuestion)
        ? null
        : getQuestionIndicator(
            performance as evaluatedQuestionPerformance,
            lastQuestionPerformancesBySlugByLearnerByQuestion?.[
              (performance as postedQuestionPerformance)?.payload
                ?.originalPostSlug
            ]?.[performance.userId] || ""
          );
    },
    questions: (performance: postedPerformance) => {
      const { postSlug } = performance as postedQuestionPerformance;
      const questionPerformances =
        lastQuestionPerformancesBySlugByLearnerByQuestion[postSlug]?.[
          performance.userId
        ];
      return getQuestionIndicator(
        performance as evaluatedQuestionPerformance,
        questionPerformances
      );
    },
  } as const;

  return (performance: postedPerformance) => {
    const getIndicator = performanceTypes[performance.type];
    return getIndicator?.(performance) || null;
  };
}
