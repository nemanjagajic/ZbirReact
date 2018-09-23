import React from 'react';
import BeerListItem from './BeerListItem';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';
import selectBeers from '../selectors/beers';

class BeerList extends React.Component {

    state = {
        activeBeerSearchChanged: false
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
        return (
            <div className="beer-list">
                <div className="beer-list__active">
                    <h3>On stock</h3>
                    <div className="beer-list__bar">
                        <input name="activeBeersSearch" className="beer-list__search-bar" type="text" placeholder="Search beers" onChange={this.onTextChange} />
                        <button className="beer-btn">Put new</button>
                    </div>
                    <div className="beer-list__items" id="scrollbar-style">
                        {
                            selectBeers(this.props.beers, this.props.filters, this.state.activeBeerSearchChanged).map((beer) => (
                                beer.onStock ? <BeerListItem {...beer} /> : ''
                            ))
                        }
                    </div>
                </div>
                <div className="beer-list__inactive">
                    <h3>Not on stock</h3>
                    <div className="beer-list__bar">
                        <input name="inactiveBeersSearch" className="beer-list__search-bar" type="text" placeholder="Search beers" onChange={this.onTextChange} />
                        <button className="beer-btn">Add new</button>
                    </div>
                    <div className="beer-list__items" id="scrollbar-style">
                        {
                            selectBeers(this.props.beers, this.props.filters, this.state.activeBeerSearchChanged).map((beer) => (
                                beer.onStock ? '' : <BeerListItem {...beer} />
                            ))
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