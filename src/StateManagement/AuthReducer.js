const initialState = {
    isAuthenticated: false,
    username: "",
    roles: [],
    token: "",
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTHENTICATED':
        return {
            ...state,
            isAuthenticated: action.isAuthenticated,
        };
        case 'SET_USER_ROLES':
        return {
            ...state,
            roles: action.roles,
        };
        case 'SET_TOKEN':
            console.log('Token:', action.token);
        return {
            
            ...state,
            token: action.token,
        };
        case 'SET_USER':
        return {
            ...state,
            username: action.username,
        };
        default:
        return state;
    }
};

export default AuthReducer;
  