import "./UnitLink.scss";
import { Link } from "react-router-dom";

type props = {
  path: string;
  label: string;
  isActive: boolean;
};

export default function UnitLink({ path, label, isActive }: props) {
  return (
    <Link to={path} className={`UnitLink ${isActive ? "active" : ""}`}>
      {label}
    </Link>
  );
}
