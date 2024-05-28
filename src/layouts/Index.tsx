import React, { useState } from "react";
import { Layout } from "antd";
import Header from "./Header";
import Sidebar from "./SideBar";
import Content from "./Content";

const Index: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const handeClick = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} handeClick={handeClick} />
        <Content />
      </Layout>
    </Layout>
  );
};

export default Index;
