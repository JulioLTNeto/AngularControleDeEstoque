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
    //sendEmail('fake@fake.com', 'hihihiihihii')
    //const dbConnection = await createConnection()
    //await seedDb(dbConnection).catch( err => console.log(err))
    await createConnection() // Create DB connection
    const app = express() // Initialize express

    // Initilize redis
    const RedisStore = connectRedis(session) // Connext to redis using express session
    //const redisCLient = redis.createClient()
    //const redis = new Redis({host:"redis"})
    const redis = new Redis()

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

    app.listen(3333, () => {console.log('server started on port 3333')})

}
main()



