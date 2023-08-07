import { useContext } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import {
  filter, flow, reverse, sortBy, take,
} from 'lodash/fp';
import { Markdown } from '@sikaeducation/ui';
import { performanceContext } from '../../contexts/performance';
import './EvaluationViewer.scss';
import useIndicator from '../../hooks/use-indicator';
import { programContext } from '../../contexts/program';

const formatDateTime = (dateTime: string) => format(new Date(dateTime), 'M/d/yy p');

export default function EvaluationViewer() {
  const { performancesWithEvaluations } = useContext(performanceContext);
  const { postsBySlug } = useContext(programContext);

  const getIndicator = useIndicator();
  const sortedPerformances = flow([
    filter('evaluation'),
    sortBy('evaluation.updatedAt'),
    reverse,
    take(100),
  ])(performancesWithEvaluations);

  const getPostDetails = (
    performance: evaluatedSubmissionPerformance | evaluatedQuestionPerformance,
  ) => {
    const post = performance.type === 'submission'
      ? postsBySlug[performance.postSlug]
      : postsBySlug[performance?.payload?.originalPostSlug];
    const path = post?.path || '';
    const title = post?.label?.short || post?.label?.full || '';
    return {
      post,
      path,
      title,
    };
  };

  return (
    <div className="EvaluationViewer">
      <h1>Evaluations</h1>
      <ul>
        {sortedPerformances.map(
				  (
				    performance:
							| evaluatedSubmissionPerformance
							| evaluatedQuestionPerformance,
				  ) => (
  <li key={performance.id}>
    <div className="evaluation">
      <div className="meta">
        <ul>
          <li>
            <time>
              {performance.evaluation?.updatedAt
												  ? formatDateTime(performance.evaluation.updatedAt)
												  : ''}
            </time>
          </li>
          <li>
            <Link to={getPostDetails(performance).path}>
              {getPostDetails(performance).title}
            </Link>
          </li>
          {performance.type === 'submission' && (
          <li>
            <a
              href={performance.payload.url}
              target="_blank"
              rel="noreferrer"
            >
              Submission
            </a>
          </li>
          )}
        </ul>
        <span>{getIndicator(performance)}</span>
      </div>
      {performance.evaluation?.feedback ? (
        <Markdown
          className="feedback"
          content={performance.evaluation.feedback}
        />
      ) : (
								  ''
      )}
      {performance.type === 'question' && (
      <div>
        <Markdown
          className="prompt"
          content={performance.payload.prompt}
        />
        <Markdown
          className="response"
          content={performance.payload.response}
        />
      </div>
      )}
    </div>
  </li>
				  ),
        )}
      </ul>
    </div>
  );
}
