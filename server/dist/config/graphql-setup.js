"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_graphql_1 = __importDefault(require("express-graphql"));
const schema_1 = require("../schema/schema");
exports.setupGraphQl = (app) => {
    app.use('/graphql', express_graphql_1.default({
        schema: schema_1.graphQlSchema,
        graphiql: true,
    }));
};
