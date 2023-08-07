import './EditableField.scss';

type props = {
  value?: string;
  updateValue: (newValue: string) => void;
  id: string;
  label: string;
  isRequired?: boolean;
  className?: string;
};

export default function EditableField({
  id,
  label,
  value = '',
  updateValue,
  isRequired,
  className = '',
}: props) {
  return (
    <div className="EditableField">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        value={value}
        title={label}
        required={isRequired}
        onChange={(event) => updateValue(event.target.value)}
        className={className}
      />
    </div>
  );
}
