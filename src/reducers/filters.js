const filtersReducerDefaultState = {
    textBeer: '',
    textUser: ''
}

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_BEER_TEXT_FILTER':
            return {
                ...state,
                textBeer: action.text
            };
        case 'SET_USER_TEXT_FILTER':
            return {
                ...state,
                textUser: action.text
            };
        default:
            return state;
    }
};