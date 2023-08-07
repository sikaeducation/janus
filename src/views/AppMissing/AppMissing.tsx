import './AppMissing.scss';
import { Link } from 'react-router-dom';

export default function AppMissing() {
  return (
    <div className="AppMissing">
      <h1>Couldn&rsquo;t find that, sorry!</h1>
      <Link to="/">Go back home</Link>
    </div>
  );
}
