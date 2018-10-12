import React from 'react';
import { connect } from 'react-redux';
import { setOrders } from '../actions/orders';
import { setOrdersDetails } from '../actions/ordersDetails';
import axios from 'axios';
import OrderListItem from './OrderListItem';

class OrderList extends React.Component {
    componentDidMount() {
        axios.get(`http://localhost:8000/api/ordersPrintable`).then((response) => {
            this.props.setOrdersDetails(response.data);
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
                            this.props.ordersDetails.map((order) => (
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
    ordersDetails: state.ordersDetails
});

const mapDispatchToProps = (dispatch) => ({
    setOrdersDetails: (ordersDetails) => dispatch(setOrdersDetails(ordersDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);