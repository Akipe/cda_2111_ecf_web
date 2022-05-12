import { Express } from "express"
import { validator } from "./validator"
import { log } from "./log"
import { bodyParser } from "./bodyParser"

export const middleware = (app: Express): void  => {
    validator(app)
    log(app)
    bodyParser(app)
}