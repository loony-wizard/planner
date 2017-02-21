import React from "react";
import { connect } from "react-redux";

class Day extends React.Component {

    render() {

        const data = this.props.store.weekInfo[this.props.indexInArray];
        const dayString = data.dayString;
        const dayPreview = data.dayPreview;
        const plannedDeals = `Запланировано дел: ${dayPreview.plannedDeals}`;
        const uncompletedDeals = dayPreview.plannedDeals === 0 ?
            "" : `Из них не выполнено: ${dayPreview.uncompletedDeals}`;
        
        // tags is a Set, so make array from it
        const tags = [...dayPreview.tags].map((tag, index) => {
            return <div className="tag" key={index.toString()}>#{tag}</div>
        });
        
        // key is needed for init day in reducer
        const key = data.key;

        // time is a count of ms from some year in 1970-s
        const time = data.time;

        return (
            <div className="week-day" onClick={() => this.props.onDayWasSelected(key, time)}>
                <div className="date">{dayString}</div>
                <div className="plans-count">
                    <div className="planned">{plannedDeals}</div>
                    <div className="un-completed">{uncompletedDeals}</div>
                </div>
                <div className="tags">
                    {tags}
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
        onDayWasSelected: (key, time) => dispatch({
            type: 'DAY_WAS_SELECTED', key, time
        })
    })
)(Day);