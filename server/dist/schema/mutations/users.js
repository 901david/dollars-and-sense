"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const user_1 = require("../types/user");
const axios_1 = __importDefault(require("axios"));
exports.userMutations = {
    addUser: {
        type: user_1.UserType,
        args: {
            user_name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            user_password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        },
        resolve(parentValue, args) {
            return axios_1.default
                .post('http://localhost:5005/api/users/register', args)
                .then(({ data }) => data)
                .catch((err) => {
                console.log(err);
            });
        },
    },
    deleteUser: {
        type: user_1.UserType,
        args: {
            id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        },
        resolve(parentValue, args) {
            return axios_1.default
                .delete(`http://localhost:5005/api/users/${args.id}`)
                .then(({ data }) => data)
                .catch((err) => {
                console.log(err);
            });
        },
    },
    updateUser: {
        type: user_1.UserType,
        args: {
            id: { type: graphql_1.GraphQLInt },
            user_name: { type: graphql_1.GraphQLString },
            user_password: { type: graphql_1.GraphQLString },
            email: { type: graphql_1.GraphQLString },
        },
        resolve(parentValue, args) {
            const body = { ...args };
            delete body.id;
            return axios_1.default
                .put(`http://localhost:5005/api/users/${args.id}`, body)
                .then(({ data }) => data)
                .catch((err) => {
                console.log(err);
            });
        },
    },
};
