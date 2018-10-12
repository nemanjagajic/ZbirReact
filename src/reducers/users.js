export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_USER':
            return [action.user, ...state];
        case 'DELETE_USER':
            return state.filter((user) => user.id !== action.id);
        case 'SET_USERS':
            return action.users;
        default:
            return state;
    }
}