import React, { useState } from "react";
import styles from "./CardList.module.scss";
import { Session } from "next-auth/core/types";
import { MainTaskCard, TMainTask } from "~/molecules";
import { api } from "~/utils/api";

interface TCardListProps {
  session: Session | null;
}

export const CardList = (props: TCardListProps) => {
  const { session } = props;
  const tasks = api.task.infiniteFeed.useInfiniteQuery({});
  const parsedTasks = tasks.data?.pages.flatMap((page) => page.tasks);
  const [subTask, setSubtask] = useState<any[]>([]);

  return (
    <div className={styles.cardListWrapper}>
      <div className={styles.cardListHeader}>
        <div className={styles.cardListNameWrapper}>
          <p className={styles.cardListNameText}>field 1</p>
        </div>
      </div>
      <div className={styles.cardListMain}>
        <MainTaskCard
          subTask={subTask}
          setSubTask={setSubtask}
          mainTask={parsedTasks}
        />
      </div>
      <div className={styles.cardListFooter}> footer</div>
    </div>
  );
};
