"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_auth_controller_1 = require("../controllers/user-auth-controller");
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
const JwtStrategy = passport_jwt_1.default.Strategy;
exports.jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'Hello world',
};
exports.setUpAuthentication = (app) => {
    const strategy = new JwtStrategy(exports.jwtOptions, async (jwt_payload, next) => {
        console.log(jwt_payload);
        const user = await user_auth_controller_1.getUser(jwt_payload.id);
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
