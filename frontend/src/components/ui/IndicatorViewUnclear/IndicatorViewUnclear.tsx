import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./IndicatorViewUnclear.scss";

export default function IndicatorViewUnclear() {
  return (
    <FontAwesomeIcon
      icon={faTimes}
      className="IndicatorViewUnclear"
      title="You read this and indicated that it was unclear to you"
    />
  );
}
