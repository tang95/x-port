import {request} from '@umijs/max';

export async function removeLink(data: API.RemoveComponentLinkRequest) {
    return await request<any>('/api/component/links/remove', {
        method: 'POST',
        data
    })
}


export async function addLink(data: API.AddComponentLinkRequest) {
    return await request<any>('/api/component/links/add', {
        method: 'POST',
        data
    })
}


export async function updateComponent(data: API.UpdateComponentRequest) {
    return await request<any>('/api/component/update', {
        method: 'PATCH',
        data
    })
}


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
                        type
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

export async function getComponent(
    id: string,
    dependency: boolean | {
        page: API.PageInput,
        filter?: API.ComponentFilter,
        sort?: API.SortInput[]
    } = false,
    dependents: boolean | {
        page: API.PageInput,
        filter?: API.ComponentFilter,
        sort?: API.SortInput[]
    } = false
): Promise<API.Component> {
    const {data} = await request<any>('/api/graphql/query', {
        method: 'POST',
        data: {
            query: `
            query MyQuery($id: ID!
            ${dependency ? `, $dependencyFilter: ComponentFilter, $dependencyPage: PageInput!, $dependencySort: [SortInput!]`: ""}
            ${dependency ? `,$dependentsFilter: ComponentFilter, $dependentsPage: PageInput!, $dependentsSort: [SortInput!]`: ""}
            ) {
                getComponent(id: $id) {
                    id name description tier type annotations lifecycle
                    tags links { title type url } owner { id name }
                    updatedAt createdAt
                    ${dependency ? `dependency(filter: $dependencyFilter, page: $dependencyPage, sort: $dependencySort) {
                        total data {
                            id name description tier type annotations lifecycle
                            tags links { title type url } owner { id name }
                            updatedAt createdAt
                        }
                    }`: ""}
                    ${dependents ? `dependents(filter: $dependentsFilter, page: $dependentsPage, sort: $dependentsSort) {
                        total data {
                            id name description tier type annotations lifecycle
                            tags links { title type url } owner { id name }
                            updatedAt createdAt
                        }
                    }` : ""}
                }
            }
            `,
            variables: {
                id: id,
                dependencyFilter: dependency ? (dependency as any).filter : undefined,
                dependencyPage: dependency ? (dependency as any).page : undefined,
                dependencySort: dependency ? (dependency as any).sort : undefined,
                dependentsFilter: dependents ? (dependents as any).filter : undefined,
                dependentsPage: dependents ? (dependents as any).page : undefined,
                dependentsSort: dependents ? (dependents as any).sort : undefined,
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
