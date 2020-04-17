"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const RootQuery_js_1 = require("./RootQuery.js");
exports.graphQlSchema = new graphql_1.GraphQLSchema({
    query: RootQuery_js_1.RootQuery,
});
