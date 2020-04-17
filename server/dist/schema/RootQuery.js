"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const users_1 = require("./fields/users");
exports.RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...users_1.userAPIFields,
    },
});
