/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import Heading from '../Heading';
import './Form.scss';

type Field = {
  id: string;
  label: string;
  Component: any;
  type?: string;
};

type Action = {
  label: string;
  Component: any;
  action: (payload: unknown) => void;
  type?: string;
  size?: string;
};

type Props = {
  heading: string;
  newItem: any;
  setNewItem: (value: any) => void;
  fields: Field[];
  actions: Action[];
  children?: ReactNode;
};

export default function Form({
  heading,
  fields,
  actions,
  newItem,
  setNewItem,
  children,
}: Props) {
  return (
    <div className="Form">
      <Heading level={2}>{heading}</Heading>
      <form>
        {fields.map(({
          id, label, Component, type,
        }) => (
          <Component
            key={id}
            id={id}
            label={label}
            value={newItem[id] || ''}
            updateValue={(newValue: unknown) => setNewItem({
              ...newItem,
              [id]: newValue,
            })}
            type={type}
          />
        ))}
        {children}
        <fieldset className="actions">
          {actions.map(({
            label, Component, type, action, size,
          }) => (
            <Component
              key={label}
              label={label}
              action={action}
              type={type}
              size={size}
            >
              {label}
            </Component>
          ))}
        </fieldset>
      </form>
    </div>
  );
}
