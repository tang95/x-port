import {defineConfig} from '@umijs/max';

export default defineConfig({
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: '@umijs/max',
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
        },
        {
            name: '权限演示',
            path: '/access',
            component: './Access',
        },
        {
            name: ' CRUD 示例',
            path: '/table',
            component: './Table',
        },
    ],
    presets: ['umi-presets-pro'],
    /**
     * @name openAPI 插件的配置
     * @description 基于 openapi 的规范生成serve 和mock，能减少很多样板代码
     * @doc https://pro.ant.design/zh-cn/docs/openapi/
     */
    openAPI: [
        {
            requestLibPath: "import { request } from '@umijs/max'",
            schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json",
            // schemaPath: join(__dirname, 'oneapi.json'),
            mock: true,
        },
    ],
    npmClient: 'yarn',
});

