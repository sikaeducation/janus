import classNames from 'classnames';
import './TextArea.scss';

type props = {
  value?: string;
  updateValue: (newValue: string) => void;
  id: string;
  label: string;
  isRequired?: boolean;
  editable?: boolean;
};

export default function TextArea({
  id,
  label,
  value = '',
  updateValue,
  isRequired,
  editable = false,
}: props) {
  return (
    <div className="TextArea">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={value}
        required={isRequired}
        className={classNames({ editable })}
        onChange={(event) => {
          updateValue(event.target.value);
        }}
      />
    </div>
  );
}
