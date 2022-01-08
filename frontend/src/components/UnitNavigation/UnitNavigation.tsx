import "./UnitNavigation.scss";
import UnitLink from "../UnitLink";

type internalLinkWithState = internalLink & {
  isActive: boolean;
};

type props = {
  units: internalLinkWithState[];
};

export default function UnitNavigation({ units }: props) {
  return (
    <nav className="UnitNavigation">
      <ul>
        {units.map(({ id, path, label, isActive }) => (
          <li key={id}>
            <UnitLink path={path} label={label} isActive={isActive} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
