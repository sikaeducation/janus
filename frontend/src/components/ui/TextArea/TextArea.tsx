import "./TextArea.scss";

type props = {
  value: string;
  action: (payload: string) => void;
  id: string;
  label: string;
  isRequired?: boolean;
};

export default function TextArea({
  id,
  label,
  value,
  action,
  isRequired,
}: props) {
  return (
    <div className="TextArea">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={value}
        required={isRequired}
        onChange={(event) => {
          action(event.target.value);
        }}
      />
    </div>
  );
}
