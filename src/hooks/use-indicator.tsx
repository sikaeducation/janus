import { countBy, flow, isEmpty, values } from "lodash/fp";
import { useContext } from "react";
import {
	IndicatorSubmissionAccepted,
	IndicatorSubmissionPending,
	IndicatorSubmissionRejected,
	IndicatorViewClear,
	IndicatorViewConfident,
	IndicatorViewUnclear,
	IndicatorQuestion,
	IndicatorDeferred,
} from "@sikaeducation/ui";
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
	performance: evaluatedSubmissionPerformance,
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
	performances: Record<string, postedQuestionPerformance>,
) => {
	if (!performances) return null;

	const { rejected, pending, accepted } = flow([
		values,
		countBy((p: evaluatedQuestionPerformance) =>
			!p.evaluation ? "pending" : p.evaluation.status,
		),
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
		view: (performance: postedPerformance) =>
			getViewIndicator(performance as postedViewPerformance),
		submission: (performance: postedPerformance) =>
			getSubmissionIndicator(performance as evaluatedSubmissionPerformance),
		// eslint-disable-next-line
		prompt: (performance: postedPerformance) => {
			return null;
		},
		question: (performance: postedPerformance) =>
			isEmpty(lastQuestionPerformancesBySlugByLearnerByQuestion)
				? null
				: getQuestionIndicator(performance as evaluatedQuestionPerformance),
		questions: (performance: postedPerformance) => {
			const { postSlug } = performance as postedQuestionPerformance;
			const questionPerformances =
				lastQuestionPerformancesBySlugByLearnerByQuestion[postSlug]?.[
				performance.userId
				];
			return getQuestionIndicators(
				performance as evaluatedQuestionPerformance,
				questionPerformances,
			);
		},
	} as const;

	return (performance: postedPerformance) => {
		const getIndicator = performanceTypes[performance.type];
		return getIndicator?.(performance) || null;
	};
}
