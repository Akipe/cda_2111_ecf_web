"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpReturn = void 0;
var HttpReturn;
(function (HttpReturn) {
    HttpReturn[HttpReturn["Ok"] = 200] = "Ok";
    HttpReturn[HttpReturn["Created"] = 201] = "Created";
    HttpReturn[HttpReturn["NoContent"] = 204] = "NoContent";
    HttpReturn[HttpReturn["ErrorNotFound"] = 404] = "ErrorNotFound";
    HttpReturn[HttpReturn["ErrorConflict"] = 409] = "ErrorConflict";
    HttpReturn[HttpReturn["ServerError"] = 500] = "ServerError";
})(HttpReturn = exports.HttpReturn || (exports.HttpReturn = {}));
