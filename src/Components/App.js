import React from "react";
import { connect } from "react-redux";

require('./App.less');

import Nav from "./Nav";

class App extends React.Component {

    render() {
        return (
            <div className="app">
                <Nav />
                {this.props.children}
            </div>
        );
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({})
)(App);