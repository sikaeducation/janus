// eslint-disable-next-line
// @ts-nocheck
import {
	maxBy, fromPairs,
} from "lodash/fp";
import {
	User,
} from "@auth0/auth0-react";
import {
	useEffect, useContext, useState, useCallback, useRef,
} from "react";
import {
	Markdown,
} from "@sikaeducation/ui";
import {
	programContext,
} from "../../contexts/program";
import {
	performanceContext,
} from "../../contexts/performance";
import "./AppEvaluator.scss";
// eslint-disable-next-line max-len
import EvaluatorPerformance from "../../components/evaluator/EvaluatorPerformance";
// eslint-disable-next-line max-len
import EvaluatorPerformanceHeader from "../../components/evaluator/EvaluatorPerformanceHeader";
// eslint-disable-next-line max-len
import EvaluatorQuestionSelector from "../../components/evaluator/EvaluatorQuestionSelector";

type performanceTuple = [string, evaluatedQuestionPerformance];

type props = {
  user?: User;
};

export default function AppEvaluator({
	user,
}: props){
	const {
		unevaluatedQuestionPerformancesBySlugByLearner, postEvaluation,
	}
    = useContext(performanceContext);
	const [
		selectedSlug,
		setSelectedSlug,
	] = useState("");
	const [
		evaluations,
		setEvaluations,
	] = useState<
    Record<
      string,
      {
        feedback: string;
        status: string;
        performance: evaluatedQuestionPerformance;
      }
    >
  >({
  });
	const slugs = Object.keys(unevaluatedQuestionPerformancesBySlugByLearner);
	const currentQuestion
    = unevaluatedQuestionPerformancesBySlugByLearner[selectedSlug] || {
    };
	const currentPerformances = Object.entries(currentQuestion)
		.map(([
			learnerId,
			performances,
		]) => [
			learnerId,
			maxBy(
				"createdAt",
				performances,
			),
		] as const);

	const {
		prompt, answer,
	} = currentPerformances?.[0]?.[1]?.payload || {
	};
	const {
		postsBySlug,
	} = useContext(programContext);
	const getPath = useCallback(
		(slug: string) => postsBySlug[slug].path ?? "",
		[
			postsBySlug,
		],
	);
	const getFeedback = useCallback(
		(learnerId: string) => evaluations[learnerId]?.feedback || "",
		[
			evaluations,
		],
	);
	const getStatus = useCallback(
		(learnerId: string) => evaluations[learnerId]?.status || "",
		[
			evaluations,
		],
	);

	const setAll = (status: string) => setEvaluations((previousState) => {
		const newState = Object.entries(previousState)
			.map(([
				learnerId,
				evaluation,
			]) => [
				learnerId,
				{
					...evaluation,
					status,
				},
			]);
		return fromPairs(newState);
	});
	const updateFeedback = useCallback(
		(learnerId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setEvaluations((evaluations) => ({
				...evaluations,
				[learnerId]: {
					...evaluations[learnerId],
					feedback: event.target.value,
				},
			}));
		},
		[],
	);

	const updateStatus = useCallback(
		(learnerId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setEvaluations((evaluations) => ({
				...evaluations,
				[learnerId]: {
					...evaluations[learnerId],
					status: event.target.value,
				},
			}));
		},
		[],
	);

	const submitAll = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const requests = Object.entries(evaluations)
		// eslint-disable-next-line
			.filter(([learnerId, evaluation]) => evaluation.status !== "pending")
			.map(([
				learnerId,
				evaluation,
			]) => {
				const learnerPerformance = currentPerformances.find(([
					performanceLearnerId]:
performanceTuple) => performanceLearnerId === learnerId);
				const evaluationToPost = {
					performanceId: learnerPerformance[1].id,
					learnerId,
					evaluatorId: user?.email || "",
					feedback: evaluation.feedback,
					status: evaluation.status as "accepted" | "rejected",
				};
				return postEvaluation(evaluationToPost);
			});
		Promise.all(requests)
			.then(() => {
				// index 0 will still be there while waiting for sockets to come back
				setSelectedSlug(slugs.length > 1
					? slugs[1]
					: "");
			})
			.catch((error) => {
				// eslint-disable-next-line
				console.error(error.message);
			});
	};

	const isInitialized = useRef(false);
	useEffect(
		() => {
			if (slugs.length > 0 && !isInitialized.current){
				setSelectedSlug(slugs.length > 0
					? slugs[0]
					: "");
				isInitialized.current = true;
			}
		},
		[
			unevaluatedQuestionPerformancesBySlugByLearner,
			slugs,
		],
	);
	useEffect(
		() => {
			const getInitialEvaluations = () => currentPerformances.reduce(
				(initialState, [
					learnerId,
					performance,
				]) => ({
					...initialState,
					[learnerId]: {
						feedback: "",
						status: "pending",
						performance,
					},
				}),
				{
				},
			);

			setEvaluations(getInitialEvaluations());
		},
		[
			selectedSlug,
			currentPerformances,
		],
	);

	return (
    <div className="AppEvaluator">
      <h2>Evaluator</h2>
      <EvaluatorQuestionSelector
        slugs={slugs}
        selectedSlug={selectedSlug}
        setSelectedSlug={setSelectedSlug}
      />
      {selectedSlug && (
        <>
          <div className="question-details">
            <Markdown className="prompt" content={prompt || ""} />
            {answer && <Markdown className="answer" content={`${answer}`} />}
          </div>
          <form onSubmit={submitAll}>
            <table className="evaluator-performances">
              <EvaluatorPerformanceHeader setAll={setAll} />
              <tbody>
                {currentPerformances.map(([
                	learnerId,
                	performance,
                ]) => (
                  <EvaluatorPerformance
                    key={learnerId}
                    performance={performance}
                    path={getPath(performance.payload.originalPostSlug)}
                    status={getStatus(learnerId)}
                    updateStatus={updateStatus}
                    feedback={getFeedback(learnerId)}
                    updateFeedback={updateFeedback}
                  />
                ))}
              </tbody>
            </table>
            <button type="submit">Submit All</button>
          </form>
        </>
      )}
    </div>
	);
}
