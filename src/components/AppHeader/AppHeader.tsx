import './AppHeader.scss';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@sikaeducation/ui';
import Logo from '../Logo';
import Avatar from '../ui/Avatar';

import { RootState } from '../../store';

function AppHeader() {
  const {
    'https://sikaeducation.com/role': role,
    email,
    name,
    picture,
    isAuthenticated,
    isLoading,
  } = useSelector((state: RootState) => state.user);
  const { logout, loginWithRedirect } = useAuth0();

  return (
    <header className="AppHeader">
      <nav className="primary-navigation">
        <Link to="/">
          <Logo />
        </Link>
        {email && (
        <ul className="links">
          <li key="1">
            <Link to="/">Curriculum</Link>
          </li>
          {role === 'coach' && (
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
          action={() => loginWithRedirect({
						    scope: 'openid profile email',
						  })}
        >
          Login
        </Button>
        )}
        {picture && name && (
        <>
          <Avatar imageUrl={picture} altText={name} />
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
