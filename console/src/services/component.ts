import {request} from '@umijs/max';

export async function queryComponents(page: API.PageInput, filter: API.ComponentFilter, sort?: API.SortInput[]): Promise<API.PageResponse<API.Component>> {
    const {data} = await request<any>('/api/graphql/query', {
        method: 'POST',
        data: {
            query: `#graphql
            query MyQuery($page: PageInput!, $sort: [SortInput!], $filter: ComponentFilter) {
                queryComponents(page: $page, sort: $sort, filter: $filter) {
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
    return data.queryComponents
}

export async function getComponent(id: string): Promise<API.Component> {
    const {data} = await request<any>('/api/graphql/query', {
        method: 'POST',
        data: {
            query: `#graphql
            query MyQuery($id: ID!) {
                getComponent(id: $id) {
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
            }
            `,
            variables: {
                id: id,
            }
        },
    })
    return data.getComponent
}

export async function queryTags(): Promise<string[]> {
    return await request<any>('/api/component/queryTags', {
        method: 'GET',
    })
}
