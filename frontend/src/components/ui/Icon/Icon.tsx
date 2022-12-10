import "./Icon.scss";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

type IconType = "checkmark";

type Props = {
  type: IconType;
};

const classes = {
  checkmark: faCheck,
} as const;

export default function Icon({ type }: Props) {
  return (
    <FontAwesomeIcon
      icon={classes[type]}
      className={classNames({ Icon: true, [type]: true })}
      title="Checkmark"
    />
  );
}
