import React from 'react';
import { connect } from 'react-redux';
import UserListItem from './UserListItem';

class UserList extends React.Component {

    render() {
        const jsxUsers = this.props.users.map((user) => <UserListItem key={user.id} user={user}></UserListItem>);

        return (
            <div className="user-list">
                <h3>Users <span>({jsxUsers.length})</span></h3>
                <div className="user-list__bar">
                    <input name="usersSearch" className="user-list__search-bar" type="text" placeholder="Search users" />
                    <button className="btn">Add new</button>
                </div>
                <div className="user-list__items" id="scrollbar-style">
                    {jsxUsers}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.users
});

export default connect(mapStateToProps)(UserList);

