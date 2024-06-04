"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    res.status(err.status | 500);
    res.send({
        status: err.status || 500,
        message: err.message
    });
};
exports.default = errorHandler;
//# sourceMappingURL=404.error.js.map