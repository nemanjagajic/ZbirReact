import React from 'react';
import { connect } from 'react-redux';
import { setOrders, setMostOrdered } from '../actions/orders';
import axios from 'axios';
import OrderListItem from './OrderListItem';

class OrderList extends React.Component {
    constructor() {
        super();

        this.state = {
            ordersQuery: {
                'showPerPage': 5,
                'currentPage': 1,
                'previous': false,
                'next': false
            },
            mostOrdered: {}
        }

        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/ordersPrintable?page=${this.currentPage}&showPerPage=${this.state.ordersQuery.showPerPage}`,
        { headers: {"Authorization" : `Bearer ${this.props.token}`} }).then((response) => {
            this.props.setOrders(response.data.orders);
            const previous = response.data.previous;
            const next = response.data.next;
            const currentPage = response.data.currentPage;

            this.setState(() => ({
                ordersQuery: {
                    ...this.state.ordersQuery,
                    previous,
                    next,
                    currentPage
                }
            }));
        }).catch((e) => {
            console.log(e);
        });

        axios.get('http://localhost:8000/api/getMostOrderedBeers/3', { headers: {"Authorization" : `Bearer ${this.props.token}`} }).then((response) => {
            this.props.setMostOrdered(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    handlePreviousPage() {
        axios.get(this.state.ordersQuery.previous, { headers: {"Authorization" : `Bearer ${this.props.token}`} }).then((response) => {
            this.props.setOrders(response.data.orders);
            const previous = response.data.previous;
            const next = response.data.next;
            const currentPage = response.data.currentPage;

            this.setState((prevState) => ({
                ordersQuery: {
                    ...prevState.ordersQuery,
                    previous,
                    next,
                    currentPage
                }
            }));
        }).catch((e) => {
            console.log(e);
        });
    }

    handleNextPage() {
        axios.get(this.state.ordersQuery.next, { headers: {"Authorization" : `Bearer ${this.props.token}`} }).then((response) => {
            this.props.setOrders(response.data.orders);
            const previous = response.data.previous;
            const next = response.data.next;
            const currentPage = response.data.currentPage;

            this.setState((prevState) => ({
                ordersQuery: {
                    ...prevState.ordersQuery,
                    previous,
                    next,
                    currentPage
                }
            }));
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        const mostOrdered1 = Object.keys(this.props.mostOrdered)[0]
        const mostOrdered2 = Object.keys(this.props.mostOrdered)[1];
        const mostOrdered3 = Object.keys(this.props.mostOrdered)[2];

        const mostOrdered1Percentage = this.props.mostOrdered[mostOrdered1] ? `${this.props.mostOrdered[mostOrdered1]}%` : '';
        const mostOrdered2Percentage = this.props.mostOrdered[mostOrdered2] ? `${this.props.mostOrdered[mostOrdered2]}%` : '';
        const mostOrdered3Percentage = this.props.mostOrdered[mostOrdered3] ? `${this.props.mostOrdered[mostOrdered3]}%` : '';

        return (
            <div className="order-list">
                <div className="order-list__statistics">
                    <h3>Most ordered beers</h3>
                    <div className="order-list__statistics__container">
                        <div className="order-list__statistics__container__first" style={{height: mostOrdered1Percentage}}>{mostOrdered1Percentage}</div>
                        <div className="order-list__statistics__container__second" style={{height: mostOrdered2Percentage}}>{mostOrdered2Percentage}</div>
                        <div className="order-list__statistics__container__third" style={{height: mostOrdered3Percentage}}>{mostOrdered3Percentage}</div>
                    </div>
                    <div className="order-list__statistics__label-container">
                        <div className="order-list__statistics__label-container__first">{mostOrdered1}</div>
                        <div className="order-list__statistics__label-container__second">{mostOrdered2}</div>
                        <div className="order-list__statistics__label-container__third">{mostOrdered3}</div>
                    </div>
                </div>
                <div className="order-list__recent">
                    <h3>Orders</h3>
                    <div className="order-list__pagination">
                        {
                            this.state.ordersQuery.previous ?
                                <button id="btn-previous" className="btn--pagination" onClick={this.handlePreviousPage}><ion-icon name="arrow-round-back"></ion-icon></button>
                                :
                                <button id="btn-previous" className="btn--pagination--disabled"><ion-icon name="arrow-round-back"></ion-icon></button>
                        }
                        <div className="order-list__page-indicator">
                            {this.state.ordersQuery.currentPage}
                        </div>
                        {
                            this.state.ordersQuery.next ?
                                <button id="btn-next" className="btn--pagination" onClick={this.handleNextPage}><ion-icon name="arrow-round-forward"></ion-icon></button>
                                :
                                <button id="btn-next" className="btn--pagination--disabled"><ion-icon name="arrow-round-forward"></ion-icon></button>
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
    orders: state.orders,
    mostOrdered: state.mostOrdered,
    token: state.token
});

const mapDispatchToProps = (dispatch) => ({
    setOrders: (orders) => dispatch(setOrders(orders)),
    setMostOrdered: (mostOrdered) => dispatch(setMostOrdered(mostOrdered))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);