"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonRepository = exports.CommonRepository = void 0;
const cinepeaulisseDb_1 = require("../database/cinepeaulisseDb");
class CommonRepository {
    constructor(database = cinepeaulisseDb_1.cinepeaulisseDb) {
        this.database = database;
    }
    getAll(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.database.all(sql, params, (error, result) => {
                this.actionWhenRequestEnded(resolve, reject, error, result);
            });
        });
    }
    getOne(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.database.get(sql, params, (error, result) => {
                this.actionWhenRequestEnded(resolve, reject, error, result);
            });
        });
    }
    execute(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.database.run(sql, params, (error, result) => {
                this.actionWhenRequestEnded(resolve, reject, error, result);
            });
        });
    }
    actionWhenRequestEnded(resolve, reject, error, result) {
        if (error) {
            console.error(`Error to retrive data from database : ${error}`);
            reject(error);
        }
        else {
            resolve(result);
        }
    }
}
exports.CommonRepository = CommonRepository;
exports.commonRepository = new CommonRepository();
