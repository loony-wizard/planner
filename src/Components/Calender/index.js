import React from "react";
import { connect } from "react-redux";

require('./Calender.less');

import Week from "./Week/index";
import Day from "./Day/index"; // this is a FULL day, not review from week!

class Calender extends React.Component {

    render() {
        return (
            <div className="calender">
                <div className="flex-item1">
                    <Week />
                </div>
                <div className="flex-item2">
                    <Day />
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
)(Calender);