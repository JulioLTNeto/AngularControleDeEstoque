import "reflect-metadata";
import { Connection } from "typeorm"
import { Client } from "./entity/Client"
import argon2 from 'argon2'
 import { 
     MotoTaxi,
     MotoTaxiStatus
 } from "./entity/MotoTaxi"
import {
    Run,
    RunStatus,
    RunType
} from "./entity/Run"

export async function seedDb(conn: Connection){

    conn.manager.delete(Client, {cpf:'08559529462'})
    conn.manager.delete(MotoTaxi, {cpf:'11111111111'})
    conn.manager.delete(Run, {price:5.75})

    const newClient = new Client()
    newClient.cpf = '08559529462'
    newClient.name = 'Roque client'
    newClient.userName = 'Roque Client Username'
    newClient.phone = '82996002634'
    newClient.hashed_password = await argon2.hash('some bulshit password')

    conn.manager.save(newClient)

    const newMotoTaxi = new MotoTaxi()
    newMotoTaxi.cpf = '11111111111'
    newMotoTaxi.name = 'Roque Moto Taxi'
    newMotoTaxi.phone = '11111111111'
    newMotoTaxi.hashed_password = await argon2.hash('another hash password')
    //newMotoTaxi.liscensePlate='nmf8027'
    newMotoTaxi.registrationNumber='125478'
    newMotoTaxi.status = MotoTaxiStatus.AVAILABLE

    conn.manager.save(newMotoTaxi)

    const newRun = new Run()
    newRun.client = newClient
    newRun.motoTaxi = newMotoTaxi
    newRun.price = 5.75
    newRun.acceptedAt = new Date()
    newRun.runStatus = RunStatus.OPEN
    newRun.runType = RunType.TAXI

    conn.manager.save(newRun)

}