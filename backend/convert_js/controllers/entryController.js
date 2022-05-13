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
exports.entryController = exports.EntryController = void 0;
const MovieRepository_1 = require("../repository/MovieRepository");
const EntryRepository_1 = require("../repository/EntryRepository");
const httpReturn_1 = require("../services/httpReturn");
const Entry_1 = require("../entity/Entry");
class EntryController {
    showAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let allEntries = yield EntryRepository_1.entryRepository.getAll();
                let result;
                if (allEntries != null) {
                    result = this.sortEntriesByDate(allEntries);
                }
                else {
                    result = [];
                }
                res.status(httpReturn_1.HttpReturn.Ok);
                res.json(result);
            }
            catch (err) {
                this.returnServerError(res, err);
            }
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dateDay, entriesNumber, movieId } = req.body;
            let movie = yield MovieRepository_1.movieRepository.getOneById(movieId);
            if (movie === null) {
                res.status(httpReturn_1.HttpReturn.ErrorNotFound);
                res.json({ message: `Movie with id ${movieId} does not exist` });
            }
            else {
                console.log("TEST");
                console.log(dateDay);
                let entry = new Entry_1.Entry(dateDay, entriesNumber, movie);
                console.log(entry.date.getTime());
                console.log("FIN TEST");
                let allEntries = yield EntryRepository_1.entryRepository.getAll();
                let entryAllreadyExist = false;
                allEntries === null || allEntries === void 0 ? void 0 : allEntries.forEach(entryToTest => {
                    if (entryToTest.date.getTime() == entry.date.getTime()
                        && entryToTest.movie.id == entry.movie.id) {
                        entryAllreadyExist = true;
                    }
                });
                if (entryAllreadyExist) {
                    res.status(httpReturn_1.HttpReturn.ErrorConflict);
                    res.json({ message: `You can't add this entry because it is already exist` });
                }
                else {
                    let today = new Date();
                    if (entry.date.getTime() > today.getTime()) {
                        res.status(httpReturn_1.HttpReturn.ErrorNotFound);
                        res.json({ message: `You can't add an entry from the future` });
                    }
                    else {
                        yield EntryRepository_1.entryRepository.add(entry);
                        res.status(httpReturn_1.HttpReturn.Created);
                        res.json({ message: `Entry added` });
                    }
                }
            }
        });
    }
    returnServerError(res, error) {
        console.error(error);
        res.status(httpReturn_1.HttpReturn.ServerError);
        res.json({ message: `Error 500: internal error` });
    }
    sortEntriesByDate(entries) {
        return entries.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
    isEntryAlreadyExist(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            let allEntries = yield EntryRepository_1.entryRepository.getAll();
            allEntries === null || allEntries === void 0 ? void 0 : allEntries.forEach(entryToTest => {
                if (entryToTest.date.getTime() == entry.date.getTime()
                    && entryToTest.movie.id == entryToTest.movie.id) {
                    return true;
                }
            });
            return false;
        });
    }
}
exports.EntryController = EntryController;
exports.entryController = new EntryController();
