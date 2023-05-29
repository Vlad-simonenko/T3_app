import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./MainTaskCard.module.scss";
import classNames from "classnames";
import {
  ActionButton,
  Creator,
  InputField,
  SelectItems,
  UserPrifileIcon,
} from "~/atoms";
import { AddIcon, EditIcon } from "~/styles";
import { SubTaskCard } from "..";
import { useTasksTrcp } from "~/hooks/useTasksTrcp";
import { ModalTaskCard } from "../ModalTaskCard/ModalTaskCard";
import { Subtasks } from "@prisma/client";

interface TMainTaskCardProps {
  mainTask: TMainTask[] | undefined;
}

export type TMainTask = {
  id: number;
  title: string;
  content: string | null;
  createdAt: Date;
  user: { id: number; name: string | null; image: string | null };
  Subtasks: Subtasks[];
};

export type TMappedMainTask = {
  id: number;
  title: string;
  content: string | null;
  createdAt: Date;
  user: { id: number; name: string | null; image: string | null };
  Subtasks: Subtasks[];
};

export const MainTaskCard = (props: TMainTaskCardProps) => {
  const { mainTask } = props;

  const {
    handleCreate,
    handleUpdate,
    setUpdMainTaskTitle,
    setUpdMainTaskDescription,
    updMainTaskTitle,
    updMainTaskDescription,
    onClicked,
    setMainTaskTitle,
    mainTaskTitle,
    setMainTaskDescription,
    mainTaskDescription,
    setOnClicked,
    setOnEdit,
    onEdit,
  } = useTasksTrcp();

  const [targetId, setTargetId] = useState(0);

  const openTask = (id: number, taskTitle: string, taskDescription: string) => {
    setTargetId(id);
    setOnEdit(true);
    setUpdMainTaskTitle(taskTitle);
    setUpdMainTaskDescription(taskDescription);
  };

  return (
    <div className={styles.mainTaskCardWrapper}>
      {mainTask?.map((task: any) => (
        <div className={styles.mainTaskCardContant} key={task.id}>
          <ModalTaskCard
            openTask={openTask}
            onEdit={onEdit}
            task={task}
            targetId={targetId}
            title={task.title}
            description={task.content}
            setUpdMainTaskTitle={setUpdMainTaskTitle}
            updMainTaskTitle={updMainTaskTitle}
            setUpdMainTaskDescription={setUpdMainTaskDescription}
            updMainTaskDescription={updMainTaskDescription}
            handleUpdate={handleUpdate}
            setOnEdit={setOnEdit}
            setTargetId={setTargetId}
          />
          <div className={styles.mainTaskCardTitle}>{task.title}</div>
          <div className={styles.mainTaskCardDescription}>{task.content}</div>
          <div className={styles.mainTaskCardFooter}>
            <Creator imgSrc={task.user.image} />
            {task?.Subtasks?.length === 0 ? null : (
              <div className={styles.mainTaskCardSubtasksCount}>
                Subtasks
                <p className={styles.mainTaskCardFooterCount}>
                  {task?.Subtasks?.length}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}

      <div
        className={classNames(
          styles.mainTaskCardAddContant,
          onClicked ? styles.mainTaskCardAddContantActive : ""
        )}
      >
        <div className={styles.mainTaskAddCard}>
          {!onClicked ? "Добавить карточку" : null}
        </div>
        {onClicked ? (
          <>
            <InputField
              placeholder={"Название задачи"}
              onChange={setMainTaskTitle}
              value={mainTaskTitle}
            />
            <InputField
              placeholder={"Описание задачи"}
              onChange={setMainTaskDescription}
              value={mainTaskDescription}
            />
            <ActionButton
              onClick={handleCreate}
              size="medium"
              margin="top"
              text={"Создать"}
            />
            <ActionButton
              size="medium"
              margin="top"
              onClick={() => {
                setOnClicked(false);
              }}
              text={"Отмена"}
            />
          </>
        ) : (
          <div
            onClick={() => setOnClicked(true)}
            className={styles.mainTaskAddCardIcon}
          >
            <AddIcon />
          </div>
        )}
      </div>
    </div>
  );
};
