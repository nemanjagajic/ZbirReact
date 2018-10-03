import React from 'react';
import BeerListItem from './BeerListItem';
import { connect } from 'react-redux';
import { setBeerTextFilter } from '../actions/filters';
import { addBeer } from '../actions/beers';
import selectBeers from '../selectors/beers';
import Modal from 'react-modal';

const uid = require('uuid/v1');

class BeerList extends React.Component {

    constructor() {
        super();

        this.state = {
            activeBeerSearchChanged: false,
            modalAddBeerIsOpen: false,
            addBeerMessage: ''
        };

        this.openAddBeerModal = this.openAddBeerModal.bind(this);
        this.closeAddBeerModal = this.closeAddBeerModal.bind(this);
    }

    openAddBeerModal = () => {
        this.setState({
            modalAddBeerIsOpen: true,
            addBeerMessage: ''
        });
    }

    closeAddBeerModal = () => {
        this.setState({ modalAddBeerIsOpen: false });
    }

    onTextChange = (e) => {
        this.props.setBeerTextFilter(e.target.value);
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
        const id = uid();
        const name = e.target.elements.name.value.trim();
        const price = e.target.elements.price.value.trim();
        this.props.addBeer({
            id, 
            name,
            price,
            onStock: false
        });

        this.setState(() => ({ addBeerMessage: `Successfully added ${name}` }))
        
        e.target.elements.name.value = '';
        e.target.elements.price.value = '';
    }

    render() {
        const activeBeers = this.props.beers.filter((beer) => beer.onStock);
        const inactiveBeers = this.props.beers.filter((beer) => !beer.onStock);

        const jsxActiveBeers = this.state.activeBeerSearchChanged ?
            selectBeers(activeBeers, this.props.filters).map((beer) => (
                <BeerListItem key={beer.id} {...beer} />
            ))
            :
            activeBeers.map((beer) => (
                <BeerListItem key={beer.id} {...beer} />
            ))

        const jsxInactiveBeers = this.state.activeBeerSearchChanged ?
            inactiveBeers.map((beer) => (
                <BeerListItem key={beer.id} {...beer} />
            ))
            :
            selectBeers(inactiveBeers, this.props.filters).map((beer) => (
                <BeerListItem key={beer.id} {...beer} />
            ))

        return (
            <div className="beer-list">
                <div className="beer-list__active">
                    <h3>On stock <span>({jsxActiveBeers.length})</span></h3>
                    <div className="beer-list__bar">
                        <input name="activeBeersSearch" className="beer-list__search-bar" type="text" placeholder="Search beers" onChange={this.onTextChange} />
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
                        <button className="btn" onClick={this.openAddBeerModal}>Add new</button>
                        <Modal className="modal"
                            isOpen={this.state.modalAddBeerIsOpen}
                            onRequestClose={this.closeAddBeerModal}
                            contentLabel="Add beer modal"
                        >
                            <h3>Add new beer</h3>
                            <form onSubmit={this.handleAddBeer}>
                                <input name="name" type="text" placeholder="Name" />
                                <input name="price" type="text" placeholder="Price" />
                                {
                                    this.state.addBeerMessage != '' ?
                                    <div className="modal-message--success animated fadeIn">{this.state.addBeerMessage}</div>
                                    :
                                    ''
                                }
                                <button className="btn--modal">Submit</button>
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
    setBeerTextFilter: (text) => dispatch(setBeerTextFilter(text)),
    addBeer: (beer) => dispatch(addBeer(beer))
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerList);