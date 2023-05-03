import React, { useState } from "react";
import styles from "./CardList.module.scss";
import { Session } from "next-auth/core/types";
import { MainTaskCard } from "y/molecules";

interface TCardListProps {
  session: Session | null;
}

export const CardList = (props: TCardListProps) => {
  const { session } = props;
  const [mainTask, setMainTask] = useState([]);

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
        <MainTaskCard mainTask={mockData} setMainTask={setMainTask} />
      </div>
      <div className={styles.cardListFooter}> footer</div>
    </div>
  );
};

const mockData = [
  {
    id: 1,
    title: "test 1",
  },
  {
    id: 1,
    title: "test 1",
  },
  {
    id: 1,
    title: "test 1",
  },
  {
    id: 1,
    title: "test 1",
  },
  {
    id: 1,
    title: "test 1",
  },
  {
    id: 1,
    title: "test 1",
  },
  {
    id: 1,
    title: "test 1",
  },
  {
    id: 1,
    title: "test 1",
  },
  {
    id: 1,
    title: "test 1",
  },
  {
    id: 1,
    title: "test 1",
  },
  {
    id: 1,
    title: "test 1",
  },
  {
    id: 1,
    title: "test 1",
  },
  {
    id: 1,
    title: "test 1",
  },
  {
    id: 1,
    title: "test 1",
  },
];
