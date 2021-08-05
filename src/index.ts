import "reflect-metadata";
import "dotenv/config"
import express from 'express';
import cors from 'cors'
import {ApolloServer} from 'apollo-server-express'
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
//import { seedDb } from "./seed";
import { HelloResolver } from "./resolvers/hello";
import { ClientResolver } from "./resolvers/clientResolver";
//import redis from 'redis'
import Redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { COOKIE_NAME } from "./constants";
import { UserResolver } from "./resolvers/userResolver";
import { MotoTaxiResolver } from "./resolvers/motoTaxiResolver";
import { RunResolver } from "./resolvers/runResolver";
import {PaymentResolver} from "./resolvers/payementResolver";
//import { sendEmail } from "./utils/sendEmail";



async function main() {

    let redis: any, RedisStore: any;

    if (process.env.NODE_ENV === "test"){
        await createConnection()

        RedisStore = connectRedis(session)
        redis = new Redis()
    }else {

        // await createConnection({
        //     "type": "mysql",
        //     "host": "mysql://b5fecc6a0f4f44:5573d1f1@us-cdbr-east-04.cleardb.com/heroku_b9cbe82646f5c6a?reconnect=true",
        //     "port": 3306,
        //     "username": process.env.MYSQL_USER,
        //     "password": process.env.MYSQL_PASSWORD,
        //     "database": process.env.DB_NAME,
        //     "synchronize": true,
        //     "logging": false,
        //     "entities": [
        //        "dist/entity/**/*.js"
        //     ],
        //     "migrations": [
        //        "dist/migration/**/*.js"
        //     ],
        //     "subscribers": [
        //        "dist/subscriber/**/*.js"
        //     ],
        //     "cli": {
        //        "entitiesDir": "src/entity",
        //        "migrationsDir": "src/migration",
        //        "subscribersDir": "src/subscriber"
        //     }
        //  }) // Create DB connection

        RedisStore = connectRedis(session) // Connext to redis using express session
        redis = new Redis(
            {host:process.env.REDIS_URL,
            port: 20400,}
            )
    }
    
    const app = express() // Initialize express

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))

    app.use(session({
        name: COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,  // 10 fucking years
            httpOnly: true,
            sameSite: 'lax', // csrf
            secure: false 
        },
        secret: "cjhgknlicjli",
        resave: false,
        saveUninitialized: false
    }))

    // Apply apollo middleware
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                HelloResolver,
                UserResolver,
                ClientResolver,
                MotoTaxiResolver,
                RunResolver,
                PaymentResolver
            ],
            validate: false
        }),
        context: ({req, res}) => ({
            req,
            res,
            redis
        })
    })

    apolloServer.applyMiddleware({
        app,
        cors: false
    })

    //app.use(cors)

    app.get('/', (_, res) => {res.send('Hello World')})

    app.listen(process.env.PORT || 3333, () => {console.log('server started on port 3333')})

}
main()



