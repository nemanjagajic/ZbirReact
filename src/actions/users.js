// SET_USERS
export const setUsers = (users) => ({
    type: 'SET_USERS',
    users
});

// ADD_USER
export const addUser = (user) => ({
    type: 'ADD_USER',
    user
});

// DELETE_USER
export const deleteUser = (id) => ({
    type: 'DELETE_USER',
    id
});