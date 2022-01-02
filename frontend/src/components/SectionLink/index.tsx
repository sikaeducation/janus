import "./SectionLink.scss";

type props = {
  url: string;
  label: string;
};

export default function SectionLink({ url, label }: props) {
  return (
    <a className="SectionLink" href={url}>
      {label}
    </a>
  );
}
