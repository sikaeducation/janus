import "./AppHeader.scss";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { useSelector } from "react-redux";
import Button from "../ui/Button";
import Logo from "../Logo";
import Avatar from "../ui/Avatar";

import { RootState } from "../../store";

function AppHeader() {
  const { isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0();
  const user = useSelector((state: RootState) => state.user);
  const role = user?.["https://sikaeducation.com/role"] ?? "";

  return (
    <header className="AppHeader">
      <nav className="primary-navigation">
        <Link to="/">
          <Logo />
        </Link>
        {user && (
          <ul className="links">
            <li key="1">
              <Link to="/">Curriculum</Link>
            </li>
            {role === "coach" && (
              <li key="2">
                <Link to="/activity-manager">Activity Manager</Link>
              </li>
            )}
          </ul>
        )}
      </nav>

      <div className="user-info">
        {!isLoading && !isAuthenticated && (
          <Button
            type="primary"
            action={() =>
              loginWithRedirect({
                scope: "openid profile email",
              })
            }
          >
            Login
          </Button>
        )}
        {user && user.picture && user.name && (
          <>
            <Avatar imageUrl={user.picture} altText={user.name} />
            <Button
              type="ghost"
              action={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </Button>
          </>
        )}
        {isLoading && (
          <Avatar
            imageUrl="/user-avatar-placeholder.png"
            altText="user avatar placeholder"
          />
        )}
      </div>
    </header>
  );
}

export default AppHeader;
