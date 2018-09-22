export default (beers, { text }, onStock) => {
    return beers.filter((beer) => {
        if (onStock) {
            return beer.onStock ? beer.name.toLowerCase().includes(text.toLowerCase()) : true;
        } else {
            return !beer.onStock ? beer.name.toLowerCase().includes(text.toLowerCase()) : true;
        }
    });
}