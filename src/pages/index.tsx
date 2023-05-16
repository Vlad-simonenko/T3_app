import { Layout, MenuProps, Typography } from "antd";
import styles from "../styles/index.module.scss";
import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { CardList, HeaderContent } from "y/organism";
import { Sider } from "y/molecules";
import { PrismaClient } from "@prisma/client";
import prisma from "y/server/server";

const Home: NextPage = (users) => {
  const { data: session, status } = useSession();

  console.log(users);

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

  const { Header } = Layout;

  return (
    <Layout className={styles.contentWrapper}>
      <Header className={styles.headerWrapper}>
        <HeaderContent items={items} session={session} status={status} />
      </Header>
      <Layout className={styles.mainContainer}>
        <Sider />
        <CardList session={session} />
      </Layout>
    </Layout>
  );
};
export default Home;

export function getServerSideProps() {
  const users = prisma.user.findMany();

  return {
    props: JSON.parse(JSON.stringify(users)),
  };
}
