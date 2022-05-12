import { Request, response, Response } from "express";
import { movieRepository } from "../repository/MovieRepository";
import { commonRepository } from "../repository/CommonRepository";
import { entryRepository } from "../repository/EntryRepository";

export class HomeController
{
    async showHome(req: Request, res: Response)
    {
        res.redirect('/films')
    }
}

export const homeController = new HomeController()
