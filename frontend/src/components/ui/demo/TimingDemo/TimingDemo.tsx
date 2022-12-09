import { useState } from "react";
import "./TimingDemo.scss";

export default function TimingDemo() {
  const [showing, setShowing] = useState<boolean>(false);
  const toggleShowing = () => setShowing(!showing);

  return (
    <div className="TimingDemo">
      <p>Transition timing:</p>
      <div className="transition">Hover</div>
      <hr />
      <p>Notification duration</p>
      <button type="button" onClick={toggleShowing}>
        {showing ? "Hide" : "Show"} notification
      </button>
      <div className="notification-container">
        &nbsp;
        {showing && <span className="notification">Flash Notification</span>}
        {showing && <span className="timer">&nbsp;</span>}
      </div>
    </div>
  );
}
