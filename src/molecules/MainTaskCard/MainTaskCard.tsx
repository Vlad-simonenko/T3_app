import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./MainTaskCard.module.scss";
import EditIcon from "y/styles/assets/svg/EditIcon";
import AddIcon from "y/styles/assets/svg/AddIcon";
import { ActionButton, ErrorMessage, InputField } from "y/atoms";
import classNames from "classnames";
interface TMainTaskCardProps {
  mainTask: TMainTask[];
  setMainTask: Dispatch<SetStateAction<TMainTask[]>>;
}

export type TMainTask = { id: number; title: string; description: string };

export type TMappedMainTask = {
  id: number;
  title: string;
  description: string;
};

export const MainTaskCard = (props: TMainTaskCardProps) => {
  const { mainTask, setMainTask } = props;

  const [mainTaskTitle, setMainTaskTitle] = useState("");

  const [updMainTaskTitle, setUpdMainTaskTitle] = useState("");

  const [mainTaskDescription, setMainTaskDescription] = useState("");

  const [updMainTaskDescription, setUpdMainTaskDescription] = useState("");

  const newPost = {
    id: Date.now(),
    title: mainTaskTitle,
    description: mainTaskDescription,
  };

  const [onClicked, setOnClicked] = useState(false);

  const setTask = (newPost: TMainTask) => {
    setMainTask([...mainTask, newPost]),
      setMainTaskTitle(""),
      setMainTaskDescription("");
  };

  const [onEdit, setOnEdit] = useState(false);

  const editPost = {
    id: Date.now(),
    title: updMainTaskTitle,
    description: updMainTaskDescription,
  };
  const editTask = (id: number) => {
    if (mainTask.find((editTask) => editTask.id === id)) {
      setMainTask([...mainTask, editPost]),
        setMainTaskTitle(""),
        setMainTaskDescription("");
    }
  };

  return (
    <div className={styles.mainTaskCardWrapper}>
      {mainTask?.map((task: TMappedMainTask) => (
        <div className={styles.mainTaskCardContant} key={task.id}>
          <div className={styles.mainTaskCardTitle}>{task.title}</div>
          <div className={styles.mainTaskCardDescription}>
            {task.description}
          </div>
          <div className={styles.mainTaskAddCardIcon}>
            {mainTask?.find((editTask) => editTask?.id === task?.id) &&
            onEdit ? (
              <>
                <InputField
                  onFocus
                  placeholder={"Название задачи"}
                  onChange={setUpdMainTaskTitle}
                  defaultValue={
                    mainTask.find((editTask) => editTask.id === task.id)?.title
                  }
                  value={updMainTaskTitle}
                />
                <InputField
                  placeholder={"Описание задачи"}
                  onChange={setUpdMainTaskDescription}
                  defaultValue={
                    mainTask.find((editTask) => editTask.id === task.id)
                      ?.description
                  }
                  value={updMainTaskDescription}
                />
                <ActionButton
                  size="medium"
                  margin="top"
                  onClick={() => {
                    editTask(task.id), setOnEdit(false);
                  }}
                  text={"Обновить"}
                />
                <ActionButton
                  size="medium"
                  margin="top"
                  onClick={() => {
                    setOnEdit(false);
                  }}
                  text={"Отмена"}
                />
              </>
            ) : (
              <div
                onClick={() => setOnEdit(true)}
                className={styles.mainTaskAddCardIcon}
              >
                {!onEdit ? <EditIcon /> : null}
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
              onFocus
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
              size="medium"
              margin="top"
              onClick={
                mainTaskTitle.length !== 0
                  ? () => {
                      setTask(newPost), setOnClicked(false);
                    }
                  : () => {
                      setOnClicked(false);
                    }
              }
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
            {!onClicked ? <AddIcon /> : null}
          </div>
        )}
      </div>
    </div>
  );
};
