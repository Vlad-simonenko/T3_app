import {
  Avatar,
  Button,
  Dropdown,
  Input,
  Layout,
  MenuProps,
  Typography,
} from "antd";
import styles from "../styles/index.module.scss";
import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { DownOutlined } from "@ant-design/icons";
import Logo from "y/styles/assets/svg/Logo";
import { ActionButton } from "y/atoms";
import { useState } from "react";
import EditIcon from "y/styles/assets/svg/EditIcon";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

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

  const [task, setTask] = useState("");

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
      </Header>
      <Layout>
        <Content className={styles.mainContainer}>
          <div className={styles.mainContant}>
            <div className={styles.cardContainer}>
              <div className={styles.cardTitle}>
                <EditIcon />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardBodyTitle}>1231</div>
                <div className={styles.cardBodyDescription}>22313</div>
              </div>
              <div className={styles.cardFooter}>
                <div className={styles.cardFooterIcons}>
                  <Avatar size={30} alt="U" src={session?.user?.image} />
                </div>
                <div className={styles.cardFooterInfo}>
                  <div className={styles.cardFooterSubTasks}>
                    Subtasks
                    <span className={styles.cardFooterSubTasksNumber}> 7</span>
                  </div>
                  <div className={styles.cardFooterHours}>
                    Time
                    <span className={styles.cardFooterSubTasksNumber}>
                      12 h
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Input onChange={(e) => setTask(e.target.value)} />
            <Button>Create</Button>
          </div>
        </Content>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
};

export default Home;
