import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./SubTaskCard.module.scss";
import { AddIcon, EditIcon } from "~/styles";
import { TMainTask } from "..";
import moment from "moment";
import { ActionButton, InputField } from "~/atoms";
interface TSubtaskProps {
  subtask: TMainTask[];
  handleSubtaskCreate: (id: number) => void;
  handleSubtaskUpdate: (id: number) => void;
  mainSubTaskTitle: string;
  mainSubTaskDescription: string;
  updMainSubTaskTitle: string;
  updMainSubTaskDesc: string;
  setMainSubTaskTitle: (title: string) => void;
  setMainSubTaskDescription: (title: string) => void;
  setUpdMainSubTaskTitle: (title: string) => void;
  setUpdMainSubTaskDesc: (title: string) => void;
  taskId: number;
}

export const SubTaskCard = (props: TSubtaskProps) => {
  const {
    subtask,
    taskId,
    handleSubtaskCreate,
    handleSubtaskUpdate,
    mainSubTaskTitle,
    mainSubTaskDescription,
    setMainSubTaskTitle,
    setMainSubTaskDescription,
    updMainSubTaskTitle,
    updMainSubTaskDesc,
    setUpdMainSubTaskTitle,
    setUpdMainSubTaskDesc,
  } = props;

  const { Panel } = Collapse;

  const [open, setOpen] = useState(false);

  const clearFiels = () => {
    setOpen(false);
    setMainSubTaskTitle("");
    setMainSubTaskDescription("");
  };

  useEffect(() => {
    setMainSubTaskTitle("");
    setMainSubTaskDescription("");
  }, [open]);

  return (
    <>
      <div className={styles.cardContainer}>
        <>
          {open ? (
            <>
              <InputField
                onChange={setMainSubTaskTitle}
                value={mainSubTaskTitle}
              />
              <InputField
                onChange={setMainSubTaskDescription}
                value={mainSubTaskDescription}
              />
              <div className={styles.subtaskButtonContainer}>
                <ActionButton
                  onClick={() => {
                    handleSubtaskCreate(taskId);
                  }}
                  text={"Добавить"}
                  size={"medium"}
                />
                <ActionButton
                  onClick={() => {
                    clearFiels();
                  }}
                  text={"Отмена"}
                  size={"medium"}
                />
              </div>
            </>
          ) : (
            <div
              onClick={() => {
                setOpen(!open);
              }}
              className={styles.addSubtasks}
            >
              <p> add subtask</p>
              <AddIcon />
            </div>
          )}
        </>
        {subtask?.length > 0 ? (
          subtask?.map((task: TMainTask) => (
            <div key={task.id}>
              <Collapse
                className={styles.mainCollapsTable}
                defaultActiveKey={["0"]}
              >
                <Panel header={task.title} key={task.id}>
                  <p>{task.content}</p>
                  <hr className={styles.cardBodyLine} />
                  <div className={styles.cardBodyDate}>
                    {moment(task.createdAt).format("DD MMMM YYYY, h:mm")}
                  </div>
                  <InputField
                    onChange={setUpdMainSubTaskTitle}
                    value={updMainSubTaskTitle}
                  />
                  <InputField
                    onChange={setUpdMainSubTaskDesc}
                    value={updMainSubTaskDesc}
                  />
                  <div className={styles.subtaskButtonContainer}>
                    <ActionButton
                      onClick={() => {
                        handleSubtaskUpdate(taskId);
                      }}
                      text={"Обновить"}
                      size={"medium"}
                    />
                    <ActionButton
                      onClick={() => {
                        clearFiels();
                      }}
                      text={"Отмена"}
                      size={"medium"}
                    />
                  </div>
                </Panel>
              </Collapse>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
