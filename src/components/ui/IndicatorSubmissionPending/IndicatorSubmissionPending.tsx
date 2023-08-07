import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IndicatorSubmissionPending.scss';

export default function IndicatorSubmissionPending() {
  return (
    <FontAwesomeIcon
      icon={faQuestion}
      className="IndicatorSubmissionPending"
      title="Your latest submission is waiting to be evaluated"
    />
  );
}
