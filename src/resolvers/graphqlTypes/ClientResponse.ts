import { Client } from "../../entity/Client"
import { ObjectType, Field } from "type-graphql"
import { FieldError } from "./fieldError"

@ObjectType()
export class ClientResponse{
    @Field(() => [FieldError], {nullable:true})
    errors?: FieldError[]

    @Field(() => Client, {nullable:true})
    client?: Client
}