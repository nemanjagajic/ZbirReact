import React from 'react';
import { connect } from 'react-redux';
import { deleteBeer, putBeerOnStock, putBeerOffStock } from '../actions/beers';
import Modal from 'react-modal';

class BeerListItem extends React.Component {

    constructor() {
        super();

        this.state = {
            modalDeleteBeerIsOpen: false,
        };

        this.openDeleteBeerModal = this.openDeleteBeerModal.bind(this);
        this.closeDeleteBeerModal = this.closeDeleteBeerModal.bind(this);
    }

    openDeleteBeerModal() {
        this.setState({
            modalDeleteBeerIsOpen: true,
        });
    }

    closeDeleteBeerModal() {
        this.setState({ modalDeleteBeerIsOpen: false });
    }

    handleDeleteBeer = () => {
        this.props.deleteBeer(this.props.id);
    }

    handlePutBeerOnStock = () => {
        this.props.putBeerOnStock(this.props.id);
    }

    handlePutBeerOffStock = () => {
        this.props.putBeerOffStock(this.props.id);
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
                    contentLabel="Add beer modal"
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

const mapDispatchToProps = (dispatch) => ({
    deleteBeer: (id) => dispatch(deleteBeer(id)),
    putBeerOnStock: (id) => dispatch(putBeerOnStock(id)),
    putBeerOffStock: (id) => dispatch(putBeerOffStock(id))
});

export default connect(undefined, mapDispatchToProps)(BeerListItem);