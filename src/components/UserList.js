import React from 'react';
import { connect } from 'react-redux';
import UserListItem from './UserListItem';
import selectUsers from '../selectors/users';
import { setUserTextFilter } from '../actions/filters';
import Modal from 'react-modal';
import { setUsers } from '../actions/users';
import axios from 'axios';

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

    componentDidMount() {
        axios.get(`http://localhost:8000/api/customers`, { headers: {"Authorization" : `Bearer ${this.props.token}`} }).then((response) => {
            this.props.setUsers(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    openAddUserModal = () => {
        this.setState({
            modalAddUserIsOpen: true,
            addUserMessage: ''
        });
    }

    closeAddUserModal = () => {
        this.setState({ modalAddUserIsOpen: false });
    }

    onTextChange = (e) => {
        this.props.setUserTextFilter(e.target.value);
    }

    handleAddUser = (e) => {
        e.preventDefault();
        const username = e.target.elements.username.value.trim();
        const name = e.target.elements.name.value.trim();
        const lastName = e.target.elements.lastName.value.trim();
        const user = {
            username,
            name,
            lastName
        };

        axios.post('http://localhost:8000/api/customers', user, { headers: {"Authorization" : `Bearer ${this.props.token}`} }).then((response) => {
            this.setState(() => ({ addUserMessage: `Successfully added ${username}` }));
            axios.get(`http://localhost:8000/api/customers`, { headers: {"Authorization" : `Bearer ${this.props.token}`} }).then((response) => {
                this.props.setUsers(response.data);
            }).catch((e) => {
                console.log(e);
            });
        }).catch((e) => {
            this.setState(() => ({ addUserMessage: `Error occurred, ${name} not added` }));
            console.log(e);
        });

        e.target.elements.username.value = '';
        e.target.elements.name.value = '';
        e.target.elements.lastName.value = '';
    }

    render() {
        const jsxUsers = selectUsers(this.props.users, this.props.filters).map((user) => <UserListItem key={user.id} {...user}></UserListItem>);

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
                            <input name="username" type="text" placeholder="Username" />
                            <input name="name" type="text" placeholder="Name" />
                            <input name="lastName" type="text" placeholder="Last name" />
                            {
                                this.state.addUserMessage != '' ?
                                    (this.state.addUserMessage.startsWith('Successfully added') ?
                                        <div className="modal-message--success animated fadeIn">{this.state.addUserMessage}</div>
                                        :
                                        <div className="modal-message--error animated fadeIn">{this.state.addUserMessage}</div>)
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
    filters: state.filters,
    token: state.token
});

const mapDispatchToProps = (dispatch) => ({
    setUserTextFilter: (text) => dispatch(setUserTextFilter(text)),
    setUsers: (users) => dispatch(setUsers(users))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);

