import React, { useState } from "react";
import { Layout } from "antd";
import Header from "./layouts/Header";
import Sidebar from "./layouts/SideBar";
import Content from "./layouts/Content";

const App: React.FC = () => {
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

export default App;
