// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import {TOKEN_NAME} from "@/constants";
import {history, RequestConfig, RequestError, RunTimeLayoutConfig} from "@umijs/max";
import {message} from "antd";
import React from "react";

export async function getInitialState(): Promise<API.AuthUser | null> {
    const str = localStorage.getItem(TOKEN_NAME);
    if (str && str.length > 0) {
        return JSON.parse(str);
    }
    if (!window.location.pathname.startsWith("/login")) {
        history.push('/login');
    }
    return null;
}

export const layout: RunTimeLayoutConfig = ({initialState}) => {
    return {
        logo: '/favicon.png',
        layout: "top",
        headerTitleRender: (logo, title) => {
            return (
                <a style={{paddingRight: '10px'}}>
                    {logo}
                    {title}
                </a>
            )
        },
        menu: {
            locale: false,
        },
        logout: async () => {
            localStorage.removeItem(TOKEN_NAME);
            return history.push('/login');
        },
    };
};


export const request: RequestConfig = {
    timeout: 10000,
    errorConfig: {
        errorHandler: (error: RequestError) => {
            // @ts-ignore
            const {response} = error;
            if (response?.data?.msg) {
                message.error(response?.data?.msg);
            }
            if (response?.status === 401) {
                message.error('登录已失效，重新登录');
                return history.push('/login');
            }
            throw error;
        }
    },
    requestInterceptors: [
        (url, options) => {
            const str = localStorage.getItem(TOKEN_NAME);
            if (str && str.length > 0) {
                const token = JSON.parse(str).token;
                const authHeader = {Authorization: `Bearer ${token}`};
                return {
                    url: url,
                    options: {...options, interceptors: true, headers: authHeader},
                };
            } else if (!history.location.pathname.startsWith('/login')) {
                history.push('/login');
                throw new Error('登录已失效，重新登录');
            }
            return {
                url: url,
                options: {...options, interceptors: true},
            };
        },
    ],
};
