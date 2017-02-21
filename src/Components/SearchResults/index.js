import React from "react";
import { connect } from "react-redux";

class SearchResults extends React.Component {

    render() {
        return (
            <div>
                <h1>This is SearchResults</h1>
            </div>
        );
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({})
)(SearchResults);