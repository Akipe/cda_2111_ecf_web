import { Request, Response } from "express";
import { movieRepository } from "../repository/MovieRepository";
import { entryRepository } from "../repository/EntryRepository";
import { HttpReturn } from "../services/httpReturn";
import { Entry } from "../entity/Entry";

export class EntryController
{
    async showAll(req: Request, res: Response)
    {
        try {
            let allEntries = await entryRepository.getAll()
            let result: Array<any>

            if (allEntries != null) {
                result = this.sortEntriesByDate(allEntries)
            } else {
                result = []
            }
            res.status(HttpReturn.Ok)
            res.json(result)
            
        } catch (err) {
            this.returnServerError(res, err)
        }
    }

    async add(req: Request, res: Response)
    {
        const { dateDay, entriesNumber, movieId } = req.body

        let movie = await movieRepository.getOneById(movieId)
        

        if (movie === null) {
            res.status(HttpReturn.ErrorNotFound)
            res.json({message: `Movie with id ${movieId} does not exist`})
        } else {
            console.log("TEST")
            console.log(dateDay)
            let entry = new Entry(dateDay, entriesNumber, movie)
            console.log(entry.date.getTime())
            console.log("FIN TEST")

            let allEntries = await entryRepository.getAll()
            let entryAllreadyExist = false

            allEntries?.forEach(entryToTest => {
                if (
                    entryToTest.date.getTime() == entry.date.getTime()
                    && entryToTest.movie.id == entryToTest.movie.id
                ) {
                    entryAllreadyExist = true
                }
            })

            if (entryAllreadyExist) {
                res.status(HttpReturn.ErrorConflict)
                res.json({message: `You can't add this entry because it is already exist`})
            } else {

                let today = new Date()

                if (entry.date.getTime() > today.getTime()) {
                    res.status(HttpReturn.ErrorNotFound)
                    res.json({message: `You can't add an entry from the future`})
                } else {
                    await entryRepository.add(entry)

                    res.status(HttpReturn.Created)
                    res.json({message: `Entry added`})
                }
            }
        }
    }

    private returnServerError(res: Response, error: any)
    {
        console.error(error)
        res.status(HttpReturn.ServerError)
        res.json({message: `Error 500: internal error`})
    }

    private sortEntriesByDate(entries: Array<Entry>)
    {
        return entries.sort((a, b) => a.date.getTime() - b.date.getTime())
    }
    
    private async isEntryAlreadyExist(entry: Entry): Promise<boolean>
    {
        let allEntries = await entryRepository.getAll()

        allEntries?.forEach(entryToTest => {
            if (
                entryToTest.date.getTime() == entry.date.getTime()
                && entryToTest.movie.id == entryToTest.movie.id
            ) {
                return true
            }
        })

        return false
    }
}

export const entryController = new EntryController()
