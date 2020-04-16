"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const rfs = __importStar(require("rotating-file-stream"));
const path_1 = __importDefault(require("path"));
class ServerLogger {
    constructor(_app, _nodeEnv) {
        this._app = _app;
        this._nodeEnv = _nodeEnv;
    }
    setupLoggingByEnv() {
        if (this.nodeEnv !== 'test') {
            if (this.nodeEnv === 'development')
                this._setupDevLogging();
            this._setupFileLogging();
        }
    }
    get nodeEnv() {
        return this._nodeEnv;
    }
    _setupDevLogging() {
        this._app.use(morgan_1.default('dev'));
    }
    _setupFileLogging() {
        var accessLogStream = rfs.createStream('access.log', {
            interval: '1d',
            path: path_1.default.join(__dirname, '..', '..', 'log'),
        });
        this._app.use(morgan_1.default('combined', { stream: accessLogStream }));
    }
}
exports.ServerLogger = ServerLogger;
