export default (state = [], action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return action.orders;
        case 'ADD_ORDER':
            return [action.order, ...state];
        default:
            return state;
    }
}