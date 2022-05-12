"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cinepeaulisseDb = void 0;
const sqlite3_1 = require("sqlite3");
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
const databasePath = path_1.default.join(process_1.default.cwd(), "vars", "database", "cinepeaulisse.db");
exports.cinepeaulisseDb = new sqlite3_1.Database(databasePath, (err) => {
    if (err) {
        console.error(`Error to load database Cinepaulisse (path : ${databasePath}) : ${err}`);
        throw new Error(err.message);
    }
    else {
        console.log(`Database cinepeaulisse loaded.`);
    }
});
