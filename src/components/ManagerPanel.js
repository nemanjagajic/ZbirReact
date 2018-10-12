import React from 'react';
import Header from './Header';
import BeerList from './BeerList';
import ZbirLogo from './ZbirLogo';
import UserList from './UserList';
import OrderList from './OrderList';

const ManagerPanel = () => (
	<div className="manager-panel">
		<Header />
		<div className="manager-content">
			<div className="manager-content__left">
				<UserList />
				<ZbirLogo />
			</div>
			<div className="manager-content__right">
				<OrderList />
				<BeerList />
			</div>
		</div>
	</div>
);

export default ManagerPanel;
