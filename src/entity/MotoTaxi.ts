import { Field, ObjectType, registerEnumType } from "type-graphql";
import {Entity, Column, OneToMany} from "typeorm";
import { Run } from "./Run";
import { User } from "./User";

// Enum and types definition

export enum MotoTaxiStatus {
    AVAILABLE,
    UNAVAILABLE
}

registerEnumType(
    MotoTaxiStatus,
    {
        name: 'MotoTaxiStatus',
        description: 'If the mototaxi is available or not'
    }
)

// Entity and schema definition

@ObjectType()
@Entity()
export class MotoTaxi extends User {

    @Field(() => MotoTaxiStatus)
    @Column({default: MotoTaxiStatus.AVAILABLE})
    status: MotoTaxiStatus;

    @Column()
    registrationNumber: string;

    // @Column()
    // liscensePlate: string;

    @OneToMany(() => Run, run => run.motoTaxi, {onDelete: "SET NULL", onUpdate: 'CASCADE'})
    runs: Run[]
}