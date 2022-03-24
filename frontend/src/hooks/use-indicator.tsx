import { countBy, flow, isEmpty, values } from "lodash/fp";
import { useContext } from "react";
import IndicatorDeferred from "../components/IndicatorDeferred";
import IndicatorQuestion from "../components/IndicatorQuestion";
import IndicatorSubmissionAccepted from "../components/IndicatorSubmissionAccepted";
import IndicatorSubmissionPending from "../components/IndicatorSubmissionPending";
import IndicatorSubmissionRejected from "../components/IndicatorSubmissionRejected";
import IndicatorViewClear from "../components/IndicatorViewClear";
import IndicatorViewConfident from "../components/IndicatorViewConfident";
import IndicatorViewUnclear from "../components/IndicatorViewUnclear";
import { performanceContext } from "../contexts/performance";

const getViewIndicator = (performance: postedViewPerformance) => {
  const indicators = {
    1: <IndicatorViewUnclear />,
    2: <IndicatorViewClear />,
    3: <IndicatorViewConfident />,
  };
  const { confidenceLevel } = performance.payload;
  return indicators[confidenceLevel];
};

const getSubmissionIndicator = (
  performance: evaluatedSubmissionPerformance
) => {
  const indicators = {
    rejected: <IndicatorSubmissionRejected />,
    pending: <IndicatorSubmissionPending />,
    accepted: <IndicatorSubmissionAccepted />,
    deferred: <IndicatorDeferred />,
  } as const;

  const status =
    (performance as evaluatedSubmissionPerformance)?.evaluation?.status || "";
  return indicators[status || "pending"];
};

const getQuestionIndicator = (performance: evaluatedQuestionPerformance) => {
  const indicators = {
    rejected: <IndicatorSubmissionRejected />,
    pending: <IndicatorSubmissionPending />,
    accepted: <IndicatorSubmissionAccepted />,
    deferred: <IndicatorDeferred />,
  } as const;

  const status = performance?.evaluation?.status || "pending";
  return indicators[status];
};

const getQuestionIndicators = (
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
    <IndicatorQuestion
      pending={pending}
      rejected={rejected}
      accepted={accepted}
    />
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
        : getQuestionIndicator(performance as evaluatedQuestionPerformance);
    },
    questions: (performance: postedPerformance) => {
      const { postSlug } = performance as postedQuestionPerformance;
      const questionPerformances =
        lastQuestionPerformancesBySlugByLearnerByQuestion[postSlug]?.[
          performance.userId
        ];
      return getQuestionIndicators(
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
