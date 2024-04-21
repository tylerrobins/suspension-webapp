"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const redis_1 = require("redis");
const express_session_1 = __importDefault(require("express-session"));
const api_1 = __importDefault(require("./api"));
const errors_middleware_1 = require("./middleware/errors.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const redisClient = (0, redis_1.createClient)();
redisClient.connect().catch(console.error);
let redisStore = new connect_redis_1.default({
    client: redisClient,
    disableTouch: true
});
app.use((0, express_session_1.default)({
    name: 'qid',
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: 'asdfmsdfoememfmempas',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        secure: false,
        httpOnly: true,
        sameSite: 'lax'
    }
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}));
app.use(express_1.default.static('frontend'));
app.get('/client*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'frontend'));
});
app.use('/api', api_1.default);
app.use(errors_middleware_1.notFound);
app.use(errors_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map