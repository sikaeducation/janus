import "./UnitNavigation.scss";
import UnitLink from "../UnitLink";

type unit = {
  id: number;
  label: string;
  url: string;
};
type props = {
  units: unit[];
};

export default function UnitNavigation({ units }: props) {
  return (
    <nav className="UnitNavigation">
      <ul>
        {units.map(({ id, url, label }) => (
          <li key={id}>
            <UnitLink url={url} label={label} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
