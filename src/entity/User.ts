import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";


// Enum and types definition

export enum UserType {
  CLIENT,
  MOTOTAXI,
  ADMIN
}

registerEnumType(
  UserType,
  {
      name: 'UserType',
      description: 'If the user is Client or a Moto Taxi'
  }
)

// Entity and schema definition
@ObjectType()
export class User extends BaseEntity {
  
  @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({nullable: false})
    name: string;

    @Field(() => String)
    @Column({nullable: false, unique: true})
    userName: string;

    @Field(() => String)
    @Column({unique: true})
    email: string;

    @Field(() => String)
    @Column({unique: true})
    cpf: string;

    @Field(() => String)
    @Column()
    hashed_password: string;

    @Field(() => String, {nullable: true})
    @Column({nullable: true})
    photo: string;

    @Field(() => String)
    @Column()
    phone: string;

    @Field(() => String)
    @Column({default: UserType.CLIENT})
    userType: UserType

    @Field(() => String)
    @Column({default: 3})
    score: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt = Date;

    @Field(() => String)
    @CreateDateColumn()
    updatedAt = Date;
}
