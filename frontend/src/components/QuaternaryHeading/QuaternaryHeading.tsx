import { ReactNode } from "react";
import "./QuaternaryHeading.scss";

type props = {
  children: ReactNode;
};

export default function QuaternaryHeading({ children }: props) {
  return <p>{children}</p>;
}
