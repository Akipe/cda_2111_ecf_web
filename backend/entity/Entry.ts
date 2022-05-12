import { Movie } from "./Movie"

export class Entry
{
    public id: number|null
    public date: Date
    public entriesNumber: number
    public movie: Movie

    constructor(
        date: string,
        entriesNumber: number,
        movie: Movie,
        id?: number
    ) {
        let dateUnformated: Array<string> = date.split(" ")
        let months = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
        let monthEntry: number = 1
        for(let indexMonths = 0; indexMonths < months.length; indexMonths++)
        {
            if (dateUnformated[1] == months[indexMonths]) {
                monthEntry = indexMonths
            }
        }

        let year = Number.parseInt(dateUnformated[2])
        let month = this.getNumberTwoDigit(Number(monthEntry + 1))
        let day = this.getNumberTwoDigit(Number.parseInt(dateUnformated[0]))
        let formatDate: string = `${year}-${month}-${day}T00:00:00+0000`

        this.id = id || null
        this.date = new Date(formatDate)
        this.entriesNumber = entriesNumber
        this.movie = movie
    }

    public getPaulTime()
    {
        return this.date.toLocaleDateString('fr-FR', {year: "numeric", month: "long", day: "numeric"})
    }

    private getNumberTwoDigit(number: any): string
    {
        if (number.toString().length == 1) {
            return `0${String(number)}`
        }
        return String(number)
    }
}
