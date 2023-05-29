import { Modal } from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";
import { EditIcon } from "~/styles";
import styles from "./ModalTaskCard.module.scss";
import { InputField } from "~/atoms";
import { SubTaskCard } from "../SubTaskCard";

interface TModalTaskCardProps {
  title: string;
  targetId: number;
  task: any;
  onEdit: boolean;
  openTask: (id: number, taskTitle: string, taskDescription: string) => void;
  setUpdMainTaskTitle: Dispatch<SetStateAction<string>>;
  updMainTaskTitle: string;
  setUpdMainTaskDescription: Dispatch<SetStateAction<string>>;
  updMainTaskDescription: string;
  handleUpdate: (id: any) => void;
  setOnEdit: Dispatch<SetStateAction<boolean>>;
  setTargetId: Dispatch<SetStateAction<number>>;
  description: string | null;
}

export const ModalTaskCard = (props: TModalTaskCardProps) => {
  const {
    title,
    targetId,
    task,
    onEdit,
    openTask,
    setUpdMainTaskTitle,
    updMainTaskTitle,
    setUpdMainTaskDescription,
    updMainTaskDescription,
    handleUpdate,
    setOnEdit,
    setTargetId,
    description,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(targetId);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleUpdate(task.id);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setOnEdit(false);
    setTargetId(0);
    setIsModalOpen(false);
  };
  return (
    <div className={styles.modalTaskWrapper}>
      <div
        className={styles.modalTaskWrapperEditIcon}
        onClick={() => {
          openTask(task.id, task.title, task.content);
          setIsModalOpen(true);
        }}
      >
        <EditIcon />
      </div>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Сохранить"
        cancelText="Отмена"
      >
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
            </>
            <SubTaskCard subtask={task.Subtasks} taskId={task.id} />
          </div>
        ) : (
          <div
            onClick={() => {
              openTask(task.id, task.title, task.content);
            }}
            className={styles.mainTaskAddCardIcon}
          ></div>
        )}
      </Modal>
    </div>
  );
};
