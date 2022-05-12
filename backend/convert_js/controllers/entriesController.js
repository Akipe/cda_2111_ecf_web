"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeController = exports.HomeController = void 0;
const EntryRepository_1 = require("../repository/EntryRepository");
class HomeController {
    showAllEntries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // entries
            //console.log(await commonRepository.getAll("SELECT * from entries"))
            //console.log(await commonRepository.getAll("SELECT * from movie"))
            //console.log(await movieRepository.getAll())
            console.log(yield EntryRepository_1.entryRepository.getAll());
            res.send("Hello!");
        });
    }
}
exports.HomeController = HomeController;
exports.homeController = new HomeController();
