import { Avatar, Button, Input, Modal } from "antd";
import React, { useState } from "react";
import styles from "./TaskCardCreator.module.scss";
import { useSession } from "next-auth/react";
interface TTaskCardCreatorProps {
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

export const TaskCardCreator = (props: TTaskCardCreatorProps) => {
  const { data: session, status } = useSession();

  const [task, setTask] = useState("");
  return (
    <div className={styles.taskCreatorWrapper}>
      <Input onChange={(e) => setTask(e.target.value)} />
      <Button>Create</Button>
    </div>
  );
};
