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
  size: "small" | "medium" | "large";
  margin?: "top" | "bottom" | "left" | "right" | "all" | "null";
  type?:
    | "text"
    | "primary"
    | "link"
    | "ghost"
    | "default"
    | "dashed"
    | undefined;
  disabled?: boolean;
  htmlType?: "button" | "submit" | "reset" | undefined;
}

export const ActionButton = (props: TActionButtonProps) => {
  const {
    onClick,
    text,
    href,
    style,
    type,
    icon,
    size,
    margin,
    disabled,
    htmlType,
  } = props;

  return (
    <Button
      htmlType={htmlType}
      icon={icon}
      href={href}
      disabled={disabled}
      className={classNames(
        style,
        styles.actionButton,
        styles[size || "medium"],
        styles[margin || "null"]
      )}
      onClick={onClick}
      type={type}
    >
      {text}
    </Button>
  );
};
