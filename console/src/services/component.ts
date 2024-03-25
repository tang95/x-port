import {request} from '@umijs/max';

export async function listComponents(page: API.PageInput, filter: API.ComponentFilter, sort?: API.SortInput[]): Promise<API.PageResponse<API.Component>> {
    const {data} = await request<any>('/api/graphql/query', {
        method: 'POST',
        data: {
            query: `#graphql
            query MyQuery($page: PageInput!, $sort: [SortInput!], $filter: ComponentFilter) {
                listComponent(page: $page, sort: $sort, filter: $filter) {
                    data {
                        id
                        name
                        description
                        tier
                        annotations
                        lifecycle
                        tags
                        links {
                            title
                            type
                            url
                        }
                        owner {
                            id
                            name
                        }
                    }
                    total
                }
            }
            `,
            variables: {
                page: page,
                filter: filter,
                sort: sort
            }
        },
    })
    return data.listComponent
}
