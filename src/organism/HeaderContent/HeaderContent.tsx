import { Avatar, Dropdown } from "antd";
import React from "react";
import styles from "./HeaderContent.module.scss";
import { Session } from "next-auth/core/types";
import { ActionButton } from "y/atoms";
import Logo from "y/styles/assets/svg/Logo";
import { DownOutlined } from "@ant-design/icons";
import { ItemType } from "antd/es/menu/hooks/useItems";

interface THeaderContentProps {
  session: Session | null;
  status: string;
  items: ItemType[];
}

export const HeaderContent = (props: THeaderContentProps) => {
  const { session, items, status } = props;

  return (
    <>
      <div className={styles.headerLogo}>Wh1tePython</div>
      <span className={styles.headerIcon}>
        <Logo />
      </span>
      {status === "authenticated" ? (
        <>
          <Dropdown
            className={styles.dropdownWrapper}
            trigger={["click"]}
            menu={{ items }}
            placement="bottomRight"
          >
            <Avatar size={64} alt="U" src={session?.user?.image} />
          </Dropdown>
          <DownOutlined className={styles.downArrow} />
        </>
      ) : (
        <ActionButton
          style={styles.signInButton}
          text={"sign in"}
          href="/api/auth/signin"
        />
      )}
    </>
  );
};
