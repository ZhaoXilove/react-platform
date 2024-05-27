import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import routes from "../router/routes";
import { ExtendedRouteObject } from "../router/routes";
import type { HeaderComponentProps } from "./Header";

const { Sider } = Layout;

type MenuItemType = {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItemType[];
};

type SidebarType = {} & HeaderComponentProps;

const Sidebar: React.FC<SidebarType> = ({ collapsed }) => {
  const location = useLocation();

  /**
   * 递归渲染菜单项
   * @param routes 路由数组
   * @param parentPath 父路径
   * @returns 菜单项数组
   */
  const renderMenuItems = (
    routes: ExtendedRouteObject[],
    parentPath = ""
  ): MenuItemType[] => {
    return routes.map((route) => {
      const fullPath = `${parentPath}${route.path ? route.path : ""}`.replace(
        /\/+/g,
        "/"
      );
      if (route.children && route.children.length > 0) {
        return {
          key: fullPath,
          icon: route.icon,
          label: route.name,
          children: renderMenuItems(route.children, `${fullPath}/`),
        };
      }
      return {
        key: fullPath,
        icon: route.icon,
        label: <Link to={fullPath}>{route.name}</Link>,
      };
    });
  };

  /**
   * 查找需要展开的菜单项
   * @param routes 路由数组
   * @param parentPath 父路径
   * @returns 需要展开的菜单项数组
   */
  const findOpenKeys = (
    routes: ExtendedRouteObject[],
    parentPath = ""
  ): string[] => {
    return routes.reduce<string[]>((openKeys, route) => {
      const fullPath = `${parentPath}${route.path ? route.path : ""}`.replace(
        /\/+/g,
        "/"
      );
      if (location.pathname.startsWith(fullPath) && route.children) {
        return [
          ...openKeys,
          fullPath,
          ...findOpenKeys(route.children, `${fullPath}/`),
        ];
      }
      return openKeys;
    }, []);
  };

  const openKeys = findOpenKeys(routes);
  const menuItems = renderMenuItems(routes);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div
        className="demo-logo-vertical"
        style={{
          height: "32px",
          margin: "16px",
          background: "rgba(255, 255, 255, .2)",
          borderRadius: "6px",
        }}
      />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={openKeys}
        items={menuItems}
        style={{ height: "100%", borderRight: 0 }}
      />
    </Sider>
  );
};

export default Sidebar;
