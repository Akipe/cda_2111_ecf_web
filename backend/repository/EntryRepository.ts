import { Entry } from "../entity/Entry";
import { Movie } from "../entity/Movie";
import { BaseRepository } from "./BaseRepository";

export class EntryRepository extends BaseRepository
{
    constructor()
    {
        super("entries")
    }

    public async getAll(): Promise<Array<Entry>| null>
    {
        let listEntries: Array<Entry> = []

        let jsonListEntries = await this.repository.getAll(
            `SELECT
                ${this.table}.entriesId, ${this.table}.dateDay, ${this.table}.entriesNumber, 
                movie.movieId, movie.title, movie.duration 
            FROM ${this.table}
            INNER JOIN movie ON ${this.table}.movieId = movie.movieId`
        )

        if (jsonListEntries === undefined) {
            return null
        }

        jsonListEntries.forEach(jsonEntry => {
            listEntries.push(this.getEntrieFromJson(jsonEntry))
        })

        return listEntries
    }

    public async add(movie: Entry): Promise<void>
    {
        if (movie.movie != null) {
            await this.repository.execute(
                `INSERT INTO ${this.table} (dateDay, entriesNumber, movieId) VALUES (?, ?, ?)`,
                [String(movie.getPaulTime()), String(movie.entriesNumber), String(movie.movie.id)]
            )
        }
    }

    private getEntrieFromJson(jsonEntry: any): Entry
    {
        return new Entry(
            jsonEntry.dateDay,
            jsonEntry.entriesNumber,
            new Movie(
                jsonEntry.title,
                jsonEntry.duration,
                jsonEntry.movieId,
            ),
            jsonEntry.entriesId,
        )
    }
}

export const entryRepository = new EntryRepository()
