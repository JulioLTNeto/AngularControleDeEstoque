import { Run } from "../../entity/Run"
import { ObjectType, Field } from "type-graphql"
import { RunError } from "./runError"

@ObjectType()
export class RunResponse{
    @Field(() => [RunError], {nullable:true})
    errors?: RunError[]

    @Field(() => Run, {nullable:true})
    run?: Run
}