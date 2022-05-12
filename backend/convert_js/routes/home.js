"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = exports.routerHomeURL = void 0;
const homeController_1 = require("../controllers/homeController");
exports.routerHomeURL = {
    home: '/'
};
const home = (router) => {
    router.get(exports.routerHomeURL.home, homeController_1.homeController.showHome);
};
exports.home = home;
