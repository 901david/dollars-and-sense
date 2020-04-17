"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = __importStar(require("uuid"));
const _1 = require("./");
const exceptions_1 = require("../exceptions");
// Mark field/type/schema
exports.Processed = Symbol();
class GraphQLErrorHandling {
    static watch(schema) {
        this.maskSchema(schema);
    }
    static maskSchema(schema) {
        const types = schema.getTypeMap();
        for (const typeName in types) {
            if (!Object.hasOwnProperty.call(types, typeName)) {
                continue;
            }
            this.maskType(types[typeName]);
        }
    }
    static maskType(type) {
        const objectType = type;
        if (objectType[exports.Processed] || !objectType.getFields) {
            return;
        }
        const fields = objectType.getFields();
        for (const fieldName in fields) {
            if (!Object.hasOwnProperty.call(fields, fieldName)) {
                continue;
            }
            this.maskField(fields[fieldName]);
        }
    }
    static maskField(field) {
        const resolveFn = field.resolve;
        if (field[exports.Processed] || !resolveFn) {
            return;
        }
        field[exports.Processed] = true;
        field.resolve = async (...args) => {
            try {
                const out = resolveFn.call(this, ...args);
                return await Promise.resolve(out);
            }
            catch (error) {
                throw this.handler(error);
            }
        };
    }
    static handler(error) {
        if (error[exceptions_1.IsException]) {
            return new Error(error.toString());
        }
        const errId = uuid.v4();
        error.message = `${error.message}: ${errId}`;
        if (!_1.Environment.isTest()) {
            console.error((error && error.stack) || error);
        }
        error.message = `InternalError:${errId}`;
        return error;
    }
}
exports.GraphQLErrorHandling = GraphQLErrorHandling;
