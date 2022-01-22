/* eslint @typescript-eslint/no-non-null-assertion: "off" */
import "./AppHeader.scss";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";

type props = {
  programLabel: string;
};

function AppHeader({ programLabel }: props) {
  const { user, isAuthenticated } = useAuth0();
  return (
    <header className="AppHeader">
      <span className="logo">
        <Link to="/">Sika</Link>
      </span>
      <div className="user-info">
        {!isAuthenticated || !user ? (
          <LoginButton />
        ) : (
          <LogoutButton>
            <img className="avatar" src={user.picture} alt={user.name} />
          </LogoutButton>
        )}
        <div className="program-label">{programLabel}</div>
      </div>
    </header>
  );
}

export default AppHeader;
