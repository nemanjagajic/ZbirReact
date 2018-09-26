import React from 'react';
import BeerListItem from './BeerListItem';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';
import { addBeer } from '../actions/beers';
import selectBeers from '../selectors/beers';
import Modal from 'react-modal';

class BeerList extends React.Component {

    constructor() {
        super();

        this.state = {
            activeBeerSearchChanged: false,
            modalIsOpen: false,
            addBeerMessage: ''
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({
            modalIsOpen: true,
            addBeerMessage: ''
        });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
        if (e.target.name === 'activeBeersSearch') {
            this.setState(() => ({ activeBeerSearchChanged: true }));
            if (document.getElementsByName('inactiveBeersSearch')[0].value !== '') {
                document.getElementsByName('inactiveBeersSearch')[0].value = '';
            }
        } else if (e.target.name === 'inactiveBeersSearch') {
            this.setState(() => ({ activeBeerSearchChanged: false }));
            if (document.getElementsByName('activeBeersSearch')[0].value !== '') {
                document.getElementsByName('activeBeersSearch')[0].value = '';
            }
        }
    }

    handleAddBeer = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value.trim();
        const price = e.target.elements.price.value.trim();
        this.props.addBeer({
            name,
            price,
            onStock: false
        });

        this.setState(() => ({ addBeerMessage: `Successfully added ${name}` }))
    }

    render() {
        const activeBeers = this.props.beers.filter((beer) => beer.onStock);
        const inactiveBeers = this.props.beers.filter((beer) => !beer.onStock);

        const jsxActiveBeers = this.state.activeBeerSearchChanged ?
            selectBeers(activeBeers, this.props.filters).map((beer) => (
                <BeerListItem {...beer} />
            ))
            :
            activeBeers.map((beer) => (
                <BeerListItem {...beer} />
            ))

        const jsxInactiveBeers = this.state.activeBeerSearchChanged ?
            inactiveBeers.map((beer) => (
                <BeerListItem {...beer} />
            ))
            :
            selectBeers(inactiveBeers, this.props.filters).map((beer) => (
                <BeerListItem {...beer} />
            ))

        return (
            <div className="beer-list">
                <div className="beer-list__active">
                    <h3>On stock <span>({jsxActiveBeers.length})</span></h3>
                    <div className="beer-list__bar">
                        <input name="activeBeersSearch" className="beer-list__search-bar" type="text" placeholder="Search beers" onChange={this.onTextChange} />
                        <button className="beer-btn">Put new</button>
                    </div>
                    <div className="beer-list__items" id="scrollbar-style">
                        {
                            jsxActiveBeers
                        }
                    </div>
                </div>
                <div className="beer-list__inactive">
                    <h3>Not on stock <span>({jsxInactiveBeers.length})</span></h3>
                    <div className="beer-list__bar">
                        <input name="inactiveBeersSearch" className="beer-list__search-bar" type="text" placeholder="Search beers" onChange={this.onTextChange} />
                        <button className="beer-btn" onClick={this.openModal}>Add new</button>
                        <Modal className="modal"
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Example Modal"
                        >
                            <h3>Add new beer</h3>
                            <form onSubmit={this.handleAddBeer}>
                                <input name="name" type="text" placeholder="Name" />
                                <input name="price" type="text" placeholder="Price" />
                                {
                                    this.state.addBeerMessage != '' ?
                                    <div className="modal-message--success">{this.state.addBeerMessage}</div>
                                    :
                                    ''
                                }
                                <button className="beer-btn--modal">Submit</button>
                            </form>
                        </Modal>
                    </div>
                    <div className="beer-list__items" id="scrollbar-style">
                        {
                            jsxInactiveBeers
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    beers: state.beers,
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    addBeer: (beer) => dispatch(addBeer(beer))
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerList);