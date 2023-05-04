import React, { useState } from "react";
import styles from "./CardList.module.scss";
import { Session } from "next-auth/core/types";
import { MainTaskCard, TMainTask } from "y/molecules";

interface TCardListProps {
  session: Session | null;
}

export const CardList = (props: TCardListProps) => {
  const { session } = props;
  const [mainTask, setMainTask] = useState<TMainTask[]>([]);

  return (
    <div className={styles.cardListWrapper}>
      <div className={styles.cardListHeader}>
        <div className={styles.cardListNameWrapper}>
          <p className={styles.cardListNameText}>
            TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest
          </p>
        </div>
      </div>
      <div className={styles.cardListMain}>
        <MainTaskCard mainTask={mainTask} setMainTask={setMainTask} />
      </div>
      <div className={styles.cardListFooter}> footer</div>
    </div>
  );
};
