/*
 * @Author: fjy 1787673323@qq.com
 * @Date: 2024-05-27 14:54:33
 * @LastEditors: fjy 1787673323@qq.com
 * @LastEditTime: 2024-05-27 15:04:03
 * @FilePath: \react-platform\src\router\routes.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import SubPage1 from "../pages/SubPage1";
import SubPage2 from "../pages/SubPage2";

export type ExtendedRouteObject = RouteObject & {
  name?: string;
  children?: ExtendedRouteObject[];
};

const routes: ExtendedRouteObject[] = [
  {
    path: "/",
    element: <Home />,
    name: "Home",
  },
  {
    path: "/about",
    element: <About />,
    name: "About",
    children: [
      { path: "subpage1", element: <SubPage1 />, name: "SubPage1" },
      { path: "subpage2", element: <SubPage2 />, name: "SubPage2" },
    ],
  },
  { path: "/contact", element: <Contact />, name: "Contact" },
];

export default routes;
