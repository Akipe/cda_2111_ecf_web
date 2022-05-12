"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
class Entry {
    constructor(date, entriesNumber, movie, id) {
        let dateUnformated = date.split(" ");
        let months = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
        let monthEntry = 1;
        for (let indexMonths = 0; indexMonths < months.length; indexMonths++) {
            if (dateUnformated[1] == months[indexMonths]) {
                monthEntry = indexMonths;
            }
        }
        let year = Number.parseInt(dateUnformated[2]);
        let month = this.getNumberTwoDigit(Number(monthEntry + 1));
        let day = this.getNumberTwoDigit(Number.parseInt(dateUnformated[0]));
        let formatDate = `${year}-${month}-${day}T00:00:00+0000`;
        this.id = id || null;
        this.date = new Date(formatDate);
        this.entriesNumber = entriesNumber;
        this.movie = movie;
    }
    getPaulTime() {
        return this.date.toLocaleDateString('fr-FR', { year: "numeric", month: "long", day: "numeric" });
    }
    getNumberTwoDigit(number) {
        if (number.toString().length == 1) {
            return `0${String(number)}`;
        }
        return String(number);
    }
}
exports.Entry = Entry;
