import React from 'react';

class UserListItem extends React.Component {

    render() {
        return (
            <div className="user-list__item">
                {`${this.props.user.name} ${this.props.user.lastName}`}
                <div>
                    <ion-icon className="animated fadeIn" name="add-circle"></ion-icon>
                    <ion-icon className="animated fadeIn" name="information-circle"></ion-icon>
                </div>
            </div>
        );
    }
}

export default UserListItem;