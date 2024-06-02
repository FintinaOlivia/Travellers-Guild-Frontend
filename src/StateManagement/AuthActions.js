export const setAuthenticated = (isAuthenticated) => ({
    type: 'SET_AUTHENTICATED',
    isAuthenticated,
});
  
export const setUserRoles = (roles) => ({
    type: 'SET_USER_ROLES',
    roles,
  });

export const setToken = (token) => ({
    type: 'SET_TOKEN',
    token,
  });

export const setUser = (username) => ({
    type: 'SET_USERNAME',
    username,
  });