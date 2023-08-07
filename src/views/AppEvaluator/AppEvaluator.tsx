// eslint-disable-next-line
// @ts-nocheck
import { maxBy, fromPairs } from 'lodash/fp';
import { User } from '@auth0/auth0-react';
import {
  useEffect, useContext, useState, useCallback, useRef,
} from 'react';
import AppContent from '../../components/AppContent';
import { programContext } from '../../contexts/program';
import { performanceContext } from '../../contexts/performance';
import './AppEvaluator.scss';
import EvaluatorPerformance from '../../components/EvaluatorPerformance';
import EvaluatorPerformanceHeader from '../../components/EvaluatorPerformanceHeader';
import EvaluatorQuestionSelector from '../../components/EvaluatorQuestionSelector';

type performanceTuple = [string, evaluatedQuestionPerformance];

type props = {
  user?: User;
};

export default function AppEvaluator({ user }: props) {
  const { unevaluatedQuestionPerformancesBySlugByLearner, postEvaluation } = useContext(performanceContext);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [evaluations, setEvaluations] = useState<
    Record<
      string,
      {
        feedback: string;
        status: string;
        performance: evaluatedQuestionPerformance;
      }
    >
  >({});
  const slugs = Object.keys(unevaluatedQuestionPerformancesBySlugByLearner);
  const currentQuestion = unevaluatedQuestionPerformancesBySlugByLearner[selectedSlug] || {};
  const currentPerformances = Object.entries(currentQuestion).map(
    ([learnerId, performances]) => [learnerId, maxBy('createdAt', performances)] as const,
  );

  const getInitialEvaluations = () => currentPerformances.reduce((initialState, [learnerId, performance]) => ({
    ...initialState,
    [learnerId]: {
      feedback: '',
      status: 'pending',
      performance,
    },
  }), {});

  const { prompt, answer } = currentPerformances?.[0]?.[1]?.payload || {};
  const { postsBySlug } = useContext(programContext);
  const getPath = useCallback((slug: string) => postsBySlug[slug].path ?? '');
  const getFeedback = useCallback((learnerId: string) => evaluations[learnerId]?.feedback || '');
  const getStatus = useCallback((learnerId: string) => evaluations[learnerId]?.status || '');

  const setAll = (status: string) => setEvaluations((previousState) => {
    const newState = Object.entries(previousState).map(
      ([learnerId, evaluation]) => [
        learnerId,
        {
          ...evaluation,
          status,
        },
      ],
    );
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
      .map(([learnerId, evaluation]) => {
        const learnerPerformance = currentPerformances.find(
          ([performanceLearnerId]: performanceTuple) => performanceLearnerId === learnerId,
        );
        const evaluationToPost = {
          performanceId: learnerPerformance[1].id,
          learnerId,
          evaluatorId: user?.email || '',
          feedback: evaluation.feedback,
          status: evaluation.status as 'accepted' | 'rejected',
        };
        return postEvaluation(evaluationToPost);
      });
    Promise.all(requests)
      .then(() => {
        setSelectedSlug(slugs.length > 1 ? slugs[1] : ''); // index 0 will still be there while waiting for sockets to come back
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(error.message);
      });
  };

  const isInitialized = useRef(false);
  useEffect(() => {
    if (slugs.length > 0 && !isInitialized.current) {
      setSelectedSlug(slugs.length > 0 ? slugs[0] : '');
      isInitialized.current = true;
    }
  }, [unevaluatedQuestionPerformancesBySlugByLearner]);
  useEffect(() => {
    setEvaluations(getInitialEvaluations());
  }, [selectedSlug]);

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
            <AppContent className="prompt" content={prompt || ''} />
            {answer && <AppContent className="answer" content={`${answer}`} />}
          </div>
          <form onSubmit={submitAll}>
            <table className="evaluator-performances">
              <EvaluatorPerformanceHeader setAll={setAll} />
              <tbody>
                {currentPerformances.map(([learnerId, performance]) => (
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
