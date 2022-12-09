import "./ButtonFormSubmission.scss";

type props = {
  label: string;
};

export default function ButtonFormSubmission({ label }: props) {
  return (
    <button className="ButtonFormSubmission" type="submit">
      {label}
    </button>
  );
}
