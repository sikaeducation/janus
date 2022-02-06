import { Link } from "react-router-dom";
import "./ToastNotification.scss";

function ToastNotification() {
  return (
    <div className="ToastNotification">
      <Link to="/activity">You have a new message</Link>
    </div>
  );
}

export default ToastNotification;
