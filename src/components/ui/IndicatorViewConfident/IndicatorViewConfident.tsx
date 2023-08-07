import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IndicatorViewConfident.scss';

export default function IndicatorViewConfident() {
  return (
    <FontAwesomeIcon
      icon={faCheckCircle}
      className="IndicatorViewConfident"
      title="You read this and indicated that you were confident about it."
    />
  );
}
