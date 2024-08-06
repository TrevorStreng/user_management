import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Employee {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column()
  date_of_birth: Date;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  phone_number: string;

  @Field()
  @Column()
  date_hired: Date;

  @Field(() => Float)
  @Column()
  salary: number;

  @Field(() => Int)
  @Column()
  department_id: number;

  @Field(() => Int)
  @Column()
  position_id: number;
}
