import React from 'react';
import BeerListItem from './BeerListItem';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';
import selectBeers from '../selectors/beers';
import Modal from 'react-modal';

class BeerList extends React.Component {

    state = {
        activeBeerSearchChanged: false
    }

    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // References are now sync'd and can be accessed
        this.subtitle.style.color = '#f00';
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
                            <form>
                                <input name="beer-name" type="text" placeholder="Name" />
                                <input name="beer-price" type="text" placeholder="Price" />
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
    setTextFilter: (text) => dispatch(setTextFilter(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerList);