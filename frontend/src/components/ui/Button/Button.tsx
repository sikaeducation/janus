import { ReactNode } from "react";
import "./Button.scss";

type ButtonType = "primary" | "secondary" | "ghost";
type Props = {
  children: ReactNode;
  action?: () => void;
  submit: boolean;
  type: ButtonType;
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
  submit,
}: Props) {
  const buttonClass = buttonClasses[type];
  return (
    <button
      onClick={action}
      className={`Button ${buttonClass}`}
      type={submit ? "submit" : "button"}
    >
      {children}
    </button>
  );
}
