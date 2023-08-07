import './IndicatorDeferred.scss';

import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function IndicatorDeferred() {
  return (
    <FontAwesomeIcon
      icon={faMinus}
      className="IndicatorDeferred"
      title="A new submission was created before this was evaluated"
    />
  );
}
