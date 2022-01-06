import "./UnitLink.scss";
import { Link } from "react-router-dom";

type props = {
  url: string;
  label: string;
};

export default function UnitLink({ url, label }: props) {
  return (
    <Link to={url} className="UnitLink">
      {label}
    </Link>
  );
}
