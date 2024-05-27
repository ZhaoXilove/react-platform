import React from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";

const { Header } = Layout;
export type HeaderComponentProps = {
  collapsed?: boolean;
  handeClick?: () => void;
};
const HeaderComponent: React.FC<HeaderComponentProps> = ({
  collapsed,
  handeClick,
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header
      className="site-layout-background"
      style={{ padding: 0, background: colorBgContainer }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={handeClick}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
};

export default HeaderComponent;
