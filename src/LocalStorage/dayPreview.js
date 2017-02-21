
/*
* key for day preview in localStorage:
* dayPreviewDD_MM_YYYY,
* where DD - day, MM - month, YYYY - year
* */

function getDayPreview(date, _key) {
    const key = date === null ? _key : createDayPreviewKeyByDate(date);
    const JSONData = localStorage.getItem(key);
    if (JSONData === null) {
        return getDefaultDayReview(key);
    }
    /*
    * PARSED DATA:
    * -> plannedDeals,
    * -> uncompletedDeals,
    * -> tags = new Set()
    * */

    const parsedData = JSON.parse(JSONData);
    const plannedDeals = parsedData.plannedDeals;
    const uncompletedDeals = parsedData.uncompletedDeals;
    const tags = new Set(parsedData.tags);
    return { plannedDeals, uncompletedDeals, tags };
}

function saveDayPreview(data) {
    const key = data.key;
    const plannedDeals = data.plannedDeals;
    const uncompletedDeals = data.uncompletedDeals;
    const tags = [...data.tags];
    localStorage.setItem(key, JSON.stringify({
        plannedDeals, uncompletedDeals, tags
    }));
}

function createDayPreviewKeyByDate(date) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `dayPreview${day}_${month}_${year}`;
}

function getDefaultDayReview(key) {
    return {
        plannedDeals: 0,
        uncompletedDeals: 0,
        tags: new Set(),
        key
    }
}

export {
    getDayPreview,
    saveDayPreview,
    createDayPreviewKeyByDate
}