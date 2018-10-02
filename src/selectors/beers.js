export default (beers, { textBeer }) => {
    return beers.filter((beer) => beer.name.toLowerCase().includes(textBeer.toLowerCase()));
}