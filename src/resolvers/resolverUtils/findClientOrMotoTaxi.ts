import { Client } from "../../entity/Client"
import { MotoTaxi } from "../../entity/MotoTaxi"

export const findClientOrMotoTaxiByCpf = async (cpf: String) => {
  let user;
  user = await Client.findOne({
    where: {
        cpf: cpf
    }
})

if (!user) {
  user = await MotoTaxi.findOne({
    where: {
        cpf: cpf
    }
})
}

return user
}

export const findClientOrMotoTaxiById = async (id: number) => {
  let user;
  user = await Client.findOne({
    where: {
        id: id
    }
})

if (!user) {
  user = await MotoTaxi.findOne({
    where: {
      id: id
    }
})
}

return user
}

export const findClientOrMotoTaxiByUSernameOrEmail = async (userNameOrEmail: String) => {
  let user;

  user = await Client.findOne(
    userNameOrEmail.includes('@')
    ? {where: {email: userNameOrEmail}}
    : {where: {userName: userNameOrEmail}}
  )

if (!user) {
  user = await MotoTaxi.findOne(
    userNameOrEmail.includes('@')
    ? {where: {email: userNameOrEmail}}
    : {where: {userName: userNameOrEmail}}
  )
}

return user
}