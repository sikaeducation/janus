import { ReactNode } from "react";
import Heading from "../Heading";
import "./Form.scss";

type Field = {
  id: string;
  label: string;
  Component: any;
  type: undefined;
};

type Props = {
  heading: string;
  newItem: any;
  setNewItem: (value: any) => void;
  fields: Field[];
  children: ReactNode;
};

export default function Form({
  heading,
  fields,
  newItem,
  setNewItem,
  children,
}: Props) {
  const Fields = fields.map(({ id, label, Component, type }) => (
    <Component
      id={id}
      label={label}
      value={newItem[id] || ""}
      updateValue={(newValue: unknown) =>
        setNewItem({
          ...newItem,
          [id]: newValue,
        })
      }
      type={type}
    />
  ));

  return (
    <div className="Form">
      <Heading level={2}>{heading}</Heading>
      <form>
        {Fields}
        {children}
      </form>
    </div>
  );
}
