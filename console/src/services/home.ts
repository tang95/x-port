import {request} from '@umijs/max';

export async function getHomeMetrics(): Promise<API.HomeMetrics> {
    const {data} = await request<any>('/api/graphql/query', {
        method: 'POST',
        data: {
            query: `#graphql
            query MyQuery {
                getHomeMetrics {
                    myComponentCount
                    componentCount
                    teamCount
                }
            }
            `
        },
    })
    return data.getHomeMetrics
}
