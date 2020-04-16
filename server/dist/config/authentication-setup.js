"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const promisified_db_query_1 = require("../common/promisified-db-query");
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
const JwtStrategy = passport_jwt_1.default.Strategy;
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'Hello world',
};
const getUser = (id) => {
    return promisified_db_query_1.makeQuery(`SELECT * FROM Users WHERE id=${id}`);
};
exports.setUpAuthentication = (app) => {
    const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
        console.log(jwt_payload);
        const user = await getUser(jwt_payload.id);
        if (user) {
            next(null, user);
        }
        else {
            next(null, false);
        }
    });
    passport_1.default.use(strategy);
    app.use(passport_1.default.initialize());
};
