import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { setUsers } from '../actions/users';
import axios from 'axios';
import Select from 'react-select';
import { setOrders, setMostOrdered } from '../actions/orders';

class UserListItem extends React.Component {

    constructor() {
        super();

        this.state = {
            modalDeleteUserIsOpen: false,
            modalMakeOrderIsOpen: false,
            selectedOption: null,
            addOrderMessage: ''
        };

        this.openDeleteUserModal = this.openDeleteUserModal.bind(this);
        this.closeDeleteUserModal = this.closeDeleteUserModal.bind(this);
        this.openMakeOrderModal = this.openMakeOrderModal.bind(this);
        this.closeMakeOrderModal = this.closeMakeOrderModal.bind(this);
    }

    openDeleteUserModal = () => {
        this.setState({
            modalDeleteUserIsOpen: true,
        });
    }

    closeDeleteUserModal = () => {
        this.setState({ modalDeleteUserIsOpen: false });
    }

    openMakeOrderModal = () => {
        this.setState({
            modalMakeOrderIsOpen: true,
        });
    }

    closeMakeOrderModal = () => {
        this.setState({
            modalMakeOrderIsOpen: false,
            selectedOption: null,
            addOrderMessage: ''
        });
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    handleDeleteUser = () => {
        const id = this.props.id;

        axios.delete(`http://localhost:8000/api/customers/${id}`).then(() => {
            axios.get(`http://localhost:8000/api/customers`).then((response) => {
                this.props.setUsers(response.data);
            }).catch((e) => {
                console.log(e);
            });
            axios.get(`http://localhost:8000/api/ordersPrintable?page=$1&showPerPage=5`).then((response) => {
                this.props.setOrders(response.data.orders);
            }).catch((e) => {
                console.log(e);
            });
        }).catch((e) => {
            console.log(e);
        });
    }

    handleMakeOrder = (e) => {
        e.preventDefault();

        const userId = this.props.id;
        let beerId = -1;
        if (this.state.selectedOption) {
            beerId = this.state.selectedOption.value;
        } else {
            this.setState(() => ({ addOrderMessage: `You must select beer` }));
            return;
        }
        const beerName = this.state.selectedOption.label;
        const count = e.target.elements.orderBeerCount.value;

        const request = {
            userId,
            beerId,
            count
        };

        axios.post("http://localhost:8000/api/orders/addOrder", request).then(() => {
            this.setState(() => ({ addOrderMessage: `Successfully ordered ${beerName} x ${count}` }));
            const currentPage = document.querySelector('.order-list__page-indicator').innerHTML.trim();

            axios.get(`http://localhost:8000/api/ordersPrintable?page=${currentPage}&showPerPage=5`).then((response) => {
                this.props.setOrders(response.data.orders);
            }).catch((e) => {
                console.log(e);
            });

            axios.get('http://localhost:8000/api/getMostOrderedBeers/3').then((response) => {
                this.props.setMostOrdered(response.data);
            }).catch((e) => {
                console.log(e);
            });
        }).catch((e) => {
            this.setState(() => ({ addOrderMessage: `Error occurred, order not made` }));
            console.log(e);
        });

        this.setState({ selectedOption: null });
        e.target.elements.orderBeerCount.value = 1;
    }

    render() {
        const { selectedOption } = this.state;
        const options = [];
        this.props.beers.forEach((beer) => {
            if (beer.onStock) {
                options.push({
                    value: beer.id,
                    label: beer.name
                })
            }
        })

        return (
            <div className="user-list__item">
                <div>{`${this.props.name} ${this.props.lastName}`} <span>({this.props.username})</span></div>
                <div>
                    <ion-icon onClick={this.openMakeOrderModal} className="animated fadeIn" name="add-circle"></ion-icon>
                    <ion-icon className="animated fadeIn" name="information-circle"></ion-icon>
                    <ion-icon onClick={this.openDeleteUserModal} name="trash"></ion-icon>
                </div>

                {/* Delete user modal */}
                <Modal className="modal"
                    isOpen={this.state.modalDeleteUserIsOpen}
                    onRequestClose={this.closeDeleteUserModal}
                    contentLabel="Delete user modal"
                >
                    <div className="modal__dialog-header">Are you sure you want to delete {this.props.username}?</div>
                    <div className="modal__dialog-btn-container">
                        <button className="btn--dialog" onClick={this.handleDeleteUser}>Yes</button>
                        <button className="btn--dialog" onClick={this.closeDeleteUserModal}>No</button>
                    </div>
                </Modal>

                {/* Make order modal */}
                <Modal className="modal"
                    isOpen={this.state.modalMakeOrderIsOpen}
                    onRequestClose={this.closeMakeOrderModal}
                    contentLabel="Delete user modal"
                >
                    <div className="modal__dialog-header">Ordering beer for {this.props.username}</div>
                    <form onSubmit={this.handleMakeOrder}>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={options}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#404040',
                                    primary: "#404040",
                                },
                            })}
                        />
                        <input className="count-input" name="orderBeerCount"
                            type="number" min="1" defaultValue="1" pattern="^[1-9]*$" placeholder="Count"></input>
                        {
                            this.state.addOrderMessage != '' ?
                                (this.state.addOrderMessage.startsWith('Successfully') ?
                                    <div className="modal-message--success animated fadeIn">{this.state.addOrderMessage}</div>
                                    :
                                    <div className="modal-message--error animated fadeIn">{this.state.addOrderMessage}</div>)
                                :
                                ''
                        }
                        <button className="btn--modal">Make order</button>
                    </form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    beers: state.beers
});

const mapDispatchToProps = (dispatch) => ({
    setOrders: (orders) => dispatch(setOrders(orders)),
    setUsers: (users) => dispatch(setUsers(users)),
    setMostOrdered: (mostOrdered) => dispatch(setMostOrdered(mostOrdered))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListItem);