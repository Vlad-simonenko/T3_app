import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./SubTaskCard.module.scss";
import { AddIcon } from "~/styles";
import { TMainTask } from "..";
import moment from "moment";
import { ActionButton, InputField } from "~/atoms";
import { useTasksTrcp } from "~/hooks/useTasksTrcp";
interface TSubtaskProps {
  subtask: TMainTask[];
  taskId: number;
}

export const SubTaskCard = (props: TSubtaskProps) => {
  const { subtask, taskId } = props;

  const {
    handleSubtaskCreate,
    handleSubtaskUpdate,
    mainSubTaskTitle,
    mainSubTaskDescription,
    updMainSubTaskTitle,
    updMainSubTaskDesc,
    setMainSubTaskTitle,
    setMainSubTaskDescription,
    setUpdMainSubTaskTitle,
    setUpdMainSubTaskDesc,
  } = useTasksTrcp();

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

  const onChange = (taskId: number, title: string, desc: string) => {
    setUpdMainSubTaskTitle(title);
    setUpdMainSubTaskDesc(desc);
  };

  return (
    <>
      <div className={styles.cardContainer}>
        <>
          {open ? (
            <div className={styles.addSubtasks}>
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
            </div>
          ) : (
            <div
              onClick={() => {
                setOpen(!open);
              }}
              className={styles.addSubtasks}
            >
              <p className={styles.subtasakText}>
                add subtask
                <AddIcon />
              </p>
            </div>
          )}
        </>

        {subtask?.length > 0 &&
          subtask?.map((task: any) => (
            <div key={task.id}>
              <Collapse
                onChange={() => {
                  onChange(task.id, task.title, task.content);
                }}
                accordion
                className={styles.mainCollapsTable}
              >
                <Panel
                  className={styles.collapsTableHeader}
                  header={task.title}
                  key={task.id}
                >
                  <p className={styles.collapsTableText}>{task.content}</p>
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
                        handleSubtaskUpdate(task.id);
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
          ))}
      </div>
    </>
  );
};
