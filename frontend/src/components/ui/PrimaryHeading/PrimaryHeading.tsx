import { ReactNode } from "react";
import "./PrimaryHeading.scss";

type props = {
  children: ReactNode;
};

export default function PrimaryHeading({ children }: props) {
  return <h1 className="PrimaryHeading">{children}</h1>;
}
