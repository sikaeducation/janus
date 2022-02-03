/* eslint @typescript-eslint/no-non-null-assertion: "off", no-nested-ternary: "off" */
import "./AppHeader.scss";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { useContext } from "react";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import { programContext } from "../../contexts/program";

function AppHeader() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const role = (user && user["https://sikaeducation.com/role"]) || "";
  const { program } = useContext(programContext);
  const programLabel = program?.label || "";

  const links = [
    <li key="1">
      <Link to="/">Curriculum</Link>
    </li>,
    <li key="2">
      <Link to="/activity">Activity</Link>
    </li>,
    <li key="3">
      <Link to="/inbox">Inbox</Link>
    </li>,
    role === "coach" && (
      <li key="4">
        <Link to="/program-viewer">Program Viewer</Link>
      </li>
    ),
  ];

  return (
    <header className="AppHeader">
      <nav className="primary-navigation">
        <span className="logo">
          <Link to="/">Sika</Link>
        </span>
        <ul className="links">{links}</ul>
        <div className="program-label">{programLabel}</div>
      </nav>
      <div className="user-info">
        {!isLoading ? (
          !isAuthenticated || !user ? (
            <LoginButton />
          ) : (
            <LogoutButton>
              <img className="avatar" src={user.picture} alt={user.name} />
            </LogoutButton>
          )
        ) : (
          <img
            className="avatar"
            src="/user-avatar-placeholder.png"
            alt="user avatar placeholder"
          />
        )}
      </div>
    </header>
  );
}

export default AppHeader;
