"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const queries_1 = require("./queries");
const mutations_1 = require("./mutations");
class Schema {
    constructor() {
        this.rootQuery = new graphql_1.GraphQLObjectType({
            name: 'Query',
            fields: {
                findUser: new queries_1.FindAUserQuery(),
            },
        });
        this.rootMutation = new graphql_1.GraphQLObjectType({
            name: 'Mutation',
            fields: {
                updateUserEmail: new mutations_1.UpdateUserEmail(),
            },
        });
        this.schema = new graphql_1.GraphQLSchema({
            query: this.rootQuery,
            mutation: this.rootMutation,
        });
    }
    static get() {
        if (!Schema.instance) {
            Schema.instance = new Schema();
        }
        return Schema.instance.schema;
    }
}
exports.Schema = Schema;
