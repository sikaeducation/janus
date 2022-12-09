import { ReactNode } from "react";
import "./TertiaryHeading.scss";

type props = {
  children: ReactNode;
};

export default function TertiaryHeading({ children }: props) {
  return <h3 className="TertiaryHeading">{children}</h3>;
}
