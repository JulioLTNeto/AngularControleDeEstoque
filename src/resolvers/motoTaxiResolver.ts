import { MotoTaxi } from "../entity/MotoTaxi";
import { Arg, Ctx, Int, Mutation, Query } from "type-graphql";
import { MyContext } from "../types";
import { getConnection } from "typeorm";
import argon2 from 'argon2'
import { validateRegister } from "../utils/validateRegister";
import { validateregisterNumber } from "../utils/validadeMototaxiRegisterNumber";
import { MotoTaxiResponse } from "./graphqlTypes/motoTaxiResponse";

declare module "express-session" { // about this module - there was a issue with session
    interface Session {            // recognizing new elements in it, so its needed to do
      clientId: number;            // this black magic here
    }
  }

// Resolver 
export class MotoTaxiResolver {

    // Querys
    @Query(() => [MotoTaxi])
    async getMotoTaxis(
        @Ctx() _ctx: MyContext
    ): Promise<MotoTaxi[]>{
        return MotoTaxi.find()
    }

    @Query(() => [MotoTaxi])
    async getMotoTaxisByStatus(
        @Ctx() _ctx: MyContext,
        @Arg('status', () => String) status: string
    ): Promise<MotoTaxi[]>{
        return MotoTaxi.find(
          {where: {
            status: status
        }})
    }

    @Query(() => MotoTaxi, {nullable: true})
    async getMotoTaxi(
        @Arg('cpf' , ()=> String) cpf: String,
        @Ctx() _ctx: MyContext
    ): Promise<MotoTaxi | undefined>{

        const motoTaxi = MotoTaxi.findOne({
            where: {
                cpf: cpf
            }
        })

        return motoTaxi
        
    }

    // Mutations
    @Mutation(() => MotoTaxiResponse)
    async createMotoTaxi(
        @Ctx() {req}: MyContext,
        @Arg('name', () => String) name: string,
        @Arg('userName', () => String) userName: string,
        @Arg('email', () => String) email: string,
        @Arg('cpf', () => String) cpf: string,
        @Arg('password', () => String) password: string,
        @Arg('photo', () => String, {nullable: true}) photo: string,
        @Arg('phone', () => String) phone: string,
        @Arg('registrationNumber', () => String) registrationNumber: string,
    ): Promise<MotoTaxiResponse>{


        let errors = validateRegister(userName, email, password)

        if (errors) {
            return {errors}
        }

        if (!validateregisterNumber(registrationNumber)) {
          return {
            errors: [
              {
                field: "registrationNumber",
                message: "invalid Registration Number",
              }
            ]
          }
        }


        let motoTaxi

        try {

            const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(MotoTaxi)
            .values({
                name: name,
                userName: userName,
                email: email,
                cpf: cpf,
                photo: photo,
                phone: phone,
                registrationNumber: registrationNumber,
                hashed_password: await argon2.hash(password)
            })
            .execute()

            motoTaxi = await MotoTaxi.findOne({where: {id: result.raw.insertId}})

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

            req.session.clientId = motoTaxi!.id // After register, lon in

            return {
                motoTaxi: motoTaxi
            }
        
    }

    @Mutation(() => MotoTaxi , {nullable: true})
    async updateMotoTaxi(
        @Ctx() _ctx: MyContext,
        @Arg('name', () => String) name: string,
        @Arg('email', () => String) email: string,
        @Arg('cpf', () => String) cpf: string,
        @Arg('photo', () => String, {nullable: true}) photo: string,
        @Arg('phone', () => String) phone: string,
        @Arg('registrationNumber', () => String) registrationNumber: string,
    ): Promise<MotoTaxi | null>{

        let motoTaxi = await MotoTaxi.findOne({where:{cpf: cpf}})

        if(!motoTaxi){
            return null
        }
        return MotoTaxi.update({id: motoTaxi.id}, {
            name: name,
            email: email,
            cpf:cpf,
            photo: photo,
            phone: phone,
            registrationNumber: registrationNumber
        })
        .then(() => {return motoTaxi!})
        .catch(() => {return null})
    }

    @Mutation(() => Boolean)
    async deleteMotoTaxi(
        @Ctx() _ctx: MyContext,
        @Arg('id', () => Int) id: number
    ): Promise<Boolean>{
        const motoTaxi = await MotoTaxi.findOne({where:{id: id}})
        if (!motoTaxi){
            return true
        }
        motoTaxi.remove()
        return true
    }
}