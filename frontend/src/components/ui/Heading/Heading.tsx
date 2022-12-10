import { ReactNode } from "react";
import "./Heading.scss";

type HeadingLevels = 1 | 2 | 3 | 4;

type Props = {
  level: HeadingLevels;
  children: ReactNode;
};

export default function Heading({ children, level }: Props) {
  switch (level) {
    case 1:
      return <h1 className="primary-heading">{children}</h1>;
    case 2:
      return <h2 className="secondary-heading">{children}</h2>;
    case 3:
      return <h3 className="tertiary-heading">{children}</h3>;
    case 4:
      return <h4 className="quaternary-heading">{children}</h4>;
    default:
      return <h1 className="primary-heading">{children}</h1>;
  }
}
