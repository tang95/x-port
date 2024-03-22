import {request} from '@umijs/max';

export async function listTeam(page: API.PageInput): Promise<API.PageResponse<API.Team>> {
    const {data} = await request<any>('/api/graphql/query', {
        method: 'POST',
        data: {
            query: `#graphql
            query MyQuery($page: PageInput!) {
                listTeam(page: $page) {
                    data {
                        id
                        name
                    }
                    total
                }
            }
            `,
            variables: {
                page: page,
            }
        },
    })
    return data.listTeam
}
