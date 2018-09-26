export default (beers, { text }) => {
    return beers.filter((beer) => beer.name.toLowerCase().includes(text.toLowerCase()));
}