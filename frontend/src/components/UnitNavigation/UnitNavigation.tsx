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
    <nav className="UnitNavigation" data-testid="unit-navigation">
      <ul>
        {units.map(({ slug, path, label, isActive }) => (
          <li key={slug}>
            <UnitLink path={path} label={label} isActive={isActive} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
