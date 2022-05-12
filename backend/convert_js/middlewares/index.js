"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const validator_1 = require("./validator");
const log_1 = require("./log");
const bodyParser_1 = require("./bodyParser");
const middleware = (app) => {
    (0, validator_1.validator)(app);
    (0, log_1.log)(app);
    (0, bodyParser_1.bodyParser)(app);
};
exports.middleware = middleware;
