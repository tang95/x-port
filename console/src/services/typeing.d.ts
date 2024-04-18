declare namespace API {

    type AuthUser = {
        id: string;
        name: string;
        avatar: string;
        description?: string;
        role: string;
        token: string;
    }

    type User = {
        id: string;
        name: string;
        avatar: string;
        description?: string;
    }

    type Link = {
        title: string;
        url: string;
        type: string;
    }

    type Team = {
        id: string;
        name: string;
        description?: string;
        members?: User[];
    }

    type Component = {
        id: string;
        name: string;
        description?: string;
        type: string;
        tier: string;
        lifecycle: string;
        owner: Team;
        links?: Link[]
        tags?: string[]
        annotations?: Map
        createdAt: string
        updatedAt: string
    }

    type UpdateComponentRequest = {
        id: string;
        name?: string;
        description?: string;
        type?: string;
        tier?: string;
        lifecycle?: string;
        owner_id?: string;
        links?: Link[]
        tags?: string[]
        annotations?: Map
    }

    type AddComponentLinkRequest = {
        component_id: string;
        title: string;
        type: string;
        url: string;
    }

    type RemoveComponentLinkRequest = {
        component_id: string;
        title: string;
        type: string;
        url: string;
    }

    type PageResponse<T> = {
        total: number;
        data: T[];
    }

    type ComponentFilter = {
        keywords?: string;
        lifecycle?: string;
        tier?: string;
        type?: string;
        owner?: string;
        tags?: string[];
    }

    type PageInput = {
        page: number;
        size: number;
    }

    type SortInput = {
        field: string
        direction: "ASC" | "DESC"
    }

}
