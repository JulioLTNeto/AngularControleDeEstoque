import { Field, ObjectType } from "type-graphql";
import {Column, Entity, OneToMany} from "typeorm";
import { Run } from "./Run";
import bcryptjs from 'bcryptjs'
import { User } from "./User";

// Entity and schema definition

@ObjectType()
@Entity()
export class Client extends User {

    @Field(() => String)
    @Column({nullable: true})
    stripeId: String

    @OneToMany(() => Run, run => run.client, {onDelete: 'SET NULL', onUpdate: 'CASCADE'})
    runs: Run[]
}

export async function hashPassword (pwd: string): Promise<string> {
    const salt = await bcryptjs.genSalt(10)
    return bcryptjs.hash(pwd, salt)
}

export async function verifyHash(pwd: string, haashedPwd: string): Promise<Boolean>{
    const result = bcryptjs.compare(pwd, haashedPwd)
    return result
}