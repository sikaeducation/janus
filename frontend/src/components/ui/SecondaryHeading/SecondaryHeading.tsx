import { ReactNode } from "react";
import "./SecondaryHeading.scss";

type props = {
  children: ReactNode;
};

export default function SecondaryHeading({ children }: props) {
  return <h2 className="SecondaryHeading">{children}</h2>;
}
