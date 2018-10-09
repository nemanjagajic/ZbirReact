import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import AppRouter from './routers/AppRouter';
import { setUsers } from './actions/users';

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
const users = [
    {
        id: uid(),
        username: 'nemanjagajic',
        name: 'Nemanja',
        lastName: 'Gajic'
    },
    {
        id: uid(),
        username: 'bosko',
        name: 'Bozidar',
        lastName: 'Gajic'
    },
    {
        id: uid(),
        username: 'janosjoska96',
        name: 'Jovan',
        lastName: 'Stupar'
    },
    {
        id: uid(),
        username: 'raki',
        name: 'Rastko',
        lastName: 'Tojagic'
    },
    {
        id: uid(),
        username: 'zmijica',
        name: 'Miljan',
        lastName: 'Samardzic'
    },
    {
        id: uid(),
        username: 'guster',
        name: 'Ognjen',
        lastName: 'Samardzic'
    },
    {
        id: uid(),
        username: 'tikaspic',
        name: 'Tihomir',
        lastName: 'Stojkovic'
    },
    {
        id: uid(),
        username: 'bodatajson',
        name: 'Slobodan',
        lastName: 'Tanasijevic'
    },
    {
        id: uid(),
        username: 'radosb',
        name: 'Rados',
        lastName: 'Bajic'
    },
    {
        id: uid(),
        username: 'corba',
        name: 'Stefan',
        lastName: 'Buzurovic'
    }
]

const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

store.dispatch(setUsers(users));
ReactDOM.render(jsx, document.getElementById('app'));