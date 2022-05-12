"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const CommonRepository_1 = require("./CommonRepository");
class BaseRepository {
    constructor(table, repository = CommonRepository_1.commonRepository) {
        this.table = table;
        this.repository = repository;
    }
}
exports.BaseRepository = BaseRepository;
