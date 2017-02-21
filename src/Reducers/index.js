import getDayString from './getDayString';
import getWeekdayNumber from './getWeekdayNumber';
import createFullDayKeyByPreviewKey from './createFullDayKeyByPreviewKey';
import createPreviewKeyByFullDayKey from './createPreviewKeyByFullDayKey';
import getWeekdays from './getWeekdays';

import { getDayPreview, createDayPreviewKeyByDate, saveDayPreview } from "../LocalStorage/dayPreview";
import { getDayPlans, createFullDayKeyByDate, saveDayPlans } from "../LocalStorage/dayFull";

// WEEK INFO DATA
let numberOfWeekShift = 0;
const weekdays = getWeekdays(numberOfWeekShift);

// FULL DAY DATA
const fullDayKey = createFullDayKeyByDate(new Date());
const plans = getDayPlans(fullDayKey);

const weekdayNumber = getWeekdayNumber();
const dayString = getDayString(weekdayNumber, new Date());

const initialState = {
	weekInfo: weekdays,
	selectedDay: {
		key: fullDayKey, plans, dayString
	}
};

function reducer(state = initialState, action) {
	if (action.type === 'NEXT_WEEK_BUTTON_WAS_PRESSED') {
        
        return {
        	selectedDay: state.selectedDay,
        	weekInfo: getWeekdays(++numberOfWeekShift)
        };

    } else if (action.type === 'PREV_WEEK_BUTTON_WAS_PRESSED') {
        
        return {
        	selectedDay: state.selectedDay,
        	weekInfo: getWeekdays(--numberOfWeekShift)
        };

    } else if (action.type === 'DAY_WAS_SELECTED') {
    	
    	const key = createFullDayKeyByPreviewKey(action.key);
        const weekdayNumber = getWeekdayNumber(action.time);
        console.log(weekdayNumber)
        const dayString = getDayString(weekdayNumber, new Date(action.time));
        const plans = getDayPlans(key);

        return {
            weekInfo: state.weekInfo,
            selectedDay: {
            	key, plans, dayString
            }
        }

    } else if (action.type === 'NEW_PLAN_FORM_WAS_SUBMITTED') {
    	
    	// WORKING WITH SELECTED DAY
    	let plans = state.selectedDay.plans;
    	plans.push({
            text: action.text,
            tags: [...action.tags], // array from Set
            completed: false
        });
        saveDayPlans({
        	key: state.selectedDay.key, 
        	plans: state.selectedDay.plans 
        });

        // WORKING WITH WEEK INFO
        let plannedDeals = 0;
        let uncompletedDeals = 0;
        let tags = new Set(action.tags);
        plans.forEach(plan => {
            plannedDeals++;
            if (plan.completed === false) {
                uncompletedDeals++;
            }
            plan.tags.forEach(tag => tags.add(tag));
        });
        saveDayPreview({ 
        	key: createPreviewKeyByFullDayKey(state.selectedDay.key), 
        	plannedDeals, uncompletedDeals, tags 
        });
        
    	return {
    		weekInfo: getWeekdays(numberOfWeekShift), // make it easy :)
    		selectedDay: {
    			...state.selectedDay,
    			plans
    		}
    	};

    } else if (action.type === 'PLAN_WAS_COMPLETED') {

        // WORKING WITH SELECTED DAY
        let plans = state.selectedDay.plans;
        plans[action.indexOfPlan].completed = true;
        saveDayPlans({ key: state.selectedDay.key, plans });

        // WORKING WITH WEEK INFO
        let plannedDeals = 0;
        let uncompletedDeals = 0;
        plans.forEach(plan => {
            plannedDeals++;
            if (plan.completed === false) {
                uncompletedDeals++;
            }
        });
        const key = createPreviewKeyByFullDayKey(state.selectedDay.key);
        saveDayPreview({ 
            key, plannedDeals, uncompletedDeals,
            tags: getDayPreview(null, key).tags  
        });

        return {
            weekInfo: getWeekdays(numberOfWeekShift),
            selectedDay: {
                ...state.selectedDay,
                plans
            }
        };

    } else if (action.type === 'REMOVE_PLAN_BUTTON_WAS_PRESSED') {

        // // WORKING WITH SELECTED DAY
        let plans = state.selectedDay.plans;
        plans.splice(action.indexOfPlan, 1);
        saveDayPlans({ key: state.selectedDay.key, plans });

        // WORKING WITH WEEK INFO
        let plannedDeals = 0;
        let uncompletedDeals = 0;
        let tags = new Set();
        plans.forEach(plan => {
            plannedDeals++;
            if (plan.completed === false) {
                uncompletedDeals++;
            }
            plan.tags.forEach(tag => tags.add(tag));
        });
        saveDayPreview({ 
            key: createPreviewKeyByFullDayKey(state.selectedDay.key), 
            plannedDeals, uncompletedDeals, tags 
        });

        return {
            weekInfo: getWeekdays(numberOfWeekShift),
            selectedDay: {
                ...state.selectedDay,
                plans
            }
        };

    } else {
        return state;
    }
}

export default reducer;