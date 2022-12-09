import "./ActivityIcon.scss";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type props = {
  activityType: "Article";
};

const activityTypes = {
  Article: (
    <FontAwesomeIcon
      icon={faBookOpen}
      className="ActivityIcon"
      title="Article"
    />
  ),
};

export default function IndicatorQuestion({ activityType }: props) {
  return activityTypes[activityType];
}
