import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<header className="header">
		<div className="content-container">
			<div className="header__content">
				<Link className="header__link" to="/">
					Manager panel
				</Link>
				<Link className="header__link" to="/">
					Logout
        		</Link>
			</div>
		</div>
	</header>
);

export default Header;