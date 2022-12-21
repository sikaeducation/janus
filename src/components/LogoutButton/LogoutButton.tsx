import "./LogoutButton.scss";
import { useAuth0 } from "@auth0/auth0-react";

type props = {
  children: JSX.Element;
};

export default function LogoutButton({ children }: props) {
  const { logout } = useAuth0();

  return (
    <button
      className="LogoutButton"
      type="button"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      {children}
    </button>
  );
}
