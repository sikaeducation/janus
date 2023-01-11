import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import "./TextArea.scss";

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
  value = "",
  updateValue,
  isRequired,
  editable = false,
}: props) {
  const [editing, setEditing] = useState(!editable);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (editable && editing && textAreaRef && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [editing]);
  const handleBlur = () => {
    if (editing && editable) {
      setEditing(false);
    }
  };

  return (
    <div className="TextArea">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={value}
        required={isRequired}
        className={classNames({ editable })}
        onBlur={handleBlur}
        onChange={(event) => {
          updateValue(event.target.value);
        }}
        ref={textAreaRef}
      />
    </div>
  );
}
