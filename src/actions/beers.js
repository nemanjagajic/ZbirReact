// SET_BEERS
export const setBeers = (beers) => ({
    type: 'SET_BEERS',
    beers
});

// ADD_BEER
export const addBeer = (beer) => ({
    type: 'ADD_BEER',
    beer
});

// DELETE_BEER
export const deleteBeer = (id) => ({
    type: 'DELETE_BEER',
    id
});

// PUT_ON_STOCK
export const putBeerOnStock = (id) => ({
    type: 'PUT_ON_STOCK',
    id
});

// PUT_OFF_STOCK
export const putBeerOffStock = (id) => ({
    type: 'PUT_OFF_STOCK',
    id
});