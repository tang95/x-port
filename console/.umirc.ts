import {defineConfig} from '@umijs/max';

export default defineConfig({
    esbuildMinifyIIFE: true,
    hash: true,
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: 'X-Port',
    },
    proxy: {
        '/api': {
            target: "http://localhost:8080",
            changeOrigin: true,
        },
    },
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            name: '首页',
            path: '/home',
            component: './Home',
            icon: 'home'
        },
        {
            name: '组件',
            path: '/component',
            icon: 'appstore',
            routes: [
                {redirect: "/component/index", path: "/component"},
                {name: "组件", path: "/component/index", component: "./Component", hideInMenu: true, hideInBreadcrumb: true},
                {name: "详情", path: "/component/detail/:id", component: "./Component/Detail", hideInMenu: true},
            ]
        },
        {
            name: '团队',
            path: '/team',
            component: './Team',
            icon: 'team'
        },
        {
            path: '/login',
            layout: false,
            routes: [
                {name: "登录", path: "/login", component: "./Login"},
                {name: "Github 认证", path: "/login/github", component: "./Login/Github"}
            ]
        },
        {path: '/*', redirect: "/"}
    ],
    npmClient: 'yarn',
});

