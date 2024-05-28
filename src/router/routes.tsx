import { RouteObject } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Home, About, Contact, SubPage1, SubPage2, Login } from "./pages";

export type ExtendedRouteObject = RouteObject & {
  name?: string;
  icon?: React.ReactNode;
  children?: ExtendedRouteObject[];
};

const routes: ExtendedRouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
    name: "Home",
    icon: <UserOutlined />,
    children: [
      {
        path: "/about",
        element: <About />,
        name: "About",
        icon: <UserOutlined />,
        children: [
          {
            path: "subpage1",
            element: <SubPage1 />,
            name: "SubPage1",
            icon: <UserOutlined />,
          },
          {
            path: "subpage2",
            element: <SubPage2 />,
            name: "SubPage2",
            icon: <UserOutlined />,
          },
        ],
      },
      {
        path: "/contact",
        element: <Contact />,
        name: "Contact",
        icon: <UserOutlined />,
      },
    ],
  },
];

export default routes;
