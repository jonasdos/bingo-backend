"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
exports.badRequest = badRequest;
function notFound(message) {
    if (message === void 0) { message = "Not found."; }
    return {
        name: "NotFound",
        message: message
    };
}
function badRequest(message) {
    if (message === void 0) { message = "Bad Request."; }
    return {
        name: "BadRequest",
        message: message
    };
}
