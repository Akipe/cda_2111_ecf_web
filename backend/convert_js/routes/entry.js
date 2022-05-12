"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entry = exports.entryRoutesURL = void 0;
const entryController_1 = require("../controllers/entryController");
exports.entryRoutesURL = {
    all: "/films",
    one: "/film"
};
const entry = (router) => {
    router.get("/a", entryController_1.entryController.showAll.bind(entryController_1.entryController));
    router.post(exports.entryRoutesURL.one, entryController_1.entryController.add.bind(entryController_1.entryController));
};
exports.entry = entry;
