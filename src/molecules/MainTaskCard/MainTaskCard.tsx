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

  const [mainTaskDescription, setMainTaskDescription] = useState("");

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

  const editTask = (id: number) => {
    setMainTaskTitle(mainTaskTitle),
      setMainTaskDescription(mainTaskDescription);
  };

  return (
    <div className={styles.mainTaskCardWrapper}>
      {mainTask?.map((task: TMappedMainTask) => (
        <div className={styles.mainTaskCardContant} key={task.id}>
          {console.log(
            mainTask.find((editTask) => editTask.id === task.id)?.title
          )}
          <div className={styles.mainTaskCardTitle}>{task.title}</div>
          <div className={styles.mainTaskCardDescription}>
            {task.description}
          </div>
          <div
            onClick={() => editTask(task.id)}
            className={styles.mainTaskAddCardIcon}
          >
            {onEdit ? (
              <>
                <InputField
                  onFocus
                  placeholder={"Название задачи"}
                  onChange={setMainTaskTitle}
                  value={
                    mainTask.find((editTask) => editTask.id === task.id)?.title
                  }
                />
                <InputField
                  placeholder={"Описание задачи"}
                  onChange={setMainTaskDescription}
                  value={
                    mainTask.find((editTask) => editTask.id === task.id)
                      ?.description
                  }
                />
                <ActionButton
                  size="medium"
                  margin="top"
                  onClick={
                    mainTaskTitle.length !== 0
                      ? () => {
                          editTask(task.id), setOnEdit(false);
                        }
                      : () => {
                          setOnEdit(false);
                        }
                  }
                  text={"Создать"}
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
