import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { deleteUser } from '../actions/users';

class UserListItem extends React.Component {

    constructor() {
        super();

        this.state = {
            modalDeleteUserIsOpen: false,
        };

        this.openDeleteUserModal = this.openDeleteUserModal.bind(this);
        this.closeDeleteUserModal = this.closeDeleteUserModal.bind(this);
    }

    openDeleteUserModal = () => {
        this.setState({
            modalDeleteUserIsOpen: true,
        });
    }

    closeDeleteUserModal = () => {
        this.setState({ modalDeleteUserIsOpen: false });
    }

    handleDeleteUser = () => {
        this.props.deleteUser(this.props.id);
    }

    render() {
        return (
            <div className="user-list__item">
                <div>{`${this.props.name} ${this.props.lastName}`} <span>({this.props.username})</span></div>
                <div>
                    <ion-icon className="animated fadeIn" name="add-circle"></ion-icon>
                    <ion-icon className="animated fadeIn" name="information-circle"></ion-icon>
                    <ion-icon onClick={this.openDeleteUserModal} name="trash"></ion-icon>
                </div>
                <Modal className="modal"
                    isOpen={this.state.modalDeleteUserIsOpen}
                    onRequestClose={this.closeDeleteUserModal}
                    contentLabel="Delete user modal"
                >
                    <div className="modal__dialog-header">Are you sure you want to delete {this.props.username}?</div>
                    <div className="modal__dialog-btn-container">
                        <button className="btn--dialog" onClick={this.handleDeleteUser}>Yes</button>
                        <button className="btn--dialog" onClick={this.closeDeleteUserModal}>No</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteUser: (id) => dispatch(deleteUser(id))
});

export default connect(undefined, mapDispatchToProps)(UserListItem);