export default (initialState: API.AuthUser) => {
    return {
        canSeeAdmin: initialState?.role === 'admin',
        canSeeMember: initialState?.role === 'member',
    };
};
