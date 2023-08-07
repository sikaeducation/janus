import './Breadcrumbs.scss';
import { Link } from 'react-router-dom';

type props = {
  links: internalLink[];
};

export default function Breadcrumbs({ links }: props) {
  let normalizedLinks = links.length === 1 ? [] : links;
  normalizedLinks = normalizedLinks.map((link, index) => ({
    ...link,
    isLinked: index !== links.length - 1,
  }));

  return (
    <nav className="Breadcrumbs">
      <ol>
        {normalizedLinks.map(({
          slug, path, label, isLinked,
        }) => (
          <li key={slug}>
            {isLinked ? <Link to={path}>{label}</Link> : label}
          </li>
        ))}
      </ol>
    </nav>
  );
}
