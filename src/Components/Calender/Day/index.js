import React from "react";
import { connect } from "react-redux";

require("./Day.less");

import Plan from "./Plan";

class Day extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            // tags in new plan form
            tags: new Set()
        }

        this.removeTag = this.removeTag.bind(this);
    }

    submitForm() {
        
        let tags = this.state.tags;
        const store = this.props.store.selectedDay;
        const text = this.textarea.value;
        const key = store.key;
        
        if (this.textIsEmpty(text)) {
        
            // create a red border and then remove it
            this.textarea.className = "empty";
            setTimeout(() => this.textarea.className = "", 200);
        
        } else {
        
            // dispatch NEW_PLAN_FORM_WAS_SUBMITTED event
            this.textarea.value = "";
            this.setState({ tags: new Set() });
            this.props.onNewPlanFormWasSubmitted(text, tags);
        
        }
    }

    addTag() {

        const text = this.tagInput.value;

        if (!this.textIsEmpty(text)) {

            this.tagInput.value = "";

            const tags = new Set([...this.state.tags, text]);
            this.setState({ tags });
        }
    }

    removeTag(index) {
        let tags = [...this.state.tags];
        tags.splice(index, 1);
        tags = new Set(tags);
        this.setState({ tags });
    }

    textIsEmpty(text) {

        // checks if text contains something instead of spaces, new lines and tabs
        return !(/[^ \n\t]/.test(text));
    }

    render() {

        const store = this.props.store.selectedDay;
        const dayString = store.dayString;
        let plans = store.plans.map((plan, index) => {
            
            const tags = plan.tags.map((tag, index) => {
                // strange, but index.toString() is not a function, it's undefined. Why?
                return (
                    <div className="tag" key={Number.prototype.toString.call(index)}>#{tag}</div>
                );
            });
            return <Plan
                key={index.toString()}
                text={plan.text}
                tags={tags}
                completed={plan.completed}
                index={index}
            />;

        });
        plans.reverse();

        // tags in new form
        const tags = [...this.state.tags].map((tag, index) => {
            return (
                <div className="tag" key={index.toString()}>
                    #{tag}
                    <img 
                        className="remove"
                        onClick={() => this.removeTag(index)}
                        src="images/remove-white.png"
                    />
                </div>
            )
        });

        return (
            <div className="day">
                <div className="date">{dayString}</div>
                <div className="new-plan-form">
                    <textarea
                        placeholder="Редактирование новой заметки"
                        ref={(el) => this.textarea = el}
                    />
                    <div>
                        <input
                            className="tag-input"
                            placeholder="Введите тэг"
                            ref={(el) => this.tagInput = el}
                        />
                        <div
                            className="add-tag-button"
                            onClick={this.addTag.bind(this)}
                        >Добавить тэг</div>
                        <div className="tags">{tags}</div>
                    </div>
                    <div 
                        onClick={this.submitForm.bind(this)}
                        className="submit"
                    >Сохранить</div>
                </div>
                <div className="plans">
                    {plans}
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
        onNewPlanFormWasSubmitted: (text, tags) => dispatch({
            type: 'NEW_PLAN_FORM_WAS_SUBMITTED',
            text, tags
        })
    })
)(Day);