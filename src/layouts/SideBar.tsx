import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import  routes, { ExtendedRouteObject }  from "../router/routes";
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
  
  // 获取以PATH:'/'为准的Route
  const rootRoute: ExtendedRouteObject | undefined = routes.find((route) => route.path === '/');
  console.log(rootRoute);

  /**
   * Recursively render menu items
   * @param routes Array of routes
   * @param parentPath Parent path
   * @returns Array of menu items
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
   * Find menu items that need to be expanded
   * @param routes Array of routes
   * @param parentPath Parent path
   * @returns Array of menu items to be expanded
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

  // Use rootRoute in renderMenuItems and findOpenKeys functions
  const openKeys = rootRoute ? findOpenKeys([rootRoute]) : [];
  const menuItems = rootRoute ? renderMenuItems([rootRoute]) : [];

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
