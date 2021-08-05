import { Client } from "../entity/Client";
import { Arg, Ctx, Int, Mutation, Query } from "type-graphql";
import { MyContext } from "../types";
import { getConnection } from "typeorm";
import argon2 from 'argon2'
import { validateRegister } from "../utils/validateRegister";
import { ClientResponse } from "./graphqlTypes/ClientResponse";

declare module "express-session" { // about this module - there was a issue with session
    interface Session {            // recognizing new elements in it, so its needed to do
      clientId: number;            // this black magic here
    }
  }

// Resolver 
export class ClientResolver {

    // Querys
    @Query(() => [Client])
    async getClients(
        @Ctx() _ctx: MyContext
    ): Promise<Client[]>{
        return Client.find()
    }

    @Query(() => Client, {nullable: true})
    async getClient(
        @Arg('cpf' , ()=> String) cpf: String,
        @Ctx() _ctx: MyContext
    ): Promise<Client | undefined>{

        const client = Client.findOne({
            where: {
                cpf: cpf
            }
        })

        return client
        
    }

    // Mutations
    @Mutation(() => ClientResponse)
    async createClient(
        @Ctx() {req}: MyContext,
        @Arg('name', () => String) name: string,
        @Arg('userName', () => String) userName: string,
        @Arg('email', () => String) email: string,
        @Arg('cpf', () => String) cpf: string,
        @Arg('password', () => String) password: string,
        @Arg('photo', () => String, {nullable: true}) photo: string,
        @Arg('phone', () => String) phone: string,
    ): Promise<ClientResponse>{


        const errors = validateRegister(userName, email, password)

        if (errors) {
            return {errors}
        }

        let client

        try {

            const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Client)
            .values({
                name: name,
                userName: userName,
                email: email,
                cpf: cpf,
                photo: photo,
                phone: phone,
                hashed_password: await argon2.hash(password)
            })
            .execute()

            client = await Client.findOne({where: {id: result.raw.insertId}})

        } catch (error) {
            return {
                errors: [
                  {
                    field: "username",
                    message: "username already taken",
                  }
                ]
              }
        }

            req.session.clientId = client!.id // After register, lon in

            return {
                client: client
            }
        
    }

    @Mutation(() => Client , {nullable: true})
    async updateClient(
        @Ctx() _ctx: MyContext,
        @Arg('name', () => String) name: string,
        @Arg('email', () => String) email: string,
        @Arg('cpf', () => String) cpf: string,
        @Arg('photo', () => String, {nullable: true}) photo: string,
        @Arg('phone', () => String) phone: string,
    ): Promise<Client | null>{

        let client = await Client.findOne({where:{cpf: cpf}})

        if(!client){
            return null
        }
        return Client.update({id: client.id}, {
            name: name,
            email: email,
            cpf:cpf,
            photo: photo,
            phone: phone
        })
        .then(() => {return client!})
        .catch(() => {return null})

        // Way of using it without querybuilder

        // let updatedClient = await getConnection()
        // .createQueryBuilder()
        // .update(Client)
        // .returning("*")
        // .set({name: name, photo: photo, phone: phone, email: email})
        // .where('id = :id', {id:client.id})
        // .execute()

        // client = updatedClient.raw[1]

        //return client!
    }

    @Mutation(() => Boolean)
    async deleteClient(
        @Ctx() _ctx: MyContext,
        @Arg('id', () => Int) id: number
    ): Promise<Boolean>{
        const client = await Client.findOne({where:{id: id}})
        if (!client){
            return true
        }
        client.remove()
        return true
    }

    
}