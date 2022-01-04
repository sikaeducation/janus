import "./SectionNavigation.scss";
import SectionLink from "../SectionLink";

type section = {
  id: number;
  url: string;
  label: string;
};

type props = {
  sections: section[];
};

export default function SectionNavigation({ sections }: props) {
  return (
    <nav className="SectionNavigation">
      <ul>
        {sections.map(({ id, url, label }) => (
          <li key={id}>
            <SectionLink url={url} label={label} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
