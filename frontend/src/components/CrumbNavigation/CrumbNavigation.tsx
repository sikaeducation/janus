import "./CrumbNavigation.scss";

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
            <a href={url}>{label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
