import { MotoTaxi } from "../../entity/MotoTaxi"
import { ObjectType, Field } from "type-graphql"
import { FieldError } from "./fieldError"

@ObjectType()
export class MotoTaxiResponse{
    @Field(() => [FieldError], {nullable:true})
    errors?: FieldError[]

    @Field(() => MotoTaxi, {nullable:true})
    motoTaxi?: MotoTaxi
}