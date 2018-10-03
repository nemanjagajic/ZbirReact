import React from 'react';
import { connect } from 'react-redux';
import UserListItem from './UserListItem';
import selectUsers from '../selectors/users';
import { setUserTextFilter } from '../actions/filters';
import Modal from 'react-modal';

class UserList extends React.Component {

    constructor() {
        super();

        this.state = {
            modalAddUserIsOpen: false,
            addUserMessage: '',
        };

        this.openAddUserModal = this.openAddUserModal.bind(this);
        this.closeAddUserModal = this.closeAddUserModal.bind(this);
    }

    openAddUserModal() {
        this.setState({
            modalAddUserIsOpen: true,
            addUserMessage: ''
        });
    }

    closeAddUserModal() {
        this.setState({ modalAddUserIsOpen: false });
    }

    onTextChange = (e) => {
        this.props.setUserTextFilter(e.target.value);
    }

    render() {
        const jsxUsers = selectUsers(this.props.users, this.props.filters).map((user) => <UserListItem key={user.id} user={user}></UserListItem>);

        return (
            <div className="user-list">
                <h3>Users <span>({jsxUsers.length})</span></h3>
                <div className="user-list__bar">
                    <input name="usersSearch" className="user-list__search-bar" type="text" placeholder="Search name, last name or username" onChange={this.onTextChange} />
                    <button className="btn" onClick={this.openAddUserModal}>Add new</button>
                    <Modal className="modal"
                        isOpen={this.state.modalAddUserIsOpen}
                        onRequestClose={this.closeAddUserModal}
                        contentLabel="Add user modal"
                    >
                        <h3>Add new user</h3>
                        <form onSubmit={this.handleAddUser}>
                            <input name="name" type="text" placeholder="Name" />
                            <input name="price" type="text" placeholder="Price" />
                            {
                                this.state.addUserMessage != '' ?
                                    <div className="modal-message--success animated fadeIn">{this.state.addUserMessage}</div>
                                    :
                                    ''
                            }
                            <button className="btn--modal">Submit</button>
                        </form>
                    </Modal>
                </div>
                <div className="user-list__items" id="scrollbar-style">
                    {jsxUsers}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.users,
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setUserTextFilter: (text) => dispatch(setUserTextFilter(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);

