import React from 'react';

const BeerListItem = ({name, price}) => (
    <div className="beer-list-item">
        <div>{name}</div>
        <div>{price} din</div>
    </div>
);

export default BeerListItem;