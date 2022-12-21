import { Link } from "react-router-dom";

import "./ActivityNavigation.scss";

type props = {
  nextSlug: string;
  nextLabel: string;
};

function ActivityNavigation({ nextSlug, nextLabel }: props) {
  return (
    <nav className="ActivityNavigation">
      <Link to={nextSlug}>{nextLabel}</Link>
    </nav>
  );
}

export default ActivityNavigation;
