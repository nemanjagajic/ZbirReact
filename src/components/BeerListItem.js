import React from 'react';
import { connect } from 'react-redux';
import { setBeers } from '../actions/beers';
import Modal from 'react-modal';
import axios from 'axios';
import { setOrders } from '../actions/orders';

class BeerListItem extends React.Component {

    constructor() {
        super();

        this.state = {
            modalDeleteBeerIsOpen: false,
        };

        this.openDeleteBeerModal = this.openDeleteBeerModal.bind(this);
        this.closeDeleteBeerModal = this.closeDeleteBeerModal.bind(this);
    }

    openDeleteBeerModal = () => {
        this.setState({
            modalDeleteBeerIsOpen: true,
        });
    }

    closeDeleteBeerModal = () => {
        this.setState({ modalDeleteBeerIsOpen: false });
    }

    handleDeleteBeer = () => {
        const id = this.props.id;

        axios.delete(`http://localhost:8000/api/beers/${id}`, { headers: {"Authorization" : `Bearer ${this.props.token}`} }).then(() => {
            axios.get('http://localhost:8000/api/beers', { headers: {"Authorization" : `Bearer ${this.props.token}`} }).then((response) => {
                this.props.setBeers(response.data);
            }).catch((e) => {
                console.log(e);
            });
            axios.get(`http://localhost:8000/api/ordersPrintable?page=1&showPerPage=5`, { headers: {"Authorization" : `Bearer ${this.props.token}`} }).then((response) => {
                this.props.setOrders(response.data.orders);
            }).catch((e) => {
                console.log(e);
            });
        }).catch((e) => {
            console.log(e);
        });
    }

    handlePutBeerOnStock = () => {
        const id = this.props.id;
        const request = { onStock: true };

        axios.put(`http://localhost:8000/api/beers/${id}`, request, { headers: {"Authorization" : `Bearer ${this.props.token}`} }).then(() => {
            axios.get('http://localhost:8000/api/beers', { headers: {"Authorization" : `Bearer ${this.props.token}`} }).then((response) => {
                this.props.setBeers(response.data);
            }).catch((e) => {
                console.log(e);
            });
        }).catch((e) => {
            console.log(e);
        });
    }

    handlePutBeerOffStock = () => {
        const id = this.props.id;
        const request = { onStock: false };

        axios.put(`http://localhost:8000/api/beers/${id}`, request, { headers: {"Authorization" : `Bearer ${this.props.token}`} }).then(() => {
            axios.get('http://localhost:8000/api/beers', { headers: {"Authorization" : `Bearer ${this.props.token}`} }).then((response) => {
                this.props.setBeers(response.data);
            }).catch((e) => {
                console.log(e);
            });
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <div>
                {
                    this.props.onStock ?
                        // Beer on stock
                        (
                            <div className="beer-list-item">
                                <div>{this.props.name}</div>
                                <div>{this.props.price} din <ion-icon className="animated fadeIn" onClick={this.handlePutBeerOffStock} name="arrow-round-forward"></ion-icon></div>
                            </div>
                        )
                        :
                        // Beer not on stock
                        (
                            <div className="beer-list-item">
                                <div><ion-icon onClick={this.handlePutBeerOnStock} name="arrow-round-back"></ion-icon> {this.props.name}</div>
                                <div>{this.props.price} din <ion-icon onClick={this.openDeleteBeerModal} name="trash"></ion-icon></div>
                            </div>
                        )
                }
                <Modal className="modal"
                    isOpen={this.state.modalDeleteBeerIsOpen}
                    onRequestClose={this.closeDeleteBeerModal}
                    contentLabel="Delete beer modal"
                >
                    <div className="modal__dialog-header">Are you sure you want to delete {this.props.name}?</div>
                    <div className="modal__dialog-btn-container">
                        <button className="btn--dialog" onClick={this.handleDeleteBeer}>Yes</button>
                        <button className="btn--dialog" onClick={this.closeDeleteBeerModal}>No</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token
})

const mapDispatchToProps = (dispatch) => ({
    setBeers: (beers) => dispatch(setBeers(beers)),
    setOrders: (orders) => dispatch(setOrders(orders))
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerListItem);