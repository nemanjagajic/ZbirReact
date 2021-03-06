import React from 'react';

const OrderListItem = ({ username, beerName, count }) => (
    <div className="order-list-item">
        <div>{username}</div>
        <div>{beerName} <span>x {count}</span></div>
    </div>
);

export default OrderListItem;
