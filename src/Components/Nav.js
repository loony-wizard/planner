import React from "react";
import { connect } from "react-redux";

require('./Nav.less');

class Nav extends React.Component {

    render() {
        return (
            <div className="nav">
                <div className="container">
                    <h1>Мой Календарь</h1>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({})
)(Nav);