/* eslint-disable react/jsx-props-no-spreading */
import "./TextAreaResponse.scss";

type props = {
  content: string;
  action: (payload: string) => void;
  id: string;
  label: string;
  isRequired?: boolean;
};

export default function TextAreaResponse({
  id,
  label,
  content,
  action,
  isRequired,
  ...props
}: props) {
  return (
    <div className="TextAreaResponse">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={content}
        required={isRequired}
        onChange={(event) => {
          action(event.target.value);
        }}
        {...props}
      />
    </div>
  );
}
