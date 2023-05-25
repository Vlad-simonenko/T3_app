import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./MainTaskCard.module.scss";
import classNames from "classnames";
import { ActionButton, Creator, InputField } from "~/atoms";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { AddIcon, EditIcon } from "~/styles";
import { SubTaskCard } from "..";
import type { DragEndEvent } from "@dnd-kit/core";

interface TMainTaskCardProps {
  mainTask: TMainTask[];
  setMainTask: Dispatch<SetStateAction<TMainTask[]>>;
  subTask: any;
  setSubTask: Dispatch<SetStateAction<TMainTask[]>>;
}

export type TMainTask = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  Subtasks: TMainTask[];
  user: { id: number; name: string; image: string };
};

export type TMappedMainTask = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  Subtasks: TMainTask[];
  user: { id: number; name: string; image: string };
};

export const MainTaskCard = (props: TMainTaskCardProps) => {
  const { mainTask } = props;

  const [mainTaskTitle, setMainTaskTitle] = useState("");

  const [updMainTaskTitle, setUpdMainTaskTitle] = useState("");

  const [mainTaskDescription, setMainTaskDescription] = useState("");

  const [updMainTaskDescription, setUpdMainTaskDescription] = useState("");

  const [mainSubTaskTitle, setMainSubTaskTitle] = useState("");

  const [mainSubTaskDescription, setMainSubTaskDescription] = useState("");

  const [updMainSubTaskTitle, setUpdMainSubTaskTitle] = useState("");

  const [updMainSubTaskDesc, setUpdMainSubTaskDesc] = useState("");

  const [onClicked, setOnClicked] = useState(false);

  const { data: session, status } = useSession();

  const trpcUtils = api.useContext();

  const createTask = api.task.create.useMutation({
    onSuccess: (newTask) => {
      setOnClicked(false);
      setMainTaskTitle("");
      setMainTaskDescription("");
      if (status !== "authenticated") return;

      trpcUtils.task.infiniteFeed.setInfiniteData({}, (oldData) => {
        if (oldData == null) return;
        console.log(newTask);

        trpcUtils.task.invalidate();
        return {
          ...oldData,
        };
      });
    },
  });

  function handleCreate() {
    createTask.mutate({
      content: {
        mainTaskTitle,
        mainTaskDescription,
      },
      user_id: session?.user.id as any,
    });
  }

  const updateTask = api.task.update.useMutation({
    onSuccess: () => {
      setOnEdit(false);
      setUpdMainTaskTitle("");
      setUpdMainTaskDescription("");
      if (status !== "authenticated") return;

      trpcUtils.task.infiniteFeed.setInfiniteData({}, (oldData) => {
        if (oldData == null) return;

        trpcUtils.task.invalidate();
        return {
          ...oldData,
        };
      });
    },
  });

  function handleUpdate(id: any) {
    updateTask.mutate({
      content: {
        updMainTaskTitle,
        updMainTaskDescription,
      },
      user_id: session?.user.id as any,
      taskId: id,
    });
  }

  const createSubTask = api.task.createSubTask.useMutation({
    onSuccess: () => {
      setOnClicked(false);
      setMainSubTaskTitle("");
      setMainSubTaskDescription("");
      if (status !== "authenticated") return;

      trpcUtils.task.infiniteFeed.setInfiniteData({}, (oldData) => {
        if (oldData == null) return;

        trpcUtils.task.invalidate();
        return {
          ...oldData,
        };
      });
    },
  });

  function handleSubtaskCreate(id: number) {
    createSubTask.mutate({
      content: {
        mainSubTaskTitle,
        mainSubTaskDescription,
      },
      user_id: session?.user.id as any,
      taskId: id,
    });
  }

  const updateSubTask = api.task.updateSubtask.useMutation({
    onSuccess: () => {
      setOnEdit(false);
      setUpdMainSubTaskTitle("");
      setUpdMainSubTaskDesc("");
      if (status !== "authenticated") return;

      trpcUtils.task.infiniteFeed.setInfiniteData({}, (oldData) => {
        if (oldData == null) return;

        trpcUtils.task.invalidate();

        return {
          ...oldData,
        };
      });
    },
  });

  function handleSubtaskUpdate(id: any) {
    updateSubTask.mutate({
      content: {
        updMainSubTaskTitle,
        updMainSubTaskDesc,
      },
      user_id: session?.user.id as any,
      taskId: id,
    });
  }

  const [targetId, setTargetId] = useState(0);

  const [onEdit, setOnEdit] = useState(true);

  const openTask = (id: number, taskTitle: string, taskDescription: string) => {
    setTargetId(id);
    setOnEdit(true);
    setUpdMainTaskTitle(taskTitle);
    setUpdMainTaskDescription(taskDescription);
  };

  return (
    <div className={styles.mainTaskCardWrapper}>
      {mainTask?.map((task: TMappedMainTask) => (
        <div className={styles.mainTaskCardContant} key={task.id}>
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

          {targetId === task.id && onEdit ? (
            <div className={styles.mainTaskAddCardIcon}>
              <>
                <InputField
                  onFocus
                  placeholder={"Название задачи"}
                  onChange={setUpdMainTaskTitle}
                  value={updMainTaskTitle}
                />
                <InputField
                  placeholder={"Описание задачи"}
                  onChange={setUpdMainTaskDescription}
                  value={updMainTaskDescription}
                />
                <div className={styles.buttonAddWrapper}>
                  <ActionButton
                    onClick={() => {
                      handleUpdate(task.id);
                    }}
                    size="medium"
                    margin="top"
                    text={"Обновить"}
                  />
                  <ActionButton
                    size="medium"
                    margin="top"
                    onClick={() => {
                      setOnEdit(false);
                      setTargetId(0);
                    }}
                    text={"Отмена"}
                  />
                </div>
              </>
              <SubTaskCard
                subtask={task.Subtasks}
                taskId={task.id}
                handleSubtaskCreate={handleSubtaskCreate}
                handleSubtaskUpdate={handleSubtaskUpdate}
                mainSubTaskTitle={mainSubTaskTitle}
                mainSubTaskDescription={mainSubTaskDescription}
                updMainSubTaskTitle={updMainSubTaskTitle}
                updMainSubTaskDesc={updMainSubTaskDesc}
                setMainSubTaskTitle={setMainSubTaskTitle}
                setMainSubTaskDescription={setMainSubTaskDescription}
                setUpdMainSubTaskTitle={setUpdMainSubTaskTitle}
                setUpdMainSubTaskDesc={setUpdMainSubTaskDesc}
              />
            </div>
          ) : (
            <div
              onClick={() => {
                openTask(task.id, task.title, task.content);
              }}
              className={styles.mainTaskAddCardIcon}
            >
              <EditIcon />
            </div>
          )}
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
