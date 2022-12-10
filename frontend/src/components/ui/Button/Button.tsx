import classNames from "classnames";
import { ReactNode } from "react";
import "./Button.scss";

type ButtonType = "primary" | "secondary" | "ghost";
type Size = "small" | "large";
type Props = {
  children: ReactNode;
  type: ButtonType;
  action?: () => void;
  submit?: boolean;
  size?: Size;
};

const buttonClasses: Record<ButtonType, string> = {
  primary: "primary-button",
  secondary: "secondary-button",
  ghost: "tertiary-button",
};

export default function ButtonFormSubmission({
  action,
  children,
  type,
  submit = false,
  size = "small",
}: Props) {
  const buttonClass = buttonClasses[type];
  return (
    <button
      onClick={action}
      type={submit ? "submit" : "button"}
      className={classNames({
        Button: true,
        [buttonClass]: true,
        small: size === "small",
        large: size === "large",
      })}
    >
      {children}
    </button>
  );
}
