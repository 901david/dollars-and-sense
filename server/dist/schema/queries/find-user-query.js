"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const core_1 = require("../../core");
const types_1 = require("../types");
const AbstractQuery_1 = require("./AbstractQuery");
class FindBookByIdQuery extends AbstractQuery_1.AbstractQuery {
    constructor() {
        super(...arguments);
        this.log = core_1.Logger('app:schemas:book:FindBookByIdQuery');
        this.type = types_1.BookType;
        this.allow = ['admin'];
        this.args = {
            id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        };
    }
    before(context, args) {
        this.log.debug('hook before args', args);
        return Promise.resolve(args);
    }
    async execute(root, args, context) {
        this.log.debug('resolve findBookById(%s)', args.id);
        const book = await context.Services.BookService.findById(args.id);
        return book.toJson();
    }
    after(result, context, args) {
        this.log.debug('hook after args', args);
        return Promise.resolve(result);
    }
}
exports.FindBookByIdQuery = FindBookByIdQuery;
