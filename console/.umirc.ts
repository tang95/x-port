import {defineConfig} from '@umijs/max';

export default defineConfig({
    esbuildMinifyIIFE: true,
    hash: true,
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    reactQuery: {},
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
            name: '软件目录',
            path: '/component',
            component: './Component',
            icon: 'appstore'
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
    ],
    npmClient: 'yarn',
});

