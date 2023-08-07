import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IndicatorSubmissionRejected.scss';

export default function IndicatorSubmissionRejected() {
  return (
    <FontAwesomeIcon
      icon={faTimes}
      className="IndicatorSubmissionRejected"
      title="Your latest submission needs more work"
    />
  );
}
