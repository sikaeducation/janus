import "./UnitNavigation.scss";
import UnitLink from "../UnitLink";

type props = {
  units: internalLink[];
};

export default function UnitNavigation({ units }: props) {
  return (
    <nav className="UnitNavigation">
      <ul>
        {units.map(({ id, path, label }) => (
          <li key={id}>
            <UnitLink path={path} label={label} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
