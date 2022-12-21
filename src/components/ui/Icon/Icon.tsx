import "./Icon.scss";
import { faBookOpen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

type IconType = "checkmark" | "article";

type Props = {
  type: IconType;
};

const classes = {
  checkmark: { title: "Checkmark", Component: faCheck },
  article: { title: "Article", Component: faBookOpen },
} as const;

export default function Icon({ type }: Props) {
  const { Component, title } = classes[type];
  return (
    <FontAwesomeIcon
      icon={Component}
      className={classNames({ Icon: true, [type]: true })}
      title={title ?? type}
    />
  );
}