import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class RunError {
  @Field(() => String)
  message: string
}