import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import Gravatar from 'react-gravatar';
import useIndicator from '../../hooks/use-indicator';
import Markdown from '../ui/Markdown';
import './PreviousQuestionResponses.scss';

type Props = {
  performances: evaluatedQuestionPerformance[];
  shouldDisplay: boolean;
  setShouldDisplay: (newState: boolean) => void;
};

const formatDateTime = (dateTime: string) => format(new Date(dateTime), 'M/d/yy: p');

export default function PreviousQuestionResponses({
  performances,
  shouldDisplay,
  setShouldDisplay,
}: Props) {
  const getIndicator = useIndicator();
  const handleKeyboard = (state: boolean) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13) {
      setShouldDisplay(state);
    }
  };
  return (
    <div className="PreviousQuestionResponses">
      {shouldDisplay ? (
        <>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setShouldDisplay(false)}
            onKeyDown={handleKeyboard(false)}
            className="previous-response-control"
          >
            <FontAwesomeIcon icon={faCaretDown} />
            {' '}
            Previous Responses
          </div>
          <ul>
            {performances.map((performance) => (
              <li key={performance.id}>
                <div className="previous-content">
                  <div className="meta">
                    <time>{formatDateTime(performance.createdAt)}</time>
                    {getIndicator(performance)}
                  </div>
                  <Markdown
                    content={performance.payload.response}
                    className="previous-response-content"
                  />
                  {performance.evaluation?.feedback && (
                    <>
                      <Gravatar
                        email={performance.evaluation.evaluatorId}
                        className="evaluator-avatar"
                      />
                      <Markdown
                        content={performance.evaluation.feedback}
                        className="previous-feedback-content"
                      />
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setShouldDisplay(true)}
          onKeyDown={handleKeyboard(true)}
          className="previous-response-control"
        >
          <FontAwesomeIcon icon={faCaretRight} />
          {' '}
          Previous Responses
        </div>
      )}
    </div>
  );
}
