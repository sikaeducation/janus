import "./AppHeader.scss";
import { Link } from "react-router-dom";

type props = {
  programLabel: string;
};

function AppHeader({ programLabel }: props) {
  return (
    <header className="AppHeader">
      <span className="logo">
        <Link to="/">Sika</Link>
      </span>
      <span className="program-label">{programLabel}</span>
    </header>
  );
}

export default AppHeader;
