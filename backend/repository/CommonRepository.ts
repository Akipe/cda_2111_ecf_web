import { Database } from "sqlite3";
import { cinepeaulisseDb as defaultDatabase } from "../database/cinepeaulisseDb";

export class CommonRepository
{
    private database: Database

    constructor(database = defaultDatabase)
    {
        this.database = database
    }

    public getAll(sql: string, params: Array<string> = []): Promise<Array<any>>
    {
        return new Promise((resolve, reject) => {
            this.database.all(
                sql,
                params,
                (error: any, result: any) => {
                    this.actionWhenRequestEnded(
                        resolve,
                        reject,
                        error,
                        result
                    )
                }
            )
        })
    }

    public getOne(sql: string, params: Array<string> = []): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.database.get(
                sql,
                params,
                (error: any, result: any) => {
                    this.actionWhenRequestEnded(
                        resolve,
                        reject,
                        error,
                        result
                    )
                }
            )
        })
    }

    public execute(sql: string, params: Array<string> = []): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.database.run(
                sql,
                params,
                (error: any, result: any) => {
                    this.actionWhenRequestEnded(
                        resolve,
                        reject,
                        error,
                        result
                    )
                }
            )
        })
    }

    private actionWhenRequestEnded(resolve: any, reject: any, error: any, result: any)
    {
        if (error) {
            console.error(`Error to retrive data from database : ${error}`)
            reject(error)
        } else {
            resolve(result)
        }
    }
}

export const commonRepository = new CommonRepository()
