import React from 'react';
import { connect } from 'react-redux';
import { setOrders } from '../actions/orders';
import axios from 'axios';
import OrderListItem from './OrderListItem';

class OrderList extends React.Component {
    componentDidMount() {
        axios.get(`http://localhost:8000/api/ordersPrintable`).then((response) => {
            this.props.setOrders(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <div className="order-list">
                <div className="order-list__statistics"></div>
                <div className="order-list__recent">
                    <h3>Orders</h3>
                    <div className="order-list__items" id="scrollbar-style">
                        {
                            this.props.orders.map((order) => (
                                <OrderListItem key={order.id} {...order} />
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    orders: state.orders
});

const mapDispatchToProps = (dispatch) => ({
    setOrders: (orders) => dispatch(setOrders(orders))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);