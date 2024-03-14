import {request} from '@umijs/max';

export async function providers() {
    return request<string[]>('/api/auth/providers', {
        method: 'GET',
    })
}

export async function getAuthorizeUrl(provider: string) {
    return request<{ authorizeUrl: string }>('/api/auth/authorizeUrl', {
        method: 'GET',
        params: {
            provider,
        },
    })
}

export async function validate(provider: string, code: string) {
    return request<API.AuthUser>('/api/auth/validate', {
        method: 'POST',
        data: {
            provider,
            code,
        },
    })
}
