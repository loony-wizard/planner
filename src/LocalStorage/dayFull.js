
/*
 * key for full day in localStorage:
 * dayFullDD_MM_YYYY,
 * where DD - day, MM - month, YYYY - year
 * */

function getDayPlans(key) {
    const JSONData = localStorage.getItem(key);
    if (JSONData === null) {
        return getDefaultDayReview();
    }
    const parsedData = JSON.parse(JSONData);
    const plans = parsedData.plans;
    return plans; 
}

function saveDayPlans(data) {
    const key = data.key;
    const plans = data.plans;
    localStorage.setItem(key, JSON.stringify({ plans }));
}

function createFullDayKeyByDate(date) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `dayFull${day}_${month}_${year}`;
}

function getDefaultDayReview() {
    return [
        /**
         * Plan:
         * 1. Text of the plan: String
         * 2. Tags for the plan: Array of Strings
         * 3. Completed: Boolean
         */
    ]
}

export {
    getDayPlans,
    createFullDayKeyByDate,
    saveDayPlans
}