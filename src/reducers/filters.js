const filtersReducerDefaultState = {
    text: ''
}

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                text: action.text
            };
        default:
            return state;
    }
};