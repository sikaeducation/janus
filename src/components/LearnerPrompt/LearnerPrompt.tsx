import { format } from 'date-fns';
import { Markdown } from '@sikaeducation/ui';
import './LearnerPrompt.scss';

const formatTime = (dateTime: string) => format(new Date(dateTime), 'p');

export default function LearnerPrompt({
  performance,
}: {
	performance: postedPromptPerformance;
}) {
  return (
    <div className="LearnerPrompt">
      <p className="description">
        {performance.userId}
        {' '}
        answered a prompt.
      </p>
      <ul className="meta">
        <li>
          <time>{formatTime(performance.createdAt)}</time>
        </li>
      </ul>
      <div className="prompt-response">
        <Markdown
          className="prompt"
          content={performance.payload.prompt || ''}
        />
        <Markdown
          className="response"
          content={performance.payload.response || ''}
        />
      </div>
    </div>
  );
}
