"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const log = (app) => {
    app.use((req, res, next) => {
        const httpMethod = req.method;
        const urlPath = req.originalUrl;
        console.log(`${httpMethod} ${urlPath}`);
        next();
    });
};
exports.log = log;
