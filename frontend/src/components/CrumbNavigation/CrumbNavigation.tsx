import "./CrumbNavigation.scss";
import { Link } from "react-router-dom";

type props = {
  links: internalLink[];
};

export default function CrumbNavigation({ links }: props) {
  let normalizedLinks = links.length === 1 ? [] : links;
  normalizedLinks = normalizedLinks.map((link, index) => {
    return {
      ...link,
      isLinked: index !== links.length - 1,
    };
  });

  return (
    <nav className="CrumbNavigation">
      <ol>
        {normalizedLinks.map(({ id, path, label, isLinked }) => (
          <li key={id}>{isLinked ? <Link to={path}>{label}</Link> : label}</li>
        ))}
        <li role="presentation">&nbsp;</li> {/* Vertical placeholder */}
      </ol>
    </nav>
  );
}
