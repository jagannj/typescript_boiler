"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const morgan_1 = __importDefault(require("morgan"));
const chalk_1 = __importDefault(require("chalk"));
const app = (0, express_1.default)();
app.get('/', (req, res, next) => {
    res.send("helloworld typescript!");
});
//logger Middleware
app.use((0, morgan_1.default)("dev"));
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
    console.log("dfgg");
});
const errorHandler = (err, req, res, next) => {
    res.status(err.status | 500);
    res.send({
        status: err.status || 500,
        message: err.message
    });
};
app.use(errorHandler);
app.listen(3500, () => { console.log(chalk_1.default.bgMagenta.italic("Server is Running On 3500")); });
//# sourceMappingURL=app.js.map