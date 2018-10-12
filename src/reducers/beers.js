export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_BEER':
            return [action.beer, ...state];
        case 'SET_BEERS':
            return action.beers;
        case 'DELETE_BEER':
            return state.filter((beer) => beer.id !== action.id);
        case 'PUT_ON_STOCK':
            return state.map((beer) => {
                if (beer.id === action.id) {
                    return {
                        ...beer,
                        onStock: true
                    };
                } else {
                    return beer;
                }
            });
        case 'PUT_OFF_STOCK':
            return state.map((beer) => {
                if (beer.id === action.id) {
                    return {
                        ...beer,
                        onStock: false
                    };
                } else {
                    return beer;
                }
            });
        default:
            return state;
    }
}