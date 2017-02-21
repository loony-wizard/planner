import React from "react";
import { connect } from "react-redux";

class Plan extends React.Component {

    complete() {
        if (!this.props.completed) {
            this.props.onCompleted(this.props.index);
        }
    }

    remove() {
        this.props.onRemoveButtonPressed(this.props.index);
    }

    render() {

        const status = this.props.completed ? 
            <div><img src="images/completed.png" /></div> :
            <div onClick={this.complete.bind(this)} className="complete" >Завершить</div>;

        return (
            <div className="plan">
                <div className="is-completed">{status}</div>
                <img className="delete" src="images/remove-blue.png" onClick={this.remove.bind(this)} data-description="Удалить план"/>
                <div className="text">{this.props.text}</div>
                <div className="tags">{this.props.tags}</div>
            </div>
        );

    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        onCompleted: (indexOfPlan) => dispatch({
            type: 'PLAN_WAS_COMPLETED', indexOfPlan
        }),
        onRemoveButtonPressed: (indexOfPlan) => dispatch({
            type: 'REMOVE_PLAN_BUTTON_WAS_PRESSED', indexOfPlan
        })
    })
)(Plan);