import React from 'react';
import { Layout, Breadcrumb, theme } from 'antd';
import { Routes, Route, useLocation, RouteObject, Link } from 'react-router-dom';
import routes, { ExtendedRouteObject } from '../router/routes';

const { Content } = Layout;
/**
 * 根据路径查找路由对象
 * @param routes 路由数组
 * @param path 路径
 * @returns 路由对象
 */
const findRouteByPath = (routes: ExtendedRouteObject[], path: string): ExtendedRouteObject | undefined => {
    for (const route of routes) {
        const fullPath = `${route.path}`.replace(/\/+/g, '/');
        if (fullPath === path) {
            return route;
        }
        if (route.children) {
            const childRoute = findRouteByPath(route.children, path);
            if (childRoute) {
                return childRoute;
            }
        }
    }
    return undefined;
};

const ContentComponent: React.FC = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const route = findRouteByPath(routes, url);
        return {
            key: url,
            title: route ? route.name : url.slice(1).charAt(0).toUpperCase() + url.slice(2)
        };
    });
    const breadcrumbConfig = [
        { key: 'home', title: <Link to="/">Home</Link> },
        ...breadcrumbItems
    ];
    const renderRoutes = (routes: RouteObject[]) => {
        return routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
                {route.children && renderRoutes(route.children)}
            </Route>
        ));
    };
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb items={breadcrumbConfig} style={{ margin: '16px 0' }} />
            <Content
                className="site-layout-background"
                // style={{
                //     padding: 24,
                //     margin: 0,
                //     minHeight: 280,
                // }}
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Routes>
                    {renderRoutes(routes)}
                </Routes>
            </Content>
        </Layout>
    );
};

export default ContentComponent;
