export default (state = [], action) => {
    switch (action.type) {
        case 'SET_MOST_ORDERED':
            return action.mostOrdered;
        default:
            return state;
    }
}