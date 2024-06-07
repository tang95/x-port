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
        {name: '首页', path: '/', component: './Home', icon: 'home'},
        {name: "组件", path: "/component", icon: 'appstore', component: "./Component"},
        {name: "组件详情", path: "/component/detail/:id", component: "./Component/Detail", hideInMenu: true},
        {name: '团队', path: '/team', component: './Team', icon: 'team'},
        {name: "登录", path: '/login', layout: false, component: "./Login"},
        {name: "Github 认证", path: "/login/github", layout: false, component: "./Login/Github"},
        {path: '*', layout: false, component: './404'},
    ],
    npmClient: 'yarn',
});

