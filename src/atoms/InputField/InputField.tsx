import { Input } from "antd";
import React from "react";
import styles from "./InputField.module.scss";
import classNames from "classnames";
import { WarningOutlined } from "@ant-design/icons";

interface TActionButtonProps {
  onChange: any;
  value: string;
  placeholder?: string;
  required?: boolean;
  onFocus?: boolean;
}

export const InputField = (props: TActionButtonProps) => {
  const { onChange, value, placeholder, required, onFocus } = props;

  return (
    <Input
      autoFocus={onFocus}
      status={required ? "error" : ""}
      prefix={required ? <WarningOutlined /> : null}
      required={required}
      className={styles.inputFieldStyles}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      placeholder={placeholder}
    />
  );
};
