"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
class Movie {
    constructor(title, duration, id) {
        this.id = id || null;
        this.title = title;
        this.duration = duration;
    }
}
exports.Movie = Movie;
