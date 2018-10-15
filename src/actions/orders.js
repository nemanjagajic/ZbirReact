// SET_ORDERS
export const setOrders = (orders) => ({
    type: 'SET_ORDERS',
    orders
});

// SET_MOST_ORDERED
export const setMostOrdered = (mostOrdered) => ({
    type: 'SET_MOST_ORDERED',
    mostOrdered
});

// ADD ORDER
export const addOrder = (order) => ({
    type: 'ADD_ORDER',
    order
});