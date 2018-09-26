import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import AppRouter from './routers/AppRouter';
import { setBeers } from './actions/beers';

// Test data
const beers = [
    {
        name: 'Jelen',
        price: 240,
        onStock: true
    },
    {
        name: 'Lav',
        price: 230,
        onStock: false
    },
    {
        name: 'Staropramen',
        price: 120,
        onStock: false
    },
    {
        name: 'Krusovice',
        price: 120,
        onStock: false
    },
    {
        name: 'Hoegarden',
        price: 120,
        onStock: false
    },
    {
        name: 'Zajecarsko tamno',
        price: 120,
        onStock: false
    },
    {
        name: 'Zajecarsko svetlo',
        price: 120,
        onStock: false
    },
    {
        name: 'Apatinsko',
        price: 120,
        onStock: false
    },
    {
        name: 'Dezerter',
        price: 120,
        onStock: false
    },
    {
        name: 'Slager',
        price: 120,
        onStock: false
    },
    {
        name: 'Weiss',
        price: 120,
        onStock: true
    },
    {
        name: 'Tuborg',
        price: 120,
        onStock: false
    },
    {
        name: 'Stela',
        price: 120,
        onStock: true
    },
    {
        name: 'Nisko',
        price: 120,
        onStock: false
    },
    {
        name: 'Salto',
        price: 120,
        onStock: false
    },
    {
        name: 'Hofman',
        price: 120,
        onStock: true
    }
];

const store = configureStore();
const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

store.dispatch(setBeers(beers));
ReactDOM.render(jsx, document.getElementById('app'));