"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: graphql_1.GraphQLInt },
        user_name: { type: graphql_1.GraphQLString },
        user_password: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
    },
});
