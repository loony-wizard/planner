import React from "react";
import { connect } from "react-redux";

require('./Calender.less');

import Week from "./Week/index";
import Day from "./Day/index"; // this is a FULL day, not review from week!

import $ from "jquery";

class Calender extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidUpdate() {
        $("#day").height(0);
        $("#week").height(0);
        $(".day").height(0);
        this.setHeight();
    }
    componentDidMount() {
        this.setHeight();
    }
    setHeight() {
        let h1 = $("#day")[0].scrollHeight;
        let h2 = $("#week")[0].scrollHeight;
        let h3 = $("#calender").height();
        console.log(h1, h2, h3)
        let maxHeight;
        if (h1 > h2) {
            maxHeight = h1;
        } else {
            maxHeight = h2;
        }
        if (h3 > maxHeight) {
            maxHeight = h3;
        }
        console.log(maxHeight)
        $("#day").height(maxHeight);
        $(".day").height(maxHeight);
        $("#week").height(maxHeight);
        if (window.innerWidth <= 750) {
            $(".day").height(maxHeight - 62);
        }
    }
    render() {
        const weekClassName = this.props.store.weekIsOpened === false ?
            "week-container" : "week-container week-container-opened"
        return (
            <div className="calender" id="calender">
                <div className={weekClassName} id="week">
                    <Week />
                </div>
                <div className="day-container" id="day">
                    <div className="open-week-wrapper">
                        <div
                            className="open-week"
                            onClick={this.props.onChooseAnotherDayButtonWasPressed}
                        >
                            Выбрать другой день
                        </div>
                    </div>
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
    dispatch => ({
        onChooseAnotherDayButtonWasPressed: () => dispatch({
            type: "CHOOSE_ANOTHER_DAY_BUTTON_WAS_PRESSED"
        })
    })
)(Calender);