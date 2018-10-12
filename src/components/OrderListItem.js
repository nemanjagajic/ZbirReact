import React from 'react';
import axios from 'axios';

const OrderListItem = ({ username, beerName, count }) => (
    <div className="order-list-item">
        {`${username} ${beerName} ${count}`}
    </div>
);

export default OrderListItem;
