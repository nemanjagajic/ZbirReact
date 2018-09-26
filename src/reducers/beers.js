export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_BEER':
            return [...state, action.beer];
        case 'SET_BEERS':
            return action.beers;
        default:
            return state;
    }
}