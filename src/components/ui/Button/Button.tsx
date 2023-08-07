import classNames from 'classnames';
import { ReactNode } from 'react';
import './Button.scss';

type ButtonType = 'primary' | 'secondary' | 'ghost';
type Size = 'small' | 'large';
type ActionType = 'normal' | 'failure';
type Props = {
  children: ReactNode;
  type: ButtonType;
  action?: () => void;
  submit?: boolean;
  size?: Size;
  disabled?: boolean;
  actionType?: ActionType;
};

const buttonClasses: Record<ButtonType, string> = {
  primary: 'primary-button',
  secondary: 'secondary-button',
  ghost: 'tertiary-button',
};

export default function ButtonFormSubmission({
  action,
  children,
  type,
  submit = false,
  size = 'small',
  actionType = 'normal',
  disabled = false,
}: Props) {
  const buttonClass = buttonClasses[type];
  return (
    <button
      onClick={action}
      type={submit ? 'submit' : 'button'}
      className={classNames({
        Button: true,
        [buttonClass]: true,
        disabled,
        failure: actionType === 'failure',
        small: size === 'small',
        large: size === 'large',
      })}
    >
      {children}
    </button>
  );
}
