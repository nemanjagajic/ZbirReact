import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import AppRouter from './routers/AppRouter';
import { setBeers } from './actions/beers';

const uid = require('uuid/v1');

// Test data
const beers = [
    {
        id: uid(),
        name: 'Jelen',
        price: 240,
        onStock: true
    },
    {
        id: uid(),
        name: 'Lav',
        price: 230,
        onStock: false
    },
    {
        id: uid(),
        name: 'Staropramen',
        price: 120,
        onStock: false
    },
    {
        id: uid(),
        name: 'Krusovice',
        price: 120,
        onStock: false
    },
    {
        id: uid(),
        name: 'Hoegarden',
        price: 120,
        onStock: false
    },
    {
        id: uid(),
        name: 'Zajecarsko tamno',
        price: 120,
        onStock: false
    },
    {
        id: uid(),
        name: 'Zajecarsko svetlo',
        price: 120,
        onStock: false
    },
    {
        id: uid(),
        name: 'Apatinsko',
        price: 120,
        onStock: false
    },
    {
        id: uid(),
        name: 'Dezerter',
        price: 120,
        onStock: false
    },
    {
        id: uid(),
        name: 'Slager',
        price: 120,
        onStock: false
    },
    {
        id: uid(),
        name: 'Weiss',
        price: 120,
        onStock: true
    },
    {
        id: uid(),
        name: 'Tuborg',
        price: 120,
        onStock: false
    },
    {
        id: uid(),
        name: 'Stela',
        price: 120,
        onStock: true
    },
    {
        id: uid(),
        name: 'Nisko',
        price: 120,
        onStock: false
    },
    {
        id: uid(),
        name: 'Salto',
        price: 120,
        onStock: false
    },
    {
        id: uid(),
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