import './Toggle.scss';
import { Switch as MaterialSwitch } from '@material-ui/core';

type Props = {
  id: string;
  label: string;
  value: boolean | string;
  updateValue: (newValue: boolean) => void;
  required?: boolean;
};

export default function Toggle({
  id,
  label,
  value,
  updateValue,
  required = false,
}: Props) {
  return (
    <div className="Toggle">
      <label htmlFor={id}>{label}</label>
      <MaterialSwitch
        checked={!!value}
        id={id}
        required={required}
        name={id}
        onChange={() => updateValue(!value)}
        color="primary"
      />
    </div>
  );
}
