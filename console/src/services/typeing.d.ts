declare namespace API {
    type AuthUser = {
        id: string;
        name: string;
        avatar: string;
        description?: string;
        role: string;
        token: string;
    }
}
