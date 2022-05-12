"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares");
const entryController_1 = require("./controllers/entryController");
const homeController_1 = require("./controllers/homeController");
const app = (0, express_1.default)();
const port = 4001;
(0, middlewares_1.middleware)(app);
//app.get('/', router)
app.get('/', homeController_1.homeController.showHome);
app.get('/films', entryController_1.entryController.showAll.bind(entryController_1.entryController));
app.post('/film', entryController_1.entryController.add.bind(entryController_1.entryController));
app.listen(port, () => {
    console.log(`Application should be ready on port ${port} : http://localhost:${port}/`);
});
