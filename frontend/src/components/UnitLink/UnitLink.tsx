import "./UnitLink.scss";

type props = {
  url: string;
  label: string;
};

export default function UnitLink({ url, label }: props) {
  return (
    <a className="UnitLink" href={url}>
      {label}
    </a>
  );
}
