import "./LoginButton.scss";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../ui/Button";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
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
  );
}
