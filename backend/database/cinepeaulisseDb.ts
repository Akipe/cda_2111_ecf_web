import { Database } from "sqlite3";
import path from "path";
import process from "process";

const databasePath = path.join(
    process.cwd(),
    "vars",
    "database",
    "cinepeaulisse.db"
)

export const cinepeaulisseDb = new Database(databasePath, (err) => {
    if (err) {
        console.error(`Error to load database Cinepaulisse (path : ${databasePath}) : ${err}`)
        throw new Error(err.message)
    } else {
        console.log(`Database cinepeaulisse loaded.`)
    }
})