import { Client } from "../entity/Client";
import { Arg, Ctx, Mutation, Query } from "type-graphql";
import { MyContext } from "../types";
import argon2 from 'argon2'
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { validateEmail } from "../utils/validateEmail";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from 'uuid' // Just a good function to crate unique tokens
import { User, UserType } from "../entity/User";
import { MotoTaxi } from "../entity/MotoTaxi";
import { findClientOrMotoTaxiByCpf, findClientOrMotoTaxiById, findClientOrMotoTaxiByUSernameOrEmail } from "./resolverUtils/findClientOrMotoTaxi";
import { UserResponse } from "./graphqlTypes/UserResponse";

declare module "express-session" { // about this module - there was a issue with session
    interface Session {            // recognizing new elements in it, so its needed to do
      userId: number;            // this black magic here
    }
  }

// Resolver 
export class UserResolver {

    // Querys
    @Query(() => [User])
    async getAllUsers(
        @Ctx() _ctx: MyContext
    ): Promise<User[]>{

        const resultClients = await Client.find()
        const resultMotoTaxis = await MotoTaxi.find()

        const result = [...new Set([...resultClients, ...resultMotoTaxis])]

        return result
    }

    @Query(() => User, {nullable: true})
    async getUser(
        @Arg('cpf' , ()=> String) cpf: String,
        @Ctx() _ctx: MyContext
    ): Promise<User | undefined>{

        return await findClientOrMotoTaxiByCpf(cpf)
        
    }

    @Query(() => User, {nullable: true})
    async currentUser(
        @Ctx() {req}: MyContext
    ): Promise<User | null>  {
        if (!req.session.userId) {
            // User not logged in
            return null
        }

        // let client = await Client.findOne({where: {id: req.session.clientId}})
        let user = await findClientOrMotoTaxiById(req.session.userId)
        
        return user! // Exclamation is to tell that if we got here, clint will never be undefined
    }

    @Mutation(() => UserResponse)
    async login(
        @Ctx() {req}: MyContext,
        @Arg('userNameOrEmail', () => String) userNameOrEmail: string, 
        @Arg('password', () => String) password: string,

    ): Promise<UserResponse>{

      const user = await findClientOrMotoTaxiByUSernameOrEmail(userNameOrEmail)
        // const client = await Client.findOne(
        //     userNameOrEmail.includes('@')
        //     ? {where: {email: userNameOrEmail}}
        //     : {where: {userName: userNameOrEmail}}
        // )
        //const client = await Client.findOne({where: {userName: userNameOrEmail}})

        // if(userName.length <= 2){
        //     return {
        //         errors: [{
        //             field: 'username',
        //             message: "length must be greater than 2"
        //         }]
        //     }
        // }

        if(password.length <= 3){
            return {
                errors: [{
                    field: 'username',
                    message: "password must be greater than 2"
                }]
            }
        }

        if (!user){
            return {
                errors: [{
                    field: 'userNameOrEmail',
                    message: "Username doesn't exist"
                }]
            }
        }

        const valid = await argon2.verify(user.hashed_password, password)

        if(!valid){
            return {
                errors: [{
                    field: 'password',
                    message: "Incorrect password"
                }]
            }
        }

        req.session.userId = user.id


        return {
            user: user
        }
    }

    @Mutation(() => Boolean)
    async logout(
        @Ctx() {req, res}: MyContext
    ): Promise<Boolean>{
        return new Promise(resolve => req.session.destroy(err => {
            res.clearCookie(COOKIE_NAME)
            if (err) {
                console.log(err)
                resolve(false)
                return
            }
            // If nothing went wrong
            resolve(true)
        }))
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email', () => String) email: string,
        @Ctx() {redis}: MyContext
    ): Promise<Boolean> {
        
        if(!validateEmail(email)){
            return true
        }
        //const client = await Client.findOne({where:{email: email}})
        const user = await findClientOrMotoTaxiByUSernameOrEmail(email)
        if (!user) {
            // user not in the databse
            // We just do nothing and let the eprson think that something happened
            // we do that to disable people to do a fishing through our databse
            // to find a validemail
            return true
        }

        const token = v4();
        

        await redis.set(
            FORGET_PASSWORD_PREFIX + token,
            user.id,
            'ex', // Set token to expire
            1000 * 60 * 60 * 24 * 3 // Expire after 3 days
        )

        await sendEmail(
            email,
            `<a href="http://localhost:3000/change-password/${token}">Reset Password</a>`
        )
        return true
    }

    @Mutation(() => UserResponse)
    async changePassword(
        @Arg('token', () => String) token: string,
        @Arg('newPassword', () => String) newPassword: string,
        @Ctx() {redis, req}: MyContext
    ): Promise<UserResponse> {
      
        if (newPassword.length <= 2) {
            return {errors: [
                {
                    field: "newPassword",
                    message: "length must be greater than 6"
                }
            ]}
        }

        const redisKey = FORGET_PASSWORD_PREFIX + token
        const userId = await redis.get(redisKey) as unknown as number
        if (!userId) {
            return {errors: [
                {
                    field: "token",
                    message: "token expired"
                }
            ]}
        }

        //const client = await Client.findOne({where: {id: userId}})
        const user = await findClientOrMotoTaxiById(userId)

        if (!user) {
            return {errors: [
                {
                    field: "toeken",
                    message: "user no longer exists"
                }
            ]}
        }

        user.hashed_password = await argon2.hash(newPassword)
        if (user.userType === UserType.CLIENT) {
          Client.save(user)
        }
        else {
          MotoTaxi.save(user)
        }
        

        // Log in after change
        req.session.clientId = user.id

        redis.del(redisKey)

        return {user}

    }
}