import { Avatar, Button, Input } from "antd";
import React, { useState } from "react";
import styles from "./SubTaskCard.module.scss";
import EditIcon from "y/styles/assets/svg/EditIcon";
import { useSession } from "next-auth/react";
interface TTaskCardProps {
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

export const TaskCard = (props: TTaskCardProps) => {
  const { data: session, status } = useSession();

  const [task, setTask] = useState("");
  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.cardTitle}>
          <EditIcon />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardBodyTitle}>Taks Name</div>
          <div className={styles.cardBodyDescription}>task Description</div>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.cardFooterIcons}>
            <Avatar size={30} alt="U" src={session?.user?.image} />
          </div>
          <div className={styles.cardFooterInfo}>
            <div className={styles.cardFooterSubTasks}>
              Subtasks
              <span className={styles.cardFooterSubTasksNumber}> 7</span>
            </div>
            <div className={styles.cardFooterHours}>
              Time
              <span className={styles.cardFooterSubTasksNumber}>12 h</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
