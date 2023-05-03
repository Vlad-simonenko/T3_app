import { Avatar, Button, Image, Input, Layout, Menu } from "antd";
import React, { useState } from "react";
import styles from "./Sider.module.scss";

export const Sider = () => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Sider
        className={styles.siderWrapper}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        collapsedWidth={40}
      >
        <div
          style={{
            height: collapsed ? "" : 64,
            margin: collapsed ? 4 : 10,
            width: collapsed ? 32 : "",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <Image src="https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=2000" />
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" />
      </Sider>
    </>
  );
};
