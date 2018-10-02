import React from 'react';

export default class ZbirLogo extends React.Component {
    formatDate(date) {
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    render() {
        return (
            <div className="zbir-logo">
                <img src="/images/zbir-logo.png" />
                <div className="zbir-logo__date">{this.formatDate(new Date())}</div>
            </div>
        )
    }
}