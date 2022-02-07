import {
  faClipboardCheck,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./EvaluationStatus.scss";

type props = {
  status?: "rejected" | "accepted";
};

export default function EvaluationStatus({ status }: props) {
  const statusIcons = {
    submitted: <FontAwesomeIcon icon={faQuestionCircle} className="pending" />,
    rejected: <FontAwesomeIcon icon={faClipboardCheck} className="failure" />,
    accepted: <FontAwesomeIcon icon={faClipboardCheck} className="success" />,
  } as const;
  const statusIcon = statusIcons[status || "submitted"];

  return <span className="EvaluationStatus">{statusIcon}</span>;
}
