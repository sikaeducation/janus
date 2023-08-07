import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IndicatorSubmissionAccepted.scss';

export default function IndicatorSubmissionAccepted() {
  return (
    <FontAwesomeIcon
      icon={faClipboardCheck}
      className="IndicatorSubmissionAccepted"
      title="Your latest submission was accepted!"
    />
  );
}
