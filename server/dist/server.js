"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes");
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
const PORT = process.env.PORT || 5005;
app.use(express_1.default.static(path_1.default.join(__dirname, 'dist/static')));
app.use(express_1.default.json());
app.use(body_parser_1.default({ extended: true }));
app.use(routes_1.mainRouter);
morgan_1.default('combined');
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(PORT, (...err) => {
    if (err.length > 0)
        throw err;
    console.log(`Success! Started on Port: ${PORT}\n*****************************************************`);
});
