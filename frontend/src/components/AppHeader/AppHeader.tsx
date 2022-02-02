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
  const { program } = useContext(programContext);
  const programLabel = program?.label || "";

  return (
    <header className="AppHeader">
      <span className="logo">
        <Link to="/">Sika</Link>
      </span>
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
        <div className="program-label">{programLabel}</div>
      </div>
    </header>
  );
}

export default AppHeader;
