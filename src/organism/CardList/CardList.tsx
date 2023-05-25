import React, { useState } from "react";
import styles from "./CardList.module.scss";
import { Session } from "next-auth/core/types";
import { MainTaskCard } from "~/molecules";
import { api } from "~/utils/api";
import { AnyARecord } from "dns";
import { Divider } from "~/atoms";

interface TCardListProps {
  session: Session | null;
}

export const CardList = (props: TCardListProps) => {
  const { session } = props;
  const tasks = api.task.infiniteFeed.useInfiniteQuery({});
  const parsedTasks = tasks.data?.pages.flatMap((page) => page.tasks);

  return (
    <div className={styles.cardListWrapper}>
      <div className={styles.cardListHeader}>
        <div className={styles.cardListNameWrapper}>
          <p className={styles.cardListNameText}>field 1</p>
        </div>
      </div>
      <Divider />
      <div className={styles.cardListMain}>
        <MainTaskCard mainTask={parsedTasks} />
      </div>
    </div>
  );
};
