import {request} from '@umijs/max';

export async function listComponents(variables: any): Promise<API.PageResponse<API.Component>> {
    const {data} = await request<any>('/api/graphql/query', {
        method: 'POST',
        data: {
            query: `#graphql
            query MyQuery($page: PageInput!) {
                listComponent(page: $page) {
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
            variables: variables
        },
    })
    return data.listComponent
}
