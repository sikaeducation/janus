import classNames from "classnames";
import { ReactNode } from "react";
import "./Heading.scss";

type HeadingLevels = 1 | 2 | 3 | 4;

type Props = {
  className?: string;
  children: ReactNode;
  margin?: boolean;
  level: HeadingLevels;
};

export default function Heading({
  children,
  margin = true,
  level,
  className = "",
}: Props) {
  switch (level) {
    case 1:
      return (
        <h1
          className={classNames({
            Heading: true,
            "primary-heading": true,
            margin,
            [className]: true,
          })}
        >
          {children}
        </h1>
      );
    case 2:
      return (
        <h2
          className={classNames({
            Heading: true,
            "secondary-heading": true,
            margin,
            [className]: true,
          })}
        >
          {children}
        </h2>
      );
    case 3:
      return (
        <h3
          className={classNames({
            Heading: true,
            "tertiary-heading": true,
            margin,
            [className]: true,
          })}
        >
          {children}
        </h3>
      );
    case 4:
      return (
        <h4
          className={classNames({
            Heading: true,
            "quaternary-heading": true,
            margin,
            [className]: true,
          })}
        >
          {children}
        </h4>
      );
    default:
      return (
        <h1
          className={classNames({
            Heading: true,
            "primary-heading": true,
            margin,
            [className]: true,
          })}
        >
          {children}
        </h1>
      );
  }
}
