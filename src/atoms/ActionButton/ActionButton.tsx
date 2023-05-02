import { Button } from "antd";
import React from "react";
import styles from "./ActionButton.module.scss";
import classNames from "classnames";

interface TActionButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  style?: string;
  icon?: React.ReactNode;
  type?:
    | "text"
    | "primary"
    | "link"
    | "ghost"
    | "default"
    | "dashed"
    | undefined;
}

export const ActionButton = (props: TActionButtonProps) => {
  const { onClick, text, href, style, type, icon } = props;

  return (
    <Button
      icon={icon}
      href={href}
      className={classNames(style, styles.actionButton)}
      onClick={onClick}
      type={type}
    >
      {text}
    </Button>
  );
};
