"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const hello_1 = require("./resolvers/hello");
const clientResolver_1 = require("./resolvers/clientResolver");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const constants_1 = require("./constants");
const userResolver_1 = require("./resolvers/userResolver");
const motoTaxiResolver_1 = require("./resolvers/motoTaxiResolver");
const runResolver_1 = require("./resolvers/runResolver");
const payementResolver_1 = require("./resolvers/payementResolver");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let redis, RedisStore;
        if (process.env.NODE_ENV === "dev") {
            yield typeorm_1.createConnection();
            RedisStore = connect_redis_1.default(express_session_1.default);
            redis = new ioredis_1.default();
        }
        else {
            console.log(process.env.DB_HOST);
            console.log(process.env.DB_USER);
            console.log(process.env.DB_PASSWORD);
            console.log(process.env.DB_NAME);
            yield typeorm_1.createConnection({
                "type": "mysql",
                "url": process.env.CLEARDB_DATABASE_URL,
                "synchronize": true,
                "logging": false,
                "entities": [
                    "dist/entity/**/*.js"
                ],
                "migrations": [
                    "dist/migration/**/*.js"
                ],
                "subscribers": [
                    "dist/subscriber/**/*.js"
                ],
                "cli": {
                    "entitiesDir": "src/entity",
                    "migrationsDir": "src/migration",
                    "subscribersDir": "src/subscriber"
                }
            });
            RedisStore = connect_redis_1.default(express_session_1.default);
            redis = new ioredis_1.default(process.env.REDIS_URL);
        }
        const app = express_1.default();
        app.use(cors_1.default({
            origin: 'http://localhost:3000',
            credentials: true
        }));
        app.use(express_session_1.default({
            name: constants_1.COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365,
                httpOnly: true,
                sameSite: 'lax',
                secure: false
            },
            secret: "cjhgknlicjli",
            resave: false,
            saveUninitialized: false
        }));
        const apolloServer = new apollo_server_express_1.ApolloServer({
            schema: yield type_graphql_1.buildSchema({
                resolvers: [
                    hello_1.HelloResolver,
                    userResolver_1.UserResolver,
                    clientResolver_1.ClientResolver,
                    motoTaxiResolver_1.MotoTaxiResolver,
                    runResolver_1.RunResolver,
                    payementResolver_1.PaymentResolver
                ],
                validate: false
            }),
            context: ({ req, res }) => ({
                req,
                res,
                redis
            })
        });
        apolloServer.applyMiddleware({
            app,
            cors: false
        });
        app.get('/', (_, res) => { res.send(process.env.REDIS_URL); });
        app.listen(process.env.PORT || 3333, () => { console.log('server started on port 3333'); });
    });
}
main();
//# sourceMappingURL=index.js.map