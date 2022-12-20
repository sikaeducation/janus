import "./TextInput.scss";

type Props = {
  id: string;
  label: string;
  value: string;
  type?: "text" | "url" | "email" | "password";
  updateValue: (newValue: string) => void;
  required?: boolean;
};

export default function Form({
  id,
  label,
  value,
  updateValue,
  type = "text",
  required = false,
}: Props) {
  return (
    <div className="TextInput">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => updateValue(event.target.value)}
        required={required}
      />
    </div>
  );
}
