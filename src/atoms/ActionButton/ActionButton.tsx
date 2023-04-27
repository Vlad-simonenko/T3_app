import { Button } from "antd";
import React from "react";
import DiscordLogo from "y/styles/assets/svg/DiscordLogo";
import styles from "./ActionButton.module.scss";
import classNames from "classnames";

interface TActionButtonProps {
  text: string;
  onClick?: (e: any) => void;
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
