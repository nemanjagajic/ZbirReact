import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import beersReducer from '../reducers/beers';
import filtersReducer from '../reducers/filters';
import usersReducer from '../reducers/users';
import ordersReducer from '../reducers/orders';
import ordersDetailsReducer from '../reducers/ordersDetails';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			beers: beersReducer,
			filters: filtersReducer,
			users: usersReducer,
			orders: ordersReducer,
			ordersDetails: ordersDetailsReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};
