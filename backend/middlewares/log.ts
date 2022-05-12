import { Express, NextFunction, Request, Response } from "express";

export const log = (app: Express): void => {
    app.use((req: Request, res: Response, next: NextFunction): void => {
        const httpMethod = req.method
        const urlPath = req.originalUrl

        console.log(`${httpMethod} ${urlPath}`)

        next()
    })
}