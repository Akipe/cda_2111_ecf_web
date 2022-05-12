import { Router } from 'express'
import { entryController } from '../controllers/entryController'

export const entryRoutesURL = {
    all: "/films",
    one: "/film"
}

export const entry = (router: Router) => {
    router.get("/a", entryController.showAll.bind(entryController))
    router.post(entryRoutesURL.one, entryController.add.bind(entryController))
}