import {
  faCheck,
  faCheckCircle,
  faCheckSquare,
  faClipboardCheck,
  faQuestion,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  every,
  flow,
  identity,
  isEmpty,
  map,
  negate,
  some,
  values,
} from "lodash/fp";
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
        size="sm"
        className="indicator failure"
        title="Your latest submission needs more work"
      />
    ),
    submitted: (
      <FontAwesomeIcon
        icon={faQuestion}
        size="sm"
        className="indicator submitted"
        title="Your latest submission is waiting to be graded"
      />
    ),
    accepted: (
      <FontAwesomeIcon
        icon={faClipboardCheck}
        size="sm"
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
  const indicators = {
    rejected: (
      <FontAwesomeIcon
        icon={faTimes}
        size="sm"
        className="indicator failure"
        title="Some of these answers need more work"
      />
    ),
    submitted: (
      <FontAwesomeIcon
        icon={faQuestion}
        size="sm"
        className="indicator pending"
        title="You have reponses waiting to be evaluated"
      />
    ),
    accepted: (
      <FontAwesomeIcon
        icon={faCheckSquare}
        size="sm"
        className="indicator success"
        title="All of these answers were accepted!"
      />
    ),
  } as const;

  if (!performances) return null;

  const anyPending = flow([
    values,
    map(
      (latestPerformance: evaluatedQuestionPerformance) =>
        !!latestPerformance.evaluation
    ),
    some(negate(identity)),
  ])(performances);

  if (anyPending) {
    return indicators.submitted;
  }

  const allPassing = flow([
    values,
    map(
      (latestPerformance: evaluatedQuestionPerformance) =>
        latestPerformance.evaluation?.status === "accepted"
    ),
    every(identity),
  ])(performances);

  if (allPassing) {
    return indicators.accepted;
  }

  return indicators.rejected;
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
