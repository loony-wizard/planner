import React from "react";
import { connect } from "react-redux";

import Day from "./Day";

require("./Week.less");
require("./Day.less");


class Week extends React.Component {
    render() {
        let days = [];
        for (let i = 0; i < 7; i++) {
            days.push(<Day key={i.toString()} indexInArray={i} />);
        }
        //console.log(this.props.store);
        return (
            <div>
                <div className="next-week-btn" onClick={this.props.onNextWeekButtonWasPressed}>Следующая неделя</div>
                <div className="days-container">{days}</div>
                <div className="prev-week-btn" onClick={this.props.onPrevWeekButtonWasPressed}>Предыдущая неделя</div>
            </div>
        );
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        onNextWeekButtonWasPressed: () => dispatch({
            type: 'NEXT_WEEK_BUTTON_WAS_PRESSED'
        }),
        onPrevWeekButtonWasPressed: () => dispatch({
            type: 'PREV_WEEK_BUTTON_WAS_PRESSED'
        })
    })
)(Week);