import { Field, Float, Int, ObjectType, registerEnumType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn} from "typeorm";
import { Client } from "./Client";
import { MotoTaxi } from "./MotoTaxi";

// Enum and types definition

export enum RunType {
    DELIVERY,
    TAXI
}

export enum RunStatus {
    PENDING,
    OPEN,
    CLOSED
}
export enum RunPaymentStatus {
    NOT_PAID,
    PAID
}

registerEnumType(
    RunType,
    {
        name: 'RunType',
        description: 'If the run is a deliery or a passenger'
    }
)

registerEnumType(
    RunStatus,
    {
        name: 'RunStatus',
        description: 'If a run has ended or not'
    }
)
registerEnumType(
    RunPaymentStatus,
    {
        name: 'RunPaymentStatus',
        description: 'If a run has been paid or not or not'
    }
)

// Entity and schema definition

@ObjectType()
@Entity()
export class Run extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @CreateDateColumn()
    acceptedAt: Date;

    @Field(() => Float)
    @Column({default: 5})
    price: number;

    @Field(() => RunType)
    @Column()
    runType: RunType;

    @Field(() => RunStatus)
    @Column({default: RunStatus.PENDING})
    runStatus: RunStatus;

    @Field(() => RunPaymentStatus)
    @Column({default: RunPaymentStatus.NOT_PAID})
    runPaymentStatus: RunPaymentStatus;

    @Field(() => Client)
    @ManyToOne(() => Client, client => client.runs, {onDelete: 'SET NULL', onUpdate: 'CASCADE', cascade:true})
    client: Client;

    @Field(() => MotoTaxi)
    @ManyToOne(() => MotoTaxi, motoTaxi => motoTaxi.runs, {onDelete: 'SET NULL', onUpdate: 'CASCADE', cascade: false})
    motoTaxi: MotoTaxi;


}