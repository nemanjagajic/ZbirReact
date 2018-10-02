import React from 'react';
import Header from './Header';
import BeerList from './BeerList';
import ZbirLogo from './ZbirLogo';
import UserList from './UserList';

const ManagerPanel = () => (
	<div className="manager-panel">
		<Header />
		<div className="manager-content">
			<div className="manager-content__left">
				<UserList />
				<ZbirLogo />
			</div>
			<div className="manager-content__right">
				<div className="statistics"></div>
				<BeerList />
			</div>
		</div>
	</div>
);

export default ManagerPanel;
