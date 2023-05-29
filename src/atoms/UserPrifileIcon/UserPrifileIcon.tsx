import React from "react";
import { AddIcon } from "~/styles";
import styles from "./UserPrifileIcon.module.scss";

export const UserPrifileIcon = () => {
  return (
    <div className={styles.profileIconWrapper}>
      <AddIcon />
    </div>
  );
};
