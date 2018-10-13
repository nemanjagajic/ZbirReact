import React from 'react';
import { connect } from 'react-redux';
import { setOrders } from '../actions/orders';
import axios from 'axios';
import OrderListItem from './OrderListItem';

class OrderList extends React.Component {
    constructor() {
        super();

        this.state = {
            ordersQuery: {
                'page': 1,
                'showPerPage': 5,
                'previous': false,
                'next': false
            }
        }

        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/ordersPrintable?page=${this.state.ordersQuery.page}&showPerPage=${this.state.ordersQuery.showPerPage}`).then((response) => {
            this.props.setOrders(response.data.orders);
            const previous = response.data.previous;
            const next = response.data.next;
            this.setState(() => ({
                ordersQuery: {
                    ...this.state.ordersQuery,
                    previous,
                    next
                }
            }));
        }).catch((e) => {
            console.log(e);
        });
    }

    handlePreviousPage() {
        axios.get(this.state.ordersQuery.previous).then((response) => {
            this.props.setOrders(response.data.orders);
            const previous = response.data.previous;
            const next = response.data.next;

            this.setState((prevState) => ({
                ordersQuery: {
                    ...prevState.ordersQuery,
                    page: prevState.ordersQuery.page - 1,
                    previous,
                    next
                }
            }));
        }).catch((e) => {
            console.log(e);
        });
    }

    handleNextPage() {
        axios.get(this.state.ordersQuery.next).then((response) => {
            this.props.setOrders(response.data.orders);
            const previous = response.data.previous;
            const next = response.data.next;

            this.setState((prevState) => ({
                ordersQuery: {
                    ...prevState.ordersQuery,
                    page: prevState.ordersQuery.page + 1,
                    previous,
                    next
                }
            }));
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
                    <div className="order-list__pagination">
                        {
                            this.state.ordersQuery.previous ?
                                <button className="btn--pagination" onClick={this.handlePreviousPage}><ion-icon name="arrow-round-back"></ion-icon></button>
                                :
                                <button className="btn--pagination--disabled"><ion-icon name="arrow-round-back"></ion-icon></button>
                        }
                        <div className="order-list__page-indicator">
                            {this.state.ordersQuery.page}
                        </div>
                        {
                            this.state.ordersQuery.next ?
                                <button className="btn--pagination" onClick={this.handleNextPage}><ion-icon name="arrow-round-forward"></ion-icon></button>
                                :
                                <button className="btn--pagination--disabled"><ion-icon name="arrow-round-forward"></ion-icon></button>
                        }
                    </div>
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