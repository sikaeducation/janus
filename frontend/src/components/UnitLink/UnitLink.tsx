import "./UnitLink.scss";
import { Link } from "react-router-dom";

type props = {
  path: string;
  label: string;
};

export default function UnitLink({ path, label }: props) {
  return (
    <Link to={path} className="UnitLink">
      {label}
    </Link>
  );
}
