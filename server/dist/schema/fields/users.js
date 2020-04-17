"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const user_1 = require("../types/user");
const BASE_URL = 'http://localhost:5005/api/';
exports.userAPIFields = {
    user: {
        type: user_1.UserType,
        args: { id: { type: graphql_1.GraphQLInt } },
        resolve(parentValue, args) {
            if (args.id === 1) {
                return {
                    id: 1,
                    user_name: 'Bb',
                    user_password: '12345',
                    email: 'Bb@gmail.com',
                };
            }
            return {};
            // axios
            //   .get(`${BASE_URL}/users`)
            //   .then(({ data: { results } }) => {
            //     return results.find((user: User) => user.id === args.id);
            //   })
            //   .catch(err => {
            //     return console.log(err);
            //   });
        },
    },
};
