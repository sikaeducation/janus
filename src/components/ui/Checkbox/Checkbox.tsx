import "./Checkbox.scss";
import { Checkbox as MaterialCheckbox } from "@material-ui/core";

type Props = {
  id: string;
  label: string;
  value: boolean | string;
  updateValue: (newValue: boolean) => void;
  required?: boolean;
  type?: "primary" | "secondary";
};

export default function Checkbox({
  id,
  label,
  value,
  updateValue,
  required = false,
  type = "primary",
}: Props) {
  return (
    <div className="Checkbox">
      <label htmlFor={id}>{label}</label>
      <MaterialCheckbox
        checked={!!value}
        id={id}
        required={required}
        name={id}
        color={type}
        onChange={() => updateValue(!value)}
      />
    </div>
  );
}
