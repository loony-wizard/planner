import React from "react";
import { connect } from "react-redux";

require('./App.less');

import Nav from "./Nav";
import Footer from "./Footer";

class App extends React.Component {

    render() {
        return (
            <div className="app">
                <Nav />
                {this.props.children}
                <Footer />
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