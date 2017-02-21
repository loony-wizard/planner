import getDayString from './getDayString';
import { getDayPreview, createDayPreviewKeyByDate, saveDayPreview } from "../LocalStorage/dayPreview";

export default function (numberOfWeekShift = 0) {
    const milliSecondsInOneDay = 864e5; // === 86400000 === 24 * 60 * 60 * 1000

    // new Date().getDat() is a weekday, 0 - sunday, 6 - saturday
    const weekdayNumber = (new Date(Date.now()).getDay() + 6) % 7;
    let weekdays = [];

    for (let i = 6; i >= 0; i--) {
        // day string is, for example, `Пятница, 3 февраля`
        const currentDate = new Date(Date.now() + milliSecondsInOneDay * (7 * numberOfWeekShift + i - weekdayNumber));
        const dayString = getDayString(i, currentDate);
        const dayPreview = getDayPreview(currentDate);
        const time = currentDate.getTime();
        const key = createDayPreviewKeyByDate(currentDate);

        weekdays.push({
            dayString,
            dayPreview,
            // dayPreview --> plannedDeals, uncompletedDeals, tags
            time,
            key
        });
    }

    return weekdays;
}