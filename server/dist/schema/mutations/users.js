"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const user_1 = require("../types/user");
const promisified_db_query_1 = require("../../common/promisified-db-query");
exports.userMutations = {
    modify_user_email: {
        type: user_1.UserType,
        args: {
            listing_id: { type: graphql_1.GraphQLString },
            guest_id: { type: graphql_1.GraphQLString },
        },
        resolve(parentValue, { id, email }) {
            promisified_db_query_1.makeQuery(`UPDATE Users WHERE id=${id} SET email="${email}"`)
                .then(res => res)
                .catch(err => console.log(err));
        },
    },
};
