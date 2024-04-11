import {request} from '@umijs/max';

export async function queryTeams(page: API.PageInput, sort?: API.SortInput[]): Promise<API.PageResponse<API.Team>> {
    const {data} = await request<any>('/api/graphql/query', {
        method: 'POST',
        data: {
            query: `#graphql
            query MyQuery($page: PageInput!, $sort: [SortInput!],) {
                queryTeams(page: $page, sort: $sort) {
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
                sort: sort
            }
        },
    })
    return data.queryTeams
}
