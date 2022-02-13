import { faCheck, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  every,
  flow,
  identity,
  map,
  mapValues,
  negate,
  some,
  tap,
  values,
} from "lodash/fp";
import { useContext } from "react";
import { performanceContext } from "../contexts/performance";

const getViewIndicator = (performance: postedViewPerformance) => {
  const indicators = {
    1: (
      <FontAwesomeIcon
        icon={faCheck}
        size="xs"
        className="indicator failure"
        title="You read this and indicated that it was unclear to you"
      />
    ),
    2: (
      <FontAwesomeIcon
        icon={faCheck}
        size="xs"
        className="indicator"
        title="You read this and indicated that it was clear to you"
      />
    ),
    3: (
      <FontAwesomeIcon
        icon={faCheck}
        size="xs"
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
        icon={faClipboardCheck}
        size="xs"
        className="indicator failure"
        title="Your latest submission needs more work"
      />
    ),
    accepted: (
      <FontAwesomeIcon
        icon={faClipboardCheck}
        size="xs"
        className="indicator success"
        title="Your latest submission was accepted!"
      />
    ),
    submitted: (
      <FontAwesomeIcon
        icon={faClipboardCheck}
        size="xs"
        className="indicator submitted"
        title="Your latest submission is waiting to be graded"
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
        icon={faClipboardCheck}
        size="xs"
        className="indicator failure"
        title="Some of these answers need more work"
      />
    ),
    accepted: (
      <FontAwesomeIcon
        icon={faClipboardCheck}
        size="xs"
        className="indicator success"
        title="All of these answers were accepted!"
      />
    ),
    submitted: (
      <FontAwesomeIcon
        icon={faClipboardCheck}
        size="xs"
        className="indicator submitted"
        title="You have reponses waiting to be evaluated"
      />
    ),
  } as const;

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
  const { lastQuestionPerformancesBySlug } = useContext(performanceContext);

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
      return getQuestionIndicator(
        performance as evaluatedQuestionPerformance,
        lastQuestionPerformancesBySlug[performance.postSlug]
      );
    },
  } as const;

  return (performance: postedPerformance) => {
    return performanceTypes[performance.type](performance);
  };
}
