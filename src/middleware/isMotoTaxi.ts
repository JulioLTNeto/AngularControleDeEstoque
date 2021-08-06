import { MotoTaxi } from "../entity/MotoTaxi";
import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isMotoTaxi: MiddlewareFn<MyContext> = ({context}, next) => {
  if (!context.req.session.userId) {
    throw new Error("Not authenticated")
  }

  if (!MotoTaxi.findOne({where:{id: context.req.session.userId}})){
    throw new Error("User is not a moto taxi")
  }

  return next()
}