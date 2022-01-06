import "./CrumbNavigation.scss";
import { Link } from "react-router-dom";

type link = {
  id: number;
  url: string;
  label: string;
};
type props = {
  links: link[];
};

export default function CrumbNavigation({ links }: props) {
  return (
    <nav className="CrumbNavigation">
      <ol>
        {links.map(({ id, url, label }) => (
          <li key={id}>
            <Link to={url}>{label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
