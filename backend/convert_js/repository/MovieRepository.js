"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRepository = exports.MovieRepository = void 0;
const Movie_1 = require("../entity/Movie");
const BaseRepository_1 = require("./BaseRepository");
class MovieRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super("movie");
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let listMovies = [];
            let jsonListMovies = yield this.repository.getAll(`SELECT movieId, title, duration FROM ${this.table}`);
            if (jsonListMovies === undefined) {
                return [];
            }
            jsonListMovies.forEach(jsonMovie => {
                listMovies.push(this.getMovieFromJson(jsonMovie));
            });
            return listMovies;
        });
    }
    getOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let jsonMovie = yield this.repository.getOne(`SELECT movieId, title, duration FROM ${this.table} WHERE movieId=?`, [String(id)]);
            if (jsonMovie === undefined) {
                return null;
            }
            return this.getMovieFromJson(jsonMovie);
        });
    }
    getMovieFromJson(jsonMovie) {
        return new Movie_1.Movie(jsonMovie.title, jsonMovie.duration, jsonMovie.movieId);
    }
}
exports.MovieRepository = MovieRepository;
exports.movieRepository = new MovieRepository();
