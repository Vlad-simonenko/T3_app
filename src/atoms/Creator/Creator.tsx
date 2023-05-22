import React from "react";
import styles from "./Creator.module.scss";
import { Image } from "antd";

interface TCreatorProps {
  imgSrc: string | any;
}

export const Creator = (props: TCreatorProps) => {
  const { imgSrc } = props;

  return (
    <div className={styles.creatorWrapper}>
      <Image className={styles.creatorImage} src={imgSrc} alt={"avatar"} />
    </div>
  );
};
