import { Client } from "../entity/Client";
import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isClient: MiddlewareFn<MyContext> = ({context}, next) => {
  if (!context.req.session.userId) {
    throw new Error("Not authenticated")
  }

  if (!Client.findOne({where:{id: context.req.session.userId}})){
    throw new Error("User is not a Client")
  }

  return next()
}