const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октябра",
    "Ноября",
    "Декабря"
];

const weekdays = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье"
];

function getDayString(i, date) {
    let weekday = weekdays[i];
    let day = date.getDate();
    let month = months[date.getMonth()];
    return `${day} ${month}, ${weekday}`;
}

export default getDayString;