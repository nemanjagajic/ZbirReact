export default (state = [], action) => {
    switch (action.type) {
        case 'SET_ORDERS_DETAILS':
            return action.ordersDetails;
        default:
            return state;
    }
}