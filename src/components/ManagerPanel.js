import React from 'react';
import Header from './Header';
import BeerList from './BeerList';

const ManagerPanel = () => (
	<div className="manager-panel">
		<Header />
		<div className="manager-content">
			<div className="manager-content__left">
				<div className="user-list"></div>
				<div className="zbir-logo">
					<img src="/images/zbir-logo.png" />
				</div>
			</div>
			<div className="manager-content__right">
				<div className="statistics">
				</div>
				<BeerList />
			</div>
		</div>
	</div>
);

export default ManagerPanel;
