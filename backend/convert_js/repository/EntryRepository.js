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
exports.entryRepository = exports.EntryRepository = void 0;
const Entry_1 = require("../entity/Entry");
const Movie_1 = require("../entity/Movie");
const BaseRepository_1 = require("./BaseRepository");
class EntryRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super("entries");
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let listEntries = [];
            let jsonListEntries = yield this.repository.getAll(`SELECT
                ${this.table}.entriesId, ${this.table}.dateDay, ${this.table}.entriesNumber, 
                movie.movieId, movie.title, movie.duration 
            FROM ${this.table}
            INNER JOIN movie ON ${this.table}.movieId = movie.movieId`);
            if (jsonListEntries === undefined) {
                return null;
            }
            jsonListEntries.forEach(jsonEntry => {
                listEntries.push(this.getEntrieFromJson(jsonEntry));
            });
            return listEntries;
        });
    }
    add(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            if (movie.movie != null) {
                yield this.repository.execute(`INSERT INTO ${this.table} (dateDay, entriesNumber, movieId) VALUES (?, ?, ?)`, [String(movie.getPaulTime()), String(movie.entriesNumber), String(movie.movie.id)]);
            }
        });
    }
    getEntrieFromJson(jsonEntry) {
        return new Entry_1.Entry(jsonEntry.dateDay, jsonEntry.entriesNumber, new Movie_1.Movie(jsonEntry.title, jsonEntry.duration, jsonEntry.movieId), jsonEntry.entriesId);
    }
}
exports.EntryRepository = EntryRepository;
exports.entryRepository = new EntryRepository();
