import {
  Avatar,
  Button,
  Dropdown,
  Image,
  Layout,
  MenuProps,
  Modal,
  Typography,
} from "antd";
import styles from "../styles/index.module.scss";
import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { DownOutlined } from "@ant-design/icons";
import Logo from "y/styles/assets/svg/Logo";
import { useState } from "react";
import { ActionButton } from "y/atoms";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  console.log(session);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Typography className={styles.userNameWrapper}>
          <span>Signed in as</span>
          <span className={styles.userName}>{session?.user?.name}</span>
        </Typography>
      ),
    },
    {
      type: "divider",
    },

    {
      key: "2",
      label: <div onClick={() => signOut()}>Sign out</div>,
    },
  ];

  const { Header, Footer, Content } = Layout;

  return (
    <Layout>
      <Header className={styles.headerWrapper}>
        <div className={styles.headerLogo}>Wh1tePython</div>
        <span className={styles.headerIcon}>
          <Logo />
        </span>
        {status === "authenticated" ? (
          <>
            <Dropdown
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
      </Header>
      <Layout>
        <Content>main content</Content>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
};

export default Home;
