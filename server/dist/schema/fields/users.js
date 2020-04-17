"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const graphql_1 = require("graphql");
const user_1 = require("../types/user");
const BASE_URL = 'http://localhost:5005/api';
exports.userAPIFields = {
    user: {
        type: user_1.UserType,
        args: { id: { type: graphql_1.GraphQLInt } },
        resolve(parentValue, args) {
            axios_1.default
                .get(`${BASE_URL}/users`)
                .then(({ data: results }) => {
                return results.find((user) => user.id === args.id);
            })
                .catch(err => {
                return console.log(err);
            });
        },
    },
};
