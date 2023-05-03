import React, { Dispatch, SetStateAction } from "react";
import styles from "./MainTaskCard.module.scss";
import EditIcon from "y/styles/assets/svg/EditIcon";
import AddIcon from "y/styles/assets/svg/AddIcon";
interface TMainTaskCardProps {
  mainTask: { id: number; title: string }[];
  setMainTask: any;
}

export const MainTaskCard = (props: TMainTaskCardProps) => {
  const { mainTask, setMainTask } = props;

  const setTask = (newTask: string) => {};

  return (
    <div className={styles.mainTaskCardWrapper}>
      {mainTask?.map((task) => (
        <div className={styles.mainTaskCardContant} key={task.id}>
          <div className={styles.mainTaskCard}>{task.title}</div>
          <EditIcon />
        </div>
      ))}
      <div className={styles.mainTaskCardAddContant}>
        <div className={styles.mainTaskAddCard}>Добавить карточку</div>
        <AddIcon />
      </div>
    </div>
  );
};
