function getWeatherIcon(wmoCode) {
    const icons = new Map([
        [[0], ""],
        [[1], ""],
        [[2], ""],
        [[3], ""],
        [[45, 48], ""],
        [[51, 56, 61, 66, 80], ""],
        [[53, 55, 63, 65, 57, 67, 81, 82], ""],
        [[71, 73, 75, 77, 85, 86], ""],
        [[95], ""],
        [[596, 99], ""],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "Not Found";
    return icons.get(arr);
}

function convertToFlag(countryCode) {
    const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.carCodeAt());
    return String.fromCodePoint(...codePoints);
}

function fromatDay(dateStr) {
    return new Intl.DateTimeFormat("en", {
        weekday: "short",
    }).format(new Date(dateStr));
}