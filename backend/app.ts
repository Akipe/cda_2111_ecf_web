import express, { Express } from 'express'
import { router } from './routes'
import { middleware } from './middlewares'
import { entryController } from './controllers/entryController'
import { homeController } from './controllers/homeController'

const app: Express = express()
const port: Number = 4001

middleware(app)

//app.get('/', router)
app.get('/', homeController.showHome)
app.get('/films', entryController.showAll.bind(entryController))
app.post('/film', entryController.add.bind(entryController))

app.listen(port, (): void => {
    console.log(`Application should be ready on port ${port} : http://localhost:${port}/`)
})