import './IndicatorViewClear.scss';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function IndicatorViewClear() {
  return (
    <FontAwesomeIcon
      icon={faCheck}
      className="IndicatorViewClear"
      title="You read this and indicated that it was clear to you"
    />
  );
}
