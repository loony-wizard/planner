export default function (time = new Date().getTime()) {
	// new Date().getDay() is a weekday, 0 - sunday, 6 - saturday
	return (new Date(time).getDay() + 6) % 7;
};