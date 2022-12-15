import "./TextArea.scss";

type props = {
  content: string;
  action: (payload: string) => void;
  id: string;
  label: string;
  isRequired?: boolean;
};

export default function TextArea({
  id,
  label,
  content,
  action,
  isRequired,
}: props) {
  return (
    <div className="TextArea">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={content}
        required={isRequired}
        onChange={(event) => {
          action(event.target.value);
        }}
      />
    </div>
  );
}
