"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const users_1 = require("./mutations/users");
exports.Mutations = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...users_1.userMutations,
    },
});
