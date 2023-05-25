import React from "react";
import styles from "./ErrorMessage.module.scss";

interface TErrorMessageProps {
  text: string | undefined;
}

export const ErrorMessage = (props: TErrorMessageProps) => {
  const { text } = props;

  return (
    <div className={styles.errorMessageWrapper}>
      <p className={styles.errorMessageText}>{text}</p>
    </div>
  );
};
