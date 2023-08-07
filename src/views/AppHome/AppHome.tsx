import { useAuth0 } from '@auth0/auth0-react';
import './AppHome.scss';

export default function AppHome() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="AppHome">
      <h1>Welcome to Sika Education!</h1>
      <p>
        <button
          className="login"
          type="button"
          onClick={() => loginWithRedirect({
            scope: 'openid profile email',
          })}
        >
          Login
        </button>
        to get started.
      </p>
    </div>
  );
}
