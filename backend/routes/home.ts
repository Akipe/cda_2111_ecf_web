import { Router } from "express"
import { homeController } from "../controllers/homeController"

export const routerHomeURL = {
    home: '/'
}

export const home = (router: Router) => {
    router.get(routerHomeURL.home, homeController.showHome)
}