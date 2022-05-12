import { Movie } from "../entity/Movie";
import { BaseRepository } from "./BaseRepository";

export class MovieRepository extends BaseRepository
{
    constructor()
    {
        super("movie")
    }

    public async getAll(): Promise<Array<Movie|null>>
    {
        let listMovies: Array<Movie> = []

        let jsonListMovies = await this.repository.getAll(
            `SELECT movieId, title, duration FROM ${this.table}`
        )

        if (jsonListMovies === undefined) {
            return []
        }

        jsonListMovies.forEach(jsonMovie => {
            listMovies.push(this.getMovieFromJson(jsonMovie))
        })

        return listMovies
    }

    public async getOneById(id: number): Promise<Movie|null>
    {
        let jsonMovie = await this.repository.getOne(
            `SELECT movieId, title, duration FROM ${this.table} WHERE movieId=?`,
            [String(id)]
        )

        if (jsonMovie === undefined) {
            return null
        }

        return this.getMovieFromJson(jsonMovie)
    }

    private getMovieFromJson(jsonMovie: any)
    {
        return new Movie(
            jsonMovie.title,
            jsonMovie.duration,
            jsonMovie.movieId,
        )
    }
}

export const movieRepository = new MovieRepository()
