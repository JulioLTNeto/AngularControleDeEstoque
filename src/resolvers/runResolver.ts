import { isMotoTaxi } from "../middleware/isMotoTaxi";
import { isClient } from "../middleware/isClient";
import { Arg, Ctx, Query, Mutation, UseMiddleware } from "type-graphql";
import { Run, RunPaymentStatus, RunStatus, RunType } from "../entity/Run";
import { MyContext } from "../types";
import { MotoTaxi } from "../entity/MotoTaxi";
import { Client } from "../entity/Client";
import { RunResponse } from "./graphqlTypes/runResponse";
import { getConnection } from "typeorm";

export class RunResolver {
    
  @Query(() => [Run])
  async getAllRuns(
    @Ctx() _ctx: MyContext,
  ): Promise<Run[]>{
    return await Run.find()
  }

  @Query(() => [Run])
  @UseMiddleware(isMotoTaxi)
  async getAllRunsByMotoTaxi(
    @Ctx() {req}: MyContext,
  ): Promise<Run[]>{

    const runMotoTaxi = await MotoTaxi.findOne({where:{id: req.session.userId}})
    if (!runMotoTaxi) {
      return []
    }
    return await Run.find({where:{motoTaxi: runMotoTaxi}})
  }

  @Mutation(() => RunResponse)
  @UseMiddleware(isClient)
  async createRun(
    @Ctx() {req}: MyContext,
    @Arg('motoTaxiId', () => String) motoTaxiId: String,
    @Arg('runType', () => String) runType: RunType
  ){

    
    
    const runMotoTaxi = await MotoTaxi.findOne({where:{id: motoTaxiId}})
    // Verify if exist a mototaxi with the Id provided
     if (!runMotoTaxi) {
       return {
         errors: [{
           message:"This Moto Taxi does not exist"
         }]
       }
       //throw new Error("This Moto Taxi does not exist")
      }
      
      const runClient = await Client.findOne({where:{id: req.session.userId}})
      // Verify if is everything ok with user and its session,
      // and if he still exists on the database
      if (!runClient) {
        return {
          errors: [{
            message:"This user does not exist"
          }]
        }
        //throw new Error("This user does not exist")
      }

      if(await Run.findOne({
        where:{
          client: runClient,
          runStatus: RunStatus.OPEN
        }
      })){
        return {
          errors: [{
            message:"User already has a run in progress"
          }]
        }
      }
      if(await Run.findOne({
        where:{
          client: runClient,
          runPaymentStatus: RunPaymentStatus.NOT_PAID
        }
      })){
        return {
          errors: [{
            message:"User has a run not paid"
          }]
        }
      }
      if(await Run.findOne({
        where:{
          client: runClient,
          runStatus: RunPaymentStatus.NOT_PAID
        }
      })){
        return {
          errors: [{
            message:"User already has a run that was not paid"
          }]
        }
      }

      let result;

      try{
        result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Run)
        .values({
          client: runClient,
          motoTaxi: runMotoTaxi,
          runType: runType
        })
        .execute()
      
      }catch (error) {
        throw new Error("Something happened, we couldn't save run on the database")
      }

     
     return{
       run: await Run.findOne({where:{id: result.raw.insertId}})
     }
  }

  @Mutation(() => RunResponse)
  @UseMiddleware(isClient)
  async updateRunStatus(
    @Ctx() {req}: MyContext,
    @Arg('runId', () => String) runId: String
  ){

    let run = await Run.findOne({where:{id: runId, runStatus: RunStatus.PENDING}})
    if (!run) {
      run = await Run.findOne({where:{id: runId, runStatus: RunStatus.OPEN}})
    }

    if (!run) {
      return {
        errors: [{
          message:"This run does not exist"
        }]
      }
    }

    const runCLient = await Client.findOne({where:{id:req.session.userId}})

    if (!runCLient){
      return {
        errors: [{
          message:"The client associated with this run does not exist"
        }]
      }
    }
    console.log(runCLient)

    run.client = runCLient

    if (run.runStatus === RunStatus.PENDING) {
      console.log('here')
      run.runStatus = RunStatus.OPEN
      run.save()
    }
    else if (run.runStatus === RunStatus.OPEN) {
      run.runStatus = RunStatus.CLOSED
      run.save()
    }
     return{
       run: run
     }
  }

  @Mutation(() => RunResponse)
  @UseMiddleware(isMotoTaxi)
  async acceptRun(
    @Ctx() {req}: MyContext,
    @Arg('runId', () => String) runId: String
  ){

    let run = await Run.findOne({where:{id: runId, runStatus: RunStatus.PENDING}})
    if (!run) {
      run = await Run.findOne({where:{id: runId, runStatus: RunStatus.OPEN}})
    }

    if (!run) {
      return {
        errors: [{
          message:"This run does not exist"
        }]
      }
    }

    const runMotoTaxi = await MotoTaxi.findOne({where:{id:req.session.userId}})

    if (!runMotoTaxi){
      return {
        errors: [{
          message:"The Moto Taxi associated with this run does not exist"
        }]
      }
    }
    console.log(runMotoTaxi)

    run.motoTaxi = runMotoTaxi

    if (run.runStatus === RunStatus.PENDING) {
      console.log('here')
      run.runStatus = RunStatus.OPEN
      run.save()
    }
   
     return{
       run: run
     }
  }
}