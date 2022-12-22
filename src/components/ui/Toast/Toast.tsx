import { ReactNode } from "react";
import "./Toast.scss";

type Props = {
  children: ReactNode | ReactNode[];
};

function Toast({ children }: Props) {
  return (
    <div className="Toast">
      <p>{children}</p>
    </div>
  );
}

export default Toast;
