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
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);
  return (
    <header className="AppHeader">
      <span className="logo">
        <Link to="/">Sika</Link>
      </span>
      <div>
        <span className="program-label">{programLabel}</span>
        {!isAuthenticated || !user ? (
          <LoginButton />
        ) : (
          <>
            <p>{user!.email}</p>
            <LogoutButton />
          </>
        )}
      </div>
    </header>
  );
}

export default AppHeader;
